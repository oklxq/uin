<template>
    <div class="n-select" v-click-hide="closePicker">
        <div class="n-select__display" @click.self="showPicker"></div>
        <transition name="dropdown">
            <div class="n-select__dropdown" v-show="isShow">
                <CInput v-if="searchable" ref="search" placeholder="搜索"></CInput>
                <List>
                    <ListItem>1231</ListItem>
                    <ListItem>1231</ListItem>
                    <ListItem>1231</ListItem>
                    <ListItem>1231</ListItem>
                    <ListItem>1231</ListItem>
                    <ListItem>1231</ListItem>
                    <ListItem>1231</ListItem>
                    <ListItem>1231</ListItem>
                    <ListItem>1231</ListItem>
                    <ListItem>1231</ListItem>
                    <ListItem>1231</ListItem>
                    <ListItem>1231</ListItem>
                    <ListItem>1231</ListItem>
                </List>
            </div>
        </transition>
    </div>
</template>

<script>
    import clickHide from '../../directives/click-hide';
    import {List, ListItem} from "../list";
    import CInput from '../input';

    export default {
        components: {List, ListItem,CInput},
        directives: {
            clickHide,
        },

        props: {
            searchable: Boolean,
            remote: Function,
        },
        data() {
            return {
                isShow: false,
            }
        },

        methods: {
            showPicker() {
                this.isShow = true;
                this.$nextTick(()=>{
                    this.$refs.search.focus();
                })
            },
            closePicker() {
                this.isShow = false;
            }
        }
    }
</script>


<style>

</style>