import Vue from 'vue';
import './style/index.scss';
import './components/tooltip';
import './components/message';

import Comp from './index';

Vue.prototype.$LoadingBar = Comp.LoadingBar;

for (let k in Comp) {
    
    Vue.component('u-' + k.replace(/[A-Z]/g, match => {
        return '_' + match.toLowerCase();
    }), Comp[k]);
}
Vue.component('u-btn', Comp.Button);
Vue.component('u-btn-group', Comp.BtnGroup);