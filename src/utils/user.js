import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getUserDisease = () => {
    const id = localStorage.getItem("username");
    const token = localStorage.getItem("access_token");
    return axios.get(`${BASE_URL}/user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        if(res.status >= 200 && res.status < 300){
            const disease = res.data.diseases;
            if(Array.isArray(disease)){
                const strDisease = disease.map(disease => `${disease.name}(${disease.contents})`);
                return strDisease.join(', ')
            } else return "";
        }
    })
}