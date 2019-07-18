export default {
    run(value, field, len) {
        return value.toString().length <= len;
    },
    msg(value, field,len) {
        return `Up to ${len} characters!`;
    }
}