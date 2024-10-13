import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

import { DateFormatEn } from '@/constants';

export type MemberModel = {
  id: string;
  name: string;
};

export type EmailModel = {
  id: string;
  sender: MemberModel;
  sendeTime: string;
  // recipient: MemberModel;
  content: string;
};

export const emails: EmailModel[] = [
  {
    id: nanoid(),
    sender: {
      id: nanoid(),
      name: 'William Smith',
    },
    sendeTime: dayjs('Oct 22, 2023, 9:00:00 AM').format(
      DateFormatEn.DateMinTight
    ),
    content: [
      `Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.`,
      `Please come prepared with any questions or insights you may have. Looking forward to our meeting!`,
      `Best regards, William`,
    ].join('\n'),
  },
];
