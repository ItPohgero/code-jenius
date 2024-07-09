"use client";
import ScrollProgressBar from "@/components/scroll-progress-bar";
import NextTopLoader from "nextjs-toploader";
import React, { type PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

export default function LayoutMain(props: PropsWithChildren) {
	return (
		<div className="max-w-xl mx-auto min-h-screen bg-slate-50 text-sm relative">
			<Toaster position="top-center" reverseOrder={false} />
			<NextTopLoader color="#3b82f6" height={2} showSpinner={false} />
			<ScrollProgressBar />
			<main>{props?.children}</main>
		</div>
	);
}
