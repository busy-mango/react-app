import type { ReactWrapProps } from '@/models';

import { IButton } from '../button';
import { useControlState } from '../control';

export interface TypographyProps extends ReactWrapProps<HTMLParagraphElement> {
  folded?: boolean;
  onChange?: (folded: boolean) => void;
}

export const Typography: React.FC<TypographyProps> = (props) => {
  const { folded, children, onChange, ...others } = props;

  const [value, iChange] = useControlState({
    value: folded,
    onChange,
  });

  return (
    <article {...others}>
      {children}
      <IButton isFullWidth variant="filled" />
    </article>
  );
};
