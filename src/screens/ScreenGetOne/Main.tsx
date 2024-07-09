"use client";
import ErrorData from "@/components/error";
import Header from "@/components/header";
import LoadingData from "@/components/loading";
import GetInitialAvatar from "@/hooks/initial-avatar";
import IsValidImageUrl from "@/hooks/valid-image";
import { Endpoint } from "@/services/endpoint";
import useData from "@/services/useData";
import { changeContactUpdate } from "@/shared/slice/contact";
import { Icon } from "@iconify-icon/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import type { ContactDataType, ContactResultsType } from "./Main.types";
import UpdateContact from "./Section/CreateContact";

export default function ScreenGetOne({ slug }: { slug: string }) {
	const dispatch = useDispatch();
	const { data, isLoading, isError, mutate } = useData<ContactResultsType>(
		`${Endpoint.contact_show}/${slug}`,
		{
			method: "GET",
		},
	);
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
						onClick={() => dispatch(changeContactUpdate({ update: true }))}
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
			<UpdateContact item={item} callbackSubmit={mutate} />
		</div>
	);
}
