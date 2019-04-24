const handler = '$clickHideHandler';
export default {
    bind(el, bind) {
        !el[handler] && Object.defineProperty(el, handler, {
            enumerable: false,
            get() {
                return e => {
                    const {target} = e;
                    if (el === target || el.contains(target)) {
                        return;
                    }
                    typeof bind.value === 'function' && bind.value();
                };
            }
        });
        document.addEventListener('click', el[handler]);
    },
    unbind(el) {
        document.removeEventListener('click', el[handler]);
        delete el[handler];
    }
}