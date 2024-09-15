import type { OmitOf } from '@busymango/utils';

import type { WrapperProps } from '@/models';

import { IButton } from '../button';
import { useControlState } from '../control';

export interface ParagraphProps
  extends OmitOf<WrapperProps<HTMLParagraphElement>, 'onChange'> {
  folded?: boolean;
  onChange?: (folded: boolean) => void;
}

export const Paragraph: React.FC<ParagraphProps> = (props) => {
  const { folded, children, onChange, ...others } = props;

  const [value, iChange] = useControlState({
    value: folded,
    onChange,
  });

  return (
    <p {...others}>
      {children}
      <IButton isFullWidth variant="filled" />
    </p>
  );
};
