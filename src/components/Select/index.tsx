import { useState, useRef } from 'react';
import { Select, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './style.less';

interface Props {}

const Search: React.FC<Props> = () => {
  const [fetching, setFetching] = useState(false);

  return (
    <Select
      showSearch
      placeholder='搜索'
      filterOption={false}
      suffixIcon={<SearchOutlined style={{ color: '#282c34' }} />}
      className={styles.titleSearch}
      style={{ width: 300 }}
      notFoundContent={fetching ? <Spin size='small' /> : null}
    />
  );
};

export default Select;
