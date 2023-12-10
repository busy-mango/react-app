import { catchMsg } from '@/utils';
import { isNotFoundErrorMsg } from '@/utils/assert';

export function retry(count: number, error: unknown) {
  return isNotFoundErrorMsg(catchMsg(error)) || count < 2;
}
