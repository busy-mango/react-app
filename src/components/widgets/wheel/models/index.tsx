import type { ControlOption } from '../../control';

export interface IWheelOptionProps {
  isFocus?: boolean;
  container: React.RefObject<HTMLDivElement>;
}

export interface IWheelProps {
  options?: ControlOption[];
  value?: ControlOption['value'];
  onChange?: (value?: ControlOption['value']) => void;
}
