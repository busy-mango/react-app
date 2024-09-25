import type { SVGMotionProps, Target } from 'framer-motion';
import { motion } from 'framer-motion';

export interface ISpinnerProps extends SVGMotionProps<SVGSVGElement> {
  animate?: Target;
}

export const ISpinner: React.FC<ISpinnerProps> = ({
  style,
  animate,
  className,
  ...others
}) => (
  <motion.svg
    layout
    animate={{
      rotate: [0, 180, 360],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: 'linear',
      },
    }}
    className={className}
    exit={{ x: 0, y: 0 }}
    height="1em"
    initial={{ x: 0, y: 0 }}
    stroke="currentColor"
    style={{ lineHeight: '1em', ...style }}
    viewBox={'22 22 44 44'}
    width="1em"
    {...others}
  >
    <motion.circle
      animate={{
        strokeDasharray: ['1px, 200px', '100px, 200px', '100px, 200px'],
        strokeDashoffset: ['0px', '-15px', '-125px'],
        transition: {
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      cx={44}
      cy={44}
      fill={'none'}
      initial={{
        strokeDasharray: '1px, 200px',
        strokeDashoffset: '0px',
      }}
      r={18}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={6.4}
    />
  </motion.svg>
);
