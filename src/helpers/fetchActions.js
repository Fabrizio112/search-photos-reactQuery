import axios from "axios";
import { API_KEY } from "./constants";

export const getPhotosData = async (query) => {
    let { data } = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${query}&per_page=5`)
    return data
}

export const getMorePhotosData = async (query, page) => {
    let { data } = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${query}&per_page=5&page=${page}`)
    return data
}