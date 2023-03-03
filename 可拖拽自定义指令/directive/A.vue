<template>
  <div>
    <button v-has-show="'shop:create'">创建</button>

    <button v-has-show="'shop:edit'">编辑</button>

    <button v-has-show="'shop:delete'">删除</button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, Directive } from 'vue'
//自定义指令实现不同权限下，按钮的隐藏

localStorage.setItem('userId', 'zds')
/* mock后端发回的权限数据 permission数组 */
const permission = ['zds:shop:edit', 'zds:shop:create', 'zds:shop:delete']
const userId = localStorage.getItem('userId') as string
const vHasShow: Directive = (el: HTMLElement, dir) => {
  if (!permission.includes(userId + ':' + dir.value)) {
    el.style.display = 'none'
  }
}
</script>

<style scoped></style>
