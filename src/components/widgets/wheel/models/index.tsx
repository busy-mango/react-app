import type { ControlOption } from '../../control';

export interface IWheelOptionProps {
  isFocus?: boolean;
  container: React.RefObject<HTMLDivElement | null>;
}

export interface IWheelProps {
  options?: ControlOption[];
  isScrollSnape?: boolean;
  value?: ControlOption['value'];
  onChange?: (value?: ControlOption['value']) => void;
}
