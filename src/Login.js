import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { userToken } from "./atom"

export default function Login() {

    const navigate = useNavigate();

    const logbut = 'w-2/5 mt-10 py-2 rounded-lg bg-[#1454FB] border-2 border-[#1454FB] text-white hover:bg-white hover:text-[#1454FB] hover:border-[#1454FB]';
    const loginstyle = 'outline-none p-2 border-2 rounded-md border-slate-200';
    const labelstyle = 'py-1 text-slate-600';

    const [isLogin, setIsLogin] = useRecoilState(userToken);

    const [member, setMember] = useState({
        email: '',
        password: '',
    });

    const emailRef = useRef();
    const passRef = useRef();

    const onSubmithandle = (e) => {
        e.preventDefault();

        setMember({
            email: emailRef.current.value,
            password: passRef.current.value,
        })
    }

    useEffect(() => {
        if (member.email === "") return;

        const fetchData = async () => {
            try {
                const response = await fetch("http://10.125.121.183:8080/user/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(member)
                });

                const accessToken = response.headers.get("Authorization");
                if (accessToken) {
                    alert("로그인 되었습니다");
                    navigate("/");
                    localStorage.setItem('token', accessToken);
                    setIsLogin(accessToken);
                }else {
                    alert("아이디와 비밀번호 정보를 확인해 주세요");
                }
            } catch (error) {
                console.error(error);
                alert("아이디와 비밀번호 정보를 확인해 주세요");
            }
        };

        fetchData();
    }, [member]);

    useEffect(() => {
        if (isLogin) {
            localStorage.removeItem('token');
            setIsLogin(null);
            alert("로그아웃 되었습니다");
            navigate("/");
        }
    }, []);
    

    return (
        <main className="flex-col pt-40">
            <div className='w-1/5 border-2 mx-auto rounded-lg border-slate-300'>
                <form className='flex flex-col p-4'>
                    <div className='flex flex-col'>
                        <label className={labelstyle}>ID</label>
                        <input type="email"
                            ref={emailRef}
                            className={loginstyle} placeholder="이메일을 입력해 주세요" required />
                    </div>
                    <div className='flex flex-col mt-2'>
                        <label className={labelstyle}>PASSWORD</label>
                        <input type="password"
                            ref={passRef}
                            className={loginstyle} placeholder="비밀번호를 입력해 주세요" required />
                    </div>
                    <div className='flex justify-around'>
                        <button type='button'
                            onClick={onSubmithandle}
                            className={logbut}>
                            로그인
                        </button>
                    </div>
                </form>
            </div>
            <div className='flex justify-center'>
                <Link to="/Register" className='w-1/4 mt-10 border-slate-200 border-t-2 flex justify-center text-slate-500'>
                    <button type='button'
                        className={logbut}>
                        회원가입
                    </button>
                </Link>
            </div>
        </main>
    )
}
