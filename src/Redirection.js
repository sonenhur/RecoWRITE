import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function Redirection() {
    const navigate = useNavigate();
    const location = useLocation();
    const CODE = location.search.split('=')[1];

    // const kakao_key = process.env.KAKAO_API_KEY; 
    // const kakao_uri = process.env.KAKAO_REDIRECT_URI;

    console.log("aaaaaa");
    function getKakaoToken() {
        fetch("http://10.125.121.183:8080/oauth2/authorization/kakao", {
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            body: `grant_type=authorization_code&client_id=${kakao_key}&redirect_uri=${kakao_uri}&code=${CODE}`,
        })

            .then(res => res.json())
            .then(data => {
            console.log("aa", data);
                if (data.access_token) {
                    fetch("http://10.125.121.183:8080/login/oauth2/code/kakao", {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json;charset=utf-8' },
                        body: JSON.stringify({
                            kakaoAccessToken: data.access_token,
                            nickname: '',
                        }),
                    })
                        .then(response => {
                            console.log("ss", response);
                            response.json()
                        })
                        .then(result => {
                            console.log("asd", result);
                            if (result.token) {
                                localStorage.setItem('TOKEN', result.token);
                                localStorage.setItem('username', result.nickname);
                                alert("로그인 성공!");
                                navigate("/")
                            }
                        });
                } else {
                    alert("다시 한번 로그인 해주세요");
                    navigate("/Check")
                }
            
            );
    }
    useEffect(() => {
        getKakaoToken();
    }, []);

    


    return (
        <div>
            로그인 중
        </div>
    )
}


// const Redirection = () => {
//     const code = window.location.search;
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetch("http://10.125.12.183:8080/oauth2/kakao",{
//             method: 'POST',
//             headers:{
//                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
//             },
//             body: `grant_type=authorization_code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${CODE}`,
//         })
//             .then(`${process.env.REACT_APP_URL}kakaoLogin${code}`)
//             .then((r) => {
//                 console.log(r.data);

//                 localStorage.setItem('name', r.data.user_name);

//                 navigate('/Home');
//             });
//     }, []);

//     return
//     <div>
//         로그인 중
//     </div>
// };

export default Redirection;