import type { ReactAction, WrapperProps } from '@/models';

import type { IButtonProps } from '../../ibutton';

export interface DropDownProps {
  // nested?: boolean;
  // children?: React.ReactNode;
}

export type MenuItemRef = HTMLButtonElement;

export interface MenuItemProps extends IButtonProps {
  label: React.ReactNode;
  disabled?: boolean;
}

export type MenuTreeRef = HTMLButtonElement;

export interface MenuTreeProps {
  nested?: boolean;
  children?: React.ReactNode;
  render?: {
    item?: (props: MenuItemProps) => React.ReactNode;
    marked?: (params: { isNested: boolean }) => React.ReactNode;
    reference?: () => React.ReactNode;
  };
}

export interface MenuContextVal {
  /** 是否打开下拉菜单 */
  open: boolean;
  /** 当前激活的选项 */
  activeIndex: number | null;
  setActiveIndex: ReactAction<number | null>;
  setHasFocusInside?: ReactAction<boolean>;
  iItemProps: (
    props?: WrapperProps<HTMLButtonElement>
  ) => Record<string, unknown>;
}
