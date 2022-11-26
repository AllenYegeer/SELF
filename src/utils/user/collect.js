import { collect } from '@/request/tmp'

const collect_ = (userId, articleId, is_cllect) => {
    return new Promise((resolve, reject) => {
        collect(userId, articleId, is_cllect).then((res) => {
            if (res.data.code === '100'){
                resolve(res.data)
            }else{
                reject(res.data)
            }
        })
    })
}

export {
    collect_
}