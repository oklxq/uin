import {isArray, isString} from "../../../utils";
import provide from './provide-mixin';
import rules from './rules';

function getRules(rules) {
    if (isArray(rules)) {
        return rules;
    }
    return [rules];
}

function parse(val) {
    return val.split(':');
}

function validate(val) {
    const rs = getRules(this.rules);
    let len = rs.length;
    while (len--) {
        const rule = rs[len];
        if (isString(rule)) {
            const ps = rule.split(':');
            const validator = rules[ps[0]];
            if (!validator) continue;
            const result = validator.run(val, this.field, ps[1]);
            if (!result) {
                this.error = validator.msg(val, this.field, ps[1]);
                return;
            }

        }
    }
    this.error = '';
}

export default {
    mixins: [provide],
    props: {
        rules: {
            type: [String, Object, Array],
            default: () => '',
        },
        validateTrigger: {
            type: String,
            default: 'blur,'
        }
    },
    data() {
        return {
            error: '',
        }
    },
    mounted() {
        this.rules && this.$on(this.validateTrigger, evt => {
            const {value} = evt;
            validate.call(this, value);
        });
    }
}