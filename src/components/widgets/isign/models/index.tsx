export type ISignType =
  | 'tick'
  | 'cross'
  | 'info'
  | 'arrow-top'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-bottom';

export interface ISignLineProps {
  type: ISignType;
  ring?: boolean;
}
