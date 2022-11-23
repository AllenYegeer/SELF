import { ElMessage } from 'element-plus'

const success = (msg) => {
    ElMessage({
        message: msg,
        type: 'success',
    })
}
const warn = (msg) =>{
    ElMessage({
        message: msg,
        type: 'warning',
    })
}
const error = (msg) => {
    ElMessage.error(msg)
}

export{
    success,
    error,
    warn
}