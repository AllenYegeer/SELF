import { publishArticle } from '@/request/tmp'
import { ElMessage } from 'element-plus'
import { success,error } from './popup/message'
const publishArticle_ = (data) => {
    publishArticle(data).then((res) => {
        if (res.data.code === '100'){
            success('发布成功')
            return 1
        }else{
            error('发布失败')
            return 0
        }
    })
}

export {
    publishArticle_,
    
}