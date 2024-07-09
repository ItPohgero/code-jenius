import { changeContact } from "@/shared/slice/contact";
import type { RootState } from "@/shared/store";
import { Icon } from "@iconify-icon/react";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddButton = () => {
	const add = useSelector((state: RootState) => state.contact.add);
	const dispatch = useDispatch();
	return (
		<Fragment>
			<div className="fixed max-w-xl bottom-0 w-full z-50">
				<div className="flex justify-end p-10">
					<button
						onClick={() => dispatch(changeContact({ add: !add }))}
						type="button"
						className="bg-sky-500 w-12 h-12 flex justify-center items-center rounded-2xl group duration-300 shadow-lg"
					>
						{add ? (
							<Icon
								icon="solar:close-square-linear"
								className="text-3xl text-white group-hover:scale-125 duration-300"
							/>
						) : (
							<Icon
								icon="solar:user-plus-bold"
								className="text-3xl text-white group-hover:scale-125 duration-300"
							/>
						)}
					</button>
				</div>
			</div>
		</Fragment>
	);
};

export default AddButton;
