import React from 'react'

export const Card = ({pokemon}) => {
  const {id, name, pictureUrl} = pokemon;

  return (
    <div 
      className="
        w-64 
        justify-self-center 
        bg-white 
        mb-4 
        p-3 
        rounded-xl
        cursor-pointer
        hover:bg-red-500
        hover:text-white
        transform hover:scale-105 transition duration-300 ease-in-out"
    >
        <div className='flex justify-center items-center bg-[#ffcc01] w-10 h-10 rounded-full'><p>#{id}</p></div>
        <p className='text-xl font-bold uppercase'>{name}</p>
        <img src={pictureUrl} alt="pokemon img" />
    </div>
  )
}
