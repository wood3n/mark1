import { useState, useEffect } from "react";
import { useRequest } from "ahooks";
import {
	getRecommendSongList,
	getRecommendDailySongs,
	getRecommendMVList,
	getRecommendRadioStationList,
} from "@/services";
import {
	Row,
	Col,
	Avatar,
	Space,
	Card,
	Tooltip,
	Button,
	Tag,
	Table,
	Image,
	Typography,
	Skeleton,
} from "antd";
import Text from "@/components/Text";
import Link from "@/components/Link";
import { ColumnsType } from "antd/es/table";
import {
	CalendarOutlined,
	YoutubeOutlined,
	HeartOutlined,
	FolderAddOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { Layout } from "@/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faHeartbeat,
	faFolderPlus,
	faFolderMinus,
	faShare,
	faVolumeUp,
	faCalendar,
	faMusic,
} from "@fortawesome/free-solid-svg-icons";
import ImagePlaceHolder from "@/assets/images/img_placeholder.jpg";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import faToday from "@/assets/images/2021-05-17.png";
import { Fee } from "@/constants";
import { useCurrentSong } from "@/models";
import styles from "./style.less";

/**
 * 每日推荐歌曲，歌单
 */
const DailyRecommend: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const reqRecommendSongList = useRequest(getRecommendSongList, {
		manual: true,
	});

	const reqRecommendDailySongs = useRequest(getRecommendDailySongs, {
		manual: true,
	});

	const reqRecommendMVList = useRequest(getRecommendMVList, {
		manual: true,
	});

	const reqRecommendRadioStationList = useRequest(getRecommendRadioStationList, {
		manual: true,
	});

	useEffect(() => {
		Promise.all([
			reqRecommendSongList.run(),
			reqRecommendDailySongs.run(),
			reqRecommendMVList.run(),
			reqRecommendRadioStationList.run(),
		]).finally(() => {
			setLoading(false);
		});
	}, []);

	return (
		<Layout loading={loading}>
			<Row>
				<Typography.Title level={3}>每日推荐歌单</Typography.Title>
			</Row>
			<Row gutter={24}>
				<Col span={6}>
					<div style={{ position: "relative" }}>
						<Image
							preview={false}
							src={reqRecommendDailySongs?.data?.data?.dailySongs?.[0]?.al?.picUrl}
							width="100%"
							height="100%"
							placeholder
						/>
						<div
							style={{
								position: "absolute",
								left: 0,
								bottom: 0,
								height: 30,
								width: "100%",
								background: "rgb(0 0 0 / 50%)",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Space>
								<FontAwesomeIcon icon={faMusic} />
								<span style={{}}>{`${dayjs().format("YYYY-MM-DD")} 日推`}</span>
							</Space>
						</div>
					</div>
				</Col>
				{reqRecommendSongList?.data?.recommend?.map((item) => (
					<Col span={6}>
						<Space direction="vertical">
							<div>
								<Image
									preview={false}
									src={item.picUrl}
									width="100%"
									height="100%"
									placeholder
								/>
							</div>
							<Space>
								<Typography.Paragraph>{item.name}</Typography.Paragraph>
							</Space>
						</Space>
					</Col>
				))}
			</Row>
			<Row>
				<Typography.Title level={3}>推荐 MV</Typography.Title>
			</Row>
			<Row gutter={24}>
				{reqRecommendMVList?.data?.result?.map((item) => (
					<Col span={8}>
						<Space direction="vertical">
							<div>
								<Image
									preview={false}
									src={item.picUrl}
									width="100%"
									height="100%"
									placeholder
								/>
							</div>
							<Space>
								<Typography.Paragraph>{item.name}</Typography.Paragraph>
							</Space>
						</Space>
					</Col>
				))}
			</Row>
			<Row>
				<Typography.Title level={3}>推荐电台</Typography.Title>
			</Row>
			<Row gutter={24}>
				{reqRecommendRadioStationList?.data?.result?.map((item) => (
					<Col span={8}>
						<Space direction="vertical">
							<div>
								<Image
									preview={false}
									src={item.picUrl}
									width="100%"
									height="100%"
									placeholder
								/>
							</div>
							<Space>
								<Typography.Paragraph>{item.name}</Typography.Paragraph>
							</Space>
						</Space>
					</Col>
				))}
			</Row>
		</Layout>
	);
};

export default DailyRecommend;
