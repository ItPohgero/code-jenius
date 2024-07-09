import ScreenGetContactOne from "@/screens/ScreenGetContactOne/Main";
import React from "react";

export default function Page({
	params: { slug },
}: { params: { slug: string } }) {
	return <ScreenGetContactOne slug={slug} />;
}
