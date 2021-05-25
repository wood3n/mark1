import { Space, Typography } from 'antd';
import { EllipsisConfig } from 'antd/lib/typography/Base';
import styles from './style.less';

interface Props {
  icon?: React.ReactNode;
  ellipsis?: EllipsisConfig;
  width?: number;
  onClick?: () => void;
  textStyle?: React.CSSProperties;
}

const Link: React.FC<Props> = ({ icon, ellipsis, width, onClick, textStyle, children }) => {
  return (
    <div className={styles.link} onClick={onClick}>
      <div style={{ display: 'flex', rowGap: 8 }}>
        {icon}
        <Typography.Paragraph
          className={styles.text}
          ellipsis={{
            rows: 1,
            ...ellipsis,
          }}
          style={{
            maxWidth: width,
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: 14,
            color: '#979797',
            ...textStyle,
          }}
        >
          {children}
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default Link;
