import { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useExternal, useRequest, useDebounceFn } from "ahooks";
import { Row, Col, Image, Menu, Table, Dropdown, Space, Input, Typography, Modal } from "antd";
import { Star, More, Search } from "@icon-park/react";
import { ColumnsType } from "antd/es/table";
import InfiniteScroll from "react-infinite-scroller";
import { getCollectAlbums, getAlbumDetail, getArtistDesc } from "@/services";
import { Layout } from "@/layout";
import dayjs from "dayjs";

interface Props {
	albumId?: number;
}

/**
 * 专辑详情页面
 */
const AlbumDetail: React.FC = () => {
	const { id }: { id: number } = useParams<any>();
	const [descriptionVisible, setDescriptionVisible] = useState(false);
	// 获取专辑内容
	const {
		loading,
		data: albumDetail,
		run: reqAlbumDetail,
	} = useRequest(getAlbumDetail, {
		manual: true,
	});

	useEffect(() => {
		if (id) {
			reqAlbumDetail({ id });
		}
	}, [id]);

	const columns: ColumnsType<API.Song> = [
		{
			dataIndex: "name",
		},
		{
			dataIndex: "artist",
			render: (_, record) => <Space split="/">{record?.ar?.map((v) => v.name)}</Space>,
		},
		{
			dataIndex: "time",
			render: (_, record) => dayjs(record?.dt).format("mm:ss"),
		},
		{
			dataIndex: "operation",
			align: "right",
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
			<Row gutter={24}>
				<Col span={18}>
					<Space direction="vertical" size={16}>
						<Typography.Title level={2}>{albumDetail?.album?.name}</Typography.Title>
						<span>
							歌手：
							<Space split="/">
								{albumDetail?.album?.artists?.map((v) => v.name)}
							</Space>
						</span>
						{albumDetail?.album?.publishTime && (
							<span>
								发行时间：
								{dayjs(albumDetail?.album?.publishTime).format("YYYY-MM-DD")}
							</span>
						)}
						{albumDetail?.album?.description && (
							<Typography.Paragraph
								ellipsis={{
									rows: 2,
									expandable: false,
									// @ts-expect-error
									suffix: (
										<a
											onClick={() => {
												setDescriptionVisible(true);
											}}
										>
											更多
										</a>
									),
								}}
							>
								{albumDetail?.album?.description}
							</Typography.Paragraph>
						)}
					</Space>
				</Col>
				<Col span={6}>
					<Image
						placeholder
						preview={false}
						alt={albumDetail?.album?.name}
						src={albumDetail?.album?.picUrl}
					/>
				</Col>
			</Row>
			<Table
				showHeader={false}
				rowKey="id"
				bordered={false}
				columns={columns}
				dataSource={albumDetail?.songs}
				pagination={false}
				size="small"
			/>
			<Modal
				title={`${albumDetail?.album?.name} 简介`}
				visible={descriptionVisible}
				onCancel={() => setDescriptionVisible(false)}
				destroyOnClose
				footer={null}
				width={800}
				bodyStyle={{
					height: 500,
					overflow: "auto",
					// 自动换行显示
					whiteSpace: "break-spaces",
				}}
			>
				{albumDetail?.album?.description}
			</Modal>
		</Layout>
	);
};

export default AlbumDetail;
