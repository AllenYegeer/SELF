import { getUserInfo } from "@/request/tmp";

const getUserInfo_ = (data) =>  {
    return new Promise((resolve,reject) => {
        getUserInfo(data).then((res) => {
            if(res.data.code === '100'){
                resolve(res.data)
            }else{
                reject(res.data)
            }
        })
    })
}
export {
    getUserInfo_
}