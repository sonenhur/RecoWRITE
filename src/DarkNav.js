import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import logo from "./assets/images/logo_black.png"

export default function DarkNav() {
  return (
    <div className='w-full flex absolute top-0'>
            <nav className='w-2/3 m-auto flex justify-between sm:w-5/6'>
                <Link to="/"><img src={logo} className='py-2 object-contain' /></Link>
                <div className='flex justify-end items-center'>
                    <Link to="/Reco" className="p-4 mr-4 hover:bg-blue-600">영수증 인식</Link>
                    <Link to="/" className="p-4 mr-4 hover:bg-blue-600">영수증 조회</Link>
                    <Link to="/Kakao" className="p-4 mr-4 hover:bg-yellow-400">카카오</Link>
                    <Link to="/Naver" className="p-4 mr-4 hover:bg-green-600">네이버</Link>
                    <Link to="/" className="px-4 hover:bg-blue-600"></Link>
                </div>
            </nav>
        </div>
  )
}
