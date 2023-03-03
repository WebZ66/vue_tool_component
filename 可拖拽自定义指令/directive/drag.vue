<template>
  <div v-move class="drag-container">
    <div class="head"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, Directive, computed, DirectiveBinding } from 'vue'
const vMove: Directive<any, void> = (el: HTMLElement, binding: DirectiveBinding) => {
  let moveElement: HTMLDivElement = el.firstChild as HTMLDivElement
  //定义按下事件
  const mouseDown = (e: MouseEvent) => {
    /* 首先需要计算出鼠标按下那一刻，鼠标距离物体左边框的距离 
      e.clientX鼠标在页面的位置  offsetLeft 当前元素左顶点距离已经定位或者body的距离

      说白了拖拽事件就是鼠标按下时计算鼠标距离元素左侧距离，移动时鼠标距离-距离元素距离即可
    */
    let X = e.clientX - el.offsetLeft
    let Y = e.clientY - el.offsetTop
    const move = (e2: MouseEvent) => {
      /*
        移动时，需要随时计算出可移动距离 即鼠标位置-鼠标距离物体左边框距离 
       */
      el.style.left = e2.clientX - X + 'px'
      el.style.top = e2.clientY - Y + 'px'
    }
    //按下鼠标后，再次绑定鼠标移动事件 实现拖拽
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', move)
    })
  }
  moveElement.addEventListener('mousedown', mouseDown)
}
</script>

<style scoped>
.drag-container {
  width: 300px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid red;
}
.head {
  width: 100%;
  height: 40px;
  background-color: black;
}
</style>
