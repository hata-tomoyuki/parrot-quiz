import React from 'react'
import { Link } from 'react-router-dom'

export const TopLink = ({ to, title, description }) => {
    return (
        <li className="flex flex-col items-center gap-4 border-2 border-green-900 rounded-lg hover:bg-green-900 group">
            <Link to={to} className="w-full h-full hover:text-gray-500 p-8 group-hover:text-white">
                <h2 className="text-3xl font-bold">{title}</h2>
                <p className='text-xl mt-2'>{description}</p>
            </Link>
        </li>
    )
}
