export function isString(val) {
    return typeof val === 'string';
}

export function isNumber(val) {
    return typeof val === 'number';
}


export function isBoolean(val) {
    return typeof val === 'boolean';
}

export function isBasic(val) {
    return isString(val) || isNumber(val) || isBoolean(val)
}

