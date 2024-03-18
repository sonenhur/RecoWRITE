import React from 'react'

export default function Print() {
    return (
        <main>
            <div className='flex flex-col items-center'>
                <div className='w-2/3 rounded-3xl bg-[#F1F1F1] mt-20'>
                    <div className='mt-10 flex justify-around items-center'>
                        <div className='w-1/5'>
                            <div className='w-full bg-yellow-400'>영수증 자리</div>
                        </div>
                        <div className='w-3/5 flex flex-col'>
                            <div className='w-full flex justify-between mt-5'>
                                <button type="button" className='w-1/6 bg-[#1454FB] text-white rounded-md py-1 border-2 border-[#1454FB] hover:bg-white hover:text-[#1454fb]'>행 추가</button>
                                <button type="button" className='w-1/6 bg-[#1454FB] text-white rounded-md py-1 border-2 border-[#1454FB] hover:bg-white hover:text-[#1454fb]'>다운로드</button>
                            </div>
                            <div className='w-full'>
                                <div className='flex mt-5 justify-between'>
                                    <div className='bg-[#1454fb] text-white w-2/5 py-1 flex items-center rounded-lg shadow-md justify-evenly'>
                                        거래일
                                        <div className='bg-white text-black w-2/3 text-center rounded-full'>
                                            받아올 날짜
                                        </div>
                                    </div>
                                    <div className='bg-[#1454fb] text-white w-2/5 py-1 flex items-center rounded-lg shadow-md justify-evenly'>
                                        업체명
                                        <div className='bg-white text-black w-2/3 text-center rounded-full'>
                                            받아올 업체명
                                        </div>
                                    </div>
                                </div>
                                <table className='w-full mt-5 mb-10 bg-blue-500 rounded-lg'>
                                    <thead className='bg-[#1454fb] text-white'>
                                        <tr>
                                            <th scope='col' className='w-3/5 py-2 border-r-2 border-white rounded-ss-lg'>
                                                물품
                                            </th>
                                            <th scope='col' className='w-1/12 py-2 border-r-2 border-white'>
                                                수량
                                            </th>
                                            <th scope='col' className=' py-2 border-r-2 border-white'>
                                                단가
                                            </th>
                                            <th scope='col' className=' py-2 rounded-se-lg'>
                                                가격
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        {/* {trs} */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
