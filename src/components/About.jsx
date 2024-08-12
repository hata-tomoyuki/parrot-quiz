import React, { useState } from "react";
import { images } from "../const/data";

const ITEMS_PER_PAGE = 15;

export const About = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const currentImages = images.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <>
            <h1 className="text-6xl font-bold text-center my-10">オウム図鑑</h1>
            <div className="flex flex-wrap w-4/5 mx-auto gap-4">
                {currentImages.map((image) => (
                    <div
                        key={image.name}
                        className="w-40 h-48 bg-gray-200 border-2 border-gray-300 rounded-lg m-2 flex flex-col items-center justify-center"
                    >
                        <img src={image.default} alt="Parrot" className="w-full h-full object-cover" />
                        <p className="mt-2 text-center text-xs font-bold">{image.name}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handleClick(index + 1)}
                        className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-green-900 text-white' : 'bg-white text-green-900'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
};
