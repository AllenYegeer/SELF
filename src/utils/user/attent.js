import { attent } from "@/request/tmp";

const attent_ = (userId, isAttent, id) => {
    return new Promise((resolve,reject) => {
        attent(userId, isAttent, id).then((res) => {
            if (res.data.code === '100') resolve(res.data)
            else{
                reject(res.data)
            } 
        })
    })
}
export {
    attent_
}