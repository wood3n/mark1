import React from "react";
import { Result, Button, Alert } from "antd";
import SimpleLayout from "../SimpleLayout";

interface ErrorState {
	hasError: boolean;
}

/**
 * 错误处理
 */
class ErrorBoundary extends React.Component<any, ErrorState> {
	constructor(props: any) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: any) {
		// 更新 state 使下一次渲染能够显示降级后的 UI
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			// 你可以自定义降级后的 UI 并渲染
			return (
				<SimpleLayout>
					<Result
						status="error"
						title="Sorry, something went wrong."
						extra={[
							<Button
								type="primary"
								key="login"
								onClick={() => this.props.history.replace("/login")}
							>
								重新登录
							</Button>,
						]}
					>
						<Alert.ErrorBoundary>{this.props.children}</Alert.ErrorBoundary>
					</Result>
				</SimpleLayout>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
