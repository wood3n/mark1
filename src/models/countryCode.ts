import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { atom, useRecoilValue, useRecoilState, selector } from "recoil";
import { message } from "antd";
import { useRequest } from "ahooks";
import { isNil, isEmpty } from "lodash-es";
import { getLoginStatus, getCountryCode } from "@/services";
import { HttpCode } from "@/constants";

const allCountryCodesState = atom<any>({
	key: "countryCodes",
	default: {},
});

export const initUserState = selector<any>({
	key: "countryCode",
	get: async ({ get }) => {
		const allCountryCodes = get(allCountryCodesState);
		if (!isNil(allCountryCodes) && !isEmpty(allCountryCodes)) {
			return allCountryCodes;
		}

		try {
			const { data } = await getCountryCode();
			console.log(data);
			return data;
		} catch (error) {
			return null;
		}
	},
});

export default () => {
	const [countryCode] = useRecoilValue(initUserState);

	return { countryCode };
};
