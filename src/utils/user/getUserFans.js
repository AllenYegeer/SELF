import { getUserFans } from "@/request/tmp";

const getUserFans_ = (data) => {
    return new Promise((resolve,reject) => {
        getUserFans(data).then((res) => {
            if (res.data.code === '100'){
                resolve(res.data)
            }else{
                reject(res.data)
            }
        })
    })
}
export {
    getUserFans_
}