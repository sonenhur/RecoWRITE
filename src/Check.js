import React from 'react'

export default function Check() {
    return (
        <main>
            <div className='flex flex-col items-center'>
                <div className='w-2/3 rounded-3xl bg-[#F1F1F1] mt-20'>
                    <div className='my-10 flex flex-col w-3/4 mx-auto'>
                        <div className='border-2 border-[#1454fb] bg-[#1454fb] rounded-md flex justify-between items-center'>
                            <h1 className='text-white ml-5'>상세 검색</h1>
                            <button type="button" className='px-10 bg-white text-[#1454fb] font-bold rounded-md py-1 border-2 border-[#1454FB] hover:bg-[#1454fb] hover:text-white'>검색</button>
                        </div>
                        <div className='mt-5 flex justify-between'>
                            <div className='flex w-1/5 justify-around'>
                                <h1 className='font-bold'>업체명</h1>
                                <div className='bg-white w-2/3 text-center rounded-md shadow-lg'>
                                    받아온 회사명
                                </div>
                            </div>
                            <div className='flex w-1/5 justify-around'>
                                <h1 className='font-bold'>물품명</h1>
                                <div className='bg-white w-2/3 text-center rounded-md shadow-lg'>
                                    받아온 물품명
                                </div>
                            </div>
                            <div className='flex w-2/5 justify-around'>
                                <h1>거래 기간</h1>
                                <div className='bg-white w-2/3 text-center rounded-md shadow-lg'>
                                    받아온 기간
                                </div>
                            </div>
                        </div>
                        <div className='bg-white mt-5 rounded-md'>
                            <table className='w-4/5 mx-auto mt-10 mb-10 border-2 border-l-0 border-r-0 border-[#1454fb]'>
                                <thead className=''>
                                    <tr>
                                        <th scope='col' className='w-2/5 py-2'>
                                            업체명
                                        </th>
                                        <th scope='col' className='w-1/5 py-2'>
                                            총액
                                        </th>
                                        <th scope='col' className='w-2/5 py-2'>
                                            거래기간
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
        </main>
    )
}
