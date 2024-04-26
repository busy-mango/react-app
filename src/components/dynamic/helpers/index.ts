import { UPDATE_RETRY_COUNT } from '@/constants';

const { location, localStorage } = window;

/** 版本更新 */
export const reset = () => {
  localStorage.removeItem(UPDATE_RETRY_COUNT);
};

/** 版本更新 */
export const update = () => {
  const val = localStorage.getItem(UPDATE_RETRY_COUNT);
  const count = Number(val ?? 0);
  const current = (count + 1).toString();
  if (count < 3) {
    localStorage.setItem(UPDATE_RETRY_COUNT, current);
    location.reload();
  } else {
    throw new Error('版本更新失败，请手动刷新重试');
  }
};
