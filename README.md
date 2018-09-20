# aygbitcoin-h5

#### Description
token world项目的运营页面

#### 安装

1. git clone https://gitee.com/aiyuangong/aygbitcoin-h5.git
2. cd aygbitcoin-h5
3. npm install
4. npm start

#### 介绍

1. 很简单的多页面脚手架
2. 基于webpack4

#### 如何创建一个活动

1. 在`src/pages`下新建活动`newAct`，`newAct`下创建活动的页面`page1.html`
2. 在`src/entries`下新建同活动名文件夹`newAct`，`newAct`下创建同名活动的页面`page1.js`
3. 静态资源最好也按照上述方式创建，方便后期维护
4. npm start启动，`localhost:8080/newAct/page1.html`即可查看

#### 文档

1. 项目按照750px的设计稿，如果不是，请UI修改，通过`postcss-px-to-viewport`插件自动转化为vw单位，开发时只需写真实的px
2. 不支持DOM0级事件
3. 如果有过期活动，请将活动相关数据拷贝至`src/expire`文件夹
4. `get/post`方法最后有个默认参数，表示需要未登录时需要跳转到的页面，如果不需要则传`false`
5. `src/util/ajax`依赖jquery，如果在vue使用，建议使用`src/util/fetch`,因为很多活动场景不一致，所以只做了简单的自定义，可以自己在活动项目内创建实例
6. 常用的功能函数放在`src/util/tool`里，可以自由添加

#### 更新
1. 2018/08/13，`src/util/tool`添加字符串模板功能，*用于jq页面*
2. 2018/09/15，现在活动支持spa了，demo可以查看`pages/packet`文件夹
3. 2018/08/16，新增了toast组件，可以添加至全局
    ```javascript
    import {toast} from '@/components/commen/tw-toast'
    
    Vue.use(toast)

    //使用
    this.$toast('xxxxx'[,duration])
    ```
    也可以单独引用
    ```javascript
    import {Toast} from '@/components/commen/tw-toast'
    Toast('xxxxx'[,duration])
    ```
4. 2018/08/17，新增了loading组件，可以添加至全局
    ```javascript
    import {loading} from '@/components/commen/tw-loading'

    Vue.use(loading)

    //使用
    this.$loading(Boolean'[,text])
    ```
    也可以单独引用
    ```javascript
    import {Loading} from '@/components/commen/tw-loading'
    Loading(Boolean[,text])
    ```
5. 2018/08/19，可以为元素添加自定义指令`v-loading`来实现局部loading