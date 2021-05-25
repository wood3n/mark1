import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Typography } from 'antd';

interface Props {
  width?: number;
  color?: string;
  type?: 'secondary' | 'success' | 'warning' | 'danger';
}

const Text: React.FC<Props> = ({ type, width, color, children }) => {
  return (
    <Typography.Paragraph
      type={type}
      ellipsis={{
        rows: 1,
      }}
      style={{
        maxWidth: width,
        margin: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color,
      }}
    >
      {children}
    </Typography.Paragraph>
  );
};

export default Text;
