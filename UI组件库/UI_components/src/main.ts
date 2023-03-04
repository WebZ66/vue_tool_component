import { createApp } from 'vue'
import Message from './components/Message/message'
import App from './App.vue'

const app = createApp(App)
app.use(Message)
app.mount('#app')
