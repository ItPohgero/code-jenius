import axios, { type AxiosRequestConfig } from "axios";
import useSWR from "swr";

interface FetchOptions extends AxiosRequestConfig {}

const useData = <T>(url: string, options?: FetchOptions) => {
	const { data, error } = useSWR<T>(
		[url, options],
		async (url: string, options: FetchOptions = {}) => {
			const { data } = await axios(url, {
				method: options.method || "get",
				headers: {
					"Content-Type": "application/json",
					...options.headers,
				},
				data: options.data,
			});
			return data;
		},
		{
			revalidateOnFocus: false,
			dedupingInterval: 60000,
			...options,
		},
	);

	return {
		data,
		isLoading: !error && !data,
		isError: !!error,
	};
};

export default useData;
