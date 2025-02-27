import React from 'react'
import {twMerge} from 'tailwind-merge'
interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

export const Button = React.forwardRef<HTMLButtonElement,ButtonProps>(({
    className,
    children,
    disabled,
    type="button",
    ...props
},ref)=>{
    return(
        <button type={type}
        className={twMerge(`
        w-full
        rounded-full
        bg-green-500
        border
        border-transparent
        px-3
        py-3
        disabled:cursor-not-allowed
        disabled:opasity-50
        hover:opacity-75
        font-bold
        text-black
        transition
         `,className)}
         disabled={disabled}
         ref={ref}
         {...props}
        >{children}</button>
    )
})
Button.displayName = 'Button'
