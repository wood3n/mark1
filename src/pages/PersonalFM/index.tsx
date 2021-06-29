import { useEffect } from "react";
import { useExternal, useRequest } from "ahooks";
import { getPersonalFM } from "@/services";
import { Layout } from "@/layout";

interface Props {}

/**
 * 私人 FM
 */
const PersonalFM: React.FunctionComponent<Props> = (props) => {
	const reqPersonalFM = useRequest(getPersonalFM, {
		manual: true,
	});

	useEffect(() => {
		reqPersonalFM.run();
	}, []);

	return (
		<Layout loading={reqPersonalFM.loading}>
			<div>测试接口</div>
		</Layout>
	);
};

export default PersonalFM;
