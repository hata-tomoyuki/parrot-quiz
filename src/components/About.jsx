import React, { useState } from "react";
import { images, imagesCountries } from "../const/data";

const ITEMS_PER_PAGE = 15;

export const About = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [shownImages, setShownImages] = useState(images);

	const totalPages = Math.ceil(shownImages.length / ITEMS_PER_PAGE);

	const handleClick = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePrevious = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const currentImages = shownImages.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	);

	const getPaginationButtons = () => {
		const buttons = [];
		const delta = 2; // 現在のページの前後に表示するページ数

		for (let i = 1; i <= totalPages; i++) {
			if (
				i === 1 ||
				i === totalPages ||
				(i >= currentPage - delta && i <= currentPage + delta)
			) {
				buttons.push(
					<button
						key={i}
						onClick={() => handleClick(i)}
						className={`mx-1 px-3 py-1 border rounded ${currentPage === i ? "bg-green-900 text-white" : "bg-white text-green-900"}`}
					>
						{i}
					</button>,
				);
			} else if (
				i === currentPage - delta - 1 ||
				i === currentPage + delta + 1
			) {
				buttons.push(
					<span key={i} className="mx-1">
						...
					</span>,
				);
			}
		}

		return buttons;
	};

	return (
		<div className="flex flex-col items-center pb-10">
			<h1 className="text-6xl font-bold text-center my-10">オウム図鑑</h1>
			<ul className="flex justify-center gap-4 mb-10">
				<li>
					<button
						className={`mx-1 px-3 py-1 border rounded text-green-900 text-2xl ${shownImages === images ? "bg-green-900 text-white" : "bg-white text-green-900"}`}
						onClick={() => {
							setShownImages(images);
							setCurrentPage(1);
						}}
					>
						Normal
					</button>
				</li>
				<li>
					<button
						className={`mx-1 px-3 py-1 border rounded text-green-900 text-2xl ${shownImages === imagesCountries ? "bg-green-900 text-white" : "bg-white text-green-900"}`}
						onClick={() => {
							setShownImages(imagesCountries);
							setCurrentPage(1);
						}}
					>
						Countries
					</button>
				</li>
			</ul>
			<div className="flex flex-wrap w-4/5 mx-auto gap-4">
				{currentImages.map((image) => (
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
			<div className="flex justify-center mt-4">
				<button
					onClick={handlePrevious}
					className="mx-1 px-3 py-1 border rounded bg-white text-green-900"
					disabled={currentPage === 1}
				>
					Prev
				</button>
				{getPaginationButtons()}
				<button
					onClick={handleNext}
					className="mx-1 px-3 py-1 border rounded bg-white text-green-900"
					disabled={currentPage === totalPages}
				>
					Next
				</button>
			</div>
		</div>
	);
};
