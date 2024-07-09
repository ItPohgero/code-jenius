import axios, { type AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

interface CreateOptions extends AxiosRequestConfig {}

const storeData = async <T>(
	endpoint: string,
	data: T,
	options?: CreateOptions,
): Promise<T> => {
	try {
		const response = await axiosInstance.post(endpoint, data, options);
		return response.data;
	} catch (error) {
		throw new Error(`Error storing data: ${error}`);
	}
};

export default storeData;
