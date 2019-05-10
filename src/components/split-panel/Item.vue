<template>
    <div class="n-split-panel__item">
        <slot></slot>
        <span class="drag" @mousedown="handleMouseDown"></span>
    </div>
</template>

<script>
    export default {
        name: "Item",
        mounted() {

            document.addEventListener('mouseup',evt=>{
                this._isDown = false;
            });
            document.addEventListener('mousemove',evt=>{
                if (this._isDown) {
                    const dis = evt.clientX - this._lastX;
                    this._target.style.flexGrow = '0';
                    this._target.style.width = this._lastSize + dis + 'px';
                    console.log(this._target.offsetLeft);
                }
            });
        },
        methods:{
            handleMouseDown(evt){
                this._isDown = true;
                this._target = evt.currentTarget.parentElement;
                this._lastSize = this._target.clientWidth;
                this._lastX = evt.clientX;
                console.log(22);
            }
        }
    }
</script>

<style scoped>

</style>