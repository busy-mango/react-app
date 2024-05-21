import type { PropsWithChildren } from 'react';

import type { OmitOf } from '@busymango/utils';

export type ICollapsibleKey = string | number;

export interface ICollapsibleProps extends PropsWithChildren {
  name: ICollapsibleKey;
  open?: boolean;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  onArrowClick?: (name: ICollapsibleKey, open?: boolean) => void;
}

export type ICollapseVisible = Partial<
  Record<ICollapsibleProps['name'], ICollapsibleProps['open']>
>;

export interface ICollapseGroupProps {
  value?: ICollapsibleProps['name'][];
  defaultValue?: ICollapsibleProps['name'][];
  items?: OmitOf<ICollapsibleProps, 'open'>[];
  onChange?: (openKeys: ICollapsibleProps['name'][]) => void;
}
