import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const AddressIcon = (props: SvgProps) => (
  <Svg width="22" height="28" viewBox="0 0 22 28" fill="none" {...props}>
    <Path
      d="M10.5854 1.00592C11.2792 0.973541 17.2921 0.881022 19.4845 6.658C20.3576 9.09295 20.3918 11.7499 19.5816 14.2065C18.1061 19.1879 14.059 23.8779 10.5808 27C7.09797 23.8779 3.05086 19.1879 1.5754 14.2065C0.771849 11.748 0.810906 9.09179 1.6864 6.658C3.88341 0.881022 9.89165 1.0383 10.5854 1.00592Z"
      stroke="#E95322"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default AddressIcon;
