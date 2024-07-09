import { Endpoint } from "@/services/endpoint";
import storeData from "@/services/storeData";
import { changeContact } from "@/shared/slice/contact";
import type { RootState } from "@/shared/store";
import { Icon } from "@iconify-icon/react";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { If, Then } from "react-if";
import { useDispatch, useSelector } from "react-redux";
import type { ContactDataCreateType } from "../Main.types";

const CreateContact = ({ callbackSubmit }: { callbackSubmit: () => void }) => {
	const dispatch = useDispatch();
	const add = useSelector((state: RootState) => state.contact.add);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ContactDataCreateType>();
	const onSubmit: SubmitHandler<ContactDataCreateType> = async (input) => {
		try {
			const { firstName, lastName, age, photo } = input;
			await storeData(Endpoint.contact_create, {
				firstName,
				lastName,
				age,
				photo,
			});
			reset();
		} catch (error) {
			console.error(error);
		} finally {
			callbackSubmit();
			dispatch(changeContact({ add: !add }));
		}
	};
	return (
		<div>
			<div
				className={`fixed max-w-xl w-full bg-slate-100 duration-300 rounded-t-2xl p-6 ${add ? "h-[60vh] bottom-0" : "h-0 -bottom-20"} overflow-hidden`}
			>
				<div className="flex justify-between items-center">
					<h3 className="font-bold text-lg">Add Contact</h3>
					<div>
						<button
							type="button"
							className="bg-white hover:bg-slate-200 duration-300 h-8 w-8 flex justify-center items-center rounded-lg aspect-square"
							onClick={() => {
								dispatch(changeContact({ add: false }));
								reset();
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
									min: {
										value: 3,
										message: "Minimum 3 characters",
									},
									max: {
										value: 20,
										message: "Maximum 20 characters",
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
									min: {
										value: 3,
										message: "Minimum 3 characters",
									},
									max: {
										value: 20,
										message: "Maximum 20 characters",
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
								className="h-12 bg-slate-800 border w-full flex-1 rounded-xl p-2 focus:ring-0 focus:outline-none text-slate-300 text-base"
								type="submit"
							>
								Create New
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateContact;
