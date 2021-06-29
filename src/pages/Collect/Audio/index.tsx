import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useExternal, useRequest, useDebounceFn } from "ahooks";
import { Row, Col, Image, Menu, Table, Card, Space, Tag, Typography, Dropdown } from "antd";
import { Star, More, Search } from "@icon-park/react";
import { ColumnsType } from "antd/es/table";
import InfiniteScroll from "react-infinite-scroller";
import { getCollectAudios, getArtistDetail, getArtistDesc } from "@/services";
import { Layout } from "@/layout";
import styles from "./style.less";

/**
 * 关注的电台
 */
const CollectAudio: React.FunctionComponent = () => {
	const [djRadios, setDjRadios] = useState<API.Audio[]>();

	const { run: reqCollectAudios, loading } = useRequest(getCollectAudios, {
		manual: true,
		onSuccess: ({ djRadios }) => {
			setDjRadios(djRadios);
		},
	});

	useEffect(() => {
		reqCollectAudios();
	}, []);

	const columns: ColumnsType<API.Audio> = [
		{
			dataIndex: "pic",
			render: (_, record) => (
				<Space>
					<Image
						placeholder
						preview={false}
						alt={record?.name}
						src={record?.picUrl}
						width={100}
						height={100}
					/>
					<span>{record.name}</span>
				</Space>
			),
		},
		{
			dataIndex: "dj",
			align: "center",
			render: (_, record) => <a>{record?.dj?.nickname}</a>,
		},
		{
			dataIndex: "programCount",
			align: "center",
		},
		{
			dataIndex: "category",
			align: "center",
			render: (text) => <Tag color="#4090EB">{text}</Tag>,
		},
		{
			dataIndex: "operation",
			align: "center",
			render: (_, record) => (
				<Space>
					<Star theme="outline" size="20" strokeLinecap="square" />
					<Dropdown
						overlay={
							<Menu>
								<Menu.Item>
									<a>播放全部</a>
								</Menu.Item>
								<Menu.Item>
									<a>播放最近更新</a>
								</Menu.Item>
							</Menu>
						}
					>
						<a>
							<More theme="filled" size="20" strokeLinecap="square" />
						</a>
					</Dropdown>
				</Space>
			),
		},
	];

	return (
		<Layout loading={loading}>
			<Table
				title={() => (
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<Typography.Title level={4}>
							订阅电台
							{djRadios?.length && (
								<Typography.Text type="secondary">
									({djRadios?.length})
								</Typography.Text>
							)}
						</Typography.Title>
					</div>
				)}
				rowClassName={() => styles.tableRow}
				showHeader={false}
				rowKey="id"
				bordered={false}
				columns={columns}
				dataSource={djRadios}
				pagination={false}
			/>
		</Layout>
	);
};

export default CollectAudio;
