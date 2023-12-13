import request from "../utils/request";

export const getMapPoint = () => {
    return request({
        url: "/mapGetPoint",
        method: "get"
    });
}

export const getMemberPoint = () => {
    return request({
        url: "/getPointInPlatoon",
        method: "get",
    });
}

export const getPointInfo = (params:any) => {
    return request({
        url: "/getPointInfo",
        method: "get",
        params,
    });
}