import React from 'react';
import { AnimatePresence } from 'framer-motion';

import { isNonEmptyString } from '@busymango/is-esm';
import type { OmitOf } from '@busymango/utils';
import { compact } from '@busymango/utils';
import { useQuery } from '@tanstack/react-query';

import type { IFlexProps } from '@/components/widgets';
import { IFlex } from '@/components/widgets';
import { IChip } from '@/components/widgets/ichip';
import { OSS_INFO_API, type OSSInfoModel, server } from '@/service';

export type IAttachmentModel = {
  /** 附件ID */
  id: string;
  /** 附件地址 */
  src?: string;
  /** 附件名 */
  file?: File;
  /** 附件大小 */
  size?: number;
  /** 附件名称 */
  name?: string;
  /** 附件后缀 */
  exte?: string;
  /** 附件详情响应体 */
  response?: OSSInfoModel;
  /** 附件状态 */
  status?: 'error' | 'success' | 'removed' | 'promise';
};

export interface AttachmentRowProps extends IAttachmentModel {
  deleteable?: boolean;
  downloadable?: boolean;
  variant?: 'filled' | 'bordered' | 'text';
}

const AttachmentRow: React.FC<AttachmentRowProps> = (props) => {
  const { id, name, exte, status = 'promise', response } = props;

  const { id: uid } = response ?? {};

  const { data, isLoading } = useQuery({
    queryKey: [OSS_INFO_API, uid],
    queryFn: async () => server.oss.info(uid!),
    enabled: isNonEmptyString(uid),
    placeholderData: response,
  });

  return <IChip clickable>{compact([name, exte]).join('.')}</IChip>;
};

export const IAttachmentGroup: React.FC<
  {
    items?: IAttachmentModel[];
  } & OmitOf<IFlexProps, 'children'>
> = ({ items, ...others }) => (
  <IFlex vertical align="flex-start" {...others}>
    <AnimatePresence>
      {items?.map((e) => <AttachmentRow key={e.id} {...e} />)}
    </AnimatePresence>
  </IFlex>
);
