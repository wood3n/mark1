import { useState, useEffect, useMemo } from 'react';
import {
  Layout,
  Menu,
  Avatar,
  Input,
  Button,
  Space,
  Popover,
  Divider,
  message,
  BackTop,
  Spin,
} from 'antd';
import { faSearch, faCog, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faWindowMaximize } from '@fortawesome/free-regular-svg-icons';
import ElectronEvent from '@/events';
import routes, { RouteConfig } from '@/routes';
import Audio from '@/components/Audio';
import ButtonWithIcon from '@/components/Button';
import { useRecoilValue } from 'recoil';
import { useCurrentSong, useUser } from '@/models';
import { initUser } from '@/models/user';
import styles from './style.less';

const { Header, Content, Footer, Sider } = Layout;

/**
 * 基础布局
 */
const BasicLayout: React.FC = ({ children }) => {
  // const { user } = useUser();
  const user = useRecoilValue(initUser);
  const { currentSong } = useCurrentSong();
  const [collapsed, setCollapsed] = useState(true);
  const [active, setActive] = useState(false);

  console.log('currentSong>>>>>>>>', currentSong);

  // 渲染Menu
  const renderMenu = (menus: RouteConfig[]) => {
    return menus.map((m) => {
      if (m.children) {
        return (
          <Menu.ItemGroup key={m.title} title={m.title}>
            {renderMenu(m.children)}
          </Menu.ItemGroup>
        );
      }

      return (
        <Menu.Item key={m.path} icon={m.icon}>
          {m.title}
        </Menu.Item>
      );
    });
  };

  const allMenus = useMemo(() => {
    const filter = (routeConfigs: RouteConfig[] = routes): RouteConfig[] => {
      return routeConfigs.reduce<RouteConfig[]>((result, route) => {
        if (route.title) {
          return route.children
            ? [
                ...result,
                {
                  ...route,
                  children: filter(route.children),
                },
              ]
            : [...result, route];
        }

        return result;
      }, []);
    };

    const results = filter(routes);
    return renderMenu(results);
  }, [routes]);

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.userAvartar}>
          <Avatar src={user.avatarUrl} style={{ marginRight: 8 }} />
          <Popover content='测试' title='Title'>
            <Button
              type='text'
              style={{ padding: 0, color: '#ffffff' }}
              onMouseEnter={() => setActive(true)}
              onMouseLeave={() => setActive(false)}
            >
              <Space>
                <span
                  style={{
                    display: 'inline-block',
                    maxWidth: 110,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    verticalAlign: 'middle',
                  }}
                >
                  {user.nickname}
                </span>
              </Space>
            </Button>
          </Popover>
        </div>
        <Space size={20}>
          <ButtonWithIcon title='搜索' icon={faSearch} />
          <ButtonWithIcon title='设置' icon={faCog} />
          <Divider type='vertical' style={{ borderLeft: '1px solid rgb(191 191 191 / 43%)' }} />
          <ButtonWithIcon title='最小化' icon={faMinus} onClick={() => ElectronEvent.minimize()} />
          <ButtonWithIcon
            title='最大化'
            icon={faWindowMaximize}
            onClick={() => ElectronEvent.minimize()}
          />
          <ButtonWithIcon title='关闭' icon={faTimes} onClick={() => ElectronEvent.close()} />
        </Space>
      </Header>
      <Layout hasSider className={styles.main}>
        <Sider
          theme='dark'
          collapsible
          collapsedWidth={60}
          width={180}
          trigger={null}
          className={styles.side}
        >
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={['/recommend']}
            className={styles.menu}
          >
            {allMenus}
          </Menu>
        </Sider>
        <Content className={styles.content}>{children}</Content>
      </Layout>
      <Footer
        style={{
          position: 'fixed',
          bottom: 0,
          height: 64,
          width: '100vw',
          boxShadow: '0px -2px 4px -1px rgb(0 0 0 / 20%)',
          padding: 0,
        }}
      >
        <Audio song={currentSong} />
      </Footer>
      <BackTop />
    </Layout>
  );
};

export default BasicLayout;
