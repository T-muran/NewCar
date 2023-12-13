

export type userType = {
  id?: string;
  userName?: string;
  phoneNum?: string;
  idNumber?: string;
  status?: string;
  carTotal?: number;
  platoonTotal?: number;
  runningCarTotal?: number;
  userTotal?: number;
};


export type mapType = {
  amapKey?: string;
};

export type carType = {
  id: string
  leaderName: string
  avatar: string
  status: number
  startPoint: string
  endPoint: string
  carNumber: number
}