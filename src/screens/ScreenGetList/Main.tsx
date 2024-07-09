"use client";

import ErrorData from "@/components/error";
import Header from "@/components/header";
import LoadingData from "@/components/loading";
import { Endpoint } from "@/services/endpoint";
import useData from "@/services/useData";
import { Icon } from "@iconify-icon/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import type {
	ContactDataType,
	ContactResultsType,
	GroupedContacts,
} from "./Main.types";

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

	if (isLoading) {
		return <LoadingData />;
	}

	if (isError) {
		return <ErrorData />;
	}
	return (
		<Fragment>
			<Header>
				<div className="relative">
					<Image
						src="/logo.svg"
						className="rounded-full object-cover"
						alt="jenius"
						width={100}
						height={50}
					/>
				</div>
				<label
					htmlFor="search"
					className="bg-slate-100 flex justify-end items-center w-full rounded-xl h-full"
				>
					<div className="w-10 flex justify-center items-center">
						<Icon
							icon="majesticons:search-line"
							className="text-xl text-slate-500"
						/>
					</div>
					<input
						value={search}
						onChange={(e) => setSearch(e?.target?.value)}
						type="text"
						placeholder="Cari..."
						className="h-full bg-transparent flex-1 focus:ring-0 focus:outline-none text-slate-500"
					/>
				</label>
			</Header>
			<div className="mt-4 text-slate-600">
				{FilteredAlphabet?.map((abjad) => (
					<div key={abjad}>
						<h2 className="text-lg font-bold pl-6 bg-slate-200/60">{abjad}</h2>
						{FilteredContacts[abjad] && FilteredContacts[abjad]?.length > 0 ? (
							FilteredContacts[abjad].map((item, index) => (
								<Link href={`/${item?.id}`} key={index.toString()}>
									<div className="flex justify-start items-center gap-6 border-b border-slate-200 py-4 hover:bg-slate-50 px-6 cursor-pointer">
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
				{FilteredAlphabet?.length === 0 && (
					<div className="py-32">
						<div className="flex justify-center items-center">
							Data Not Found
						</div>
					</div>
				)}
			</div>
			<div className="fixed max-w-xl bottom-0 w-full">
				<div className="flex justify-end p-10">
					<button
						type="button"
						className="bg-sky-500 w-12 h-12 flex justify-center items-center rounded-2xl group duration-300 shadow-lg"
					>
						<Icon
							icon="solar:user-plus-bold"
							className="text-3xl text-white group-hover:scale-125 duration-300"
						/>
					</button>
				</div>
			</div>
		</Fragment>
	);
}
