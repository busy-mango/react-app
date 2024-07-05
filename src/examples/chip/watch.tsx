import { MIN2MS, parse } from '@busymango/utils';
import { useQuery } from '@tanstack/react-query';

import { IChip, IFlex, IPage, ISignLine } from '@/components';
import { drive } from '@/service';
import { size2px } from '@/utils';

interface GoldBody {
  gold: number;
  silver: number;
}

const api = 'https://gold-price-live.p.rapidapi.com/get_metal_prices';

const queryFn = async () => parse.json<GoldBody>(await drive<string>(api));

const OZ2G = 28.349523148774;

export default function WatchChip() {
  const { data, isPending } = useQuery({
    queryFn,
    queryKey: [api],
    gcTime: Infinity,
    staleTime: 5 * MIN2MS,
    initialData: { gold: 0, silver: 0 },
    refetchInterval: 5 * MIN2MS,
    refetchOnWindowFocus: true,
    throwOnError: false,
    retry: false,
  });

  const { gold = 0, silver = 0 } = data;

  return (
    <IPage>
      <IFlex gap={size2px(8)}>
        <IChip isLoading={isPending} variant="outlined">
          {gold / OZ2G}
        </IChip>
        <IChip isLoading={isPending} variant="outlined">
          {silver / OZ2G}
          <ISignLine type="dollar" />
        </IChip>
      </IFlex>
    </IPage>
  );
}
