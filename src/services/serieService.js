
import {api} from "./api.js"

export async function recuperaionData() {
    const response = await api.get("/series");
    return response.data;
}