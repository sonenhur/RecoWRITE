import React, { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaDropbox } from "react-icons/fa6";

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [fileAttach, setFileAttach] = useState(false);
    const [preveiewUrl, setPreveiewUrl] = useState(null);
    const [selectedButton, setSelectButton] = useState('0');

    const handleButtonClick = (value) => {
        fileInputRef.current.value = '';
        setPreveiewUrl('');
        setFileName('');
        setSelectButton(value);
    };

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
        const formData = new FormData();
        formData.append('file', selectedFile);

        let uploadEnd = 'http://10.125.121.183:8080/upload';
        if(selectedButton === '0'){
            uploadEnd += '/0';
        } else if (selectedButton === '1'){
            uploadEnd += '/1';
        }

        try {
            const response = await fetch(uploadEnd, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.text();
            console.log('업로드 성공:', data);
            alert('업로드 성공');

            setSelectedFile(null);
            setFileName('');
            fileInputRef.current.value = '';

        } catch (error) {
            console.error('업로드 실패:', error);
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
        <main>
            <div className='flex flex-col items-center'>
                <div className='w-2/3 flex justify-center my-10'>
                    <h1 className='text-2xl font-bold'>
                        인쇄/수기 영수증을 선택하시면 더 높은 정확도로 인식 할수 있습니다.
                    </h1>
                </div>
                <div className='w-1/2 rounded-3xl bg-[#F1F1F1]'>
                    <div className='mt-10 flex flex-col w-2/3 mx-auto'>
                        <div>
                            <button className={`border-2 border-[#1454FB] border-b-0 rounded-ss-md px-2 py-1 font-bold ${selectedButton === '0' ? 'bg-[#1454fb] text-white' : 'bg-white text-black'} hover:bg-[#1454fb] hover:text-white`}
                                onClick={() => handleButtonClick('0')}>인쇄 영수증</button>
                            <button className={`border-2 border-[#1454FB] border-b-0 border-s-0 rounded-se-md px-2 py-1 font-bold ${selectedButton === '1' ? 'bg-[#1454fb] text-white' : 'bg-white text-black'} hover:bg-[#1454fb] hover:text-white`}
                                onClick={() => handleButtonClick('1')}>수기 영수증</button>
                        </div>
                        <form className='relative'>
                            <input type="file" style={{ display: "none" }} ref={fileInputRef} onChange={handleFileChange} />
                            <button type="button" className='w-1/6 bg-[#1454FB] text-white rounded-md py-2 border-2 border-[#1454FB] absolute top-0 right-0 hover:bg-white hover:text-[#1454fb]' onClick={handleFileButtonClick}>파일 첨부</button>
                            <input type='text' className='w-full py-2 pl-2 border-2 border-[#1454FB] rounded-md rounded-ss-none shadow-xl outline-none' placeholder='선택된 파일이 없습니다' required readOnly value={fileName} />
                        </form>
                    </div>
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <div className='mt-10 w-2/3 mx-auto h-auto bg-white rounded-md flex justify-center items-center flex-col border-dashed border-2 border-[#1454FB]'>
                            {preveiewUrl ? <img src={preveiewUrl} alt="Preview" className='w-3/5 overflow-hidden mt-5' /> : <FaDropbox size="60" className='mt-10' />}
                            <h1 className='font-bold text-xl mt-4 mb-10'>{fileAttach ? '' : '파일 첨부 및 드래그 해주세요'}</h1>
                        </div>
                    </div>
                    <div className='mt-5'>
                    </div>
                    <div className='flex justify-center'>
                        <button onClick={handleUpload} className='text-white border-2 border-[#1454FB] bg-[#1454fb] py-2 w-1/6 rounded-md hover:bg-white hover:text-[#1454fb] mb-5'>업로드</button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ImageUpload;
