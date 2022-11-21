import { register } from "@/request/tmp";
import { error, success } from "./popup/message";

const register_ = (data) => {
    return new Promise((resolve,reject) => {
        register(data).then((res) => {
            if (res.data.code === '100') resolve(res.data)
            else reject(res.data)
        })
    })
}

export {
    register_
}