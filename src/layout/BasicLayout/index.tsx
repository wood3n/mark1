import { useState, useEffect, useMemo } from "react";
import { useHistory, Link } from "react-router-dom";
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
	Modal,
} from "antd";
import { faSearch, faCog, faMinus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faWindowMaximize } from "@fortawesome/free-regular-svg-icons";
import ElectronEvent from "@/events";
import routes, { RouteConfig } from "@/routes";
import Audio from "@/components/Audio";
import Search from "@/components/Search";
import ButtonWithIcon from "@/components/Button";
import { useRecoilValue } from "recoil";
import { useCurrentSong, useUser } from "@/models";
import { initUserState } from "@/models/user";
import styles from "./style.less";

const { Header, Content, Footer, Sider } = Layout;

export interface BasicLayoutProps {
	sider?: boolean;
	loading?: boolean;
	backImage?: string;
}

/**
 * 基础布局
 */
const BasicLayout: React.FC<BasicLayoutProps> = ({
	sider = true,
	loading = false,
	backImage,
	children,
}) => {
	const { user, logout } = useUser();
	// const user = useRecoilValue(initUserState);
	const history = useHistory();
	const { currentSong } = useCurrentSong();
	const [collapsed, setCollapsed] = useState(true);
	const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
	const [active, setActive] = useState(false);

	/** 监听路由变化渲染menu，必须放在这里，不能用onClick事件处理，因为layout目前会重新渲染 */
	useEffect(() => {
		setSelectedKeys([history.location.pathname]);
	}, [history.location.pathname]);

	useEffect(() => {
		history.listen(() => {
			Modal.destroyAll();
		});
	}, []);

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
				<div className={styles.userAvartar} onClick={() => history.push("/user")}>
					<Avatar src={user?.avatarUrl} style={{ marginRight: 8 }} />
					<Popover content={<a onClick={logout}>退出登录</a>} title="Title">
						<Button
							type="text"
							style={{ padding: 0, color: "#ffffff" }}
							onMouseEnter={() => setActive(true)}
							onMouseLeave={() => setActive(false)}
						>
							<Space>
								<span
									style={{
										display: "inline-block",
										maxWidth: 110,
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
										verticalAlign: "middle",
									}}
								>
									{user?.nickname}
								</span>
							</Space>
						</Button>
					</Popover>
				</div>
				<Search style={{ flex: "0 1 240px" }} />
				<Space size={20}>
					<ButtonWithIcon icon={faCog} />
					<Divider
						type="vertical"
						style={{ borderLeft: "1px solid rgb(191 191 191 / 43%)" }}
					/>
					<ButtonWithIcon
						title="最小化"
						icon={faMinus}
						onClick={() => ElectronEvent.minimize()}
					/>
					<ButtonWithIcon
						title="最大化"
						icon={faWindowMaximize}
						onClick={() => ElectronEvent.minimize()}
					/>
					<ButtonWithIcon
						title="关闭"
						icon={faTimes}
						onClick={() => ElectronEvent.close()}
					/>
				</Space>
			</Header>
			<Layout hasSider className={styles.main}>
				{sider && (
					<Sider
						theme="dark"
						collapsible
						collapsedWidth={60}
						width={180}
						trigger={null}
						className={styles.side}
					>
						<Menu
							theme="dark"
							mode="inline"
							selectedKeys={selectedKeys}
							className={styles.menu}
							onClick={({ key: path }) => {
								history.push(`${path}`);
							}}
						>
							{allMenus}
						</Menu>
					</Sider>
				)}
				{backImage && (
					<div
						style={{
							position: "absolute",
							width: "100%",
							height: "calc(100vh - 130px)",
							backgroundImage: backImage ? `url(${backImage})` : "none",
							backgroundOrigin: "padding-box",
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
							backgroundPosition: "center",
							backgroundAttachment: "fixed",
							filter: "blur(6px) brightness(0.5)",
						}}
					/>
				)}
				<div
					className={styles.content}
					style={{
						marginLeft: sider ? 180 : 0,
					}}
				>
					<Spin spinning={loading}>
						<Content>{children}</Content>
					</Spin>
				</div>
			</Layout>
			<Footer
				style={{
					position: "fixed",
					bottom: 0,
					height: 64,
					width: "100vw",
					boxShadow: "0px -2px 4px -1px rgb(0 0 0 / 20%)",
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
