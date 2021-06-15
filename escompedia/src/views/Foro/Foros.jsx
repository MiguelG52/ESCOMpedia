import React from 'react'
import {Link} from 'react-router-dom'

const Foros = ({label, icon, enlace, cursor}) => {
    return (
        <div className="flex justify-between w-full pl-5 pr-5 border-b pb-1">
            <div className="flex items-center gap-4">   
                <div className="bg-blue-500 w-7 h-7 rounded-full flex items-center justify-center">
                    <img className="w-5 h-5" src={icon} alt={icon}/>
                </div>
                <p className="text-xl">{label}</p>
            </div>
            <div className="flex items-center">
                <Link to={enlace}>
                    <img className="transform w-6 h-6 hover:scale-125 transition-all ease-in-out duration-300" src={cursor} alt={cursor}/>
                </Link>
            </div>
        </div>
    )
}

export default Foros
