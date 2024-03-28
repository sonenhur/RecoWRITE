import React, { useEffect, useState } from 'react';
import { userToken } from './atom';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Pagination from 'react-js-pagination';
import './Paginate.css';

export default function Check() {
    const Islogin = useRecoilValue(userToken);

    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [searchType, setSearchType] = useState('company');
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filterData, setFilterData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchData();
    }, [Islogin, page]);

    useEffect(() => {
        if (data && data.content && data.content.content) {
            setFilterData(data.content.content);
            const totalCount = data.content.content.length;
            const calculatedTotalPages = Math.ceil(totalCount / 10);
            setTotalPages(calculatedTotalPages);
        }
    }, [data]);

    const fetchData = async () => {
        try {
            const url = `http://10.125.121.183:8080/receipt?page=${page}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: { Authorization: Islogin }
            });
            const data = await response.json();
            setData(data);
            setFilterData(data.content.content); // 수정: content.content로 직접 설정
        } catch (error) {
            console.error(error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleSearch = () => {
        const filtered = data.content.content.filter(item => {
            const date = new Date(item.tradAt);
            const start = startDate ? new Date(startDate) : new Date('0001-01-01');
            const end = endDate ? new Date(endDate) : new Date('9999-12-31');
            let matchesSearchQuery = false;

            if (searchType === 'company') {
                matchesSearchQuery = item.company.toLowerCase().includes(searchQuery.toLowerCase());
            } else if (searchType === 'item') {
                matchesSearchQuery = item.itemList.some(itemEntry => itemEntry.item.toLowerCase().includes(searchQuery.toLowerCase()));
            }

            return matchesSearchQuery && date >= start && date <= end;
        });

        setFilterData(filtered);
        setPage(1);
        const newTotalPages = Math.ceil(filtered.length / 10);
        setTotalPages(newTotalPages);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <main className='bg-main bg-cover h-screen relative'>
            <div className='absolute w-full h-full bg-black opacity-30'></div>
            <div className='relative z-10 flex flex-col items-center'>
                <div className='w-2/3 rounded-3xl bg-[#F1F1F1] mt-20'>
                    <div className='my-10 flex flex-col w-3/4 mx-auto'>
                        <div className='border-2 border-[#1454fb] bg-[#1454fb] rounded-md flex justify-between items-center'>
                            <h1 className='text-white ml-5 py-1 font-bold text-xl'>상세 검색</h1>
                        </div>
                        <div className='mt-5 flex justify-evenly items-center'>
                            <div className='w-1/4 flex justify-evenly items-center'>
                                <form className='py-1'>
                                    <select
                                        className='py-1 text-center rounded-md shadow-lg'
                                        value={searchType}
                                        onChange={handleSearchTypeChange}
                                    >
                                        <option value='company'>업체명</option>
                                        <option value='item'>물품명</option>
                                    </select>
                                </form>
                                <input
                                    type='text'
                                    className='w-1/2 py-1 text-center rounded-md shadow-lg'
                                    value={searchQuery}
                                    onChange={handleSearchQueryChange}
                                    onKeyPress={handleKeyPress}
                                />
                            </div>
                            <div className='flex w-1/2 justify-evenly items-center py-1 bg-[#1454fb]  rounded-lg shadow-md'>
                                <h1 className='font-bold text-white'>거래 기간</h1>
                                <input
                                    type='date'
                                    className='w-1/3 text-center rounded-md shadow-lg'
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                />
                                <input
                                    type='date'
                                    className='w-1/3 text-center rounded-md shadow-lg'
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                />
                            </div>
                            <button
                                type="button"
                                className='w-1/6 bg-white text-[#1454fb] font-bold rounded-md py-1 border-2 border-[#1454FB] hover:bg-[#1454fb] hover:border-white hover:text-white'
                                onClick={handleSearch}
                            >
                                검색
                            </button>
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
                                    {filterData && filterData.map((item, idx) => (
                                        <tr
                                            className='text-center border-b-2 border-slate-300 hover:bg-[#1454fb] hover:text-white'
                                            key={idx}
                                        >
                                            <td className='w-3/5 py-1'>
                                                <Link to={`/receipt/${item.receiptId}`} className="block w-full h-full">
                                                    {item.company}
                                                </Link>
                                            </td>
                                            <td className='w-2/5 py-1'>
                                                <Link to={`/receipt/${item.receiptId}`} className="block w-full h-full">
                                                    {item.tradAt}
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
                                    totalItemsCount={filterData ? filterData.length : 0}
                                    pageRangeDisplayed={5}
                                    prevPageText={"‹"}
                                    nextPageText={"›"}
                                    onChange={handlePageChange}
                                    totalPages={totalPages}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}