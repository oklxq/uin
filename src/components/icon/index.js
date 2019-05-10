import './style.scss';
export default {
    props: {
        type: {
            type: String,
            required: true,
        },
        size: {
            type: [Number, String],
            default: 20,
        }
    },
    render(h) {
        return h('i', {
            'class': {
                'uin-icon': true,
                ['uin-icon--' + this.type]: true,
            },
        });
    }
}