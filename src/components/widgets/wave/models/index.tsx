import type { ReactTargetType, ReactWrapProps } from '@/models';

export interface IWaveProps extends ReactWrapProps {
  target: ReactTargetType;
  measure?: ReactTargetType;
  placeholder?: boolean;
}

export interface IWaveWrapProps extends ReactWrapProps<HTMLSpanElement> {
  target: ReactTargetType;
  placeholder?: boolean;
  enabled?: boolean;
}
