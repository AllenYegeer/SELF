import { getUserAttention } from "@/request/tmp";

const getUserAttention_ = (data) =>{
    return new Promise((resolve,reject) => {
        getUserAttention(data).then((res) => {
            if (res.data.code === '100'){
                resolve(res.data)
            }else{
                reject(res.data)
            }
        })
    })
}
export {
    getUserAttention_
}