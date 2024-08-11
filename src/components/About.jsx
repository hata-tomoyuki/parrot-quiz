import React, { useState } from 'react'
import { images } from '../const/data';


export const About = () => {


    return (
        <>
            <h1 className='text-6xl font-bold text-center my-10'>オウム図鑑</h1>
            <div className='flex flex-wrap w-2/3 mx-auto'>
                {images.map((image, index) => (
                    <div key={index} className='w-40 h-40 bg-gray-200 border-2 border-gray-300 rounded-lg m-2 flex items-center justify-center'>
                        <img src={image.default} alt="Parrot" />
                    </div>
                ))}
            </div>
        </>
    );
}
