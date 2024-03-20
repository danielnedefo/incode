import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

const LikeIcon: FC<{
  filled?: boolean | null;
}> = ({filled = false}) => (
  <Svg fill="none" height="12" viewBox="0 0 14 12" width="14">
    <Path
      d="M6.4 2.8L7 3.25L7.6 2.8L8.93682 1.79739C9.98882 1.00838 11.4773 1.19735 12.2987 2.22419C13.0737 3.19291 12.9964 4.58943 12.1191 5.46664L7 10.5858L1.88086 5.46664C1.00364 4.58943 0.926297 3.19291 1.70127 2.22419C2.52275 1.19735 4.01118 1.00838 5.06318 1.79739L6.4 2.8Z"
      fill={filled ? 'black' : 'none'}
      stroke={'black'}
      strokeWidth={2}
    />
  </Svg>
);

export default LikeIcon;
