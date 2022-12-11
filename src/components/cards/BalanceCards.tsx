import {IoIosArrowForward} from 'react-icons/io'
import { IconType } from 'react-icons'

interface BalanceCardsProps {
  Icon: IconType,
  title: string;
  value: string;
  color: 'blue' | 'red' | 'green' | 'orange' ,
  clickable?: boolean;
}

const colors = {
  green: 'bg-green-500 ',
  blue: 'bg-green-600',
  red: 'bg-blue-400',
  orange: 'bg-orange-500 ',
}

export function BalanceCards({Icon, title, value, color, clickable = false}:BalanceCardsProps){
  return (
    <div 
      className={`
        h-20 p-4
        text-gray-900
        bg-gray-400 
        rounded-2xl
        flex flex-row
        items-center
        justify-between
        shadow-md 
        ${clickable?
          'cursor-pointer active:opacity-95':
          ''
        }
      `} 
    >

      <div className='flex flex-col justify-center items-start'>
        <div className='flex flex-row justify-start items-center text-sm '>
          <span className='mr-1 font-medium' >{title}</span>
          <IoIosArrowForward/>
        </div>
        <div
          className='text-2xl font-bold'
        >
          {value}
        </div>
      </div>

      <div
        className={`
          w-10 h-10 
          ${colors[color]}
          rounded-[20px] 
          flex justify-center
          items-center
          text-xl
          text-gray-900
        `}
      >
        <Icon/>
      </div>

    </div>
  )
}
