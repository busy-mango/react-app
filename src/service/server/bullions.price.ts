import { iSearchParams } from '@busymango/utils';

import { BULLIONS_PRICE_INFO_API } from '../apis';
import { drive } from '../drive';
import { iServerData, iSrc } from '../helpers';
import type { BullionsPriceModel, IServerModel } from '../models';

interface BullionsPriceInfoBody extends IServerModel<BullionsPriceModel> {}

export interface BullionsPriceInfoParams {
  id?: string;
  code?: string;
}

export const info = ({ id, code }: BullionsPriceInfoParams) =>
  iServerData(
    drive<BullionsPriceInfoBody>(
      iSrc(BULLIONS_PRICE_INFO_API),
      iSearchParams({ id, code })
    )
  );
