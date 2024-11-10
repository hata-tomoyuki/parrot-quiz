import React from "react";

export const ParrotImage = ({ image, message, isFlipped }) => {
	return (
		<div className="relative">
			<span
				className={`md:text-4xl font-bold absolute top-8 md:top-16 ${isFlipped ? "right-2 md:right-0" : "left-2 md:left-0"}`}
			>
				{message}
			</span>
			<img
				src={image}
				alt="Parrot"
				className={`w-24 md:w-44 ${isFlipped ? "scale-x-[-1]" : ""}`}
			/>
		</div>
	);
};
