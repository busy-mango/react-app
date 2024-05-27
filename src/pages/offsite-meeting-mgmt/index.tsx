import { useRef } from 'react';
import classNames from 'classnames';

import { useQuery } from '@tanstack/react-query';
import type { VirtualItem } from '@tanstack/react-virtual';
import { useVirtualizer } from '@tanstack/react-virtual';

import { IMobilePage, MeetingCard } from '@/components';
import type { TodoModel } from '@/service';
import {
  PRODUCT_MEETING_RESOLVE_DEFINE_KEY,
  PRODUCT_MEETING_VOTE_DEFINE_KEY,
  server,
  SYSTEM_USER_TODO_LIST_API,
} from '@/service';
import { size2px, sizeOf } from '@/utils';

import styles from './index.scss';

const render = ({
  source,
  virtual,
  element,
}: {
  virtual: VirtualItem[];
  source: TodoModel[];
  element: (node: Element | null) => void;
}) =>
  virtual.map(({ key, index, start }) => (
    <div
      key={key}
      ref={element}
      className={classNames(styles.item, styles[index % 2 ? 'odd' : 'even'])}
      data-index={index}
      style={{ transform: `translateY(${start}px)` }}
    >
      <MeetingCard record={source[index]} />
    </div>
  ));

const MeetingMgmt: React.FC = () => {
  const container = useRef(null);

  const { data, isPending, isSuccess } = useQuery({
    queryKey: [SYSTEM_USER_TODO_LIST_API],
    queryFn: () =>
      server.todo.list({
        taskDefineKeyList: [
          PRODUCT_MEETING_VOTE_DEFINE_KEY,
          PRODUCT_MEETING_RESOLVE_DEFINE_KEY,
        ],
      }),
  });

  const { getTotalSize, getVirtualItems, measureElement } = useVirtualizer({
    overscan: 5,
    count: sizeOf(data),
    estimateSize: () => size2px(128),
    getScrollElement: () => container.current,
  });

  return (
    <IMobilePage isLoading={isPending}>
      <div ref={container} className={styles.container}>
        {isSuccess && (
          <div className={styles.content} style={{ height: getTotalSize() }}>
            {render({
              source: data,
              element: measureElement,
              virtual: getVirtualItems(),
            })}
          </div>
        )}
      </div>
    </IMobilePage>
  );
};

export default MeetingMgmt;
