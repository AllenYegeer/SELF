import { getUserLike } from '../../request/tmp'

const getUserLike_ = (userId) => {
    return new Promise ((resolve,reject) => {
        getUserLike(userId).then((res) => {
            resolve(res.data.records)
        })
    })
} 

export{
    getUserLike_
}