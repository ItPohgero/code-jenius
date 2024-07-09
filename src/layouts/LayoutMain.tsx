import React, { type PropsWithChildren } from "react";

export default function LayoutMain(props: PropsWithChildren) {
	return (
		<div className="max-w-3xl mx-auto min-h-screen bg-slate-100">
			<main>{props?.children}</main>
		</div>
	);
}
