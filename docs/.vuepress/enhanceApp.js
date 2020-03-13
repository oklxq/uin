import all from '../../src/index';
export default ({
    Vue, // VuePress 正在使用的 Vue 构造函数
    options, // 附加到根实例的一些选项
    router, // 当前应用的路由实例
    siteData, // 站点元数据
    isServer // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
    // ...做一些其他的应用级别的优化
    for (let k in all) {
        Vue.component('u' + k.replace(/[A-Z]/g, match => {
            return '-' + match.toLowerCase();
        }), all[k]);
    }
    
    Vue.component('u-btn', all.Button);
    Vue.component('u-btn-group', all.BtnGroup);
}