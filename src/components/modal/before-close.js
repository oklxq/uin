export default function (fn,cb) {
    const result = fn();
    if (typeof result === 'undefined') {
        return cb();
    }
    if (typeof result === 'boolean') {
        return result && cb();
    }
    if (result.constructor === Promise) {
        this.loading = true;
        result.then(() => {
            cb();
        }).catch(() => {
            this.loading = false;
        });
    }
}