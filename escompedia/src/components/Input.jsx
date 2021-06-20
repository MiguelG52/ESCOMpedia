import React from 'react'

export const Input = ({id, name, placeholder, type, label, onChange, value, handleBlur}) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                value={value}
                onBlur={handleBlur}
            />
        </div>
    )
}
