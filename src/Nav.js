import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import logo from '../src/assets/images/logo_white.png'


export default function Nav() {

    const location = useLocation();

    const navClass = location.pathname === '/' 
                        ? 'w-full flex justify-center absolute top-0 text-white bg-gray-950/80' 
                        : 'w-full flex justify-center text-white bg-gray-950/80';
    const linkClass = 'p-4 mr-4 font-bold hover:bg-[#1454FB]';
    
    const kakao_key = process.env.KAKAO_API_KEY; // REST 키값
    const kakao_uri = process.env.KAKAO_REDIRECT_URI;

    const kakaologin = () => {
        // window.location.href = `http://kauth.kakao.com/oauth/authorize?client_id=${kakao_key}&redirect_uri=${kakao_uri}&response_type=code`;
        window.location.href = "http://10.125.121.183:8080/oauth2/authorization/kakao";
    };

    const naverlogin = () =>{
        window.location.href = "http://10.125.121.183:8080/oauth2/authorization/naver"
    }

    return (
        <div className={navClass}> 
            <nav className='w-2/3 m-auto flex justify-between sm:w-5/6'>
                <Link to="/"><img src={logo} className='py-2 object-contain'/></Link>
                <div className='flex justify-end items-center'>
                    <Link to="/Reco" className={linkClass}>영수증 인식</Link>
                    <Link to="/" className={linkClass}>영수증 조회</Link>
                    <button className='p-4 mr-4 font-bold hover:bg-[#f9e000] hover:text-[#371d1e]' onClick={kakaologin}>카카오 로그인</button>
                    <button className='p-4 mr-4 font-bold hover:bg-[#2db400]' onClick={naverlogin}>네이버 로그인</button>
                    <Link to="/" className="px-4"></Link>
                </div>
            </nav>
        </div>
    )
}
