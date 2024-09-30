import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const saveRecipe = (title, contents) => {
    const token = localStorage.getItem("access_token");
    return axios.post(`${BASE_URL}/scrap`, {
        title, contents
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        }
    })
}