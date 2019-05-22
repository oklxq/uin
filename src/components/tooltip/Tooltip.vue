<template>
    <div class="u-tooltip">
        <div class="u-tooltip__content" v-html="content"></div>
    </div>
</template>

<script>
    import {getDocumentScroll} from "../../utils";

    export default {
        name: "Tooltip",
        props: {
            content: [String, Number],
        },
        data() {
            return {}
        },
        methods: {
            attach(target,content) {
                if (!target) return;
                this.content = content;
                this.$nextTick(()=>{
                    document.body.appendChild(this.$el);
                    const ds = getDocumentScroll();
                    const style = {};
                    const bound = target.getBoundingClientRect();
                    style.left = bound.left + 'px';
                    style.top = bound.top + ds.top - this.$el.offsetHeight + 'px';
                    this.$el.style.cssText = Object.keys(style).map(k => k + ':' + style[k]).join(';');
                });

            }
        }
    }
</script>

<style scoped>

</style>