import { Fragment, useMemo } from 'react';
import { Translation, useTranslation } from 'react-i18next';

import { MIN2MS } from '@busymango/utils';
import { useQuery } from '@tanstack/react-query';

import { IChip, IFlex, ISignLine } from '@/components';
import { BULLIONS_PRICE_INFO_API } from '@/services';
import { iBullionsPrice } from '@/services/server';
import { size2px } from '@/utils';

/** 盎司转克 */
const OZ2G = 28.349523148774;

const render = (title: React.ReactNode, price = 0) => (
  <Translation>
    {(t) => (
      <Fragment>
        {[title, ((price ?? 0) / OZ2G).toFixed(2)].join(' ')}
        <ISignLine type="dollar" />
        {t('price:per gram')}
      </Fragment>
    )}
  </Translation>
);

const BullionsChip: React.FC<{
  code?: string;
}> = (props) => {
  const { code } = props;

  const { t } = useTranslation();

  const { data, isPending } = useQuery({
    queryFn: () => iBullionsPrice.info({ code }),
    queryKey: [BULLIONS_PRICE_INFO_API, code],
    refetchInterval: 5 * MIN2MS,
    refetchOnWindowFocus: true,
    throwOnError: false,
    retry: true,
  });

  const title = useMemo(() => {
    switch (code) {
      case 'gold':
        return t('price:Price of gold');
      case 'silver':
        return t('price:Price of silver');
    }
  }, [code, t]);

  return (
    <IChip
      isLoading={isPending}
      style={{
        color: code,
        borderColor: code,
      }}
    >
      {render(title, data?.price)}
    </IChip>
  );
};

const App: React.FC = () => (
  <IFlex vertical gap={size2px(8)}>
    <BullionsChip code="gold" />
    <BullionsChip code="silver" />
  </IFlex>
);

export default App;
