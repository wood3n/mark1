import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useExternal, useRequest, useDebounceFn } from "ahooks";
import { Row, Col, Image, Space, Descriptions, Typography, Card, Spin, Modal } from "antd";
import dayjs from "dayjs";
import { Star, More, Male, Female } from "@icon-park/react";
import { ColumnsType } from "antd/es/table";
import InfiniteScroll from "react-infinite-scroller";
import { getCollectArtists, getArtistDetail, getArtistDesc } from "@/services";
import { GenderMap } from "@/constants";
import { Layout } from "@/layout";
import { useCountryCode } from "@/models";

interface Props {
	visible?: boolean;
	onClose?: () => void;
	artist?: API.Artist;
}

/**
 * 歌手详情信息Modal
 */
const ArtistDetail: React.FC<Props> = ({ visible, onClose, artist }) => {
	const [loading, setLoading] = useState(false);

	const { run: reqArtistDetail, data: detail } = useRequest(getArtistDetail, {
		manual: true,
		onSuccess: (res) => {
			console.log(res);
		},
	});

	const { run: reqArtistDesc, data: desc } = useRequest(getArtistDesc, {
		manual: true,
		onSuccess: (res) => {
			console.log(res);
		},
	});

	useEffect(() => {
		if (artist?.id) {
			setLoading(true);
			Promise.all([
				reqArtistDetail({ id: artist?.id }),
				reqArtistDesc({ id: artist?.id }),
			]).finally(() => setLoading(false));
		}
	}, [artist?.id]);

	const infos = [
		{
			label: "认证信息",
			value: detail?.data?.identify ? (
				<Space>
					<Image
						preview={false}
						placeholder
						alt="认证"
						src={detail?.data?.identify?.imageUrl}
						width={16}
						height={16}
						style={{
							background: "none",
						}}
					/>
					{detail?.data?.identify?.imageDesc}
				</Space>
			) : null,
		},
		{
			label: "昵称",
			value: detail?.data?.user?.nickname,
		},
		{
			label: "性别",
			value: detail?.data?.user?.gender ? GenderMap[detail?.data?.user?.gender] : null,
		},
		{
			label: "生日",
			value: detail?.data?.user?.birthday
				? dayjs(detail?.data?.user?.birthday).format("YYYY-MM-DD")
				: null,
		},
		{
			label: "个性签名",
			value: detail?.data?.user?.signature,
		},
		{
			label: "注册时间",
			value: detail?.data?.user?.createTime
				? dayjs(detail?.data?.user?.createTime).format("YYYY-MM-DD")
				: null,
		},
		{
			label: "上次登录时间",
			value: detail?.data?.user?.lastLoginTime
				? dayjs(detail?.data?.user?.lastLoginTime).format("YYYY-MM-DD HH:mm:ss")
				: null,
		},
	].filter((item) => item.value);

	return (
		<Modal
			title={`${artist?.name} 详情`}
			visible={visible}
			onCancel={onClose}
			destroyOnClose
			footer={null}
			width={800}
			bodyStyle={{
				height: 500,
				overflow: "auto",
			}}
		>
			<Row justify="center" align="middle">
				<Image
					placeholder
					preview={false}
					alt={artist?.name}
					src={artist?.picUrl}
					width={100}
					height={100}
				/>
			</Row>
			<Spin spinning={loading}>
				<Descriptions
					title={<Typography.Title level={4}>{artist?.name}</Typography.Title>}
					column={1}
				>
					{infos?.map((item) => (
						<Descriptions.Item label={item.label}>{item.value}</Descriptions.Item>
					))}
				</Descriptions>
				<Space direction="vertical" size={16}>
					{desc?.introduction?.map((item) => (
						<Space direction="vertical" size={20}>
							<Typography.Title level={4}>{item?.ti}</Typography.Title>
							<div>{item?.txt}</div>
						</Space>
					))}
				</Space>
			</Spin>
		</Modal>
	);
};

export default ArtistDetail;
