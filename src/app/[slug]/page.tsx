import ScreenGetOne from "@/screens/ScreenGetOne/Main";
import React from "react";

export default function Page({
	params: { slug },
}: { params: { slug: string } }) {
	return <ScreenGetOne slug={slug} />;
}
