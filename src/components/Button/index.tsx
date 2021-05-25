import { message, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import styles from './style.less';

interface Props {
  icon: IconProp;
  title: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/**
 * IconButton组件
 */
const ButtonWithIcon: React.FC<Props> = ({ icon, title, onClick, style }) => {
  return (
    <Tooltip title={title}>
      <div className={styles.iconBtn} onClick={onClick} style={style}>
        <FontAwesomeIcon icon={icon} />
      </div>
    </Tooltip>
  );
};

export default ButtonWithIcon;
