import React, { useEffect, useState } from 'react'
import { userToken } from './atom'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Pagination from 'react-js-pagination'
import './Paginate.css'

export default function Check() {

    const Islogin = useRecoilValue(userToken);

    const instyle = 'bg-white w-2/3 py-1 text-center rounded-md shadow-lg';

    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://10.125.121.183:8080/receipt/all?page=${page}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: { Authorization: Islogin }
                });
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [Islogin, page]);
    
    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    return (
        <main className='flex flex-col items-center'>
            <div className='w-2/3 rounded-3xl bg-[#F1F1F1] mt-20'>
                <div className='my-10 flex flex-col w-3/4 mx-auto'>
                    <div className='border-2 border-[#1454fb] bg-[#1454fb] rounded-md flex justify-between items-center'>
                        <h1 className='text-white ml-5 py-1 font-bold text-xl'>상세 검색</h1>
                    </div>
                    <div className='mt-5 flex justify-evenly'>
                        <div className='flex w-1/5 justify-around items-center'>
                            <h1 className='font-bold'>업체명</h1>
                            <input type='text' className={instyle} />
                        </div>
                        <div className='flex w-1/5 justify-around items-center'>
                            <h1 className='font-bold'>물품명</h1>
                            <input type='text' className={instyle} />
                        </div>
                        <div className='flex w-1/3 justify-around items-center'>
                            <h1>거래 기간</h1>
                            <input type='date' className={instyle} />
                        </div>
                        <button type="button" className='w-1/6 bg-white text-[#1454fb] font-bold rounded-md py-1 border-2 border-[#1454FB] hover:bg-[#1454fb] hover:border-white hover:text-white'>
                            검색</button>
                    </div>
                    <div className='bg-white mt-5 rounded-md'>
                        <table className='w-4/5 mx-auto mt-10'>
                            <thead className='border-2 border-x-0 border-[#1454fb] text-xl'>
                                <tr>
                                    <th className='w-3/5 py-2'>업체명</th>
                                    <th className='w-2/5 py-2'>거래기간</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.content && data.content.content && data.content.content.map((data, idx) => (
                                    <tr className='text-center border-b-2 border-slate-300 hover:bg-[#1454fb] hover:text-white' key={idx}>
                                        <td className='w-3/5 py-1'>
                                            <Link to={`/receipt/${data.receiptId}`} className="block w-full h-full">
                                                {data.company}
                                            </Link>
                                        </td>
                                        <td className='w-2/5 py-1'>
                                            <Link to={`/receipt/${data.receiptId}`} className="block w-full h-full">
                                                {data.tradAt}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='flex justify-center my-5'>
                        <Pagination
                                activePage={page}
                                itemsCountPerPage={10}
                                totalItemsCount={data?.content?.totalElements || 0}
                                pageRangeDisplayed={5}
                                prevPageText={"‹"}
                                nextPageText={"›"}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
};
