export function isString(val) {
    return typeof val === 'string';
}

export function isNumber(val) {
    return typeof val === 'number';
}


export function isBoolean(val) {
    return typeof val === 'boolean';
}

export function isArray(val) {
    return Array.isArray(val);
}

export function isBasic(val) {
    return isString(val) || isNumber(val) || isBoolean(val)
}

export function callFn(fn, ...arg) {
    typeof fn === 'function' && fn.call(null, arg);
}


let scrollBarSize = null;

export function getScrollBarSize() {
    if (scrollBarSize !== null) {
        return scrollBarSize;
    }
    const el = document.createElement('div');
    el.style.cssText = 'position:absolute;left:0px;background:red;visibility:hidden;overflow:hidden;width:50px;height:50px;';
    document.body.append(el);
    const w = el.clientWidth;
    el.style.overflow = 'auto';
    el.innerHTML = "<div style='height: 100px;'>size</div>";
    scrollBarSize = w - el.clientWidth;
    document.body.removeChild(el);
    return scrollBarSize;
}

export function getDocumentScroll() {
    return {
        top: document.documentElement.scrollTop,
        left: document.documentElement.scrollLeft,
    }
}

export function getCssSize(val) {
    if (isNumber(val)) {
        return val + 'px';
    }
    if (/%|px|vh|vw|em|rem$/.test(val)) {
        return val;
    }
    return val.replace(/\D/, '') + 'px';
}