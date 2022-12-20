import React from 'react'
import { IconType } from 'react-icons'

interface InputButtonProps {
	onClick?: () => void;
	Icon?: IconType;
	title?: string;
	className?: string;
	type?: "button" | "submit" | "reset" | undefined
}

export function InputButton({ onClick, Icon, title, className, type }: InputButtonProps) {
	return (
		<button
			type={type}
			onClick={() => onClick?onClick():{}}
			className={`
				py-1 px-1.5 
				flex justify-center items-center rounded-lg
        		hover:opacity-90 active:opacity-80 
			` + className}
		>
			{
				title ?
					<>
						{title}
						<span className="ml-2" >
							{Icon && <Icon width={20} />}
						</span>
					</>
					:
					<>{Icon && <Icon width={20} />}</>
			}

		</button>
	)
}
