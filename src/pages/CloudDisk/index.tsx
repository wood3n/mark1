import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useExternal, useRequest, useDebounceFn } from "ahooks";
import dayjs from "dayjs";
import {
	Row,
	Col,
	Image,
	Menu,
	Table,
	Dropdown,
	Space,
	Input,
	Typography,
	Modal,
	Progress,
	Button,
	Upload,
} from "antd";
import { AddMusic, UploadOne } from "@icon-park/react";
import { last } from "lodash-es";
import { Star, More, Search } from "@icon-park/react";
import { ColumnsType } from "antd/es/table";
import InfiniteScroll from "react-infinite-scroller";
import { getCloudDisk, getArtistDetail, getArtistDesc } from "@/services";
import { Layout } from "@/layout";
import { byte2Gb, toPercent } from "@/utils";
import styles from "./style.less";

/**
 * 云盘
 */
const CloudDisk: React.FunctionComponent = () => {
	const [disk, setDisk] = useState<API.NeteaseCloud>();

	const { run: reqCloudDisk, loading } = useRequest(getCloudDisk, {
		manual: true,
		onSuccess: (data) => {
			console.log(data);
			setDisk(data);
		},
	});

	useEffect(() => {
		reqCloudDisk({ pageSize: 50, pageNumber: 1 });
	}, []);

	const columns: ColumnsType<API.CloudFile> = [
		{
			dataIndex: "pic",
			render: (_, record) => (
				<Space>
					<Image
						placeholder
						preview={false}
						alt={record?.simpleSong?.al?.name}
						src={record?.simpleSong?.al?.picUrl}
						width={100}
						height={100}
					/>
					<Typography.Text
						ellipsis={{
							tooltip: record.fileName,
						}}
						style={{ maxWidth: 80 }}
						onClick={() => {}}
					>
						{record.fileName?.split(".")?.[0]}
					</Typography.Text>
				</Space>
			),
		},
		{
			dataIndex: "extension",
			// TODO: 这里做成按拓展名筛选的
			render: (_, record) => (
				<Typography.Text
					ellipsis={{
						tooltip: record.fileName,
					}}
					style={{ maxWidth: 80 }}
					onClick={() => {}}
				>
					{last(record.fileName?.split("."))}
				</Typography.Text>
			),
		},
		{
			dataIndex: "artist",
			align: "center",
			render: (_, record) =>
				record?.simpleSong?.ar?.some((v) => v.id && v.name) ? (
					<Space split="/">
						{record?.simpleSong?.ar?.map((v) => (
							<Typography.Text key={v.id} style={{ maxWidth: 80 }} onClick={() => {}}>
								{v.name}
							</Typography.Text>
						))}
					</Space>
				) : (
					<Typography.Text style={{ maxWidth: 80 }} onClick={() => {}}>
						{record.artist}
					</Typography.Text>
				),
		},
		{
			dataIndex: "album",
			align: "center",
			render: (_, record) =>
				record?.simpleSong?.al?.name ? (
					<Typography.Text style={{ maxWidth: 80 }} onClick={() => {}}>
						{record?.simpleSong?.al?.name}
					</Typography.Text>
				) : (
					record?.album
				),
		},
		{
			dataIndex: "addTime",
			align: "center",
			render: (_, record) => `${dayjs(record?.addTime).format("YYYY-MM-DD")}`,
		},
		{
			dataIndex: "operation",
			align: "center",
			render: (_, record) => (
				<Space>
					<AddMusic theme="outline" size="24" fill="#fff" />
					<Dropdown
						overlay={
							<Menu>
								<Menu.Item>
									<a>删除</a>
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

	// 上传文件
	const upload = () => {};

	return (
		<Layout loading={loading}>
			<Table
				title={() => (
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<Space>
							<span>{byte2Gb(disk?.size)}</span>
							<Progress
								strokeColor={{
									"0%": "#108ee9",
									"100%": "#87d068",
								}}
								showInfo={false}
								percent={
									disk?.size && disk?.maxSize
										? toPercent(Number(disk?.size) / Number(disk?.maxSize))
										: 0
								}
								style={{
									width: 200,
								}}
							/>
							<span>{byte2Gb(disk?.maxSize)}</span>
							<Upload accept="audio/*">
								<Button>
									<Space>
										<UploadOne theme="outline" size={16} fill="#fff" />
										<span>上传</span>
									</Space>
								</Button>
							</Upload>
						</Space>
						<Input size="small" style={{ flex: "0 0 200px" }} />
					</div>
				)}
				rowClassName={() => styles.tableRow}
				showHeader={false}
				rowKey="songId"
				bordered={false}
				columns={columns}
				dataSource={disk?.data}
				pagination={false}
			/>
		</Layout>
	);
};

export default CloudDisk;
