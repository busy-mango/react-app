import { UPDATE_RETRY_COUNT } from '@/constants';

const { location, localStorage } = window;

/** 重置载入次数 */
export const reset = () => {
  localStorage.removeItem(UPDATE_RETRY_COUNT);
};

/** 刷新页面以重载入口HTML */
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
