import { useWindowDimensions } from 'react-native';

/**
 * Screen width threshold (dp) above which a device is considered a tablet.
 * 768dp corresponds to the smallest common tablet width (e.g. iPad mini landscape,
 * 7" Android tablets). Phones max out around 480–414dp.
 */
const TABLET_WIDTH_BREAKPOINT = 768;

export interface DeviceType {
  isTablet: boolean;
  screenWidth: number;
  screenHeight: number;
}

/**
 * Returns whether the current device/screen size is tablet-sized.
 * Re-evaluates automatically on orientation change via useWindowDimensions.
 */
export const useDeviceType = (): DeviceType => {
  const { width, height } = useWindowDimensions();
  return {
    isTablet: width >= TABLET_WIDTH_BREAKPOINT,
    screenWidth: width,
    screenHeight: height,
  };
};
