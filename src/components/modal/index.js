import $Modal, {closeAll} from './Modal';
import runBeforeClose from './before-close';
import './style/index.scss';
import {callFn} from "../../utils";

export default $Modal;

import Vue from 'vue';

function getCommon() {
    return Object.assign({
        size: 'sm',
        type: 'success',
        showCancel: false,
    }, arguments[0]);
}

function init() {
    const ModalInstance = Vue.extend($Modal);
    Vue.prototype.$Modal = {
        show(config) {
            const el = new ModalInstance();
            const {
                header,
                title,
                content,
                async = false,
                type,
                size = 'md',
                showClose = true,
                showCancel = true,
                icon,
                center = false,
                beforeClose = null,
                onConfirm = null,
                onCancel = null,
                confirmText = '确定',
                cancelText = '取消',
            } = config;
            el.center = center;
            el.icon = icon;
            el.size = size;
            el.type = type;
            el.title = title;
            el.header = header;
            el.content = content;
            el.async = async;
            el.showClose = showClose;
            el.showCancel = showCancel;
            el.confirmText = confirmText;
            el.cancelText = cancelText;
            if (type && !icon) {
                el.icon = 'c-' + type;
            }
            const dom = el.$mount().$el;
            document.body.append(dom);
            el.value = true;
            el.$on('on-cancel', () => {
                el.value = false;
                callFn(onCancel);
            });

            el.$on('on-confirm', () => {
                const cb = () => {
                    el.value = false;
                    typeof onConfirm === 'function' && onConfirm();
                };
                if (beforeClose) {
                    runBeforeClose.call(el, beforeClose, cb);
                } else {
                    cb();
                }
            });

            return el;
        },


        success(title, content) {
            return this.show(getCommon({title, content, icon: 'c-success'}));
        },
        error(title, content) {
            return this.show(getCommon({title, content, type: 'error', icon: 'c-error'}));
        },
        warning(title, content) {
            return this.show(getCommon({title, content, type: 'warning', icon: 'c-warning'}));
        },
        confirm(title, content) {
            return this.show(getCommon({title, content, type: 'confirm', showCancel: true, icon: 'c-confirm'}));
        },
        closeAll() {
            closeAll();
        }
    }
}

typeof document !== 'undefined' && init();