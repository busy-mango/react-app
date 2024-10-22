import classNames from 'classnames';

import type { ITypographyProps } from './models';

import * as styles from './index.scss';

export const ITypography: React.FC<ITypographyProps> = (props) => {
  const {
    variant = 'inherit',
    color,
    align: textAlign,
    className,
    style,
    ...others
  } = props;

  const iStyle: React.CSSProperties = { textAlign, ...style };

  const iClassName = classNames(styles[variant], className);

  switch (variant) {
    case 'h1':
      return <h1 className={iClassName} style={iStyle} {...others} />;
    case 'h2':
      return <h2 className={iClassName} style={iStyle} {...others} />;
    case 'h3':
      return <h3 className={iClassName} style={iStyle} {...others} />;
    case 'h4':
      return <h4 className={iClassName} style={iStyle} {...others} />;
    case 'h5':
      return <h5 className={iClassName} style={iStyle} {...others} />;
    case 'h6':
      return <h6 className={iClassName} style={iStyle} {...others} />;
    case 'body':
      return <p className={iClassName} style={iStyle} {...others} />;
    case 'inherit':
      return <p className={iClassName} style={iStyle} {...others} />;
    case 'subtitle':
      return <h6 className={iClassName} style={iStyle} {...others} />;
    default:
      break;
  }
};
