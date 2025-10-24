import axios from "axios"
import {API_BASE_URL} from "./config.js"

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
})

export const signUp = async({name, userName, email, password}) => {
    try{
        const response = await api.post('/api/auth/signup',{
            name, userName, email,password,
        })
        console.log("response: ", response.data);
        return response.data;
    }catch(err){
        console.log("Error during Signup",err)
    }
}

export const signIn = async({userName, password}) =>{
    try{
        const response = await api.post('/api/auth/signin', {
            userName, password,
        })
        console.log("response: ", response.data);
        return response.data
    }catch(err){
        console.log("Error during SignIn", err)
    }
}



export const getCurrentUser = async() => {
    try{
        const response = await api.get(`/api/user/current`);
        console.log(response.data);
        return response.data
    }catch(err){
        throw err.response?.data || {message: "Unable to fetch the data"}
    }
}

export const putUser = async(data) => {
    try{
        const response = await api.put(`/api/user/profileupdate`,data);
        console.log("put users", response.data);
        return response.data
    }catch(err){
        throw err.response?.data || {message: "Unable to fetch the data"}
    }
}
