import { Fragment } from 'react/jsx-runtime';

import {
  IButton,
  ICollapseGroup,
  IFlex,
  IFormWrap,
  IMobilePage,
} from '@/components';

import DocumentationSVG from '@/icons/business/documentation.svg';
import InformationSVG from '@/icons/business/information.svg';
import StructureSVG from '@/icons/business/structure.svg';

import {
  ProductMeetingDocumentation,
  ProductMeetingInfo,
  ProductMeetingProductMgmt,
} from './widgets';

import styles from './index.scss';

const items = [
  {
    name: 'info',
    title: (
      <Fragment>
        <InformationSVG className={styles.icon} />
        会议信息
      </Fragment>
    ),
    children: <ProductMeetingInfo />,
  },
  {
    name: 'documentation',
    title: (
      <Fragment>
        <DocumentationSVG className={styles.icon} />
        上会项目材料
      </Fragment>
    ),
    children: <ProductMeetingDocumentation />,
  },
  {
    name: 'productList',
    title: (
      <Fragment>
        <StructureSVG className={styles.icon} />
        产品信息
      </Fragment>
    ),
    children: <ProductMeetingProductMgmt />,
  },
];

const IOffsiteMeetingVotePage: React.FC = () => (
  <IMobilePage>
    <IFormWrap className={styles.form}>
      <ICollapseGroup
        defaultValue={['info', 'documentation', 'productList']}
        items={items}
      />
    </IFormWrap>
    <IFlex className="sticky-shadow-wrap">
      <IButton isFullWidth size="huge" variant="text">
        暂存
      </IButton>
      <IButton isFullWidth size="huge" variant="filled">
        提交
      </IButton>
    </IFlex>
  </IMobilePage>
);

export default IOffsiteMeetingVotePage;
