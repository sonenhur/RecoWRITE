import React from 'react'

export default function Naver() {
    const onNaverLogin = () =>{
        window.location.href = "http://10.125.121.183:8080/oauth2/authorization/naver"
    }

    const getData = () =>{

        window.location.href =  "http://10.125.121.183:8080/my" ;
        // fetch("http://10.125.121.183:8080/my",{
        //     method: "GET",
        //     credentials: 'include'
        // })
        // .then((res)=> res.json())
        // .then((data)=>{
        //     alert(data)
        // })
        // .catch((error)=> alert(error))
    }
  return (
    <main className='mt-40'>
     <button className='me-14' onClick={onNaverLogin}>naver</button>

     <button onClick={getData}>get</button>
    </main>
  )
}
