import type { RootState } from "@/shared/store";
import React from "react";
import { useSelector } from "react-redux";

const CreateContact = () => {
	const add = useSelector((state: RootState) => state.contact.add);
	return (
		<div>
			<div
				className={`fixed max-w-xl bottom-0 w-full bg-slate-100 duration-300 ${add ? "h-screen" : "h-0"}`}
			>
				asd
			</div>
		</div>
	);
};

export default CreateContact;
