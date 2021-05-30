import React from 'react'

export const Input = ({id, name, placeholder, type, label}) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                name={name}
            />
        </div>
    )
}
