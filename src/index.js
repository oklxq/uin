import './style/index.scss';
import Vue from 'vue';

window.Vue = Vue;
import {Select, Option} from './components/select';
import Input from './components/input';
import Icon from './components/icon';
import {Flex, FlexItem} from "./components/flex";

Vue.component('n-select', Select);
Vue.component('n-option', Option);
Vue.component('n-input', Input);
Vue.component('n-icon', Icon);
Vue.component('n-flex', Flex);
Vue.component('n-flex-item', FlexItem);
export default {};
