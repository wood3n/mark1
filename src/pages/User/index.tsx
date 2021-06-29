import { Avatar, Card, Row, Col } from "antd";
import { Layout } from "@/layout";
import { useUser } from "@/models";
import { useRequest } from "ahooks";
import { getUserSubAccount, getUserLevel } from "@/services";
import { useEffect } from "react";

const UserProfile = () => {
	const { user } = useUser();

	const reqUserSubAccount = useRequest(getUserSubAccount, {
		manual: true,
	});

	const reqUserLevel = useRequest(getUserLevel, {
		manual: true,
	});

	useEffect(() => {
		reqUserSubAccount.run();
		reqUserLevel.run();
	}, []);

	return (
		<Layout loading={false}>
			<Row>
				<Col span={16}>
					<Card bordered={false} bodyStyle={{ padding: 0 }}>
						<Avatar
							size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
							src={user?.avatarUrl}
						/>
					</Card>
				</Col>
			</Row>
		</Layout>
	);
};

export default UserProfile;
