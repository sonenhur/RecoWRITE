import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { userToken } from './atom'
import * as XLSX from 'xlsx';

export default function Detail() {

    const Islogin = useRecoilValue(userToken);
    const navigate = useNavigate();

    const [detail, setDetail] = useState({ content: { itemList: [] } });
    const { receiptId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://10.125.121.183:8080/receipt/${receiptId}`, {
                    method: 'GET',
                    headers: { Authorization: Islogin }
                });
                const detail = await response.json();
                setDetail(detail);
                console.log("Asf", detail.content.itemList)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const sumPrice = (unitPrice, quantity) => {
        return unitPrice * quantity;
    };

    const handlePriceChange = (index, event) => {
        const inputValue = event.target.value.replace(/[^0-9]/g, '');
        const newUnitPrice = parseInt(inputValue, 10) || 0;

        setDetail(prevDetail => {
            const newDetail = { ...prevDetail };
            const newItem = { ...newDetail.content.itemList[index], unitPrice: newUnitPrice };
            newItem.price = sumPrice(newUnitPrice, newItem.quantity);
            newDetail.content.itemList[index] = newItem;

            return newDetail;
        });
    };

    const handleQuantityChange = (index, event) => {
        const inputValue = event.target.value.replace(/[^0-9]/g, '');
        const newQuantity = parseInt(inputValue, 10) || 0;

        setDetail(prevDetail => {
            const newDetail = { ...prevDetail };
            const newItem = { ...newDetail.content.itemList[index], quantity: newQuantity };
            newItem.price = sumPrice(newItem.unitPrice, newQuantity);
            newDetail.content.itemList[index] = newItem;

            return newDetail;
        });
    };

    const totalItems = detail.content.itemList.length;
    const totalQuantity = detail.content.itemList.reduce((total, item) => total + parseInt(item.quantity), 0);
    const totalPrice = detail.content.itemList.reduce((total, item) => total + item.price, 0);

    const handlesave = async () => {
        const updateItemList = detail.content.itemList.map((item, index) => ({
            ...item,
            item: document.getElementById(`item${index}`).value,
            unitPrice: document.getElementById(`unitPrice${index}`).value.replace(/,/g, ''),
            quantity: document.getElementById(`quantity${index}`).value,
            price: sumPrice(
                parseInt(document.getElementById(`unitPrice${index}`).value.replace(/,/g, ''), 10),
                parseInt(document.getElementById(`quantity${index}`).value, 10)
            )
        }));

        const updateDetail = {
            sum: totalPrice,
            itemList: updateItemList
        };

        const response = await fetch(`http://10.125.121.183:8080/receipt/${receiptId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Islogin
            },
            body: JSON.stringify(updateDetail)
        });
        console.log(updateDetail.content)
        if (response.ok) {
            alert('저장 되었습니다');
            navigate("/Check");
        } else {
            alert('저장에 실패했습니다');
        }
    };

    const downloadExcel = () => {

        const ws = XLSX.utils.json_to_sheet(detail.content.itemList);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        XLSX.writeFile(wb, "detail.xlsx");
    };

    const handledelete = async () => {
        if (window.confirm("영수증을 삭제 하시겠습니까?")) {
            const resp = await fetch(`http://10.125.121.183:8080/receipt/${receiptId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': Islogin
                }
            });
            if (resp.ok) {
                alert("삭제되었습니다");
                navigate("/Check");
            } else {
                alert(`오류: ${resp.status} ${resp.statusText}`);
            }
        }
    };
    console.log()

    const handleBack = () => {
        navigate("/Check");
    }

    return (
        <main className='bg-main bg-cover h-screen relative'>
            <div className='absolute w-full h-full bg-black opacity-30'></div>
            <div className='flex flex-col items-center'>
                <div className='relative z-10 w-2/3 rounded-3xl bg-[#F1F1F1] mt-20'>
                    <div className='my-10 flex flex-col w-3/4 mx-auto'>
                        <div className='border-2 border-[#1454fb] bg-[#1454fb] rounded-md flex justify-between items-center'>
                            <h1 className='text-white ml-5 py-1 font-bold text-xl'>상세 정보</h1>
                        </div>
                        <div className='mt-5 flex justify-evenly'>
                            <div className='bg-[#1454fb] text-white w-1/4 py-1 flex items-center rounded-lg shadow-md justify-evenly'>
                                업체명
                                <div className='bg-white text-black w-2/3 text-center rounded-lg'>
                                    <h1 className="w-full text-center rounded-lg">
                                        {detail && detail.content && detail.content.company}
                                    </h1>
                                </div>
                            </div>
                            <div className='bg-[#1454fb] text-white w-1/3 py-1 flex items-center rounded-lg shadow-md justify-evenly'>
                                거래 기간
                                <div className='bg-white text-black w-2/3 text-center rounded-lg'>
                                    <h1 className="w-full text-center rounded-lg">
                                        {detail && detail.content && detail.content.tradAt}
                                    </h1>
                                </div>
                            </div>
                            <button type="button" onClick={downloadExcel} className='w-1/6 bg-white text-[#1454fb] font-bold rounded-md py-1 border-2 border-[#1454FB] hover:bg-[#1454fb] hover:border-white hover:text-white'>
                                다운로드
                            </button>
                        </div>
                        <div className='bg-white mt-5 rounded-md'>
                            <table className='w-4/5 mx-auto mt-10'>
                                <thead>
                                    <tr className='border-2 border-x-0 border-[#1454fb]'>
                                        <th className='w-1/2 py-2'>
                                            품명
                                        </th>
                                        <th className='py-2'>
                                            단가
                                        </th>
                                        <th className='w-1/12 py-2'>
                                            수량
                                        </th>
                                        <th className='py-2'>
                                            금액
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detail.content.itemList.map((item, idx) => (
                                        <tr className='text-center border-b-2 border-slate-300' key={idx}>
                                            <td className='w-1/2 py-1'>
                                                <input id={`item${idx}`} type='text' className='text-center w-full' defaultValue={item.item} />
                                            </td>
                                            <td className='py-1'>
                                                <input id={`unitPrice${idx}`} type='text' className='text-center w-full' value={item.unitPrice.toLocaleString('ko-KR')} onChange={(e) => handlePriceChange(idx, e)} />
                                            </td>
                                            <td className='w-1/12 py-1'>
                                                <input id={`quantity${idx}`} type='text' className='text-center w-full' value={item.quantity} onChange={(e) => handleQuantityChange(idx, e)} />
                                            </td>
                                            <td className='w-1/5 py-1 text-center'>
                                                {sumPrice(item.unitPrice, item.quantity).toLocaleString('ko-KR')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <table className='w-4/5 mx-auto mt-2 mb-5'>
                                <thead>
                                    <tr className='border-2 border-x-0 border-[#1454fb]'>
                                        <th className='w-1/2 py-2'>
                                            ==판매소계==
                                        </th>
                                        <th className='w-1/6 py-2'>
                                            총 품목
                                        </th>
                                        <th className='w-1/6 py-2'>
                                            총 수량
                                        </th>
                                        <th className='py-2'>
                                            합계
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='text-center'>
                                        <td></td>
                                        <td className='py-1'>
                                            {totalItems}
                                        </td>
                                        <td className='py-1'>
                                            {totalQuantity}
                                        </td>
                                        <td className='py-1'>
                                            {totalPrice.toLocaleString('ko-KR')}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='w-4/5 mx-auto flex justify-end mb-10'>
                                <button type='button' onClick={handleBack}
                                    className='w-1/6 bg-black text-white border-2 border-black rounded-md mr-5 hover:bg-white hover:text-black'>
                                    목록</button>
                                <button type="button" onClick={handlesave}
                                    className='w-1/6 bg-[#1454FB] text-white rounded-md py-1 border-2 border-[#1454FB] hover:bg-white hover:text-[#1454fb] mr-5'>
                                    저장
                                </button>
                                <button type="button" onClick={handledelete}
                                    className='w-1/6 bg-[#f05650] text-white rounded-md py-1 border-2 border-[#f05650] hover:bg-white hover:text-[#f05650]'>
                                    삭제
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
