<template>
    <div class="u-slider">
        <div class="u-slider__track" ref="track" @click.stop="handleTrackClick">
            <div class="u-slider__progress" :style="{width:offset+'px'}"></div>
        </div>
        <div class="u-slider__bar" ref="bar" :style="{left:offset+'px'}" @mousedown="handleDown"></div>
    </div>
</template>

<script>

    function limit(val, size, total) {
        const hafSize = size / 2;
        const left = -hafSize;
        const right = total - hafSize;
        if (val < left) return left;
        if (val > right) return right;
        return val;
    }

    export default {
        name: "Slider",
        data() {
            return {
                barSize: 0,
                totalSize: 0,
                offset: 0,
            }
        },
        props: {
            value: Number,
        },
        created() {
            const handleMove = evt => {
                if (!this.isDown) return;
                const dis = evt.pageX - this.downX;
                this.offset = limit(this.lastOffset + dis, this.barSize, this.totalSize);
                this.$emit('input', this.current);
            };
            const handleUp = () => {
                this.isDown = false;
                this.$emit('change', this.current);
            };
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleUp);
            this.$on('hook:beforeDestroy', () => {
                document.removeEventListener('mousemove', handleMove);
                document.removeEventListener('mouseup', handleUp);
            });
        },
        computed: {
            current() {
                return (this.offset + this.barSize / 2) / this.totalSize;
            }
        },
        methods: {
            getSize() {
                this.barSize = this.$refs.bar.clientWidth;
                this.totalSize = this.$refs.track.clientWidth;
            },
            handleDown(evt) {
                this.getSize();
                this.lastOffset = evt.target.offsetLeft;
                this.downX = evt.pageX;
                this.isDown = true;
                this.$emit('input', this.current);
            },
            handleTrackClick(evt) {
                this.getSize();
                this.offset = evt.offsetX - this.barSize / 2;
                this.$emit('input', this.current);
            },
        },
        mounted() {

        }
    }
</script>
