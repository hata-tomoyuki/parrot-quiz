import React from "react";
import { ParrotImage } from "./ParrotImage";

export const Gallary = ({
	image,
	parrotsMessage1,
	parrotsMessage2,
	parrotsMessage3,
	parrotsMessage4,
}) => {
	return (
		<div className="flex flex-col justify-between items-center w-full max-w-screen-md mt-[-4%]">
			<div className="flex items-center justify-between w-[80%]">
				<ParrotImage image={image} message={parrotsMessage1} />
				<ParrotImage image={image} message={parrotsMessage2} isFlipped />
			</div>
			<div className="flex items-center justify-between w-full">
				<ParrotImage image={image} message={parrotsMessage3} />
				<ParrotImage image={image} message={parrotsMessage4} isFlipped />
			</div>
		</div>
	);
};
