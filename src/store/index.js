import {createStore} from 'vuex'
const store = createStore({
    state(){ // 通过 $store 访问 store中的实例  如: $store.state.count 值为1
        return {
            count: 1,
        }
    },
    mutations:{  //mutations是对象,改变state中的数据
        addCount(state,parameter){  //此时的state是上面的,后面是参数
            state.count ++;
        }
    },
    //通过 (srcipt中使用) this.$store / (标签中使用)$store.commit('addCount',参数) 调用addCount方法;
    getters:{  //store中的计算属性
        addCount(state,getters){  //第二个参数表示当前store中的getters对象
            return state.count ++;
        }
    },
})

export default store