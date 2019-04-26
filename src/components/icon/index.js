import feather from 'feather-icons';
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
        return h('span', {
            'class': 'n-icon',
            domProps: {
                innerHTML: feather.icons[this.type].toSvg({
                    width: this.size,
                    height: this.size
                }),
            }
        });
    }
}