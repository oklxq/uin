<template>
    <transition name="message" @after-leave="handleAfterLeave">
        <div v-show="visible" class="u-message-row">
            <div class="u-message" :class="{['u-message--'+type]:true}">
                <span class="u-message__icon"></span>
                <div class="u-message__content">{{content}}</div>
                <div class="u-message__extra" v-if="extra.length">
                    <a href="javascript:;" v-for="(e,index) in extra" :key="e"
                       @click="handleExtraClick(index,e)">{{e}}</a>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {Flex, FlexItem} from "../flex";

    export default {
        name: "Message",
        components: {Flex, FlexItem},
        props: {
            visible: Boolean,
            type: {
                type: String,
                validator(val) {
                    return ['success', 'error', 'warning', 'confirm'].indexOf(val) >= 0;
                }
            },
            content: String,
            extra: {
                type: [String, Array],
                default: () => [],
            }
        },
        methods: {
            handleExtraClick(index, value) {
                this.$emit('on-extra', {
                    index, value
                });
            },
            handleAfterLeave() {
                this.$emit('dispose');
            }
        }
    }
</script>