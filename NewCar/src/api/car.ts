import request from "../utils/request";

export const getCarInfo = (params:any) => {
    return request({
        url: "/carInfo",
        method: "get",
        params
    });
}