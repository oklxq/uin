import './style.css';

export default {
    props: {
        type: {
            type: String,
            required: true,
        },
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