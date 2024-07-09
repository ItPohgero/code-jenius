"use client";
import { Endpoint } from "@/services/endpoint";
import useData from "@/services/useData";

type ContactDataType = {
	id: string;
	firstName: string;
	lastName: string;
	age: number;
	photo: string;
};

type ContactResultsType = {
	message: "Get contacts";
	data: ContactDataType[];
};

export default function Home() {
	const { data, isLoading, isError } = useData<ContactResultsType>(
		Endpoint.contact_list,
		{
			method: "GET",
		},
	);
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		console.error("Error fetching data:");
		return <div>Error loading data.</div>;
	}
	return (
		<div>
			<pre>{JSON.stringify(data, undefined, 2)}</pre>
		</div>
	);
}
