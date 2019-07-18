import {isString} from "../../utils";

function getEle(val) {
    if (isString(val)) {
        return document.querySelector(val);
    }
    return val;
}

export default {
    props: {
        to: [String, HTMLElement],
    },
    render() {
        return this.$slots.default;
    },
    mounted(){
        const node = getEle(this.to);
        node && node.appendChild(this.$el);
    }
}