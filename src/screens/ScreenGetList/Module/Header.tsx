import Header from "@/components/header";
import { Icon } from "@iconify-icon/react";
import Image from "next/image";
import React, { Fragment } from "react";

type ModuleHeaderProps = {
	search: string;
	setSearch: (e: string) => void;
};
const ModuleHeader = (props: ModuleHeaderProps) => {
	const { search, setSearch } = props;
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
		</Fragment>
	);
};

export default ModuleHeader;
