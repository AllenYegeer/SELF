import {post, get} from "./request"

function login(data){   //登陆
    return post('/user/login',data)
}

function getPosts(data){ //获取帖子
    return get(`/article?${data}`)
}

function publishArticle(data) {   //发布帖子
    return post('/article',data)
}

function register(data){    //注册
    return post('/user/register',data)
}

function getUserAtricle(data){   //获取用户自己的帖子
    return get(`/user/article/${data}`)
}
export {
    getPosts,
    login,
    publishArticle,
    register,
    getUserAtricle
}