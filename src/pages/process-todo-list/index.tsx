import { AnimatePresence } from 'framer-motion';

import { useQuery } from '@tanstack/react-query';

import { IMobilePage } from '@/components';
import {
  PRODUCT_MEETING_RESOLVE_DEFINE_KEY,
  PRODUCT_MEETING_VOTE_DEFINE_KEY,
  SYSTEM_USER_TODO_LIST_API,
} from '@/constants';
import { server } from '@/service';

import { ProcessTodoCard } from './widgets';

const ProcessTodoList = () => {
  const { data } = useQuery({
    queryKey: [SYSTEM_USER_TODO_LIST_API],
    queryFn: () =>
      server.todo.list({
        taskDefineKeyList: [
          PRODUCT_MEETING_VOTE_DEFINE_KEY,
          PRODUCT_MEETING_RESOLVE_DEFINE_KEY,
        ],
      }),
  });

  return (
    <AnimatePresence>
      {data?.map((item) => <ProcessTodoCard key={item.id} record={item} />)}
    </AnimatePresence>
  );
};

const ProcessTodoListPage: React.FC = () => (
  <IMobilePage>
    <ProcessTodoList />
  </IMobilePage>
);

export default ProcessTodoListPage;
