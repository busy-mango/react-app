import { isNumber } from '@busymango/is-esm';

export type ICellGridModel = {
  vertical?: boolean;
  control?: number | string;
  label?: number | string;
  extra?: number | string;
};

export const iCellGrid = ({
  vertical,
  control = 8,
  label = 2,
  extra = 2,
}: ICellGridModel = {}): Pick<
  React.CSSProperties,
  'gridTemplateRows' | 'gridTemplateColumns' | 'gridTemplateAreas'
> => {
  return {
    gridTemplateAreas: vertical
      ? ['"title extra"', '"control control"'].join('\n')
      : '"title control extra"',
    gridTemplateRows: vertical
      ? ['max-content', 'max-content'].join(' ')
      : 'max-content',
    gridTemplateColumns: vertical
      ? [label, extra]
          .map((num = '1fr') => (isNumber(num) ? num + 'fr' : num))
          .join(' ')
      : [label, control, extra]
          .map((num = '1fr') => (isNumber(num) ? num + 'fr' : num))
          .join(' '),
  };
};
