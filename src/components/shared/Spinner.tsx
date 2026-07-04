import type React from "react";

export const Spinner: React.FC<{
	size?: number;
	colorClass?: string;
}> = ({ size = 1, colorClass = "border-[#3a5a40]" }) => {
	const px = `${size}rem`;
	return (
		<span
			className={`inline-block rounded-full border-4 border-t-transparent animate-spin ${colorClass}`}
			style={{ width: px, height: px }}
			aria-hidden="true"
		/>
	);
};
