import React, { useState } from "react";
import parrot from "../assets/images/background/parrot.png";
import { Gallary } from "./Gallary";
import { MainContent } from "./MainContent";

export const Quiz = () => {
	const [image, setImage] = useState(parrot);
	const [parrotsMessage1, setParrotsMessage1] = useState("");
	const [parrotsMessage2, setParrotsMessage2] = useState("");
	const [parrotsMessage3, setParrotsMessage3] = useState("");
	const [parrotsMessage4, setParrotsMessage4] = useState("");
	return (
		<div className="flex flex-col items-center">
			<MainContent
				setImage={setImage}
				setParrotsMessage1={setParrotsMessage1}
				setParrotsMessage2={setParrotsMessage2}
				setParrotsMessage3={setParrotsMessage3}
				setParrotsMessage4={setParrotsMessage4}
			/>
			<Gallary
				image={image}
				parrotsMessage1={parrotsMessage1}
				parrotsMessage2={parrotsMessage2}
				parrotsMessage3={parrotsMessage3}
				parrotsMessage4={parrotsMessage4}
			/>
		</div>
	);
};
