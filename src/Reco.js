import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { FaDropbox } from "react-icons/fa6";
import { receiveData } from './atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userToken } from './atom';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [fileAttach, setFileAttach] = useState(false);
    const [preveiewUrl, setPreveiewUrl] = useState(null);
    const setReceiveData = useSetRecoilState(receiveData);
    const token = useRecoilValue(userToken);

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setFileName(file.name);
            setFileAttach(true);

            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreveiewUrl(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        } else {
            alert("파일 형식이 잘못되었습니다");
            window.location.reload();
        }
    };

    const handleUpload = async () => {

        if (!selectedFile) {
            alert('영수증을 먼저 첨부해 주세요')
            return;
        }
        if (!token) {
            alert('로그인 후 사용가능 합니다');
            navigate("/Login");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            navigate("/Loading");
            const response = await fetch('http://10.125.121.183:8080/image/upload', {
                method: 'POST',
                headers: { Authorization: token },
                body: formData,
            });

            const data = await response.json();
            setReceiveData(data);
            navigate("/Print")
            alert('업로드 성공');
            setSelectedFile(null);
            setFileName('');

        } catch (error) {
            console.error('업로드 실패:', error);
            navigate("/Reco")
            alert('업로드 실패');
        }
    };

    const fileInputRef = useRef();
    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setFileName(file.name);
            setFileAttach(true);

            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreveiewUrl(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        } else {
            alert("파일 형식이 잘못되었습니다");
        }
    };

    const { getRootProps } = useDropzone({ onDrop });

    return (
        <main className='bg-main bg-cover h-screen relative'>
            <div className='absolute w-full h-full bg-black opacity-30'></div>
            <div className='relative z-10 flex flex-col items-center text-white'>
                <div className='w-1/2 rounded-3xl bg-[#F1F1F1] mt-20'>
                    <div className='mt-10 flex flex-col w-2/3 mx-auto'>
                        <form className='relative'>
                            <input type="file" style={{ display: "none" }} ref={fileInputRef} onChange={handleFileChange} />
                            <button type="button" className='w-1/6 bg-[#1454FB] rounded-md py-2 border-2 border-[#1454FB] absolute top-0 right-0 hover:bg-white hover:text-[#1454fb]'
                                onClick={handleFileButtonClick}>파일 첨부</button>
                            <input type='text' className='w-full py-2 pl-2 border-2 border-[#1454FB] rounded-md shadow-xl text-black outline-none'
                                placeholder='선택된 파일이 없습니다' required readOnly value={fileName} />
                        </form>
                    </div>
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <div className='mt-10 w-2/3 mx-auto text-black bg-white rounded-md flex flex-col justify-center items-center border-dashed border-2 border-[#1454FB] shadow-xl'>
                            {preveiewUrl ? <img src={preveiewUrl} alt="Preview" className='w-3/5 overflow-hidden mt-5' /> : <FaDropbox size="60" className='mt-10' />}
                            <h1 className='font-bold text-xl mt-5 mb-10'>{fileAttach ? '' : '파일 첨부 및 드래그 해주세요'}</h1>
                        </div>
                    </div>
                    <div className='flex justify-center my-5'>
                        <button className='border-2 border-[#1454FB] bg-[#1454fb] py-2 w-1/6 rounded-md hover:bg-white hover:text-[#1454fb]'
                            onClick={handleUpload}>업로드</button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ImageUpload;
