import request from "../utils/request";

export const getPartialPlatoon = () => {
    return request({
        url: "/getPartialPlatoon",
        method: "get"
    });
}

export const getAllPlatoon = (params:any) => {
    return request({
        url: "/getAllPlatoon",
        method: "get",
        params
    });
}