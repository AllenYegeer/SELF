import { getPosts } from "@/request/tmp";
import Qs from "qs";
const getPost_ = (pageNub,pageSize,type) => {
    const obj = {
        pageNub: pageNub,
        pageSize: pageSize,
        type: type
    }
    return new Promise((resolve,reject) => {
        getPosts(Qs.stringify(obj)).then((res) => {
            if (res.status == 200) resolve(res.data)
            else reject(res.data)
        })
    })
}
export {
    getPost_
}
