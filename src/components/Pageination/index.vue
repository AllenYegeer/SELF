<template>
    <div class="page">
        <el-pagination background layout="total, prev, pager, next, jumper" :total="total" :page-size="1" 
        @current-change='changePage_'/>
    </div>
</template>
<script setup>
import { ref} from "@vue/reactivity";
import {computed} from 'vue'
    const props = defineProps(['total'])
    const emit = defineEmits(['changePage'])
    const totalSize = ref(computed(() => props.total))   //总的条数
    const changePage_ = (page) =>{
        emit('changePage',page)
    }
</script>
<style scoped>
.page {
    text-align:center;
    display:flex;
    justify-content: center;
    margin-bottom: 5px;
}
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>