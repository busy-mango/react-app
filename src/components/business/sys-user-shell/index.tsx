import { Fragment } from 'react/jsx-runtime';

import { useQuery } from '@tanstack/react-query';

import { IClipSpinner } from '@/components/widgets';
import type { IUserModel } from '@/service';
import { server, SYSTEM_USER_INFO_API } from '@/service';

export interface SysUserShellProps {
  id?: string;
  placeholderData?: IUserModel;
  children?: (data: IUserModel) => React.ReactNode;
}

export const SysUserShell: React.FC<SysUserShellProps> = (props) => {
  const { id, placeholderData, children } = props;

  const iUserId = id ?? placeholderData?.id;

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [SYSTEM_USER_INFO_API, iUserId],
    queryFn: async () => server.user.info(iUserId),
    placeholderData,
  });

  return (
    <Fragment>
      {isLoading && <IClipSpinner />}
      {(!isLoading && isSuccess && children?.(data)) ?? data?.name}
    </Fragment>
  );
};
