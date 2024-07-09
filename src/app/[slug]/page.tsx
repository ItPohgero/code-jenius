import React from "react";
import ScreenGetContactOne from "@/screens/ScreenGetContactOne/Main";

export default function Page({
	params: { slug },
}: { params: { slug: string } }) {
	return <ScreenGetContactOne slug={slug} />;
}
