import dayjs from 'dayjs';
import relative from 'dayjs/plugin/relativeTime';
import { emails } from 'docs/widgets/data';

import { sleep } from '@busymango/utils';
import { useQuery } from '@tanstack/react-query';

import {
  ICard,
  IChip,
  IControlWrap,
  IFlex,
  IInput,
  IScrollable,
  ISignLine,
  ITypography,
} from '@/components';
import { iThemeVariable } from '@/utils';

dayjs.locale('zh-CN');
dayjs.extend(relative);

export const EmailList: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['EMAIL_QUERY'],
    queryFn: async () => {
      await sleep(2000);
      return emails.map(({ id, ...item }) => ({
        value: id,
        ...item,
      }));
    },
  });

  return (
    <div
      style={{
        display: 'grid',
        height: '100%',
        gridTemplateRows: 'max-content minmax(0, 1fr)',
      }}
    >
      <IControlWrap prefix={<ISignLine type="magnifier" />} variant="bordered">
        <IInput />
      </IControlWrap>
      <div
        style={{
          height: '100%',
          padding: `${iThemeVariable('--gap-03')} 0`,
        }}
      >
        <IScrollable
          measure
          gap={16}
          isLoading={isLoading}
          maxHeight={'100%'}
          render={(email) => (
            <ICard
              extra={
                <ITypography variant="subtitle">
                  {dayjs(email.sendeTime).fromNow()}
                </ITypography>
              }
              footer={
                <IFlex gap={iThemeVariable('--gap-02')}>
                  <IChip>会议</IChip>
                  <IChip>工作</IChip>
                  <IChip>重要</IChip>
                </IFlex>
              }
              title={
                <ITypography variant="h6">{email.sender.name}</ITypography>
              }
            >
              <ITypography variant="body">{email.content}</ITypography>
            </ICard>
          )}
          source={data}
        />
      </div>
    </div>
  );
};
