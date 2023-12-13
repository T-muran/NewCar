import request from "../utils/request";

export const getCarInfo = (params:any) => {
    return request({
        url: "/getCarInfo",
        method: "get",
        params
    });
}