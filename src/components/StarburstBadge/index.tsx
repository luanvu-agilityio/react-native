import { View } from 'react-native';
import Svg, { Polygon, Text as SvgText } from 'react-native-svg';

interface StarburstBadgeProps {
  label: string;
  size?: number;
  color?: string;
  textColor?: string;
  fontSize?: number;
}

const generateStarburstPoints = (
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  numPoints: number,
): string => {
  const points: string[] = [];
  const step = Math.PI / numPoints;
  for (let i = 0; i < numPoints * 2; i++) {
    const angle = i * step - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return points.join(' ');
};

const StarburstBadge = ({
  label,
  size = 72,
  color = '#E95322',
  textColor = '#ffffff',
  fontSize,
}: StarburstBadgeProps) => {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.48;
  const innerR = size * 0.34;

  const points = generateStarburstPoints(cx, cy, outerR, innerR, 15);

  const baseFont = Math.round(size * 0.28);
  const computedFont = fontSize
    ? fontSize
    : label.length > 4
    ? Math.max(12, Math.round(baseFont * 0.85))
    : baseFont;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Polygon points={points} fill={color} />
        <SvgText
          x={cx}
          y={cy + computedFont * 0.35}
          textAnchor="middle"
          fill={textColor}
          fontSize={computedFont}
          fontFamily="LeagueSpartan-Bold"
          fontWeight="bold"
        >
          {label}
        </SvgText>
      </Svg>
    </View>
  );
};

export default StarburstBadge;
