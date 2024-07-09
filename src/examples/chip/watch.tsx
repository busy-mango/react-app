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

/** 盎司转克 */
const OZ2G = 28.349523148774;

export default function WatchChip() {
  const { data, isPending } = useQuery({
    queryFn,
    queryKey: [api],
    gcTime: Infinity,
    staleTime: 5 * MIN2MS,
    refetchInterval: 5 * MIN2MS,
    refetchOnWindowFocus: true,
    throwOnError: false,
    retry: true,
  });

  const { gold = 0, silver = 0 } = data ?? {};

  return (
    <IPage>
      <IFlex vertical gap={size2px(8)}>
        <IChip
          isLoading={isPending}
          style={{
            color: 'gold',
            borderColor: 'gold',
          }}
          variant="outlined"
        >
          金价:
          {` `}
          {(gold / OZ2G).toFixed(2)}
          <ISignLine type="dollar" />
          每克
        </IChip>
        <IChip
          isLoading={isPending}
          style={{
            color: 'silver',
            borderColor: 'silver',
          }}
          variant="outlined"
        >
          银价:
          {` `}
          {(silver / OZ2G).toFixed(2)}
          <ISignLine type="dollar" />
          每克
        </IChip>
      </IFlex>
    </IPage>
  );
}
