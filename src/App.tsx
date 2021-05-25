import React, { useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { getLoginStatus, getUserDetail } from '@/services';
import { HttpCode } from '@/constants';
import { ConfigProvider, message, Spin } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { flattenDeep } from 'lodash-es';
import { RecoilRoot } from 'recoil';
import routes from './routes';
import ElectronEvent from './events';
import './App.less';

function App() {
  useEffect(() => {
    ElectronEvent.openWindow();
  }, []);

  // 拍平routes
  const allRoutes = useMemo(() => {
    return flattenDeep(routes).filter((r) => r.path && r.component);
  }, [routes]);

  return (
    <ConfigProvider locale={zhCN}>
      <RecoilRoot>
        <Router>
          <React.Suspense
            fallback={
              <Spin>
                <div style={{ height: '100vh', width: '100vw' }}></div>
              </Spin>
            }
          >
            <Switch>
              {allRoutes.map(({ path, exact, component: Component }) => (
                <Route
                  key={path}
                  exact={exact}
                  path={path}
                  render={(...args) => {
                    // @ts-expect-error
                    return <Component {...args} />;
                  }}
                />
              ))}
            </Switch>
          </React.Suspense>
        </Router>
      </RecoilRoot>
    </ConfigProvider>
  );
}

export default App;
