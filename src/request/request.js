import axios  from "axios";
const instance = axios.create({
    baseURL:"http://47.109.58.84:9090",
    timeout: 3000,
})
function post(url,data = ""){
    return instance.post(url, data,{
        headers: {
            'accept': "application/json",
            'Content-Type': 'application/json',
        }
    })
}
function get(url){
    console.log(url);
    return instance.get(url,
        {
            headers: {
                'Content-Type':'application/ x - www - form - urlencoded'
            }
        })
}
export {
    post,
    get
}