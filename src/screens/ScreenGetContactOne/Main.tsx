"use client";
import ErrorData from "@/components/error";
import LoadingData from "@/components/loading";
import { Endpoint } from "@/services/endpoint";
import useData from "@/services/useData";
import { Icon } from "@iconify-icon/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { ContactDataType, ContactResultsType } from "./Main.types";
import Header from "@/components/header";

export default function ScreenGetContactOne({ slug }: { slug: string }) {
	const { data, isLoading, isError } = useData<ContactResultsType>(
		`${Endpoint.contact_show}/${slug}`,
		{
			method: "GET",
		},
	);

	// Fungsi memeriksa URL gambar valid
	const IsValidImageUrl = (url: string): boolean => {
		return url?.startsWith("http");
	};

	// Fungsi mendapatkan avatar berupa inisial
	const GetInitialAvatar = (firstName: string, lastName: string): string => {
		const initials = (firstName[0] || "") + (lastName[0] || "");
		return initials?.toUpperCase();
	};

	const item: ContactDataType | undefined = data?.data;

	if (isLoading) {
		return <LoadingData />;
	}

	if (isError) {
		return <ErrorData />;
	}
	return (
		<div className="text-slate-600">
			<Header>
				<Link href="/">
					<Icon
						icon="solar:round-arrow-left-line-duotone"
						className="text-3xl hover:text-slate-800 rounded-full duration-300"
					/>
				</Link>
			</Header>
			<div>
				<div className="flex justify-center items-center p-10">
					{IsValidImageUrl(item?.photo || "") ? (
						<Image
							priority
							src={item?.photo || ""}
							alt={`${item?.firstName} ${item?.lastName}`}
							width={100}
							height={100}
							className="aspect-square object-cover rounded-full"
						/>
					) : (
						<div className="bg-slate-200 w-[100px] h-[100px] aspect-square rounded-full flex justify-center items-center font-bold">
							{GetInitialAvatar(item?.firstName || "", item?.lastName || "")}
						</div>
					)}
				</div>
				<div className="flex justify-center items-center gap-2">
					<h2 className="text-2xl font-bold">
						{item?.firstName} {item?.lastName}
					</h2>
					<button
						type="button"
						className="bg-slate-200 hover:bg-slate-300 duration-300 aspect-square w-8 rounded-lg"
					>
						<Icon icon="fluent:people-edit-32-regular" className="text-2xl" />
					</button>
				</div>
				<div className="text-center">{item?.age} Tahun</div>
				<div className="flex justify-evenly mt-4">
					<div>Delete</div>
				</div>
			</div>
		</div>
	);
}
