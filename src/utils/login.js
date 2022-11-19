import {login} from '@/request/tmp'
import { ElMessage } from 'element-plus'
import router from '@/router'
const login_ = (data) => {
    login(data).then((res) => {
        console.log(res);
        if (res.data.code === '100'){
            loginSuccess()
            sessionStorage.setItem('userId', res.data.data.userid)
            sessionStorage.setItem('userHeadPortraitUrl', res.data.data.headportait)
        }else{
            loginFali(res.data.msg)
        }
    })
}
const loginSuccess = () => {
    ElMessage({
        message: '登陆成功.',
        type: 'success',
    })
}

const loginFali = (msg) => {
    ElMessage.error(msg)
}
export {
    login_
}