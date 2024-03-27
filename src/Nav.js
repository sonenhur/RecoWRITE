import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { userToken } from './atom';
import { useRecoilValue } from 'recoil';

import logo from '../src/assets/images/logo_white.png'

export default function Nav() {

    const location = useLocation();

    const Islogin = useRecoilValue(userToken)
    const navigate = useNavigate();

    const navClass = location.pathname === '/'
        ? 'w-full flex justify-center absolute top-0 text-white bg-gray-950/80'
        : 'w-full flex justify-center text-white bg-gray-950/80';
    const linkClass = 'p-4 mr-4 font-bold hover:bg-[#1454FB]';

    return (
        <main className={navClass}>
            <nav className='w-2/3 m-auto flex justify-between'>
                <Link to="/"><img src={logo} className='py-2 object-contain'/></Link>
                <div className='flex justify-end items-center'>
                    <Link to="/Reco" className={linkClass}>영수증 인식</Link>
                    <button type='button' onClick={Islogin ? () => navigate("/Check") : () => { navigate("/Login"); alert("로그인을 먼저 해주세요") }}
                        className={linkClass}>
                        영수증 조회
                    </button>
                    <Link to="/Login" className={linkClass}>{Islogin ? "로그아웃" : "로그인"}</Link>
                </div>
            </nav>
        </main>
    )
}
