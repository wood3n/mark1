import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useExternal, useRequest, useDebounceFn } from "ahooks";
import { Row, Col, Image, Menu, Table, Dropdown, Space, Input, Typography, Modal } from "antd";
import { Star, More, Search } from "@icon-park/react";
import { ColumnsType } from "antd/es/table";
import InfiniteScroll from "react-infinite-scroller";
import { getCollectArtists, getArtistDetail, getArtistDesc } from "@/services";
import { Layout } from "@/layout";
import ArtistDetail from "./Detail";
import styles from "./style.less";

/**
 * 收藏的歌手列表
 */
const CollectArtists: React.FunctionComponent = () => {
	const history = useHistory();
	const [memoArtists, setMemoArtists] = useState<API.Artist[]>();
	const [artists, setArtists] = useState<API.Artist[]>();
	const [currentArtist, setCurrentArtist] = useState<API.Artist>();
	const [infoModalVisible, setInfoModalVisible] = useState(false);

	const { run: reqCollectArtists, loading } = useRequest(getCollectArtists, {
		manual: true,
		onSuccess: ({ data }) => {
			setArtists(data);
			setMemoArtists(data);
		},
	});

	useEffect(() => {
		reqCollectArtists();
	}, []);

	const { run: handleSearch } = useDebounceFn((e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e?.target?.value?.trim();
		if (input !== "") {
			setArtists(memoArtists?.filter((v) => v.name.toLocaleLowerCase().includes(input)));
		} else {
			setArtists(memoArtists);
		}
	});

	const columns: ColumnsType<API.Artist> = [
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
					<a
						onClick={() => {
							setCurrentArtist(record);
							setInfoModalVisible(true);
						}}
					>
						{record.name}
					</a>
				</Space>
			),
		},
		{
			dataIndex: "albumSize",
			align: "center",
			render: (_, record) => <span>专辑：{record.albumSize}</span>,
		},
		{
			dataIndex: "mvSize",
			align: "center",
			render: (_, record) => <span>MV：{record.mvSize}</span>,
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
									<a>播放全部歌曲</a>
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
							收藏歌手
							{memoArtists?.length && (
								<Typography.Text type="secondary">
									({memoArtists?.length})
								</Typography.Text>
							)}
						</Typography.Title>
						<Input
							placeholder="搜索"
							size="small"
							style={{
								flex: "0 1 200px",
								border: "1px solid rgb(191 191 191 / 26%)",
							}}
							onChange={handleSearch}
						/>
					</div>
				)}
				rowClassName={() => styles.tableRow}
				showHeader={false}
				rowKey="id"
				bordered={false}
				columns={columns}
				dataSource={artists}
				pagination={false}
			/>
			<ArtistDetail
				visible={infoModalVisible}
				onClose={() => setInfoModalVisible(false)}
				artist={currentArtist}
			/>
		</Layout>
	);
};

export default CollectArtists;
