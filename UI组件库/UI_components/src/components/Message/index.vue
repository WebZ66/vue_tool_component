<template>
  <div class="father">
    <transition-group name="fade" @before-enter="beforeEnter" @after-enter="afterEnter">
      <div v-for="item in listArr" :key="item" class="message-container" :class="{ success: bgFlag, error: !bgFlag }">
        <span>icon</span>
        <span class="text">{{ message }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick } from 'vue'
import type { Options } from './Type'
const message = ref<string>('默认的消息')
const isShow = ref<boolean>(false)

//定义背景
const bgFlag = ref<boolean>(true)
let timer: any = null
const listArr: any[] = reactive([])
const offsetY = 40
const success = (msg: string, options?: Options) => {
  const { icon, color } = options as Options
  listArr.push(Math.random())
  message.value = msg
  isShow.value = true
  //切换type
  bgFlag.value = true
}
//关闭提示框的时间设置
const close = (): Promise<boolean> => {
  return new Promise(resolve => {
    timer = setTimeout(() => {
      resolve(true)
    }, 1500)
  })
}
const error = (msg: string, options?: Options) => {
  const { icon, color } = options as Options
  message.value = msg
  if (isShow.value) {
    return
  }
  //切换type
  bgFlag.value = false
  isShow.value = true
  nextTick(() => {
    const text: HTMLSpanElement = document.querySelector('.text') as HTMLSpanElement
    text.style.color = color
  })
  close().then(() => {
    clearTimeout(timer)
    isShow.value = false
  })
}
const beforeEnter = (el: Element) => {
  ;(el as HTMLElement).style.top = listArr.length * offsetY + 'px'
}

const afterEnter = (el: Element) => {
  ;(el as HTMLElement).style.top = 20 + 'px'
  listArr.shift()
}
defineExpose({
  success,
  error
})
</script>

<style scoped>
.message-container {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 30px;
  left: 50%;
  opacity: 0;
  top: 10%;
  transform: translate(-50%, -50%);
  margin-bottom: 30px;
}
.success {
  background-color: rgba(235, 121, 40, 0.914);
  color: #fff;
}
.error {
  background-color: red;
  color: #fff;
}

.fade-enter-from {
  opacity: 1;
}
.fade-enter-active {
  transition: all 1.5s ease;
}
.fade-enter-to {
  opacity: 0;
}
</style>
