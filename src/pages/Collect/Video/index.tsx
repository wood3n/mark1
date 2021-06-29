import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useExternal, useRequest, useDebounceFn } from "ahooks";
import { Row, Col, Image, Menu, Table, Card, Space, Input, Typography, Modal } from "antd";
import { Star, More, Search } from "@icon-park/react";
import { ColumnsType } from "antd/es/table";
import InfiniteScroll from "react-infinite-scroller";
import { getCollectVideos, getArtistDetail, getArtistDesc } from "@/services";
import { Layout } from "@/layout";

/**
 * 收藏的视频列表
 */
const CollectVideoList: React.FC = () => {
	const history = useHistory();
	const [videoList, setVideoList] = useState<API.Video[]>();

	const { run: reqCollectVideos, loading } = useRequest(getCollectVideos, {
		manual: true,
		onSuccess: ({ data }) => {
			setVideoList(data);
		},
	});

	useEffect(() => {
		reqCollectVideos({
			pageSize: 100,
			pageNumber: 1,
		});
	}, []);

	return (
		<Layout loading={loading}>
			<Row gutter={[24, 24]}>
				{videoList?.map((item) => (
					<Col
						// 全屏的宽度，3列
						xxl={{
							span: 8,
						}}
						// 初始加载的宽度，4列
						xl={{
							span: 6,
						}}
						lg={{
							span: 6,
						}}
						md={{
							span: 8,
						}}
						sm={{
							span: 12,
						}}
					>
						<Card
							hoverable
							bordered={false}
							bodyStyle={{
								padding: 16,
							}}
							cover={
								<Image
									placeholder
									preview={false}
									src={item?.coverUrl}
									height={180}
								/>
							}
							onClick={() => {
								history.push(`/video/${item.vid}`);
							}}
						>
							<Card.Meta title={item.title} />
						</Card>
					</Col>
				))}
			</Row>
		</Layout>
	);
};

export default CollectVideoList;
