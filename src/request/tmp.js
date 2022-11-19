import {post, get} from "./request"

function login(data){
    return post('/user/login',data)
}

function getPosts(data){
    return get(`/article?${data}`)
}

function publishArticle(data) {
    return post('/article',data)
}

function register(data){
    return post('/user/register',data)
}

function getUserAtricle(data){
    return get(`/user/article/${data}`)
}
export {
    getPosts,
    login,
    publishArticle,
    register,
    getUserAtricle
}