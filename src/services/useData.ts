import axios, { type AxiosRequestConfig } from "axios";
import useSWR from "swr";

const axiosInstance = axios.create({
	baseURL: "https://contact.herokuapp.com",
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

const useData = <T>(url: string, options?: FetchOptions) => {
	const { data, error } = useSWR<T>(
		[url, options],
		([url, options]) => fetcher<T>(url, options ?? {}),
		{
			revalidateOnFocus: false, // Disable revalidation on focus
			dedupingInterval: 60000, // Cache data for 60 seconds
		},
	);

	return {
		data,
		isLoading: !error && !data,
		isError: !!error,
	};
};

export default useData;
