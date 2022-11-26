import { like } from '../../request/tmp'

const like_ = (userId, articleId, is_like) => {
    return new Promise((resolve, reject) => {
        like(userId, articleId, is_like).then((res) => {
            console.log(res);
            if (res.data.code === '100'){
                resolve(res.data)
            }else{
                reject(res.data)
            }
        })
    })
}

export{
    like_
}
