<template>
    <div>
        <myMenu @changeActive="changeActive"></myMenu>
    </div>
</template>

<script setup>
import myMenu from '../../views/Layout/myMenu/index.vue'

const emit = defineEmits(['changeActive'])

const changeActive = (num) => {
    emit('changeActive',num)
}
</script>