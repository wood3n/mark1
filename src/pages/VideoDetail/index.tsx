import { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useExternal, useRequest, useDebounceFn } from "ahooks";
import { Row, Col, Image, Menu, Table, Card, Space, Input, Typography, Modal } from "antd";
import { Star, More, Search } from "@icon-park/react";
import Video from "@/components/Video";
import { ColumnsType } from "antd/es/table";
import InfiniteScroll from "react-infinite-scroller";
import { getVideoDetail, getVideoUrl, getArtistDesc } from "@/services";
import { Layout } from "@/layout";

/**
 * 视频详情
 */
const VideoDetail: React.FC = () => {
	const { id }: { id: string } = useParams();
	const [loading, setLoading] = useState(true);

	// 获取专辑内容
	const { data: videoDetail, run: reqVideoDetail } = useRequest(getVideoDetail, {
		manual: true,
	});

	const { data: videoUrl, run: reqVideoUrl } = useRequest(getVideoUrl, {
		manual: true,
	});

	useEffect(() => {
		if (id) {
			setLoading(true);
			Promise.all([reqVideoUrl({ id }), reqVideoDetail({ id })]).finally(() =>
				setLoading(false)
			);
		}
	}, [id]);

	return (
		<Layout loading={loading}>
			<Row gutter={24}>
				<Col span={18}>
					<Video url={videoUrl?.urls?.[0]?.url} poster={videoDetail?.data?.coverUrl} />
				</Col>
				<Col span={6}></Col>
			</Row>
		</Layout>
	);
};

export default VideoDetail;
