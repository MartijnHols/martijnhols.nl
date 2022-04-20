// min-width
export const MOBILE = 0
export const TABLET = 768
export const DESKTOP = 992

// When using a max-width breakpoint, this needs to be non-inclusive as not to
// be true at the same time as a min-width breakpoint for the same number.
// Uses 0.02px rather than 0.01px to work around a current rounding bug in Safari.
// See https://bugs.webkit.org/show_bug.cgi?id=178261
const MAX_MARGIN = 0.02

export const MOBILE_MAX = TABLET - MAX_MARGIN
export const TABLET_MAX = DESKTOP - MAX_MARGIN
// desktop has no max
