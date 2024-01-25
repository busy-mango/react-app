/**
 * @description 命令行参数相关方法
 */

import dev from '../../config/webpack/develop.ts';
import mock from '../../config/webpack/mock.ts';
import prod from '../../config/webpack/product.ts';

/**
 * 通过命令行参数获取对应webpack配置
 */
export const toWebpackConfig = () => {
  /** 根据build命令的--参数 判断使用哪个环境的webpack配置 */
  for (const iterator of process.argv) {
    if (iterator.startsWith('--')) {
      const str = iterator.replace('--', '');
      if (str === 'dev') return dev;
      if (str === 'mock') return mock;
      if (str === 'prod') return prod;
    }
  }
};
