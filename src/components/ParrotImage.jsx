import React from "react";

export const ParrotImage = ({ image, message, isFlipped }) => {
	return (
		<div className="relative">
			<span
				className={`text-4xl font-bold absolute top-16 ${isFlipped ? "right-0" : "left-0"}`}
			>
				{message}
			</span>
			<img
				src={image}
				alt="Parrot"
				className={`w-44 ${isFlipped ? "scale-x-[-1]" : ""}`}
			/>
		</div>
	);
};
