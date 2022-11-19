import { publishArticle } from '@/request/tmp'
import { ElMessage } from 'element-plus'
const publishArticle_ = (data) => {
    publishArticle(data).then((res) => {
        if (res.data.code === '100'){
            ElMessage({
                message:'发布成功',
                type:'success'
            })
            return 1
        }else{
            ElMessage.error('发布失败')
            return 0
        }
    })
}

export {
    publishArticle_,
    
}