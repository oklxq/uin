export default {
    props: {
        id: [Number, String],
        name: [Number, String],
        placeholder: [Number, String],
        disabled: Boolean,
        readonly: Boolean,
        value: {
            type: [Number, String],
            default: '',
        }
    },

    methods: {
        focus() {

        }
    }
}