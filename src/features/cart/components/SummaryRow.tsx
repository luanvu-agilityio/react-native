import { View } from 'react-native';

// Components
import { Heading, Typography } from '@components/index';
import { cn } from '@utils/cn';

interface SummaryRowProps {
  label: string;
  value: string;
  isHeading?: boolean;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}
const SummaryRow = ({
  label,
  value,
  isHeading,
  className,
  labelClassName,
  valueClassName,
}: SummaryRowProps) => {
  const baseLabel = isHeading
    ? 'font-primary-medium text-lg text-primary'
    : 'font-primary-medium text-xl text-primary';
  const baseValue = baseLabel;

  const labelClass = cn(baseLabel, labelClassName);
  const valueClass = cn(baseValue, valueClassName);

  return (
    <View className={cn('flex-row justify-between', className ?? 'mb-2.5')}>
      {isHeading ? (
        <Heading level={6} className={labelClass}>
          {label}
        </Heading>
      ) : (
        <Typography className={labelClass}>{label}</Typography>
      )}

      {isHeading ? (
        <Heading level={6} className={valueClass}>
          {value}
        </Heading>
      ) : (
        <Typography className={valueClass}>{value}</Typography>
      )}
    </View>
  );
};
export default SummaryRow;
