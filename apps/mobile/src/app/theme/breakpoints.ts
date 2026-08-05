export const breakpoints = {
  xs: 0,
  sm: 390,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export type AppBreakpoints = typeof breakpoints;
