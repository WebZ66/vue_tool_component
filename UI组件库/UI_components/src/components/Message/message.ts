import type { App } from 'vue'
import Message from './index.vue'
import { createVNode, render } from 'vue'
interface Fn {
  success: (msg: string) => void
  error: (msg: string) => void
}
export default function (app: App) {
  const Vnode = createVNode(Message)
  render(Vnode, document.body)
  const { success, error } = Vnode.component?.exposed as Fn
  app.config.globalProperties.$message = {
    success,
    error
  }
}
