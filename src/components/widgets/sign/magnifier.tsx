import { Fragment, memo } from 'react';
import { motion } from 'framer-motion';

import {
  iCirclePath,
  iTrigonAdjacent,
  iTrigonOpposite,
  transition,
} from './helpers';

const circle = [iCirclePath(512, 512, 0), iCirclePath(512, 512, 272)];

const handle = [
  [
    `M${512 + iTrigonAdjacent(288, 45)} ${512 + iTrigonOpposite(288, 45)}`,
    `L${512 + iTrigonAdjacent(288, 45)} ${512 + iTrigonOpposite(288, 45)}`,
    `L${512 + iTrigonAdjacent(288, 45)} ${512 + iTrigonOpposite(288, 45)}`,
  ].join(' '),
  [
    `M${512 + iTrigonAdjacent(288, 45)} ${512 + iTrigonOpposite(288, 45)}`,
    `L${512 + iTrigonAdjacent(352, 45)} ${512 + iTrigonOpposite(352, 45)}`,
    `L${512 + iTrigonAdjacent(408, 45)} ${512 + iTrigonOpposite(408, 45)}`,
  ].join(' '),
];

const MagnifierPath: React.FC = () => (
  <Fragment>
    <motion.path
      animate={{ d: circle[1] }}
      exit={{ d: circle[0] }}
      initial={{ d: circle[0] }}
      transition={transition}
    />
    <motion.path
      animate={{ d: handle[1] }}
      exit={{ d: handle[0] }}
      initial={{ d: handle[0] }}
      transition={transition}
    />
  </Fragment>
);

export const IMagnifierPath = memo(MagnifierPath, (_prev, _next) => true);
