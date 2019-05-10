import Message from './Message';
import Vue from 'vue';
import './style/index.scss';

function init() {
    const wrapper = document.createElement('div');
    wrapper.className = 'u-message-wrapper';
    const MessageInstance = Vue.extend(Message);

    Vue.prototype.$Message = {
        show(msg) {
            document.body.append(wrapper);
            const el = new MessageInstance();
            el.content = msg;
            el.type='success';
            wrapper.append(el.$mount().$el);
        },
        success(msg, time = 1500) {
            this.show();
        }
    }
}

typeof document !== 'undefined' && init();