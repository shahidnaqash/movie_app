import axios from "axios";

const Token = import.meta.env.VITE_API_TOKEN
const baseUrl = 'https://api.themoviedb.org/3'
export const fetchData = async (url, params) => {
    try {
        const { data } = await axios.get(baseUrl + url, {
            headers: {
                Authorization: `bearer ${Token}`
            },
            params
        })
        return data
    }
    catch (err) {
        // if (err.name === "AbortError") {
        //     console.log("Request Aborted ");
        // }
        return err
    }
}

