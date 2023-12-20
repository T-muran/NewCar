const tokenKey = 'token';

// 获取token
export const getToken = () => {
  return localStorage.getItem(tokenKey);
}

// 设置token
export const setToken = (token: string) => {
  localStorage.setItem(tokenKey, token);
}

// 移除token
export const removeToken = () => {
  localStorage.removeItem(tokenKey);
}

// 保存用户信息
export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
}

// 获取用户信息
export const getUser = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return {};
}

// 保存用户车辆信息
export const setUserCar = (userCar) => {
  localStorage.setItem('userCar', JSON.stringify(userCar));
}

// 获取用户车辆信息
export const localGetUserCar = () => {
  const userCar = localStorage.getItem('userCar');
  if (userCar) {
    return JSON.parse(userCar);
  }
  return {};
}