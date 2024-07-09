"use client";

import { Endpoint } from "@/services/endpoint";
import useData from "@/services/useData";
import Image from "next/image";
import { Fragment, useState } from "react";
import { ContactDataType, ContactResultsType, GroupedContacts } from "./Main.types";


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
        return <div>Loading...</div>;
    }

    if (isError) {
        console.error("Error fetching data:");
        return <div>Error loading data.</div>;
    }
    return (
        <Fragment>
            <div className="sticky top-0 flex justify-between items-center gap-4 p-2 bg-slate-200">
                <div className="relative w-32 h-10">
                    <Image src="/logo_jenius-blue.svg" alt="jenius" fill />
                </div>
                <input
                    value={search}
                    onChange={(e) => setSearch(e?.target?.value)}
                    type="text"
                    placeholder="Cari..."
                    className="w-full border h-12 focus:outline-none focus:border-none focus:ring-0 py-2 px-4 rounded-full"
                />
            </div>
            <div className="mt-4 text-slate-600">
                {FilteredAlphabet?.map((abjac) => (
                    <div key={abjac}>
                        <h2 className="text-xl font-bold pl-6 bg-slate-200/60">{abjac}</h2>
                        {FilteredContacts[abjac] && FilteredContacts[abjac]?.length > 0 ? (
                            FilteredContacts[abjac].map((item, index) => (
                                <div key={index.toString()}>
                                    <div className="flex justify-start items-center gap-6 border-b border-slate-200 py-4 hover:bg-slate-50 px-6">
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
            </div>
        </Fragment>
    );
}
