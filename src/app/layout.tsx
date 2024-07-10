import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutMain from "@/layouts/LayoutMain";
import { ProviderReduxToolkit } from "@/providers/Redux";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Code - Jenius",
	description: "Wahyu Agus Arifin",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
				/>
			</head>
			<body className={inter.className}>
				<ProviderReduxToolkit>
					<LayoutMain>{children}</LayoutMain>
				</ProviderReduxToolkit>
			</body>
		</html>
	);
}
