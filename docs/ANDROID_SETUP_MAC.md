# Android Development Setup (macOS)

One-time setup for building and running `@finance-platform/mobile` on Android from a Mac.

For day-to-day run commands, see [RUNNING.md](./RUNNING.md).

## Project requirements

These values come from `apps/mobile/android/build.gradle`:

| Requirement | Version |
|---|---|
| JDK | 17+ (Android Studio’s embedded JDK is fine) |
| Android SDK Platform | API 36 (`compileSdk` / `targetSdk`) |
| Android SDK Build-Tools | 36.0.0 |
| NDK | 27.1.12297006 |
| Min SDK | 24 |

Also needed for the monorepo: Node.js >= 22.11 and pnpm 10.x.

## 1. Install Android Studio

1. Download [Android Studio](https://developer.android.com/studio) for macOS (Apple Silicon or Intel as appropriate).
2. Open the `.dmg`, drag **Android Studio** into Applications, and launch it.
3. Complete the setup wizard. Prefer the **Standard** install so the SDK, platform tools, and emulator are included.
4. When prompted, accept the Android SDK licenses.

## 2. Install SDK packages

Open Android Studio → **Settings** (⌘,) → **Languages & Frameworks** → **Android SDK**.

### SDK Platforms

Install:

- **Android 16.0 (API 36)** — or the latest API 36 platform package available in the SDK Manager

Enable **Show Package Details** if you need a specific system image for the emulator.

### SDK Tools

Under the **SDK Tools** tab (with **Show Package Details** enabled), install or confirm:

| Package | Notes |
|---|---|
| Android SDK Build-Tools 36.0.0 | Required by this project |
| Android SDK Command-line Tools (latest) | `sdkmanager`, licenses, CI |
| Android SDK Platform-Tools | Includes `adb` |
| Android Emulator | Required for local emulator runs |
| NDK (Side by side) **27.1.12297006** | Exact version from `build.gradle` |
| CMake | Often pulled in with NDK; install if the build asks for it |

Apply / OK and wait for downloads to finish.

> Tip: If NDK 27.1.12297006 is not listed, install the closest 27.x package, then check whether Android Studio offers that exact revision under **Show Package Details**. The Gradle build expects that version string.

## 3. Create an emulator (AVD)

1. Open **Device Manager** (toolbar icon, or **Tools → Device Manager**).
2. **Create Device** → pick a phone (e.g. Pixel 8).
3. Select a system image with **API 36** (or at least API 24+). Prefer an **arm64-v8a** image on Apple Silicon.
4. Finish the wizard and start the AVD once to confirm it boots.

CLI alternative after the SDK is on your `PATH`:

```bash
emulator -list-avds
emulator -avd <avd_name>
```

## 4. Configure environment variables

Android Studio installs the SDK at:

```text
~/Library/Android/sdk
```

Add the following to `~/.zshrc` (this repo’s default shell on macOS):

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export ANDROID_SDK_ROOT=$ANDROID_HOME
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
```

Reload the shell:

```bash
source ~/.zshrc
```

Verify:

```bash
echo $ANDROID_HOME
adb version
sdkmanager --list 2>/dev/null | head -n 5   # optional; needs cmdline-tools
```

### JDK

Prefer Android Studio’s JDK rather than a separate Homebrew JDK unless you already manage Java yourself:

```bash
# Typical JetBrains / Android Studio JBR path (version folder may differ)
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
```

Confirm:

```bash
java -version   # should report 17+
```

## 5. Point the project at the SDK (if needed)

Gradle usually finds the SDK via `ANDROID_HOME`. If you see `SDK location not found`, create:

`apps/mobile/android/local.properties`

```properties
sdk.dir=/Users/<your-username>/Library/Android/sdk
```

Do not commit `local.properties` — it is machine-specific (normally gitignored).

## 6. Accept licenses (CLI)

If a CLI or CI build complains about licenses:

```bash
yes | sdkmanager --licenses
```

## 7. Install JS dependencies and run

From the monorepo root:

```bash
pnpm install
```

Boot an emulator (or connect a device with USB debugging), then:

```bash
pnpm android
```

That builds the app, installs it, and starts Metro. Full run/troubleshoot notes are in [RUNNING.md](./RUNNING.md).

### Physical device

1. On the phone: **Settings → Developer options → USB debugging**.
2. Connect via USB (or wireless debugging) and accept the RSA prompt.
3. Confirm:

```bash
adb devices
```

4. Run `pnpm android`.

## Checklist

- [ ] Android Studio installed and opened once
- [ ] SDK Platform API 36 installed
- [ ] Build-Tools 36.0.0 installed
- [ ] NDK 27.1.12297006 installed
- [ ] At least one AVD created (or a physical device ready)
- [ ] `ANDROID_HOME` set and `adb` on `PATH`
- [ ] JDK 17+ available (`java -version`)
- [ ] `pnpm install` completed at repo root
- [ ] `pnpm android` launches the app

## Troubleshooting

| Problem | What to try |
|---|---|
| `SDK location not found` | Set `ANDROID_HOME`, or add `sdk.dir` in `apps/mobile/android/local.properties` |
| NDK version mismatch | Install NDK **27.1.12297006** via SDK Manager → SDK Tools → Show Package Details |
| `adb: command not found` | Add `$ANDROID_HOME/platform-tools` to `PATH`, then `source ~/.zshrc` |
| Emulator won’t start on Apple Silicon | Use an **arm64-v8a** system image, not x86_64 |
| Gradle / JDK errors | Point `JAVA_HOME` at Android Studio’s JBR (17+) |
| Build asks for licenses | Run `yes | sdkmanager --licenses` |
| No devices | Start an AVD or plug in a device; check `adb devices` |
| Slow first build | Normal — Gradle downloads dependencies and native toolchains once |

## Related docs

- [RUNNING.md](./RUNNING.md) — run iOS/Android, Metro, common scripts
- [ARCHITECTURE.md](./ARCHITECTURE.md) — product and monorepo architecture
