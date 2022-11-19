import { getUserAtricle } from "@/request/tmp";

const getUserAtricle_ = (data,myArticle) => {
    getUserAtricle(data).then((res) => {
        myArticle.value.posts = res.data.data
        myArticle.value.total = res.data.data.length
        console.log(res);
    })
}
export {
    getUserAtricle_,
}