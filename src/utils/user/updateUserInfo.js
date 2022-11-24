import { updateUserInfo } from "@/request/tmp";

const updateUserInfo_ = (data) => {
    return new Promise((resolve,reject) => {
        updateUserInfo(data).then((res) => {
            if (res.data.code === '100'){
                resolve(res.data)
            }else{
                reject(res.data)
            }
        })
    })
}

export{
    updateUserInfo_
}