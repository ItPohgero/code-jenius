import Link from "next/link";
import React from "react";

export default function ScreenGetContactOne({ slug }: { slug: string }) {
	return (
		<div>
			<div className="sticky top-0 flex justify-between items-center gap-4 p-2 bg-slate-200 h-14">
				<Link href="/">back</Link>
			</div>
			<main>ScreenGetContactOne {slug}</main>
		</div>
	);
}
