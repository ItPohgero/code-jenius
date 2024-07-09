"use client";
import useData from "@/services/useData";
import Link from "next/link";
import React from "react";
import type { ContactDataType, ContactResultsType } from "./Main.types";
import { Endpoint } from "@/services/endpoint";
import Image from "next/image";
import ErrorData from "@/components/error";
import LoadingData from "@/components/loading";

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
			<div className="sticky top-0 flex justify-between items-center gap-4 p-2 bg-slate-200 h-14">
				<Link href="/">back</Link>
			</div>
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
				<h2 className="text-center text-2xl font-bold">
					{item?.firstName} {item?.lastName}
				</h2>
				<h2 className="text-center">{item?.age} Tahun</h2>
			</div>
		</div>
	);
}
