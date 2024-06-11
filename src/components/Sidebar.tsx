// import React from 'react'
import { FaDatabase } from "react-icons/fa6";
import { IoIosGitNetwork } from "react-icons/io";
import { BsHddNetwork } from "react-icons/bs";
import { VscGraphLine } from "react-icons/vsc";
import { Link } from "react-router-dom";
// type Props = {}

function Sidebar() {
  return (
    <>
      <div className="w-[15vw] bg-slate-600 min-h-[100vh] text-white border-r fixed ">
        {/* <div className="grid justify-center xl:mb-3">
          <a href='/demo'>
            <img src="/assets/logo.png" className="w-[140px]" alt="" />
          </a>
        </div> */}
        <div className="xl:pl-10 pl-5">
          <ul className='grid grid-cols-1'>
            <li>
              <Link
                className='pl-5 pt-5 pb-5 mb-5 flex'
                to='/kernel'>
                <FaDatabase className="text-2xl" /> <p className='text-xl'>&nbsp;Dataset</p>
              </Link>
            </li>
            <li>
              <Link 
                className='pl-5 pt-5 pb-5 mb-5 flex'
                to='/model'>
                <IoIosGitNetwork className="text-2xl" /><p className='text-xl'> &nbsp; Model</p>
              </Link>
            </li>
            <li>
              <Link
                className='pl-5 pt-5 pb-5 mb-5 flex'
                to='/traintest'>
                <BsHddNetwork className="text-2xl" /> <p className='text-xl'>&nbsp;Train & Test</p>
              </Link>
            </li>
            <li>
              <Link 
                className='pl-5 pt-5 pb-5 flex'
                to='/visualize'>
                <VscGraphLine className="text-2xl" /><p className='text-xl'>&nbsp; Visualize</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar
