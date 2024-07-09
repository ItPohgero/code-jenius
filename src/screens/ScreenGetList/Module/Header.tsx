import Header from "@/components/header";
import type { RootState } from "@/shared/store";
import { Icon } from "@iconify-icon/react";
import Image from "next/image";
import React, { Fragment } from "react";
import { If, Then } from "react-if";
import { useSelector } from "react-redux";

type ModuleHeaderProps = {
	search: string;
	setSearch: (e: string) => void;
};
const ModuleHeader = (props: ModuleHeaderProps) => {
	const add = useSelector((state: RootState) => state.contact.add);
	const { search, setSearch } = props;
	return (
		<Fragment>
			<Header>
				<div className="relative mx-auto flex justify-center w-32">
					<Image
						src="/logo.svg"
						className="rounded-full object-cover"
						alt="jenius"
						width={60}
						height={50}
					/>
				</div>
				<If condition={!add}>
					<Then>
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
								className="h-full bg-transparent flex-1 focus:ring-0 focus:outline-none text-slate-500 text-base"
							/>
						</label>
					</Then>
				</If>
			</Header>
		</Fragment>
	);
};

export default ModuleHeader;
