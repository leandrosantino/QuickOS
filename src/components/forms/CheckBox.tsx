import React from 'react'
import Switch from "react-switch";
import theme from '../../theme';

interface InputButtonProps {
    title?: string;
    className?: string;
    type?: "button" | "submit" | "reset" | undefined
    onChange: (value: boolean) => void;
    checked: boolean,
    fontSize?: number
}

export function CheckBox({ title, className, checked, onChange, fontSize }: InputButtonProps) {
    return (
        <div
            className={`
				py-1 px-1.5 
				flex justify-center items-center rounded-lg
			` + className}
        >
            <label
                className='
                    w-full h-full
                    flex justify-center items-center
                '
            >
                <span
                    style={{
                        fontSize
                    }}
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
