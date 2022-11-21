import { getUserAtricle } from "@/request/tmp";

const getUserAtricle_ = (data) => {
    return new Promise((resolve,reject) => {
        getUserAtricle(data).then((res) => {
            if (res.data.code === '100') resolve(res.data)
            else reject(res.data) 
        })
    })
    
}
export {
    getUserAtricle_,
}