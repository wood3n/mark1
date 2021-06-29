import { Layout, Space } from "antd";
import ButtonWithIcon from "@/components/Button";
import { faMinus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faWindowMaximize } from "@fortawesome/free-regular-svg-icons";
import ElectronEvent from "@/events";
import styles from "./style.less";

const { Header, Content } = Layout;

/**
 * 简单布局，只带有顶部操控窗口的按钮
 */
const SimpleLayout: React.FC = (props) => {
	return (
		<Layout className={styles.simpleLayout}>
			<Header className={styles.header}>
				<Space>
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
			<Content className={styles.content}>{props.children}</Content>
		</Layout>
	);
};

export default SimpleLayout;
