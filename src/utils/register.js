import { register } from "@/request/tmp";
import { error, success } from "./popup/message";

const register_ = (data) => {
    return new Promise((resolve,reject) => {
        register(data).then((res) => {
            console.log(res);
            if (res.data.code === '100') {
                success('注册成功')
                sessionStorage.setItem('userId', res.data.data.userid)  //设置用户id
                sessionStorage.setItem('imgUrl', res.data.data.headportait) //设置头像url
                sessionStorage.setItem('userName', res.data.data.username)  //设置用户名
                resolve(res.data)
            } else {
                error(res.data.msg)
                reject(res.data)
            }
        })
    })
}

export {
    register_
}