"use client";
import ScrollProgressBar from "@/components/scroll-progress-bar";
import NextTopLoader from "nextjs-toploader";
import React, { type PropsWithChildren } from "react";

export default function LayoutMain(props: PropsWithChildren) {
	return (
		<div className="max-w-xl mx-auto min-h-screen bg-slate-100 text-sm relative">
			<NextTopLoader color="#3b82f6" height={2} showSpinner={false} />
			<ScrollProgressBar />
			<main>{props?.children}</main>
		</div>
	);
}
