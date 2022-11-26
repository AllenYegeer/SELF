import { addComment } from "@/request/tmp";

const addComment_ = (data) => {
    return new  Promise((resolve,reject) => {

        addComment(data).then((res) => {
            if (res.data.code === '100'){
                resolve(res.data)
            }else{
                reject(res.data)
            }
        })
    })
}
export {
    addComment_
}