import {post, get, put,delete_} from "./request"

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

function attent(userId,isAttent,id){    //关注
    return get(`/user/attent/${userId}/${id}/${isAttent}`)
}

function getArticleComments(id){        //得到文章的评论
    return get(`/article/${id}`)
} 
function addComment(data){  //发表评论
    return post('/comment',data)
}

function getUserCollection(userId){    //得到用户的收藏
    return get(`/article/collect?userid=${userId}`)
}

function getUserLike(userId){    //得到用户的点赞
    return get(`/article/like?userid=${userId}`)
}
function collect(userId, articleId, is_cllect){    //收藏
    return get(`/user/collect/${userId}/${articleId}/${is_cllect}`)
}

function like(userId, articleId, is_like){    //点赞
    return get(`/user/like/${userId}/${articleId}/${is_like}`)
}

function deleteArticle(articleId){
    return delete_('/article',{
        deleteId: articleId
    })
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
    collect,
    getUserLike,
    like,
    deleteArticle
}