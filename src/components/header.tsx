"use client";
import React, { type PropsWithChildren } from "react";

export default function Header(props: PropsWithChildren) {
	return (
		<div className="sticky top-0 flex justify-between items-center gap-4 py-2 px-6 bg-slate-200 h-14">
			{props?.children}
		</div>
	);
}
