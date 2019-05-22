<template>
    <transition name="modal" @after-leave="$emit('dispose')">
        <div class="u-modal-wrapper" :center="center" v-if="value" @click.self="handleMaskClick">
            <div class="u-modal" :class="['u-modal--'+size]" :center="center">
                <div class="u-modal__header" v-if="header || $slots.header">
                    <div class="u-modal__header-content">
                        <slot name="header" v-if="$slots.header"></slot>
                        <span v-else-if="!!header" v-html="header"></span>
                    </div>
                    <div class="u-modal__close" @click="close">
                        <Icon type="x"></Icon>
                    </div>
                </div>
                <div class="u-modal__content">
                    <div class="u-modal__icon" :class="['u-modal__icon--'+type]" v-if="type||icon">
                        <Icon :type="icon"></Icon>
                    </div>
                    <div class="u-modal__main">
                        <slot v-if="$slots.default"></slot>
                        <template v-else>
                            <h4 class="u-modal__title" v-if="!!title">{{title}}</h4>
                            {{content}}
                        </template>
                    </div>

                </div>
                <div class="u-modal__footer">
                    <slot v-if="$slots.footer" name="footer"></slot>
                    <template v-else>
                        <Btn v-if="showCancel" @click.native="close">{{cancelText}}</Btn>
                        <Btn :loading="loading" @click.native="confirm" type="primary">{{confirmText}}</Btn>
                    </template>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Btn from '../button';
    import Icon from '../icon';
    import {title, size} from '../../utils/props';

    const Instances = [];

    if (typeof document !== 'undefined') {
        document.addEventListener('keydown', (evt) => {
            if (evt.key.toLowerCase() === 'escape') {
                if (Instances.length) {
                    Instances[Instances.length - 1].close();
                }
            }
        });

    }

    export function closeAll() {
        Instances.forEach(o => {
            o.close();
        });
        Instances.splice(0, Instances.length);
    }

    function check() {
        document.body.classList[Instances.length ? 'add' : 'remove']('has-modal');
    }

    export default {
        name: "Modal",
        components: {Btn, Icon},
        mixins: [title, size],
        props: {
            header: String,
            content: String,
            value: Boolean,
            async: Boolean,
            center: Boolean,
            icon: String,
            confirmText: {
                type: String,
                default: '确定',
            },
            cancelText: {
                type: String,
                default: '取消',
            },
            escClosable: {
                type: Boolean,
                default: true,
            },
            maskClosable: {
                type: Boolean,
                default: true,
            },
            type: {
                type: String,
                default: '',
                validator(val) {
                    if (!val) return true;
                    return ['success', 'error', 'warning', 'confirm'].indexOf(val) >= 0;
                }
            },
            showCancel: {
                type: Boolean,
                default: true,
            },
            showClose: {
                type: Boolean,
                default: true,
            },
        },
        data() {
            return {
                loading: false,
            }
        },
        watch: {
            value() {
                const find = Instances.findIndex(o => o === this);
                if (this.value) {
                    find < 0 && Instances.push(this);
                } else {
                    find >= 0 && Instances.splice(find, 1);
                    this.loading = false;
                }
                check();
            }
        },
        mounted() {
            check();
        },
        beforeDestroy() {
            const find = Instances.findIndex(o => o === this);
            find >= 0 && Instances.splice(find, 1);
            check();
        },

        methods: {
            handleMaskClick() {
                this.maskClosable && this.close();
            },
            close() {
                this.loading = false;
                this.$emit('on-close');
                this.$emit('input', false);
            },
            confirm() {
                this.$emit('on-confirm', this.async ? () => {
                    this.loading = false;
                } : null);
                if (this.async) {
                    this.loading = true;
                    return;
                }
                this.close();
            }
        }
    }
</script>
