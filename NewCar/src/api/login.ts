import request from "../utils/request";

export type UserResult = {
    data: {
        /** 是否成功 */
        success: boolean;
        /** 用户名 */
        username: string;
        /** 当前登陆用户的角色 */
        roles: Array<string>;
        /** `token` */
        accessToken: string;
        /** 用于调用刷新`accessToken`的接口时所需的`token` */
        refreshToken: string;
        /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
        expires: Date;
    };
};

export type RefreshTokenResult = {
    data: {
        /** `token` */
        accessToken: string;
        /** 用于调用刷新`accessToken`的接口时所需的`token` */
        refreshToken: string;
        /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
        expires: Date;
    };
};

export const login1 = (data: any) => {
    return request({
        url: "/login",
        method: "post",
        data
    })
    .catch((error) => {
        console.log(error);
    });
}

export const login2 = (data: any) => {
    return request({
        url: "/userLogin",
        method: "post",
        data
    })
    .catch((error) => {
        console.log(error);
    });
}


export const getCode = (params:any) => {
    return request({
        url: "/getCode",
        method: "get",
        params
    })
    .catch((error) => {
        console.log(error);
    });
}

export const register = (data: any) => {
    return request({
        url: "/register",
        method: "post",
        data
    })
    .catch((error) => {
        console.log(error);
    });
}