import { Endpoint } from "@/services/endpoint";
import storeData from "@/services/storeData";
import { changeContact } from "@/shared/slice/contact";
import type { RootState } from "@/shared/store";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { If, Then } from "react-if";
import { useDispatch, useSelector } from "react-redux";
import type { ContactDataCreateType } from "../Main.types";

const CreateContact = () => {
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
			dispatch(changeContact({ add: !add }));
		}
	};
	return (
		<div>
			<div
				className={`fixed max-w-xl bottom-0 w-full bg-slate-100 duration-300 rounded-t-2xl p-6 ${add ? "h-[70vh]" : "h-0"}`}
			>
				<div className="mx-auto h-2 w-16 rounded-full bg-slate-300" />
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mt-4">
						<div className="my-2">
							<input
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
							<input
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
							<input
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
							<input
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
								className="bg-sky-600 h-10 px-6 hover:bg-sky-700 duration-300 text-white rounded-lg"
								type="submit"
							>
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateContact;
