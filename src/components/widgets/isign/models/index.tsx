export type ISignType = 'tick' | 'cross' | 'info';

export interface ISignLineProps {
  type: ISignType;
  ring?: boolean;
}
