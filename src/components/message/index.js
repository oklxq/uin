import Message from './Message';
import './style/index.scss';
import Vue from 'vue';
export default function init() {
    const wrapper = document.createElement('div');
    wrapper.className = 'u-message-wrapper';
    const MessageInstance = Vue.extend(Message);
    const sizeWrapper = document.createElement('div');
    sizeWrapper.setAttribute('size', 'true');

    Vue.prototype.$Message = {
        show(config = {}) {
            const {content, type, duration = 2500, extra = [], onExtra} = config;
            if (!content) return;
            document.body.append(wrapper);
            wrapper.append(sizeWrapper);
            const el = new MessageInstance();
            const dom = el.$mount().$el;
            el.content = content;
            el.type = type;
            el.extra = extra;
            wrapper.append(dom);
            el.visible = true;

            setTimeout(() => {
                sizeWrapper.innerHTML = dom.outerHTML;
                dom.style.height = sizeWrapper.clientHeight + 'px';
            }, 0);

            duration > 0 && setTimeout(() => {
                el.visible = false;
            }, duration);
            el.$once('dispose', () => {
                wrapper.removeChild(dom);
                el.$destroy();
            });
            el.$once('on-extra', data => {
                typeof onExtra === 'function' && onExtra(data);
                el.visible = false;
            });
        },
        success(content, duration = 1500) {
            this.show({content, duration, type: 'success'});
        },
        error(content, duration = 1500) {
            this.show({content, duration, type: 'error'});
        },
        warning(content, duration = 1500) {
            this.show({content, duration, type: 'warning'});
        },
    }
}

typeof document !== 'undefined' && init();

