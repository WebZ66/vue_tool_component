import { onMounted } from 'vue'
type Options = {
  el: string
}
export default function (options: Options): Promise<{ baseURL: string }> {
  return new Promise(resolve => {
    onMounted(() => {
      let img: HTMLImageElement = document.querySelector(options.el) as HTMLImageElement
      //需要等图片加载完毕后再转换
      img.onload = () => {
        resolve({ baseURL: base64(img) })
      }
      const base64 = (el: HTMLImageElement) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = el.width
        canvas.height = el.height
        //目标元素  开始x轴位置  y轴位置 宽度 高度
        ctx?.drawImage(el, 0, 0, canvas.width, canvas.height)
        //基于img绘制canvas，然后通过toDataURL返回base64  
        return canvas.toDataURL('image/png')
      }
    })
  })
}
