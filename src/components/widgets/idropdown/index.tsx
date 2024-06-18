import type { MenuWrapProps } from './menus';
import { MenuWrap } from './menus';
import type { MenuItemProps } from './models';

export interface IDropDownProps {
  menu?: MenuWrapProps;
  render?: {
    item?: (props: MenuItemProps) => React.ReactNode;
  };
}

export const IDropDown = () => {
  return (
    <MenuWrap
      items={[
        {
          value: '12',
          label: '123',
        },
        {
          value: '123',
          label: '1234',
        },
        {
          value: '152',
          label: '1253',
        },
        {
          value: '1255',
          label: '12355',
        },
        {
          value: '126',
          label: '1236',
        },
      ]}
    >
      {() => {
        return 12;
      }}
    </MenuWrap>
  );
};
