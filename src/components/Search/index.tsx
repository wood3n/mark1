import React, { useState } from "react";
import { Select, Tabs, Empty, Card, Space } from "antd";
import { Music, RecordDisc, MusicMenu, User } from "@icon-park/react";
import { getSearch, getSearchSuggestion } from "@/services";
import { useRequest, useDebounceFn } from "ahooks";
import { isEmpty } from "lodash-es";
import { SearchTypeEnum } from "@/constants";
import styles from "./style.less";

interface Props {
	style?: React.CSSProperties;
}

const iconStyle: React.CSSProperties = {
	verticalAlign: "text-top",
};

/**
 * 音乐搜索
 */
const Search: React.FunctionComponent<Props> = ({ style }) => {
	const [value, setValue] = useState<string>();
	const [open, setOpen] = useState(false);

	// 获取搜索结果
	const reqSearchContent = useRequest(getSearchSuggestion, {
		manual: true,
	});

	const { run: handleSearch } = useDebounceFn(
		(keywords: string) => {
			if (keywords?.trim()) {
				setOpen(true);
				reqSearchContent.run({
					keywords,
				});
			}
		},
		{
			wait: 800,
		}
	);

	const dropdownRender = (originNode: React.ReactNode) => {
		const { songs, albums, artists, playlists } = reqSearchContent?.data?.result ?? {};
		if (!reqSearchContent?.data?.result || isEmpty(reqSearchContent?.data?.result)) {
			return <Empty />;
		}

		return (
			<Card title={null} bordered={false} bodyStyle={{ padding: 8 }}>
				<Tabs
					type="line"
					size="small"
					tabPosition="top"
					defaultActiveKey="song"
					className={styles.content}
				>
					{songs && (
						<Tabs.TabPane
							tab={
								<Space align="baseline">
									<Music style={iconStyle} />
									单曲
								</Space>
							}
							key="song"
						>
							单曲
						</Tabs.TabPane>
					)}
					{artists && (
						<Tabs.TabPane
							tab={
								<Space align="baseline">
									<User style={iconStyle} />
									歌手
								</Space>
							}
							key="artist"
						>
							歌手
						</Tabs.TabPane>
					)}
					{albums && (
						<Tabs.TabPane
							tab={
								<Space align="baseline">
									<RecordDisc style={iconStyle} />
									专辑
								</Space>
							}
							key="album"
						>
							专辑
						</Tabs.TabPane>
					)}
					{playlists && (
						<Tabs.TabPane
							tab={
								<Space align="baseline">
									<MusicMenu style={iconStyle} />
									歌单
								</Space>
							}
							key="playlist"
						>
							歌单
						</Tabs.TabPane>
					)}
				</Tabs>
			</Card>
		);
	};

	console.log(reqSearchContent?.data);

	return (
		<Select
			showSearch
			placeholder="音乐/视频/电台/用户"
			// value={value}
			filterOption={false}
			open={!!reqSearchContent?.data}
			clearIcon={null}
			defaultActiveFirstOption
			onSearch={handleSearch}
			showArrow={false}
			loading={reqSearchContent?.loading}
			dropdownMatchSelectWidth={false}
			dropdownRender={dropdownRender}
			style={style}
		/>
	);
};

export default Search;
