import { search } from "@/request/tmp";

const search_ = (key) => {
    return new Promise((reslove,reject) => {
        search(key).then((res) => {
            if (res.data.code === '100'){
                reslove(res.data)
            }else{
                reject(res.data)
            }
        })
    })
}

export {
    search_
}