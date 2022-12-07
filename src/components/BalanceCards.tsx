import {IoIosArrowForward} from 'react-icons/io'
import { IconType } from 'react-icons'

interface BalanceCardsProps {
  Icon: IconType,
  title: string;
  value: string;
  color: 'blue' | 'red' | 'green' | 'cyan' ,
  clickable?: boolean;
}

const colors = {
  blue: 'bg-blue-600 ',
  red: 'bg-red-600 ',
  green: 'bg-green-600 ',
  cyan: 'bg-cyan-600 ',
}

export function BalanceCards({Icon, title, value, color, clickable = false}:BalanceCardsProps){
  return (
    <div 
      className={`
        h-20 p-4
        text-white-500
        bg-purple-400 
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
        <div className='flex flex-row justify-start items-center text-xs'>
          <span className='mr-1' >{title}</span>
          <IoIosArrowForward/>
        </div>
        <div
          className='text-xl font-bold'
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
        `}
      >
        <Icon/>
      </div>

    </div>
  )
}
