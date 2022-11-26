import {post, get, put} from "./request"

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

function getUserInfo(data){  //得到用户信息
    return get(`/user/${data}`)
}

function getUserFans(data){  //得到用户的粉丝信息
    return get(`/user/follow/${data}`)
}

function getUserAttention(data){  //得到用户的关注
    return get(`/user/attent/${data}`)
}

function updateUserInfo(data){  //修改用户的信息
    return put('/user',data)
}

function attent(userId,isAttent,id){
    return get(`/user/attent/${userId}/${id}/${isAttent}`)
}

function getArticleComments(id){   
    return get(`/article/${id}`)
} 
function addComment(data){  //发表评论
    return post('/comment',data)
}

function getUserCollection(userId){
    return get(`/article/collect?userid=${userId}`)
}

function collect(userId, articleId, is_cllect){
    return get(`/user/collect/${userId}/${articleId}/${is_cllect}`)
}
export {
    getPosts,
    login,
    publishArticle,
    register,
    getUserAtricle,
    getUserInfo,
    getUserFans,
    getUserAttention,
    updateUserInfo,
    attent,
    getArticleComments,
    addComment,
    getUserCollection,
    collect
}