import { Endpoint } from "@/services/endpoint";
import storeData from "@/services/storeData";
import { changeContactUpdate } from "@/shared/slice/contact";
import type { RootState } from "@/shared/store";
import { Icon } from "@iconify-icon/react";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { If, Then } from "react-if";
import { useDispatch, useSelector } from "react-redux";
import type { ContactDataType, ContactDataUpdateType } from "../Main.types";

const UpdateContact = ({
	item,
	callbackSubmit,
}: { item: ContactDataType | undefined; callbackSubmit: () => void }) => {
	const [loading, setLoading] = React.useState<boolean>(false);
	const dispatch = useDispatch();
	const update = useSelector((state: RootState) => state.contact.update);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<ContactDataUpdateType>();

	React.useEffect(() => {
		setValue("firstName", item?.firstName ?? "");
		setValue("lastName", item?.lastName ?? "");
		setValue("age", item?.age ?? 0);
		setValue("photo", item?.photo ?? "");
	}, [item, setValue]);

	const onSubmit: SubmitHandler<ContactDataUpdateType> = async (input) => {
		try {
			setLoading(true);
			const { firstName, lastName, age, photo } = input;
			await storeData("PUT", `${Endpoint.contact_update}/${item?.id}`, {
				firstName,
				lastName,
				age,
				photo,
			});
			callbackSubmit();
			dispatch(changeContactUpdate(!update));
			toast.success("Success!");
		} catch (error) {
			toast.error(error?.toString() as string);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div>
			<div
				className={`fixed max-w-xl w-full bg-slate-100 duration-300 rounded-t-2xl p-6 ${update ? "h-[60vh] bottom-0" : "h-0 -bottom-20"} overflow-hidden`}
			>
				<div className="flex justify-between items-center">
					<h3 className="font-bold text-lg">Update Contact</h3>
					<div>
						<button
							type="button"
							className="bg-white hover:bg-slate-200 duration-300 h-8 w-8 flex justify-center items-center rounded-lg aspect-square"
							onClick={() => {
								dispatch(changeContactUpdate(false));
							}}
						>
							<Icon icon="solar:close-square-linear" className="text-xl" />
						</button>
					</div>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mt-4">
						<div className="my-2">
							<label className="text-xs text-slate-500" htmlFor="firstName">
								First Name <span className="text-red-600">*</span>
							</label>
							<input
								id="firstName"
								{...register("firstName", {
									required: "First Name Required",
									minLength: {
										value: 3,
										message: "Minimum 3 characters",
									},
									maxLength: {
										value: 20,
										message: "Maximum 20 characters",
									},
									pattern: {
										value: /^[^\s]*$/,
										message: "No spaces allowed",
									},
								})}
								placeholder="First Name"
								type="text"
								className="input"
							/>
							<If condition={!!errors.firstName}>
								<Then>
									<div className="input-error">{errors.firstName?.message}</div>
								</Then>
							</If>
						</div>
						<div className="my-2">
							<label className="text-xs text-slate-500" htmlFor="lastName">
								Last Name <span className="text-red-600">*</span>
							</label>
							<input
								id="lastName"
								{...register("lastName", {
									required: "Last Name Required",
									minLength: {
										value: 3,
										message: "Minimum 3 characters",
									},
									maxLength: {
										value: 20,
										message: "Maximum 20 characters",
									},
									pattern: {
										value: /^[^\s]*$/,
										message: "No spaces allowed",
									},
								})}
								placeholder="Last Name"
								type="text"
								className="input"
							/>
							<If condition={!!errors.lastName}>
								<Then>
									<div className="input-error">{errors.lastName?.message}</div>
								</Then>
							</If>
						</div>
						<div className="my-2">
							<label className="text-xs text-slate-500" htmlFor="age">
								Age <span className="text-red-600">*</span>
							</label>
							<input
								id="age"
								{...register("age", {
									required: "Age Required",
									pattern: {
										value: /^[0-9]*$/,
										message: "Please enter only digits",
									},
									maxLength: {
										value: 2,
										message: "Maximum 2 characters",
									},
								})}
								placeholder="Age"
								type="number"
								className="input"
							/>
							<If condition={!!errors.age}>
								<Then>
									<div className="input-error">{errors.age?.message}</div>
								</Then>
							</If>
						</div>
						<div className="my-2">
							<label className="text-xs text-slate-500" htmlFor="photo">
								Photo Url <span className="text-red-600">*</span>
							</label>
							<input
								id="photo"
								{...register("photo", {
									required: "Photo Required",
									pattern: {
										value: /^(ftp|http|https):\/\/[^ "]+$/,
										message: "Please enter a valid URL",
									},
								})}
								placeholder="Photo"
								type="text"
								className="input"
							/>
							<If condition={!!errors.photo}>
								<Then>
									<div className="input-error">{errors.photo?.message}</div>
								</Then>
							</If>
						</div>
						<div className="mt-4 flex justify-end">
							<button
								disabled={loading}
								className="flex justify-center items-center gap-4 h-12 bg-slate-800 border w-full flex-1 rounded-xl p-2 focus:ring-0 focus:outline-none text-slate-300 text-base"
								type="submit"
							>
								{loading && <div className="loader-submit" />} Update
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateContact;
