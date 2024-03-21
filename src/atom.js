import { atom } from "recoil";

export const receiveData = atom({
    key: 'receiveData',
    default: '',
});

export const userToken = atom({
    key: 'res.headers.get("authorization")',
    default: localStorage.getItem('token')
});