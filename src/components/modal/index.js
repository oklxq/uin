import $Modal, {closeAll} from './Modal';
import {callFn} from "../../utils";
import './style/index.scss';

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
            } = config;

            el.icon=icon;
            el.size = size;
            el.type = type;
            el.title = title;
            el.header = header;
            el.content = content;
            el.async = async;
            el.showClose = showClose;
            el.showCancel = showCancel;
            const dom = el.$mount().$el;
            document.body.append(dom);
            el.value = true;

            let onConfirm = null;
            let onClose = null;


            el.$on('on-confirm', () => {
                if (!async) {
                    el.value = false;
                    callFn(onConfirm);
                } else {
                    callFn(onConfirm, function () {
                        el.loading = !(!!arguments[0]);
                        el.value = !(!!arguments[1]);
                    });
                }
            });

            el.$on('on-close', () => {
                el.value = false;
            });
            return {
                onConfirm: function (fn) {
                    onConfirm = fn;
                    return this;
                },
                onClose: function (fn) {
                    onClose = fn;
                    return this;
                }
            };
        },


        success(title, content) {
            return this.show(getCommon({title, content,icon:'c-success'}));
        },
        error(title, content) {
            return this.show(getCommon({title, content, type: 'error',icon:'c-error'}));
        },
        warning(title, content) {
            return this.show(getCommon({title, content, type: 'warning',icon:'c-warning'}));
        },
        confirm(title, content) {
            return this.show(getCommon({title, content, type: 'confirm', showCancel: true,icon:'c-confirm'}));
        },
        closeAll() {
            closeAll();
        }
    }
}

typeof document !== 'undefined' && init();