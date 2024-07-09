import axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosResponse,
} from "axios";

// Define Axios instance with specific types
const axiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

interface RequestConfig extends AxiosRequestConfig {}
interface ResponseData<T> {
	data: T;
}

// Function to perform HTTP requests
const requestData = async <T>(
	method: "POST" | "PUT" | "DELETE",
	endpoint: string,
	data: T,
	options?: RequestConfig,
): Promise<T> => {
	try {
		let response: AxiosResponse<ResponseData<T>>;

		switch (method) {
			case "POST":
				response = await axiosInstance.post<ResponseData<T>>(
					endpoint,
					data,
					options,
				);
				break;
			case "PUT":
				response = await axiosInstance.put<ResponseData<T>>(
					endpoint,
					data,
					options,
				);
				break;
			case "DELETE":
				response = await axiosInstance.delete<ResponseData<T>>(
					endpoint,
					options,
				);
				break;
			default:
				throw new Error("Unsupported HTTP method");
		}

		return response.data.data; // Assuming your response has a specific structure
	} catch (error) {
		throw new Error(`Error performing ${method} request: ${error}`);
	}
};

export default requestData;
