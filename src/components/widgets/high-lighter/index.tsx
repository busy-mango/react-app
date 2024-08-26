import { Fragment, useMemo } from 'react';

import { iLCSubSeq, iLCSubStr } from '@/utils';

import styles from './index.scss';

interface LighterProps {
  /** 目标文本 */
  content: string;
  /** 需要高亮的关键字 */
  keyword: string;
  /** 关键字比对方法（判断字符是否需要高亮） */
  compare: typeof Object.is;
  /** 高亮渲染方式 */
  render: (word: string) => React.ReactNode;
}

const iRender: LighterProps['render'] = (text) => (
  <b className={styles.lighter}>{text}</b>
);

const StrLighter: React.FC<LighterProps> = (props) => {
  const { content, keyword, compare, render } = props;

  const word = useMemo(
    () => iLCSubStr(content, keyword, compare),
    [content, keyword, compare]
  );

  return content.split(word).map((text, index) => (
    <Fragment key={index}>
      {index !== 0 && render(word)}
      {text}
    </Fragment>
  ));
};

const SeqLighter: React.FC<LighterProps> = (props) => {
  const { content, keyword, compare, render } = props;

  const indices = useMemo(
    () => iLCSubSeq(content, keyword, compare),
    [content, keyword, compare]
  );

  const { node } = useMemo(
    () =>
      Array.from(content).reduce<{
        node: React.ReactNode[];
        idxs: number;
      }>(
        ({ node, idxs }, word, index) => {
          const normal = <Fragment key={index}>{word}</Fragment>;
          const marked = <Fragment key={index}>{render(word)}</Fragment>;
          if (index === indices[idxs][0]) {
            return { node: node.concat([marked]), idxs: idxs + 1 };
          } else if (word === keyword[indices[idxs][1]]) {
            return { node: node.concat([marked]), idxs };
          } else {
            return { node: node.concat([normal]), idxs };
          }
        },
        { node: [], idxs: 0 }
      ),
    [content, indices, keyword, render]
  );

  return node;
};

export interface IHighLighterProps extends Partial<LighterProps> {
  /** 比对算法: `str`最长公共子串; `seq`最长公共子序列 */
  mode?: 'str' | 'seq';
}

export const IHighLighter: React.FC<IHighLighterProps> = ({
  content,
  keyword,
  mode = 'str',
  render = iRender,
  compare = Object.is,
}) => (
  <Fragment>
    {!(content && keyword) && content}
    {content && keyword && (
      <Fragment>
        {mode === 'str' && (
          <StrLighter
            compare={compare}
            content={content}
            keyword={keyword}
            render={render}
          />
        )}
        {mode === 'seq' && (
          <SeqLighter
            compare={compare}
            content={content}
            keyword={keyword}
            render={render}
          />
        )}
      </Fragment>
    )}
  </Fragment>
);
