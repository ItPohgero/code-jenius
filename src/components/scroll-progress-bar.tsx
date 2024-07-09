import { useCallback, useEffect, useState } from "react";

const ScrollProgressBar: React.FC = () => {
	const [scrollPosition, setScrollPosition] = useState<number>(0);

	const handleScroll = useCallback(() => {
		const position = window.scrollY;
		const documentHeight =
			document.documentElement.scrollHeight -
			document.documentElement.clientHeight;
		const scroll = (position / documentHeight) * 100;
		setScrollPosition(scroll);
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	return (
		<div className="fixed top-0 left-0 w-full bg-transparent z-[10000]">
			<div
				className="h-[2px] bg-gradient-to-r from-blue-500 to-blue-600"
				style={{ width: `${scrollPosition}%` }}
			/>
		</div>
	);
};

export default ScrollProgressBar;
