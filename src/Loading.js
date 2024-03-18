import React from 'react'
import Spinner from './assets/images/loading3.gif'

export default function Loading() {
    return (
        <main className='fixed top-0 bg-white w-screen h-screen flex flex-col justify-center items-center'>
            <div>
                <img src={Spinner} />
            </div>
            <div>
                <h1 className='mt-10 font-semibold text-3xl'>인식중입니다</h1>
            </div>
        </main>
    )
}
