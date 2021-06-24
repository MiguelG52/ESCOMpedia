import React from 'react'

const Card = ({label1, label2,icon}) => {
    return (
        <div className="bg-white flex flex-col items-center md:flex-row md:justify-between md:w-full h-40 rounded-2xl">
            <div className="flex items-center justify-start p-2">
                 <div className="bg-blue-500 p-2 md: md:p-3 rounded-full">
                    <img className="h-8 w-8 md:full" src={icon} alt={icon}/>
                </div>
            </div>
            <div className="flex items-center justify-end m-10">
                <div className="md:text-2xl flex flex-col items-center">
                    <p className=" font-semibold ">{label1}</p>
                    <p className="">{label2}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;