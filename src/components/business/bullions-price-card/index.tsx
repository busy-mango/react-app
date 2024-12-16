import { isNonEmptyString } from '@busymango/is-esm';
import { useQuery } from '@tanstack/react-query';

import type { BullionsPriceModel } from '@/services';
import { iBullionsPrice } from '@/services/server';

export const BullionsPriceCard: React.FC<{
  id?: string;
  initialData?: BullionsPriceModel;
}> = (props) => {
  const { id, initialData } = props;

  const { data } = useQuery({
    initialData,
    queryKey: ['', id],
    queryFn: () => iBullionsPrice.info({ id }),
    enabled: isNonEmptyString(id),
  });

  return <div></div>;
};
