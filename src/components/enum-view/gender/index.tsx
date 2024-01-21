/**
 * @description 性别枚举UI
 */

import { Fragment } from 'react';

import { Gender } from '@/constants/enums';
import Female from '@/icons/female.svg';
import Male from '@/icons/male.svg';

import styles from './index.scss';

export const GenderMale: React.FC = () => <Male className={styles.male} />;

export const GenderFemale: React.FC = () => (
  <Female className={styles.female} />
);

export const GenderView: React.FC<{
  value?: Gender;
}> = ({ value }) => (
  <Fragment>
    {value === Gender.Male && <GenderMale />}
    {value === Gender.Female && <GenderFemale />}
  </Fragment>
);
