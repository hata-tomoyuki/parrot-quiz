import React from 'react'

export const Gallary = ({ image, parrotsMessage1, parrotsMessage2, parrotsMessage3, parrotsMessage4 }) => {
    return (
        <div className="flex flex-col justify-between items-center w-full max-w-screen-md mt-[-4%]">
            <div className="flex items-center justify-between w-[80%]">
                <div className='relative'>
                    <span className="text-4xl font-bold absolute top-16 left-4">{parrotsMessage1}</span>
                    <img src={image} alt="Parrot" className="w-52" />
                </div>
                <div className='relative'>
                    <span className="text-4xl font-bold absolute top-16 right-4">{parrotsMessage2}</span>
                    <img src={image} alt="Parrot" className="w-52 scale-x-[-1] " />
                </div>
            </div>
            <div className="flex items-center justify-between w-full">
                <div className='relative'   >
                    <span className="text-4xl font-bold absolute top-16 left-4">{parrotsMessage3}</span>
                    <img src={image} alt="Parrot" className="w-52" />
                </div>
                <div className='relative'>
                    <span className="text-4xl font-bold absolute top-16 right-4">{parrotsMessage4}</span>
                    <img src={image} alt="Parrot" className="w-52 scale-x-[-1]" />
                </div>
            </div>
        </div>
    )
}

