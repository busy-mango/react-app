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
  title: string;
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
    title: 'Meeting Tomorrow',
    content: [
      `Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.`,
      `Please come prepared with any questions or insights you may have. Looking forward to our meeting!`,
      `Best regards, William`,
    ].join('\n'),
  },
  {
    id: nanoid(),
    sender: {
      id: nanoid(),
      name: 'Alice Smith',
    },
    sendeTime: dayjs('Oct 22, 2023, 10:30:00 AM').format(
      DateFormatEn.DateMinTight
    ),
    title: 'Re: Project Update',
    content: [
      `Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.`,
      `I have a few minor suggestions that I'll include in the attached document.`,
      `Let's discuss these during our next meeting. Keep up the excellent work!`,
      'Best regards, Alice',
    ].join('\n'),
  },
  {
    id: nanoid(),
    sender: {
      id: nanoid(),
      name: 'Bob Johnson',
    },
    sendeTime: 'Apr 10, 2023, 11:45:00 AM',
    title: 'Weekend Plans',
    content: [
      `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun.`,
      `If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature.`,
      `Looking forward to your response!`,
      'Best, Bob',
    ].join('\n'),
  },
];
