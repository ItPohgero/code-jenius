"use client";

import ErrorData from "@/components/error";
import LoadingData from "@/components/loading";
import GetInitialAvatar from "@/hooks/initial-avatar";
import IsValidImageUrl from "@/hooks/valid-image";
import { Endpoint } from "@/services/endpoint";
import useData from "@/services/useData";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import type {
	ContactDataType,
	ContactResultsType,
	GroupedContacts,
} from "./Main.types";
import AddButton from "./Module/AddButton";
import ModuleHeader from "./Module/Header";
import CreateContact from "./Section/CreateContact";
import { useSelector } from "react-redux";
import type { RootState } from "@/shared/store";
import { If, Then } from "react-if";

export default function ScreenGetList() {
	const [search, setSearch] = useState<string>("");
	const { data, isLoading, isError } = useData<ContactResultsType>(
		Endpoint.contact_list,
		{
			method: "GET",
		},
	);

	// Buat array alfabet A-Z
	const alphabet = [...Array(26)]?.map((_, i) => String?.fromCharCode(65 + i));

	// Objek  menyimpan kontak yang dikelompokkan berdasarkan huruf pertama dari nama depan
	const GroupedContactsData: GroupedContacts = (data?.data || [])?.reduce(
		(acc: GroupedContacts, item: ContactDataType) => {
			const firstLetter = item?.firstName[0]?.toUpperCase();
			if (!acc[firstLetter]) {
				acc[firstLetter] = [];
			}
			acc[firstLetter]?.push(item);
			return acc;
		},
		{},
	);

	// Fungsi untuk filter data berdasarkan pencarian firstName atau lastName
	const FilteredContacts = Object?.keys(GroupedContactsData).reduce(
		(obj: GroupedContacts, key) => {
			const filteredItems = GroupedContactsData[key]?.filter((item) => {
				const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
				return fullName.includes(search.toLowerCase());
			});
			if (filteredItems?.length) {
				obj[key] = filteredItems;
			}
			return obj;
		},
		{},
	);

	// Filter alphabet
	const FilteredAlphabet = alphabet?.filter(
		(letter) => FilteredContacts[letter]?.length > 0,
	);
	const add = useSelector((state: RootState) => state.contact.add);

	if (isLoading) {
		return <LoadingData />;
	}

	if (isError) {
		return <ErrorData />;
	}
	return (
		<Fragment>
			<ModuleHeader search={search} setSearch={setSearch} />
			<If condition={!add}>
				<Then>
					<div className="mt-4 text-slate-600">
						{(search ? FilteredAlphabet : alphabet)?.map((abjad) => (
							<div key={abjad}>
								<h2 className="text-lg font-bold pl-6 bg-slate-200/60 text-slate-400">
									{abjad}
								</h2>
								{FilteredContacts[abjad] &&
								FilteredContacts[abjad]?.length > 0 ? (
									FilteredContacts[abjad]?.map((item, index) => (
										<Link href={`/${item?.id}`} key={index.toString()}>
											<div className="flex justify-start items-center gap-6 border-b border-slate-200 py-4 hover:bg-slate-100 px-6 cursor-pointer">
												<div>
													{IsValidImageUrl(item.photo) ? (
														<Image
															priority
															src={item.photo}
															alt={`${item.firstName} ${item.lastName}`}
															width={40}
															height={40}
															className="aspect-square object-cover rounded-full"
														/>
													) : (
														<div className="bg-slate-200 w-[40px] h-[40px] aspect-square rounded-full flex justify-center items-center font-bold">
															{GetInitialAvatar(item.firstName, item.lastName)}
														</div>
													)}
												</div>
												<div>
													<p className="font-bold capitalize">
														{item.firstName} {item.lastName}
													</p>
													<p>Age: {item.age}</p>
												</div>
											</div>
										</Link>
									))
								) : (
									<div className="flex justify-start items-center gap-6 border-b py-4 px-6">
										<div className="text-slate-500">No contacts</div>
									</div>
								)}
							</div>
						))}
						<If condition={FilteredAlphabet?.length === 0}>
							<Then>
								<div className="py-32">
									<div className="flex justify-center items-center">
										Data Not Found
									</div>
								</div>
							</Then>
						</If>
					</div>
				</Then>
			</If>
			<AddButton />
			<CreateContact />
		</Fragment>
	);
}
