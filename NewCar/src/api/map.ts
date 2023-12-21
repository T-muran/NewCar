import request from "../utils/request";

export const getMapPoint = () => {
    return request({
        url: "/mapGetPoint",
        method: "get"
    });
}

export const getMemberPoint = (params?:any) => {
    return request({
        url: "/getPointInPlatoon",
        method: "get",
        params
    });
}

export const getPointInfo = (params:any) => {
    return request({
        url: "/getPointInfo",
        method: "get",
        params,
    });
}