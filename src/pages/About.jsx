import React, { useState } from "react";
import { images, imagesClassic, imagesCountries } from "../const/data";

export const About = () => {
	const [shownImages, setShownImages] = useState(images);

	return (
		<div className="flex flex-col items-center pb-10">
			<h1 className="text-4xl lg:text-6xl font-bold text-center my-10">
				おうむ図鑑
			</h1>
			<ul className="flex justify-center gap-4 mb-10">
				<li>
					<button
						className={`mx-1 px-3 py-1 border rounded text-green-900 text-lg lg:text-2xl ${shownImages === images ? "bg-green-900 text-white" : "bg-white text-green-900"}`}
						onClick={() => {
							setShownImages(images);
						}}
					>
						Normal
					</button>
				</li>
				<li>
					<button
						className={`mx-1 px-3 py-1 border rounded text-green-900 text-lg lg:text-2xl ${shownImages === imagesCountries ? "bg-green-900 text-white" : "bg-white text-green-900"}`}
						onClick={() => {
							setShownImages(imagesCountries);
						}}
					>
						Countries
					</button>
				</li>
				<li>
					<button
						className={`mx-1 px-3 py-1 border rounded text-green-900 text-lg lg:text-2xl ${shownImages === imagesClassic ? "bg-green-900 text-white" : "bg-white text-green-900"}`}
						onClick={() => {
							setShownImages(imagesClassic);
						}}
					>
						Classic
					</button>
				</li>
			</ul>
			<div className="grid grid-cols-2 lg:grid-cols-5 lg:w-4/5 mx-auto lg:gap-8">
				{shownImages.map((image) => (
					<div
						key={image.name}
						className="w-40 h-48 bg-gray-200 border-2 border-gray-300 rounded-lg m-2 flex flex-col items-center justify-center"
					>
						<img
							src={image.default}
							alt="Parrot"
							className="w-full h-full object-cover"
						/>
						<p className="mt-2 text-center text-xs font-bold">{image.name}</p>
					</div>
				))}
			</div>
		</div>
	);
};
