import React, { useState, useEffect, useRef } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom';
import { receiveData, useUpdateRd } from './atom'
import { userToken } from './atom';

export default function Print() {

    const [rd, setReceiveData] = useRecoilState(receiveData);
    const token = useRecoilValue(userToken);
    const updateRd = useUpdateRd();
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    console.log("receiveData : ", rd)
    const navigate = useNavigate();

    const rowbut = 'w-5/12 bg-[#1454FB] text-white rounded-md py-1 border-2 border-[#1454FB] hover:bg-white hover:text-[#1454fb]';
    const tdst = 'py-2 border-b-2 border-t-2 border-gray-300';

    const itemRefs = useRef([]);
    const unitPriceRefs = useRef([]);
    const quantityRefs = useRef([]);
    const priceRefs = useRef([]);
    const tradeAtRef = useRef();
    const companyRef = useRef();
    const imageRef = useRef();
    const sumRef = useRef();

    const setItemRef = (index, element) => {
        itemRefs.current[index] = element;
    };
    const setUnitPriceRef = (index, element) => {
        unitPriceRefs.current[index] = element;
    };
    const setQuantityRef = (index, element) => {
        quantityRefs.current[index] = element;
    };
    const setPriceRef = (index, element) => {
        priceRefs.current[index] = element;
    };

    const handlesave = () => {
        const updatedItemList = rd.content.body.items.map((item, index) => ({
            ...item,
            item: itemRefs.current[index].value,
            unitPrice: unitPriceRefs.current[index].value.replace(/,/g, ''),
            quantity: quantityRefs.current[index].value,
            price: priceRefs.current[index].value.replace(/,/g, '')
        }));

        updateRd({
            ...rd,
            content: {
                ...rd.content,
                body: {
                    ...rd.content.body,
                    items: updatedItemList,
                    company: companyRef.current.value,
                    tradeAt: tradeAtRef.current.value,
                    sum: parseInt(sumRef.current.value.replace(/,/g, ''))
                }
            }
        });

        fetch('http://10.125.121.183:8080/receipt/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({
                itemList: updatedItemList,
                company: companyRef.current.value,
                tradeAt: tradeAtRef.current.value,
                image: imageRef.current.src,
                sum: parseInt(sumRef.current.value.replace(/,/g, ''))
            }),
        })
            .then(data => {
                console.log("성공:", data);
                alert('저장 되었습니다');
                navigate("/Check");
            })
            .catch(error => {
                console.log("실패:", error);
                alert('저장에 실패하였습니다');
            });
    };

    const handleRowClick = (index) => {
        setSelectedRowIndex(index);
    };

    const handleplus = () => {
        const newItem = { item: '', unitPrice: 0, quantity: 0, price: 0 };

        if (selectedRowIndex !== null) {
            const updatedItems = [
                ...rd.content.body.items.slice(0, selectedRowIndex + 1),
                newItem,
                ...rd.content.body.items.slice(selectedRowIndex + 1)
            ];

            setReceiveData({
                ...rd,
                content: {
                    ...rd.content,
                    body: {
                        ...rd.content.body,
                        items: updatedItems
                    }
                }
            });
        } else {
            setReceiveData({
                ...rd,
                content: {
                    ...rd.content,
                    body: {
                        ...rd.content.body,
                        items: [...rd.content.body.items, newItem]
                    }
                }
            });
        }
    };

    const handledelete = () => {
        if (selectedRowIndex !== null) {
            const updatedItems = [...rd.content.body.items];
            updatedItems.splice(selectedRowIndex, 1);
            updateRd({
                ...rd,
                content: {
                    ...rd.content,
                    body: {
                        ...rd.content.body,
                        items: updatedItems
                    }
                }
            });
            setSelectedRowIndex(null);
        } else {
            alert('삭제할 행을 선택하세요');
        }
    };

    const numberInput = (e, index, type) => {
        const value = e.target.value.replace(/[^\d]/g, '');
        e.target.value = value;

        if (type === 'unitPrice' || type === 'quantity') {
            const unitPrice = parseInt(unitPriceRefs.current[index].value.replace(/,/g, ''), 10) || 0;
            const quantity = parseInt(quantityRefs.current[index].value.replace(/,/g, ''), 10) || 0;
            const price = unitPrice * quantity;
            priceRefs.current[index].value = price.toLocaleString('ko-KR');

            updateSumRef();
        }
    };

    const formatNumber = (e) => {
        const value = e.target.value.replace(/[^\d]/g, '');
        if (!isNaN(value) && value !== '') {
            e.target.value = parseInt(value, 10).toLocaleString('ko-KR');
        }
    }

    const updateSumRef = () => {
        let sum = 0;
        rd.content.body.items.forEach((item, index) => {
            const priceInput = priceRefs.current[index];
            if (priceInput) {
                const price = parseInt(priceInput.value.replace(/,/g, ''), 10);
                if (!isNaN(price)) {
                    sum += price;
                }
            }
        });
        sumRef.current.value = sum.toLocaleString('ko-KR');
    };

    const priceChange = (e, index) => {
        updateSumRef();
    };

    useEffect(() => {
        updateSumRef();
    }, [rd.content.body.items])
    console.log("Asdas", rd.content.body)

    return (
        <main className='bg-main bg-cover h-screen relative'>
            <div className='absolute w-full h-full bg-black opacity-30'></div>
            <div className='relative z-10 flex flex-col items-center'>
                <div className='w-2/3 h- rounded-3xl bg-[#F1F1F1] mt-20 mb-10'>
                    <div className='mt-10 flex justify-evenly'>
                        <div className='w-1/3 '>
                            <img className='rounded-lg mb-10' src={rd.content.body.image} ref={imageRef} alt="영수증 이미지" />
                        </div>
                        <div className='w-3/5 flex flex-col pb-10 mb-10 bg-white rounded-lg'>
                            <div className='w-11/12 mx-auto flex justify-between mt-5'>
                                <div className='w-1/4 flex justify-between'>
                                    <button type="button" onClick={handleplus} className={rowbut}>행 추가</button>
                                    <button type="button" onClick={handledelete} className={rowbut}>행 삭제</button>
                                </div>
                                <button type="button"
                                    onClick={handlesave}
                                    className='w-1/6 bg-[#1454FB] text-white rounded-md py-1 border-2 border-[#1454FB] hover:bg-white hover:text-[#1454fb]'>
                                    저장하기</button>
                            </div>
                            <div className='w-11/12 mx-auto'>
                                <div className='flex mt-5 justify-between'>
                                    <div className='bg-[#1454fb] text-white w-2/5 py-1 flex items-center rounded-lg shadow-md justify-evenly'>
                                        거래일
                                        <div className='bg-white text-black w-2/3 text-center rounded-lg'>
                                            <input type="date" className="w-full text-center rounded-lg"
                                                defaultValue={rd.content.body.tradeAt} ref={tradeAtRef} />
                                        </div>
                                    </div>
                                    <div className='bg-[#1454fb] text-white w-2/5 py-1 flex items-center rounded-lg shadow-md justify-evenly'>
                                        업체명
                                        <div className='bg-white text-black w-2/3 text-center rounded-lg'>
                                            <input type="text" className="w-full text-center rounded-lg"
                                                defaultValue={rd.content.body.company} ref={companyRef} />
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
                                            <tr className='text-center bg-white' key={`tr${idx}`} onClick={() => handleRowClick(idx)}>
                                                <td className={tdst}>
                                                    <input id='item' className='w-2/3 text-center'
                                                        type='text' defaultValue={item.item} ref={el => setItemRef(idx, el)} />
                                                </td>
                                                <td className={tdst}>
                                                    <input id='unitPrice' type='text' defaultValue={parseInt(item.unitPrice).toLocaleString('ko-KR')}
                                                        ref={el => setUnitPriceRef(idx, el)} className='w-2/3 text-center' onChange={(e) => numberInput(e, idx, 'unitPrice')} onBlur={formatNumber} />
                                                </td>
                                                <td className={tdst}>
                                                    <input id='quantity' type='text' defaultValue={item.quantity}
                                                        ref={el => setQuantityRef(idx, el)} className='w-full text-center' onChange={(e) => numberInput(e, idx, 'quantity')} />
                                                </td>
                                                <td className={tdst}>
                                                    <input id='price' type='text' defaultValue={parseInt(item.price).toLocaleString('ko-KR')}
                                                        ref={el => setPriceRef(idx, el)} className='w-2/3 text-center' readOnly />
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div className='w-full bg-[#1454fb] text-white py-1 flex items-center rounded-b-lg shadow-md justify-end'>
                                    <div className='flex justify-evenly'>
                                        <h1>총액</h1>
                                        <div className='bg-white text-black w-1/2 text-center rounded-lg'>
                                            <input type="text" defaultValue={(rd.content.body.sum ? rd.content.body.sum.toLocaleString('ko-KR') : 0)}
                                                ref={sumRef} className="w-full text-center rounded-lg" onChange={numberInput} />
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
