import React from 'react'

const img = ({img, id}) => {
    return (
        <div key={id} className="transform bg-gray-500 h-32 w-32 flex items-center justify-center rounded-2xl hover:scale-110 hover:transition-all ease-in-out duration-300">
            <img className="w-24" src={img} alt={img}/>
        </div>
    )
}

export default img
