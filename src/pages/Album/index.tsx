import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useExternal, useRequest, useDebounceFn } from "ahooks";
import { Row, Col, Image, Menu, Table, Dropdown, Space, Input, Typography, Modal } from "antd";
import { Star, More, Search } from "@icon-park/react";
import { ColumnsType } from "antd/es/table";
import InfiniteScroll from "react-infinite-scroller";
import { getCollectAlbums, getAlbumDetail, getArtistDesc } from "@/services";
import { Layout } from "@/layout";
import styles from "./style.less";

interface AlbumList {
	artist: string;
	albums?: API.Album[];
}

/**
 * 收藏专辑列表
 */
const AlbumList: React.FC = () => {
	const history = useHistory();
	const [memoAlbums, setMemoAlbums] = useState<API.Album[]>();
	const [albums, setAlbums] = useState<AlbumList[]>();
	const memoAlbumList = useRef<AlbumList[]>();
	const [currentAlbum, setCurrentAlbum] = useState<API.Album>();

	// 根据歌手筛选专辑
	const filterByArtist = (data?: API.Album[]) => {
		const allArtists = data?.reduce<string[]>((result, item) => {
			item?.artists?.forEach((art) => {
				if (!result?.includes(art.name)) {
					result.push(art.name);
				}
			});

			return result;
		}, []);
		return allArtists?.map((artist) => {
			return {
				artist,
				albums: data?.filter((item) => item.artists?.some((v) => v.name === artist)),
			};
		});
	};

	const { run: reqCollectArtists, loading } = useRequest(getCollectAlbums, {
		manual: true,
		onSuccess: ({ data }) => {
			const albumList = filterByArtist(data);
			setAlbums(albumList);
			memoAlbumList.current = albumList;
			setMemoAlbums(data);
		},
	});

	useEffect(() => {
		reqCollectArtists();
	}, []);

	const { run: handleSearch } = useDebounceFn((e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e?.target?.value?.trim();
		if (input !== "") {
			setAlbums(
				memoAlbumList.current?.filter(
					(data) =>
						data?.artist?.toLocaleLowerCase().includes(input) ||
						data?.albums?.some((v) => v?.name?.toLocaleLowerCase().includes(input))
				)
			);
		} else {
			setAlbums(memoAlbumList.current);
		}
	});

	const columns: ColumnsType<API.Album> = [
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
							history.push(`/album/${record?.id}`);
						}}
					>
						{record.name}
					</a>
				</Space>
			),
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
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<Typography.Title level={4}>
					收藏专辑
					{memoAlbums?.length && (
						<Typography.Text type="secondary">({memoAlbums?.length})</Typography.Text>
					)}
				</Typography.Title>
				<Input
					placeholder="歌手/专辑名称"
					size="small"
					style={{
						flex: "0 1 200px",
						border: "1px solid rgb(191 191 191 / 26%)",
					}}
					onChange={handleSearch}
				/>
			</div>
			{albums?.map((item) => (
				<Table
					title={() => (
						<Typography.Title level={5}>
							{item.artist}
							{albums?.length && (
								<Typography.Text type="secondary">
									({item?.albums?.length})
								</Typography.Text>
							)}
						</Typography.Title>
					)}
					rowClassName={() => styles.tableRow}
					showHeader={false}
					rowKey="id"
					bordered={false}
					columns={columns}
					dataSource={item.albums}
					pagination={false}
				/>
			))}
		</Layout>
	);
};

export default AlbumList;
