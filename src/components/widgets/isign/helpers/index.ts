import type { Target, Transition } from 'framer-motion';

import type { ISignType } from '../models';

/**
 * 通过斜边获取对边
 * @param hypotenuse 斜边
 * @param degrees 角度
 * @returns 对边
 */
export const iTrigoOpposite = (hypotenuse: number, degrees = 30) => {
  const radians = degrees * (Math.PI / 180);
  return Math.sin(radians) * hypotenuse;
};

/**
 * 通过斜边获取邻边
 * @param hypotenuse 斜边
 * @param degrees 角度
 * @returns 邻边
 */
export const iTrigoAdjacent = (hypotenuse: number, degrees = 30) => {
  const radians = degrees * (Math.PI / 180);
  return Math.cos(radians) * hypotenuse;
};

/**
 * 获取正三角形路径
 * @param x 中心点x
 * @param y 中心点y
 * @param r 以r为半径寻找正三角三个点坐标
 */
export const iTrigo = (x: number, y: number, r: number) => {
  const point1 = `${x} ${y - r}`;
  const point2 = `${x - iTrigoAdjacent(r)} ${y + iTrigoOpposite(r)}`;
  const point3 = `${x + iTrigoAdjacent(r)} ${y + iTrigoOpposite(r)}`;
  return `M${point1} L${point2} L${point3}Z`;
};

export const iCirclePath = (
  x: number = 512,
  y: number = 512,
  r: number = 480
) => {
  return `M ${x} ${y - r} A ${r} ${r} 0 1 1 ${x} ${y + r} A ${r} ${r} 0 1 1 ${x} ${y - r}`;
};

export const initial: Target = {
  d: 'M512 512 L512 512 L512 512',
};

export const transition: Transition = {
  duration: 0.15,
  ease: 'easeIn',
};

export const iAnimateLine = (type: ISignType): Target[] => {
  switch (type) {
    case 'arrow-top':
      return [
        { d: 'M128 640 L512 256 L896 640' },
        { d: 'M128 640 L512 256 L896 640' },
      ];
    case 'arrow-left':
      return [
        { d: 'M640 128 L256 512 L640 896' },
        { d: 'M640 128 L256 512 L640 896' },
      ];
    case 'arrow-right':
      return [
        { d: 'M384 128 L768 512 L384 944' },
        { d: 'M384 128 L768 512 L384 944' },
      ];
    case 'arrow-bottom':
      return [
        { d: 'M128 384 L512 768 L944 384' },
        { d: 'M128 384 L512 768 L944 384' },
      ];
    case 'clock':
      return [
        { d: 'M512 192 L512 352 L512 512' },
        {
          d: [
            'M512 512',
            `L${512 + iTrigoAdjacent(128)} ${512 + iTrigoOpposite(128)}`,
            `L${512 + iTrigoAdjacent(256)} ${512 + iTrigoOpposite(256)}`,
          ].join(' '),
        },
      ];
    case 'plus':
      return [
        { d: 'M256 512 L512 512 L768 512' },
        { d: 'M512 256 L512 512 L512 768' },
      ];
    case 'minus':
      return [
        { d: 'M256 512 L512 512 L768 512' },
        { d: 'M256 512 L512 512 L768 512' },
      ];
    case 'tick':
      return [
        { d: 'M240 516 L458 710 L800 396' },
        { d: 'M240 516 L458 710 L800 396' },
      ];
    case 'cross':
      return [
        { d: 'M320 320 L512 512 L704 704' },
        { d: 'M704 320 L512 512 L320 704' },
      ];
    case 'info':
      return [{ d: 'M512 256 L512 256 L512 608' }, { d: iTrigo(512, 768, 8) }];
    default:
      return [];
  }
};
