import { getUserCollection } from "@/request/tmp";

const getUserCollection_ = (userId) => {
    return new Promise((resolve,reject) => {
        getUserCollection(userId).then((res) => {
            resolve(res.data.records)
        })
    })
}

export {
    getUserCollection_
}