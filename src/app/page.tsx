"use client";
import { Endpoint } from "@/services/endpoint";
import useData from "@/services/useData";
import Image from "next/image";
import { Fragment } from "react";

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

	const IsValidImageUrl = (url: string): boolean => {
		return url.startsWith("http");
	};
	const GetInitialAvatar = (firstName: string, lastName: string): string => {
		const initials = (firstName[0] || "") + (lastName[0] || "");
		return initials.toUpperCase();
	};
	return (
		<Fragment>
			<div className="pt-20">
				{data?.data?.map((item, index) => {
					return (
						<div key={index?.toString()}>
							<div>
								<div className="flex justify-start items-center gap-6 border-b py-4 hover:bg-slate-50 px-6">
									<div>
										{IsValidImageUrl(item.photo) ? (
											<Image
												src={item.photo}
												alt={`${item.firstName} ${item.lastName}`}
												width={40}
												height={40}
												className="aspect-square object-cover rounded-full"
											/>
										) : (
											<div className="bg-slate-200 w-[40px] h-[40px] aspect-square rounded-full flex justify-center items-center">
												{GetInitialAvatar(item?.firstName, item?.lastName)}
											</div>
										)}
									</div>
									<div>
										<div>{item?.age}</div>
										<div>{item?.firstName} </div>
										<div>{item?.lastName}</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</Fragment>
	);
}
