import { useEffect } from "react";
import { message, Spin } from "antd";
import { Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useUser } from "@/models";
// import { initUser } from "@/models/user";
import { HttpCode } from "@/constants";
import { history } from "@/utils";
import BasicLayout, { BasicLayoutProps } from "../BasicLayout";

/**
 * 登录校验
 * FIXME: 用useRecoilValueLoadable和React.Suspense重写这里的逻辑
 */
const Auth: React.FC<BasicLayoutProps> = (props) => {
	// const user = useRecoilValue(initUser);
	const { user } = useUser();

	console.log(user);

	if (!user) {
		return <Redirect to="/login" />;
	}

	return <BasicLayout {...props} />;
};

export default Auth;
