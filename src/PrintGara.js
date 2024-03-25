import React, { useEffect, useState, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom';
import { receiveData } from './atom'
import { userToken } from './atom';

export default function Print() {

    const rd = useRecoilValue(receiveData);
    const token = useRecoilValue(userToken);
    // console.log("receiveData : ", rd)
    const navigate = useNavigate();

    const itemRef = useRef();
    const unitPriceRef = useRef();
    const quantityRef = useRef();
    const priceRef = useRef();
    const tradeAtRef = useRef();
    const companyRef = useRef();
    const imageRef = useRef();
    const sumRef = useRef();

    const [rdm, setRdm] = useState();
    
    const handlesave = () => {
        const itemList = rd.content.body.items;
        console.log("itemlist", itemList)
        console.log("이미지", imageRef.current.src);
    
        fetch('http://10.125.121.183:8080/receipt/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({
                itemList: itemList,
                company: companyRef.current.value,
                tradeAt: tradeAtRef.current.value,
                image: imageRef.current.src,
                sum: parseInt(sumRef.current.value)
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("성공:", data);
                alert('저장 되었습니다');
                navigate("/UploadGara");
            })
            .catch(error => {
                console.log("실패:", error);
                alert('저장에 실패하였습니다');
            });
    };

    const handleplus = () =>{
        const newItem = {
            item: '',
            unitPrice: 0,
            quantity: 0,
            price:0
        };

        const updateItem = [...rd.content.body.items, newItem];

        setRdm(prevState => ({
            ...prevState,
            content: {
                ...prevState.content,
                body:{
                    ...prevState.content.body,
                    items: updateItem
                }
            }
        }));
    }

    return (
        <main>
            <div className='flex flex-col items-center'>
                <div className='w-2/3 rounded-3xl bg-[#F1F1F1] mt-20 mb-10'>
                    <div className='mt-10 flex justify-evenly items-center'>
                        <div className='w-1/3'>
                            <img className='rounded-lg mb-10' src={rd.content.body.image} ref={imageRef} alt="영수증 이미지" />
                        </div>
                        <div className='w-3/5 flex flex-col pb-10 mb-10 bg-white rounded-lg'>
                            <div className='w-11/12 mx-auto flex justify-between mt-5'>
                                <button type="button" onClick={handleplus} className='w-1/6 bg-[#1454FB] text-white rounded-md py-1 border-2 border-[#1454FB] hover:bg-white hover:text-[#1454fb]'>행 추가</button>
                                <button type="button"
                                    onClick={handlesave}
                                    className='w-1/6 bg-[#1454FB] text-white rounded-md py-1 border-2 border-[#1454FB] hover:bg-white hover:text-[#1454fb]'>저장하기</button>
                            </div>
                            <div className='w-11/12 mx-auto'>
                                <div className='flex mt-5 justify-between'>
                                    <div className='bg-[#1454fb] text-white w-2/5 py-1 flex items-center rounded-lg shadow-md justify-evenly'>
                                        거래일
                                        <div className='bg-white text-black w-2/3 text-center rounded-lg'>
                                            <input type="date" defaultValue={rd.content.body.tradeAt} ref={tradeAtRef} className="w-full text-center rounded-lg" />
                                        </div>
                                    </div>
                                    <div className='bg-[#1454fb] text-white w-2/5 py-1 flex items-center rounded-lg shadow-md justify-evenly'>
                                        업체명
                                        <div className='bg-white text-black w-2/3 text-center rounded-lg'>
                                            <input type="text" defaultValue={rd.content.body.company} ref={companyRef} className="w-full text-center rounded-lg" />
                                        </div>
                                    </div>
                                </div>
                                <table className='w-full mt-5 bg-[#1454fb] rounded-lg'>
                                    <thead className='bg-[#1454fb] text-white'>
                                        <tr>
                                            <th scope='col' className='w-1/2 py-2 rounded-ss-lg'>
                                                물품
                                            </th>
                                            <th scope='col' className='py-2'>
                                                단가
                                            </th>
                                            <th scope='col' className='w-1/12 py-2'>
                                                수량
                                            </th>
                                            <th scope='col' className='py-2 rounded-se-lg'>
                                                가격
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rd.content.body.items.map((item, idx) =>
                                            <tr className=' text-center bg-white' key={`tr${idx}`}>
                                                <td className='py-2 border-b-2 border-t-2 border-gray-300'>
                                                    <input id='item' type='text' defaultValue={item.item} ref={itemRef} className='w-2/3 text-center' />
                                                </td>
                                                <td className='py-2 border-b-2 border-t-2 border-gray-300'>
                                                    <input id='item' type='text' defaultValue={parseInt(item.unitPrice).toLocaleString('ko-KR')} ref={unitPriceRef} className='w-2/3 text-center' />
                                                </td>
                                                <td className='py-2 border-b-2 border-t-2 border-gray-300'>
                                                    <input id='item' type='number' defaultValue={item.quantity} ref={quantityRef} className='w-full text-center' />
                                                </td>
                                                <td className='py-2 border-b-2 border-t-2 border-gray-300'>
                                                    <input id='item' type='text' defaultValue={parseInt(item.price).toLocaleString('ko-KR')} ref={priceRef} className='w-2/3 text-center' />
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div className='w-full bg-[#1454fb] text-white py-1 flex items-center rounded-b-lg shadow-md justify-end'>
                                    <div className='flex justify-evenly'>
                                        <h1>총액</h1>
                                        <div className='bg-white text-black w-1/2 text-center rounded-lg'>
                                            <input type="text" defaultValue={(rd.content.body.sum).toLocaleString('ko-KR')} ref={sumRef} className="w-full text-center rounded-lg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
