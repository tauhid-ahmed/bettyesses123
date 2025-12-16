"use client";

import { useMediaQuery } from "./useMediaQuery";

export function useScreenSize() {
  const isMobile = useMediaQuery("(max-width: 640px)"); // sm
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)"); // md to lg
  const isDesktop = useMediaQuery("(min-width: 1025px)"); // lg+
  const isSmallScreen = useMediaQuery("(max-width: 1024px)"); // mobile + tablet
  const isLargeScreen = useMediaQuery("(min-width: 1025px)"); // desktop+

  return {
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
    isLargeScreen,
  };
}
