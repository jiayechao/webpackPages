import Vue from 'vue'
import LoadingComponent from './tw-loading.vue'

const LoadingConstructor = Vue.extend(LoadingComponent)

const Loading = (loading=true,text='加载中…') => {
    // 生成一个子类的实例
    const instance = new LoadingConstructor()

    let load= document.getElementsByClassName('tw-loading')[0]
    if(load){
        document.body.removeChild(load)
    }
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)
    instance.text = text;
    instance.loading = loading

    return instance
}
export default Loading