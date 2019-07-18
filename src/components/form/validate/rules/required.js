export default {
    run(value, field) {
        return value.toString().length > 0;
    },
    msg(value, field) {
        return `this field is required.`;
    }
}