import axios, { type AxiosRequestConfig } from "axios";
import useSWR from "swr";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

interface FetchOptions extends AxiosRequestConfig {}

const fetcher = async <T>(
	url: string,
	options: FetchOptions = {},
): Promise<T> => {
	const response = await axiosInstance({
		url,
		method: options.method || "GET",
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
		data: options.data,
	});
	return response.data;
};

const useData = <T>(
	url: string,
	options?: FetchOptions,
	dedupingInterval = 60000,
) => {
	const { data, error, mutate } = useSWR<T>(
		[url, options],
		([url, options]) => fetcher<T>(url, options ?? {}),
		{
			revalidateOnFocus: false,
			dedupingInterval,
		},
	);

	return {
		data,
		isLoading: !error && !data,
		isError: !!error,
		mutate,
	};
};

export default useData;
