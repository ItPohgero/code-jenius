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

interface GroupedContacts {
	[key: string]: ContactDataType[];
}
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

	// Buat array alfabet A-Z
	const alphabet = [...Array(26)]?.map((_, i) => String?.fromCharCode(65 + i));

	// Fungsi memeriksa URL gambar valid
	const IsValidImageUrl = (url: string): boolean => {
		return url?.startsWith("http");
	};

	// Fungsi mendapatkan avatar berupa inisial
	const GetInitialAvatar = (firstName: string, lastName: string): string => {
		const initials = (firstName[0] || "") + (lastName[0] || "");
		return initials?.toUpperCase();
	};

	// Objek  menyimpan kontak yang dikelompokkan berdasarkan huruf pertama dari nama depan
	const GroupedContactsData: GroupedContacts = (data?.data || [])?.
		reduce((acc: GroupedContacts, item: ContactDataType) => {
			const firstLetter = item?.firstName[0]?.toUpperCase();
			if (!acc[firstLetter]) {
				acc[firstLetter] = [];
			}
			acc[firstLetter]?.push(item);
			return acc;
		}, {});
	return (
		<Fragment>
			{alphabet?.map((abjac) => (
				<div key={abjac}>
					<h2 className="text-xl font-bold pl-2 bg-slate-200">{abjac}</h2>
					{GroupedContactsData[abjac] && GroupedContactsData[abjac]?.length > 0 ? (
						GroupedContactsData[abjac].map((item, index) => (
							<div key={index.toString()}>
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
											<div className="bg-slate-200 w-[40px] h-[40px] aspect-square rounded-full flex justify-center items-center font-bold text-slate-600">
												{GetInitialAvatar(item.firstName, item.lastName)}
											</div>
										)}
									</div>
									<div>
										<p className="font-bold capitalize">{item.firstName} {item.lastName}</p>
										<p className="text-sm">Age: {item.age}</p>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="flex justify-start items-center gap-6 border-b py-4 px-6">
							<div className="text-slate-500">No contacts</div>
						</div>
					)}
				</div>
			))}
		</Fragment>
	);
}
