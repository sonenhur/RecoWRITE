import React from 'react'
import main from '../src/assets/images/main.png'
import receipt from '../src/assets/images/receipt.jpg'
import recognize from '../src/assets/images/recognize.png'
import mockup from '../src/assets/images/mockup.png'

export default function Home() {
    return (
        <main>
            <img src={main} className='w-screen' />
            {/* <div className='w-2/3 mx-auto'>
                <h1 className='mt-28 pb-1 text-[#1454FB] font-extrabold text-xl'>업로드</h1>
                <h2 className='py-1 text-4xl font-bold'>수기 영수증</h2>
                <h2 className='py-1 text-4xl font-bold'>간편하게 업로드만</h2>
                <h2 className='py-1 text-4xl font-bold'>해주세요.</h2>
            </div>
            <div className='w-2/3 h-24 mt-10 bg-sky-200 mx-auto rounded-md flex justify-center items-center'>
                <div className='w-3/4 rounded-md bg-white  flex justify-between items-center'>
                    <div className='ml-6 text-slate-500'>파일 업로드 주소</div>
                    <div className='px-4 py-2 text-xl rounded-md bg-[#1454FB] text-white'>파일 첨부</div>
                </div>
            </div>
            <div className='w-2/3 mx-auto mb-10'>
                <div className='mt-10 flex justify-around'>
                    <div className='w-2/5 shadow-lg rounded-lg border-2 border-slate-200'>
                        <img src={receipt} className='p-10' />
                    </div>
                    <div className='w-2/5 shadow-lg rounded-lg border-2 border-slate-200'>
                        <img src={recognize} className='p-10 w-full' />
                    </div>
                </div>
                <div className='mt-10 rounded-md bg-slate-100'>
                    <div className='flex justify-between pt-10 md:flex-col md:mr-0 sm:flex-col'>
                        <div className='flex justify-evenly w-9/12 md:w-full sm:w-full'>
                            <div className='w-2/5 bg-[#1454FB] py-2 flex justify-evenly rounded-lg shadow-lg sm:flex-col'>
                                <h1 className='text-white sm:text-center'>거래일</h1>
                                <h2 className='bg-white w-3/4 text-center rounded-full sm:w-full sm:rounded-none sm:mt-2'>22년 6월 27일</h2>
                            </div>
                            <div className='w-2/5 bg-[#1454FB] py-2 flex justify-evenly rounded-lg shadow-lg sm:flex-col'>
                                <h1 className='text-white sm:text-center'>업체명</h1>
                                <h2 className='bg-white w-3/4 text-center rounded-full sm:w-full sm:rounded-none sm:mt-2'>초코파이</h2>
                            </div>
                        </div>
                        <div className='flex w-1/5 justify-evenly mr-12 md:mt-4 md:w-full md:justify-end sm:w-full sm:justify-evenly sm:mt-4'>
                            <h1 className='w-2/5 text-center py-2 text-base rounded-md bg-blue-600 text-white md:w-1/5 md:mr-6 sm:w-2/5'>행 추가</h1>
                            <h1 className='w-2/5 text-center py-2 text-base rounded-md bg-blue-600 text-white md:w-1/5 md:mr-10 sm:w-2/5'>다운로드</h1>
                        </div>
                    </div>
                    <div className='flex justify-center mx-auto mt-4 w-10/12 pb-10'>
                        <div className='w-1/2 border-r-2 border-[#1454FB]'>
                            <h1 className='bg-[#1454FB] border-s-2 border-[#1454FB] text-white text-center py-3 rounded-ss-lg'>물품</h1>
                            <h2 className='bg-white border-b-2 border-s-2 border-[#1454FB] text-black py-1 text-center'>동백나시ops/곤</h2>
                            <h2 className='bg-white border-b-2 border-s-2 border-[#1454FB] text-black py-1 text-center'>동백나시ops/아</h2>
                            <h2 className='bg-white border-b-2 border-s-2 border-[#1454FB] text-black py-1 text-center'>핑크동백나시ops/곤</h2>
                            <h2 className='bg-white border-b-2 border-s-2 border-[#1454FB] text-black py-1 text-center'>핑크동백나시ops/아</h2>
                            <h2 className='bg-white border-b-2 border-s-2 border-[#1454FB] text-black py-1 text-center'>와이밍고ops/민</h2>
                            <h2 className='bg-white border-b-2 border-s-2 border-[#1454FB] text-black py-1 text-center rounded-es-lg'>와이밍고ops/핑</h2>
                        </div>
                        <div className='flex-grow border-r-2 border-[#1454FB]'>
                            <h1 className='bg-[#1454FB] text-white text-center py-3'>수량</h1>
                            <h2 className='bg-white border-b-2 border-[#1454FB] text-black py-1 text-center'>10</h2>
                            <h2 className='bg-white border-b-2 border-[#1454FB] text-black py-1 text-center'>2</h2>
                            <h2 className='bg-white border-b-2 border-[#1454FB] text-black py-1 text-center'>10</h2>
                            <h2 className='bg-white border-b-2 border-[#1454FB] text-black py-1 text-center'>10</h2>
                            <h2 className='bg-white border-b-2 border-[#1454FB] text-black py-1 text-center'>10</h2>
                            <h2 className='bg-white border-b-2 border-[#1454FB] text-black py-1 text-center'>1</h2>
                        </div>
                        <div className='w-1/5 border-r-2 border-[#1454FB]'>
                            <h1 className='bg-[#1454FB] text-white text-center py-3'>단가</h1>
                            <h2 className='bg-white border-b-2 border-[#1454FB] text-black py-1 text-center'>9,000</h2>
                            <h2 className='bg-white border-b-2 border-[#1454FB] text-black py-1 text-center'>9,000</h2>
                            <h2 className='bg-white border-b-2 border-[#1454FB] text-black py-1 text-center'>9,000</h2>
                            <h2 className='bg-white border-b-2 border-[#1454FB] text-black py-1 text-center'>9,000</h2>
                            <h2 className='bg-white border-b-2 border-[#1454FB] text-black py-1 text-center'>10,000</h2>
                            <h2 className='bg-white border-b-2 border-[#1454FB] text-black py-1 text-center'>10,000</h2>
                        </div>
                        <div className='w-1/5'>
                            <h1 className='bg-[#1454FB] border-e-2 border-[#1454FB] text-white text-center py-3 rounded-se-lg'>가격</h1>
                            <h2 className='bg-white border-b-2 border-e-2 border-[#1454FB] text-black py-1 text-center'>90,000</h2>
                            <h2 className='bg-white border-b-2 border-e-2 border-[#1454FB] text-black py-1 text-center'>18,000</h2>
                            <h2 className='bg-white border-b-2 border-e-2 border-[#1454FB] text-black py-1 text-center'>90,000</h2>
                            <h2 className='bg-white border-b-2 border-e-2 border-[#1454FB] text-black py-1 text-center'>90,000</h2>
                            <h2 className='bg-white border-b-2 border-e-2 border-[#1454FB] text-black py-1 text-center'>100,000</h2>
                            <h2 className='bg-white border-b-2 border-e-2 border-[#1454FB] text-black py-1 text-center rounded-ee-lg'>10,000</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-slate-100'>
                <div className='w-2/3 mx-auto py-10'>
                    <div className='flex justify-center items-center'>
                        <div className='w-1/3'>
                            <h1 className='text-[#1454FB] font-extrabold text-xl'>알림</h1>
                            <h2 className='py-1 text-4xl font-bold'>스캔 및 수정</h2>
                            <h2 className='py-1 text-4xl font-bold'>완료시 회사별</h2>
                            <h2 className='py-1 text-4xl font-bold'>메시지 알림</h2>
                        </div>
                        <img src={mockup} className='w-52' />
                    </div>
                </div>
            </div>
            <div className='w-2/3 mx-auto py-10'>

            </div> */}
        </main>
    )
}
