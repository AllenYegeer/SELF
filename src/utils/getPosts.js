import { getPosts } from "@/request/tmp";
import Qs from "qs";
const getPost_ = async (pageNub,pageSize,type,article) => {
    const obj = {
        pageNub: pageNub,
        pageSize: pageSize,
        type: type
    }
    getPosts(Qs.stringify(obj)).then((res) => {
        console.log(res);
        article.value.posts = res.data.records
    })
}
export {
    getPost_
}
