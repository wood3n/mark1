import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { atom, useRecoilValue, useRecoilState, selector } from "recoil";
import { message } from "antd";
import { useRequest } from "ahooks";
import { isNil, isEmpty } from "lodash-es";
import { getLoginStatus, getUserDetail } from "@/services";
import { HttpCode } from "@/constants";

const initUserAtom = atom<API.User | null>({
	key: "user",
	default: {},
});

export const initUserState = selector<API.User | null>({
	key: "currentUser",
	get: async ({ get }) => {
		const user = get(initUserAtom);
		if (!isNil(user) && !isEmpty(user)) {
			return user;
		}

		try {
			const { data } = await getLoginStatus();

			return data?.profile;
		} catch (error) {
			return null;
		}
	},
	set: ({ set }, newValue) => set(initUserAtom, newValue),
});

const useUser = () => {
	const history = useHistory();
	const [user, setUser] = useRecoilState(initUserState);

	const saveUser = useCallback((data: API.User) => {
		setUser(data);
	}, []);

	const logout = () => {
		setUser(null);
		history.push("/login");
	};

	return {
		user,
		saveUser,
		logout,
	};
};

export default useUser;
