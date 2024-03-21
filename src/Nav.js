import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { userToken } from './atom';
import { useRecoilValue } from 'recoil';

import logo from '../src/assets/images/logo_white.png'

export default function Nav() {

    const location = useLocation();

    const Islogin = useRecoilValue(userToken)

    const navClass = location.pathname === '/' 
                        ? 'w-full flex justify-center absolute top-0 text-white bg-gray-950/80' 
                        : 'w-full flex justify-center text-white bg-gray-950/80';
    const linkClass = 'p-4 mr-4 font-bold hover:bg-[#1454FB]';

    return (
        <div className={navClass}> 
            <nav className='w-2/3 m-auto flex justify-between sm:w-5/6'>
                <Link to="/"><img src={logo} className='py-2 object-contain'/></Link>
                <div className='flex justify-end items-center'>
                    <Link to="/UploadGara" className={linkClass}>영수증 인식</Link>
                    <Link to="/Check" className={linkClass}>영수증 조회</Link>
                    <Link to="/Login" className={linkClass}>{Islogin ? "로그아웃" : "로그인"}</Link>
                    <Link to="/" className="px-4"></Link>
                </div>
            </nav>
        </div>
    )
}
