"use client";
import ScrollProgressBar from "@/components/scroll-progress-bar";
import React, { type PropsWithChildren } from "react";
import NextTopLoader from "nextjs-toploader";

export default function LayoutMain(props: PropsWithChildren) {
	return (
		<div className="max-w-xl mx-auto min-h-screen bg-slate-100 text-sm">
			<NextTopLoader color="#3b82f6" height={2} showSpinner={false} />
			<ScrollProgressBar />
			<main>{props?.children}</main>
		</div>
	);
}
