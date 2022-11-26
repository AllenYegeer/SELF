import { getArticleComments } from "@/request/tmp";

const getArticleComments_ = (id) => {
    return new Promise((resolve,reject) => {
        getArticleComments(id).then((res) => {
            console.log(res);
            if (res.data.code === '100') resolve(res.data)
            else reject(res.data)
        })
    })
}

export {
    getArticleComments_
}