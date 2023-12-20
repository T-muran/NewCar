import request from "../utils/request";

export const getCarInfo = (params:any) => {
    return request({
        url: "/carInfo",
        method: "get",
        params
    });
}


// 用户车队信息
export const getUserPlatoon = (params:any) => {
    return request({
        url: "/getUserPlatoon",
        method: "get",
        params
    });
}

export const createPlatoon = (data:any) => {
    return request({
        url: "/createPlatoon",
        method: "post",
        data
    });
}

export const joinPlatoon = (data:any) => {
    return request({
        url: "/joinPlatoon",
        method: "post",
        data
    });
}

export const quitPlatoon = (data:any) => {
    return request({
        url: "/quitPlatoon",
        method: "post",
        data
    });
}
