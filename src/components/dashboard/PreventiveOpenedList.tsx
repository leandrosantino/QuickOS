import { ScrollContainer } from "../containers/ScrollContainer";
import { BsPrinterFill } from 'react-icons/bs'


interface Props {
  filters?: {
    day: number;
    month: number;
    year: number;
  }
}

const data = [
  { id: 452, tag: 'M41' },
  { id: 502, tag: 'M42' },
  { id: 435, tag: 'M23' },
  { id: 425, tag: 'M22' },
  { id: 436, tag: 'M36' },
  { id: 503, tag: 'M04' },
  { id: 460, tag: 'M06' },
  { id: 421, tag: 'M12' },
  { id: 423, tag: 'M40' },
]


export function PreventiveOpenedList({ filters }: Props) {

  function selectPreventive(id:number){
    console.log(id)
  }

  return (
    <div
      className='
        w-[93%] h-[90%]
      '
    >
      <div
        className='
            w-full h-6 rounded-md
            bg-gray-500
            flex flex-row justify-center items-center
            text-gray-200 font-medium
        '
      >
        <div className='w-1/3 h-full align-middle text-center' >Número</div>
        <div className='w-1/3 h-full align-middle text-center' >Máquina</div>
        <div className='w-1/3 h-full' ></div>

      </div>

      <ScrollContainer
        className='
          w-full h-[87%] max-h-[165px] mt-2
        '
      >
        {
          data.map(({ id, tag }, index) => (
            <div
              key={index}
              className='
                w-full py-1
                flex flex-row justify-center items-center
                text-gray-900 font-medium
                border-b-gray-900 border-b
                hover:bg-gray-300 hover:cursor-pointer
              '
              
            >
              <div onClick={()=>selectPreventive(id)} className='w-1/3 h-full text-center' >Nº {id}</div>
              <div onClick={()=>selectPreventive(id)} className='w-1/3 h-full text-center' >{tag}</div>
              <div className='w-1/3 h-full text-center' >
                <button
                  onClick={()=>selectPreventive(5)}
                  className='
                    text-green-600 
                    w-[85%] mr-4 p-1 
                    flex justify-center items-center
                    hover:opacity-90 active:opacity-80
                    
                  '
                >
                  <BsPrinterFill size={25}/>
                </button>
              </div>
            </div>
          ))
        }
      </ScrollContainer>

    </div>
  )
}
