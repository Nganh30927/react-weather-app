
import {FaCaretLeft, FaSistrix,FaCalendarWeek} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
         <ul className='flex text-black justify-center gap-6'>
              <li className=' p-1 hover:bg-slate-600 hover:text-white active:bg-slate-700 rounded-full'>
                <Link to="/"><FaCaretLeft/></Link>
              </li>
              <li className=' p-1 hover:bg-slate-600 hover:text-white active:bg-slate-700 rounded-full'>
               <Link to="/forecastday"><FaCalendarWeek/></Link>
              </li>
              <li className=' p-1 hover:bg-slate-600 hover:text-white active:bg-slate-700 rounded-full'>
               <Link to="/search"><FaSistrix/></Link>
              </li>
           </ul>
    </>
  )
}

export default Footer