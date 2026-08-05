# Running the Mobile App

How to run `@finance-platform/mobile` on the iOS Simulator and Android Emulator.

All commands below assume the monorepo root unless noted otherwise.

## Prerequisites

| Requirement | Notes |
|---|---|
| Node.js >= 22.11 | Check with `node -v` |
| pnpm 10.x | `corepack enable` recommended |
| Xcode | iOS only — install from the Mac App Store; open once to accept the license |
| CocoaPods | iOS only — `sudo gem install cocoapods`, or use Bundler if a `Gemfile` is present |
| Android Studio | Android only — install SDK, platform tools, and at least one emulator AVD |
| JDK 17+ | Android only — usually bundled with Android Studio |

## One-time setup

```bash
pnpm install
```

### iOS pods

Run after the first install:

```bash
cd apps/mobile/ios
pod install
cd ../../..
```

Whenever you add or change native iOS packages, re-run:

```bash
cd apps/mobile/ios && pod install
```

If the project later adds a `Gemfile` under `apps/mobile/ios`, prefer:

```bash
cd apps/mobile/ios
bundle install
bundle exec pod install
cd ../../..
```

### Android SDK

1. Open Android Studio → **Settings → Languages & Frameworks → Android SDK**.
2. Install a recent SDK Platform (API 35+ recommended) and Android SDK Build-Tools.
3. Create an emulator: **Device Manager → Create Device** (e.g. Pixel 8).
4. Ensure `ANDROID_HOME` is set (Android Studio usually does this). Typical macOS value:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools
```

## iOS Simulator

1. Install dependencies and pods (see above) if you have not already.
2. From the monorepo root:

```bash
pnpm ios
```

This builds the app, launches the default iOS Simulator, and starts Metro.

### Choose a simulator

List available devices:

```bash
xcrun simctl list devices available
```

Then target one by name:

```bash
pnpm --filter @finance-platform/mobile ios -- --simulator="iPhone 16"
```

### Metro only

Useful when the app is already installed and you only need the bundler:

```bash
pnpm --filter @finance-platform/mobile start
```

Then press `i` in the Metro terminal, or re-run `pnpm ios`.

### Open in Xcode

```bash
open apps/mobile/ios/Mobile.xcworkspace
```

Use the workspace (not the `.xcodeproj`) after pods are installed. Build and run with the play button, selecting any simulator as the destination.

> If `Mobile.xcworkspace` is missing, run `pod install` first. Until pods are installed you may only see `Mobile.xcodeproj`.

## Android Emulator

1. Start an emulator from Android Studio **Device Manager**, or:

```bash
emulator -list-avds
emulator -avd <avd_name>
```

2. From the monorepo root:

```bash
pnpm android
```

This builds the app, installs it on the running emulator (or a connected device), and starts Metro.

### Metro only

```bash
pnpm --filter @finance-platform/mobile start
```

Then press `a` in the Metro terminal, or re-run `pnpm android`.

### Physical device

Enable USB debugging on the device, connect it, confirm it appears in `adb devices`, then run `pnpm android`.

## Common scripts

| Command | Description |
|---|---|
| `pnpm --filter @finance-platform/mobile start` | Start Metro bundler |
| `pnpm ios` | Build and run on iOS Simulator |
| `pnpm android` | Build and run on Android Emulator / device |
| `pnpm lint` | Lint all packages |
| `pnpm typecheck` | TypeScript check all packages |
| `pnpm test` | Run tests |

## Troubleshooting

| Problem | What to try |
|---|---|
| `pod install` fails | Update CocoaPods; clear `apps/mobile/ios/Pods` and `Podfile.lock`, then reinstall |
| `Failed to get NitroModules` (or similar missing native module at runtime) | Native deps were added in JS but not linked — run `cd apps/mobile/ios && pod install`, then rebuild with `pnpm ios` |
| Metro cache issues | `pnpm --filter @finance-platform/mobile start -- --reset-cache` |
| iOS build fails after dependency change | Re-run `pod install`, then clean build in Xcode (**Product → Clean Build Folder**) |
| Android `SDK location not found` | Set `ANDROID_HOME`, or create `apps/mobile/android/local.properties` with `sdk.dir=/path/to/sdk` |
| No emulator / simulator detected | Boot a simulator/emulator first, then re-run `pnpm ios` or `pnpm android` |
| Port 8081 in use | Kill the existing Metro process, or start with another port via React Native CLI flags |
