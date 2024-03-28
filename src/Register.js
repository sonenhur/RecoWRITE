import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState({
    });

    const [join, setJoin] = useState({
        email: '',
        password: '',
        confrim: '',
        groups: '',
        name: ''
    });

    const emailRef = useRef();
    const passRef = useRef();
    const confrimRef = useRef();
    const groupRef = useRef();
    const nameRef = useRef();

    const instyle = 'outline-none p-2 border-2 rounded-md border-slate-200';
    const lastyle = 'py-1 text-slate-600';

    // 중복 확인 버튼이 눌렸는지 여부를 나타내는 상태
    const [checkedButtonClicked, setCheckedButtonClicked] = useState(false);

    const Checked = (e) => {
        e.preventDefault();
        console.log("button clicked");
        setEmail({
            email: emailRef.current.value
        });

        // 중복 확인 버튼이 눌렸음을 상태에 업데이트
        setCheckedButtonClicked(true);
    }

    useEffect(() => {
        if (!checkedButtonClicked) {
            // 중복 확인 버튼이 눌리지 않았을 때는 함수 종료
            return;
        }

        // 이메일 중복 확인 API 호출
        fetch('http://10.125.121.183:8080/user/duplication', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email.email })
        })
            .then(response => {
                console.log("res", response);

                if (response.status === 409) {
                    alert("중복된 email 입니다");
                } else if (response.status === undefined) {
                    alert("undefined");
                } else {
                    alert("사용가능한 email 입니다");
                }
                if (!response.ok) {
                    throw new Error('Failed to check email duplication');
                }
                return response.json();
            })

            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                // 중복 확인이 완료되었으므로 상태 초기화
                setCheckedButtonClicked(false);
            });
    }, [checkedButtonClicked, email]);


    const onSubmithandle = (e) => {
        e.preventDefault();

        console.log(emailRef.current.value)
        setJoin({
            email: emailRef.current.value,
            password: passRef.current.value,
            confirm: confrimRef.current.value,
            groups: groupRef.current.value,
            name: nameRef.current.value
        })
    }

    useEffect(() => {
        if (join.email === "") return;
        if (join.password !== join.confirm) {
            return alert('비밀번호와 비밀번호 확인이 같지 않습니다');
        }

        if (join.email === "" || join.password === "" || join.confirm === "" || join.groups === "" || join.name === "") {
            alert("정보를 입력해주세요");
            return;
        } else {
            const fetchData = async () => {
                try {
                    const response = await fetch("http://10.125.121.183:8080/user/join", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(join)
                    });

                    if (!response.ok) {
                        throw new Error('Failed to join user');
                    }

                    console.log("회원가입 성공");
                    console.log("ㄴㄴㄴ", join.groups);
                    alert("회원가입을 축하드립니다");
                    navigate("/Login");
                } catch (error) {
                    console.error(error);
                    alert("회원가입에 실패하였습니다");
                }
            };

            fetchData();
        }

    }, [join]);

    return (
        <main className="flex-col pt-40">
            <div className='w-1/4 border-2 mx-auto rounded-lg border-slate-300'>
                <form className='flex flex-col p-4'>
                    <div className='flex justify-between items-center'>
                        <label className={lastyle}>이메일</label>
                        <button type='button' className='flex items-end justify-center w-2/5 mb-2 py-2 font-semibold rounded-lg bg-[#1454FB] border-2 border-[#1454FB] text-white hover:bg-white hover:text-[#1454FB]'
                            onClick={Checked}>
                            중복 확인
                        </button>
                    </div>
                    <input type="email"
                        ref={emailRef}
                        className={instyle} placeholder="이메일을 입력해 주세요" required />
                    <label className={lastyle}>비밀번호</label>
                    <input type="password"
                        ref={passRef}
                        className={instyle} placeholder="비밀번호를 입력해 주세요" required />
                    <label className={lastyle}>비밀번호 확인</label>
                    <input type="password"
                        ref={confrimRef}
                        className={instyle} placeholder="비밀번호를 한번 더 입력해 주세요" required />
                    <div className='mt-5'></div>
                    <label className={lastyle}>회사명</label>
                    <input type="text"
                        ref={groupRef}
                        className={instyle} placeholder="회사명을 입력해 주세요" required />
                    <label className={lastyle}>이름</label>
                    <input type="text"
                        ref={nameRef}
                        className={instyle} placeholder="이름을 입력해 주세요" required />
                    <div className='flex justify-around mt-8'>
                        <Link to="/" className='flex justify-center w-2/5 py-2 font-semibold border-[#f05650] border-2 rounded-lg text-[#f05650] hover:bg-[#f05650] hover:text-white'>
                            <button type='button'>
                                취소
                            </button>
                        </Link>
                        <button type='button' className='flex justify-center w-2/5 py-2 font-bold border-2 border-[#1454FB] rounded-lg bg-[#1454FB] text-white hover:bg-white hover:text-[#1454FB]'
                            onClick={onSubmithandle}>
                            확인
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}
