import '@babel/polyfill'
import 'mutationobserver-shim'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

import * as echarts from 'echarts'


import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/common.css'


const app = createApp(App)
installElementPlus(app)

axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });

axios.interceptors.response.use(
    res => {
        if (res.data.msg === '管理员未登录') {
            localStorage.setItem('Authorization', null)
            store.dispatch('setToken', {Authorization: null})


            router.push(`/login?ref=${encodeURI(window.location.pathname)}`)
            res.data.msg = '请登录后使用'
        }
        return res
    },
    error => {
        return Promise.reject(error)
    }
)
//axios.defaults.baseURL = 'https://api.fuchuang2.nowcent.cn'
axios.defaults.baseURL = 'https://47.106.170.165:8433'

app.config.globalProperties.$axios = axios

const app2 = app.use(store).use(router).use(VueAxios, axios).mount('#app')
app2.echarts = echarts

Date.prototype.Format = function (fmt) { //author: meizz
    const o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (const k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

