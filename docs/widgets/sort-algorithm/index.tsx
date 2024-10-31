import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { nanoid } from 'nanoid';

import { shuffle } from '@busymango/utils';

import { IButton, ICard, IFlex } from '@/components';
import { useToggle } from '@/hooks';

type NodeModel = {
  id: string;
  val: number;
};

const source = shuffle(
  Array.from({ length: 20 }, (_, i) => ({
    val: i + 1,
    id: nanoid(),
  }))
);

export const SortAlgorithm: React.FC<{
  title: React.ReactNode;
  reset: (data: NodeModel[]) => Generator<NodeModel[], unknown, unknown>;
}> = ({ title, reset: iReset }) => {
  const sorter = useRef(iReset(structuredClone(source)));

  const [count, setCount] = useState(0);

  const [done, { on, off }] = useToggle();

  const [data, setData] = useState(source);

  const reset = () => {
    off();
    setCount(0);
    setData(source);
    sorter.current = iReset(structuredClone(source));
  };

  const next = () => {
    setCount((pre) => pre + 1);
    const step = sorter.current.next();
    if (!step.done) setData(step.value);
    step.done && on();
  };

  return (
    <ICard
      extra={`第${count}步`}
      footer={
        <IFlex gap={8} justify="flex-end">
          <IButton onClick={reset}>重置</IButton>
          <IButton disabled={done} variant="filled" onClick={next}>
            下一步
          </IButton>
        </IFlex>
      }
      style={{ width: 'max-content' }}
      title={title}
    >
      <IFlex align="flex-end" gap={8} style={{ padding: 'var(--gap-04)' }}>
        {data?.map((item) => (
          <motion.div
            key={item.id}
            layout
            style={{
              width: '1.5em',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              height: `${0.5 * item.val + 1}em`,
              borderRadius: 'var(--border-radius-03)',
              backgroundColor: 'var(--bg-color-float)',
            }}
          >
            {item.val}
          </motion.div>
        ))}
      </IFlex>
    </ICard>
  );
};
