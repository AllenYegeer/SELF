import { register } from "@/request/tmp";

const register_ = (data) => {
    register(data).then((res) => {
        sessionStorage.setItem('userHeadPortraitUrl',res.data.data.headportait)  //设置头像的url
        console.log(res);
    })
}

export {
    register_
}