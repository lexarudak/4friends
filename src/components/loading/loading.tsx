import { RingSpinner } from "react-spinners-kit";
import { FC } from "react";

type Props = {
  size?: number;
  color?: string;
  sizeUnit?: string;
  loading?: boolean;
};

const DEFAULT_COLOR = "#33c87d";

export const Loading: FC<Props> = ({
  size,
  sizeUnit,
  loading,
  color,
}): JSX.Element => {
  return (
    <RingSpinner
      size={size || 25}
      loading={loading}
      color={color || DEFAULT_COLOR}
      sizeUnit={sizeUnit}
    />
  );
};
