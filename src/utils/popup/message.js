import { ElMessage } from 'element-plus'

const success = (msg) => {
    ElMessage({
        message: msg,
        type: 'success',
    })
}

const error = (msg) => {
    ElMessage.error(msg)
}
export{
    success,
    error
}