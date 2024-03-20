import React, { useEffect, useState } from 'react'
import { receiveData } from './atom'
import { useRecoilValue } from 'recoil'

export default function Print() {

    const rd = useRecoilValue(receiveData);
    console.log("receiveData : ", rd)

    const [rdm, setRdm] = useState();

    // const [unitPrice, setUnitPrice] = useState('');

    // const handleUnitPriceChange = (e) => {
    //     const value = e.target.value;
    //     if (!isNaN(value)) {
    //       setUnitPrice(value);
    //     }
    //   };

    // const handlesave = () => {

    // }

    return (
        <main>
            <div className='flex flex-col items-center'>
                <div className='w-2/3 rounded-3xl bg-[#F1F1F1] mt-20'>
                    <div className='mt-10 flex justify-evenly items-center'>
                        <div className='w-1/3'>
                            <img className='rounded-lg mb-10' src={rd.content.body.image} alt="영수증 이미지" />
                        </div>
                        <div className='w-3/5 flex flex-col mb-10 bg-white rounded-lg'>
                            <div className='w-11/12 mx-auto flex justify-between mt-5'>
                                <button type="button" className='w-1/6 bg-[#1454FB] text-white rounded-md py-1 border-2 border-[#1454FB] hover:bg-white hover:text-[#1454fb]'>행 추가</button>
                                <button type="button" 
                                // onClick={handlesave}
                                 className='w-1/6 bg-[#1454FB] text-white rounded-md py-1 border-2 border-[#1454FB] hover:bg-white hover:text-[#1454fb]'>저장하기</button>
                            </div>
                            <div className='w-11/12 mx-auto'>
                                <div className='flex mt-5 justify-between'>
                                    <div className='bg-[#1454fb] text-white w-2/5 py-1 flex items-center rounded-lg shadow-md justify-evenly'>
                                        거래일
                                        <div className='bg-white text-black w-2/3 text-center rounded-lg'>
                                            {rd.content.body.tradeAt}
                                        </div>
                                    </div>
                                    <div className='bg-[#1454fb] text-white w-2/5 py-1 flex items-center rounded-lg shadow-md justify-evenly'>
                                        업체명
                                        <div className='bg-white text-black w-2/3 text-center rounded-lg'>
                                            {rd.content.body.company}
                                        </div>
                                    </div>
                                </div>
                                <table className='w-full mt-5 mb-10 bg-blue-500 rounded-lg'>
                                    <thead className='bg-[#1454fb] text-white'>
                                        <tr>
                                            <th scope='col' className='w-1/2 py-2   rounded-ss-lg'>
                                                물품
                                            </th>
                                            <th scope='col' className='w-1/12 py-2  '>
                                                수량
                                            </th>
                                            <th scope='col' className=' py-2  '>
                                                단가
                                            </th>
                                            <th scope='col' className=' py-2 rounded-se-lg'>
                                                가격
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        {
                                            rd.content.body.items.map((item, idx) =>
                                                <tr className=' text-center bg-white' key={`tr${idx}`}>
                                                    <td className='py-2 border-b-2 border-t-2 border-gray-300'>
                                                        <input id='item' type='text' defaultValue={item.item} className='w-2/3 text-center' />
                                                    </td>
                                                    <td className='py-2 border-b-2 border-t-2 border-gray-300'>
                                                        <input id='item' type='number' defaultValue={item.quantity} className='w-full text-center' />
                                                    </td>
                                                    <td className='py-2 border-b-2 border-t-2 border-gray-300'>
                                                        <input id='item' type='text' defaultValue={parseInt(item.unitPrice).toLocaleString('ko-KR')} className='w-2/3 text-center' />
                                                    </td>
                                                    <td className='py-2 border-b-2 border-t-2 border-gray-300'>
                                                        <input id='item' type='text' defaultValue={parseInt(item.price).toLocaleString('ko-KR')} className='w-2/3 text-center' />
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* {rdm} */}
            
        </main>
    )
}
