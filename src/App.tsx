import React, { useEffect, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useRequest } from "ahooks";
import { getLoginStatus, getUserDetail } from "@/services";
import { HttpCode } from "@/constants";
import { ConfigProvider, message, Spin, Modal } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import { flattenDeep } from "lodash-es";
import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "@/layout";
import routes, { RouteConfig } from "./routes";
import ElectronEvent from "./events";
import "./App.less";

function App() {
	useEffect(() => {
		ElectronEvent.openWindow();
	}, []);

	// 拍平routes
	const allRoutes = useMemo(() => {
		const flatDeep = (_routes: RouteConfig[] = routes): RouteConfig[] => {
			return _routes.reduce<RouteConfig[]>((result, route) => {
				if (route.children) {
					return [...result, ...flatDeep(route.children)];
				}

				if (route.component && route.path) {
					return [...result, route];
				}

				return result;
			}, []);
		};
		return flatDeep();
	}, [routes]);

	return (
		<ConfigProvider locale={zhCN}>
			<RecoilRoot>
				<React.Suspense
					fallback={
						<Spin>
							<div style={{ height: "100vh", width: "100vw" }}></div>
						</Spin>
					}
				>
					<Router>
						<ErrorBoundary>
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
						</ErrorBoundary>
					</Router>
				</React.Suspense>
			</RecoilRoot>
		</ConfigProvider>
	);
}

export default App;
