import request from "../utils/request";

//管理员信息
export const changeState = (data:any) => {
    return request({
        url: "/changeStatus",
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

export const getAllEmployee = (params:any) => {
    return request({
        url: "/getAllEmployee",
        method: "get",
        params
    });
}

export const getEmployeeInfo = () => {
    return request({
        url: "/getEmployeeInfo",
        method: "get",
    });
}

//用户信息
export const updateUserInfo = () => {
    return request({
        url: "/updateUserInfo",
        method: "post",
    });
}

export const changePassWord = (data:any) => {
    return request({
        url: "/changePassWord",
        method: "post",
        data
    });
}

export const getUserCar = (params:any) => {
    return request({
        url: "/getUserCar",
        method: "get",
        params
    });
}

export const addCar = (data:any) => {
    return request({
        url: "/addCar",
        method: "post",
        data
    });
}

export const updatedUserCar = (data:any) => {
    return request({
        url: "/updatedUserCar",
        method: "post",
        data
    });
}

export const deleteCar = (data:any) => {
    return request({
        url: "/deleteCar",
        method: "post",
        data
    });
}