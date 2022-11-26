import {login} from '@/request/tmp'
import { ElMessage } from 'element-plus'
import { success,error } from './popup/message'
import router from '@/router'
import store from '../store'
const login_ = (data) => {
    return new Promise((resolve,reject) => {
        login(data).then((res) => {
            if (res.data.code === '100') {
                success('登陆成功')
                sessionStorage.setItem('userId', res.data.data.userid)  //设置用户id
                sessionStorage.setItem('imgUrl', res.data.data.headportait) //设置头像url
                sessionStorage.setItem('userName', res.data.username)  //设置用户名
                store.commit('updateUrl', res.data.data.headportait)
                resolve(res.data)
                window.location.reload()
            } else {
                error(res.data.msg)
                reject(res.data)
            }
        }) 
    })
}
export {
    login_
}