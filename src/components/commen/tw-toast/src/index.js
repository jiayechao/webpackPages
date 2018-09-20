import Vue from 'vue'
import ToastComponent from './tw-toast.vue'// 引入先前写好的vue
 
const ToastConstructor = Vue.extend(ToastComponent)
const Toast = (() => {
    let timer = null
    return (text, duration=1250) => {
        // 生成一个子类的实例
        const instance = new ToastConstructor()

        let toast = document.getElementsByClassName('tw-toast')[0]
        if(toast){
            console.log(document.body)
            document.body.removeChild(toast)
        }
        instance.$mount(document.createElement('div'))
        document.body.appendChild(instance.$el)
        instance.text = text;
        instance.isShow = true
        clearInterval(timer)
        timer = setTimeout(() => {
            instance.isShow = false;
        }, duration);

        return instance
    }
})()
export default Toast