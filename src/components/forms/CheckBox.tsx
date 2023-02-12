import React from 'react'
import Switch from "react-switch";
import theme from '../../theme';

interface InputButtonProps {
    title?: string;
    className?: string;
    type?: "button" | "submit" | "reset" | undefined
    onChange: (value: boolean) => void;
    checked: boolean
}

export function CheckBox({ title, className, checked, onChange }: InputButtonProps) {
    return (
        <div
            className={`
				py-1 px-1.5 
				flex justify-center items-center rounded-lg
			` + className}
        >
            <label 
                className='
                    w-full
                    flex justify-center items-center
                    
                '
            >
                <span
                    className='p-2 font-medium'
                >{title}:</span>
                <Switch
                    onColor={theme.red[400]}
                    onHandleColor={theme.red[600]}
                    offColor={theme.gray[400]}
                    offHandleColor={theme.gray[500]}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    handleDiameter={20}
                    height={15}
                    width={35}
                    activeBoxShadow={''}
                    onChange={(event) => {
                        onChange(event.valueOf())
                    }}
                    checked={checked}
                />
            </label>
        </div>
    )
}
