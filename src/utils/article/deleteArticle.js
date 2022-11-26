import { deleteArticle } from "@/request/tmp";

const deleteArticle_ = (articleId) => {
    return new Promise((resolve,reject) => {
        deleteArticle(articleId).then((res) => {
            if (res.data.code === '100'){
                resolve(res.data)
            }else{
                reject(res.data)
            }
        })
    })
}

export{
    deleteArticle_ 
}