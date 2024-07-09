import { Endpoint } from "@/services/endpoint";
import storeData from "@/services/storeData";
import { changeContactRemove } from "@/shared/slice/contact";
import type { RootState } from "@/shared/store";
import { Icon } from "@iconify-icon/react";
import { useRouter } from "next/navigation";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { ContactDataDeleteType, ContactDataType } from "../Main.types";
import toast from "react-hot-toast";

const DeleteContact = ({ item }: { item: ContactDataType | undefined }) => {
	const router = useRouter();
	const [loading, setLoading] = React.useState<boolean>(false);
	const dispatch = useDispatch();
	const remove = useSelector((state: RootState) => state.contact.remove);
	const { register, handleSubmit, watch } = useForm<ContactDataDeleteType>();

	const onSubmit: SubmitHandler<ContactDataDeleteType> = async () => {
		try {
			setLoading(true);
			await storeData("DELETE", `${Endpoint.contact_delete}/${item?.id}`, {});
			toast.success("Success!");
			router.push("/");
		} catch (error) {
			dispatch(changeContactRemove(false))
			toast.error(error?.toString()  as string);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div>
			<div
				className={`fixed max-w-xl w-full bg-slate-100 duration-300 rounded-t-2xl p-6 ${remove ? "h-[40vh] bottom-0" : "h-0 -bottom-20"} overflow-hidden`}
			>
				<div className="flex justify-between items-center">
					<h3 className="font-bold text-lg">Delete Contact</h3>
					<div>
						<button
							type="button"
							className="bg-white hover:bg-slate-200 duration-300 h-8 w-8 flex justify-center items-center rounded-lg aspect-square"
							onClick={() => {
								dispatch(changeContactRemove(false));
							}}
						>
							<Icon icon="solar:close-square-linear" className="text-xl" />
						</button>
					</div>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mt-4">
						<div className="my-2">
							<label className="text-slate-500" htmlFor="age">
								To verify, type{" "}
								<strong className="font-bold text-rose-800">
									delete contact
								</strong>{" "}
								below:
							</label>
							<input
								id="age"
								{...register("confirm", {
									required: "Text Required",
								})}
								placeholder=""
								type="text"
								className="input"
							/>
						</div>
						<div className="mt-4 flex justify-end">
							<button
								disabled={watch("confirm") !== "delete contact"}
								className="flex justify-center items-center gap-4 h-12 bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 border w-full flex-1 rounded-xl p-2 focus:ring-0 focus:outline-none text-slate-300 text-base"
								type="submit"
							>
								{loading && <div className="loader-submit" />} Delete
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default DeleteContact;
