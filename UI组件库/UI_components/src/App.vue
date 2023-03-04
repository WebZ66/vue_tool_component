<template>
  <div>
    App根组件页面
    <button @click="successClick">成功的message</button>
    <button @click="errorClick">失败的message</button>
  </div>
</template>

<script setup lang="ts">
import Message from './components/Message/index.vue'
import { ref, reactive, computed, getCurrentInstance, onMounted } from 'vue'
const instance = getCurrentInstance()
const successClick = () => {
  instance?.proxy?.$message.success('恭喜你实现啦', {
    icon: 'xx',
    color: 'red'
  })
}
const errorClick = () => {
  instance?.proxy?.$message.error('对不起你失败了', {
    icon: 'xx',
    color: '#fff'
  })
}
</script>

<style scoped></style>
