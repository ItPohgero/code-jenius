import { Icon } from "@iconify-icon/react";
import React, { Fragment } from "react";

const AddButton = () => {
	return (
		<Fragment>
			<div className="fixed max-w-xl bottom-0 w-full">
				<div className="flex justify-end p-10">
					<button
						type="button"
						className="bg-sky-500 w-12 h-12 flex justify-center items-center rounded-2xl group duration-300 shadow-lg"
					>
						<Icon
							icon="solar:user-plus-bold"
							className="text-3xl text-white group-hover:scale-125 duration-300"
						/>
					</button>
				</div>
			</div>
		</Fragment>
	);
};

export default AddButton;
