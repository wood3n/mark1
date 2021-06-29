import React, { useEffect } from "react";
import XGPlayer from "xgplayer";

interface Props {
	url?: string;
	poster?: string;
}

/**
 * 视频播放组件
 */
const Video: React.FC<Props> = ({ url = "", poster }) => {
	const videoContainerRef = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		let player: XGPlayer | null = null;
		if (url) {
			player = new XGPlayer({
				el: videoContainerRef.current!,
				url,
				poster,
				playbackRate: [0.5, 0.75, 1, 1.5, 2],
				// FIXME:自动播放暂时会导致播放控件失效，不清楚原因
				// autoplay: true,
				lang: "zh-cn",
				pip: true,
				fluid: true,
			});

			return () => {
				player?.destroy();
			};
		}
	}, [url, poster]);

	return <div ref={videoContainerRef} />;
};

export default Video;
