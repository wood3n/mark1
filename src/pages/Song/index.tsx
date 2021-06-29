import { useState } from "react";
import { Space, Row, Col, Image, Anchor, Typography } from "antd";
import { Layout, SimpleLayout } from "@/layout";
import styles from "./style.less";

const { Link } = Anchor;
/**
 * 播放界面
 */
const PlayingSong: React.FC = () => {
	return (
		<Layout
			sider={false}
			backImage="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
		>
			<Row justify="center" align="middle" style={{ height: "100%" }}>
				<Col span={12}>
					<Row justify="center" align="middle">
						<Image
							preview={false}
							src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
							width={300}
							style={{
								borderRadius: "50%",
							}}
						/>
					</Row>
				</Col>
				<Col span={12}>
					<Row justify="center" align="middle">
						<Space direction="vertical">
							<Space
								direction="vertical"
								style={{ width: "100%", textAlign: "center" }}
							>
								<Typography.Title level={4}>歌名</Typography.Title>
								<Typography.Title level={5}>歌手 - 专辑</Typography.Title>
							</Space>
							<Space direction="vertical" align="center" className={styles.lyrics}>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>
									xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
								</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>
									xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
								</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
								<Typography.Text>xxxxxxxxxxxxxxxxxxxxx</Typography.Text>
							</Space>
						</Space>
					</Row>
				</Col>
			</Row>
		</Layout>
	);
};

export default PlayingSong;
