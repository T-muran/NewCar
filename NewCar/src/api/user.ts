import request from "../utils/request";

export const changeState = (data:any) => {
    return request({
        url: "/changeState",
        method: "post",
        data
    });
}

export const addEmployee = (data:any) => {
    return request({
        url: "/addEmployee",
        method: "post",
        data
    });
}

export const changeEmployee = (data:any) => {   
    return request({
        url: "/changeEmployee",
        method: "post",
        data
    });
}

export const getAllUser = (params:any) => {
    return request({
        url: "/getAllUser",
        method: "get",
        params
    });
}