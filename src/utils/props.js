export const title = {
    props: {
        title: {
            type: String,
        },
    }
};

export const size = {
    props: {
        size: {
            type: String,
            default: 'md',
            validator(val) {
                return ['sm', 'md', 'lg'].indexOf(val) >= 0;
            }
        },
    }
};

