import './style/index.scss';
import Vue from 'vue';

window.Vue = Vue;
import './components/message';
import {Select, Option} from './components/select';
import Input from './components/input';
import Icon from './components/icon';
import {Flex, FlexItem} from "./components/flex";
import {SplitPanel, SplitPanelItem} from "./components/split-panel";
import {Checkbox, CheckboxGroup} from "./components/checkbox";
import {Radio, RadioGroup} from "./components/radio";
import Slider from './components/slider';
import Button from './components/button'

Vue.component('u-btn', Button);
Vue.component('u-select', Select);
Vue.component('u-option', Option);
Vue.component('u-input', Input);
Vue.component('u-icon', Icon);
Vue.component('u-flex', Flex);
Vue.component('u-flex-item', FlexItem);
Vue.component('u-split-panel', SplitPanel);
Vue.component('u-split-panel-item', SplitPanelItem);
Vue.component('u-checkbox', Checkbox);
Vue.component('u-checkbox-group', CheckboxGroup);
Vue.component('u-radio', Radio);
Vue.component('u-radio-group', RadioGroup);
Vue.component('u-slider', Slider);
export default {};
