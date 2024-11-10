import React from "react";

export const ParrotImage = ({ image, message, isFlipped }) => {
	return (
		<div className="relative">
			<span
				className={`lg:text-4xl font-bold absolute top-8 lg:top-16 ${isFlipped ? "right-2 lg:right-0" : "left-2 lg:left-0"}`}
			>
				{message}
			</span>
			<img
				src={image}
				alt="Parrot"
				className={`w-24 lg:w-44 ${isFlipped ? "scale-x-[-1]" : ""}`}
			/>
		</div>
	);
};
