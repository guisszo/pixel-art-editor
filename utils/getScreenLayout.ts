export const getScreenLayout = (screenWidth: number, screenHeight: number) => {
  const isLandscape = screenWidth > screenHeight
  const isMobile = screenWidth < 768
  const isTablet = screenWidth >= 768 && screenWidth < 1024
  const isDesktop = screenWidth >= 1024

  return { isMobile, isTablet, isDesktop, isLandscape }
}