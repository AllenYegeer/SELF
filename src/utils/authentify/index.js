function isPassword(val) {  //密码验证
    if (parseInt(val[0]) >= 0 && parseInt(val[0]) <= 9){
        return false;
    }
    const reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{6,}$/;
    if (reg.exec(val)){
        return true;
    } 
    else{
        return false
    }
}

function isPhone(val){   //手机验证
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (reg.exec(val)) {
        return true
    } else {
        return false;
    }

}
export {
    isPassword,
    isPhone
}
