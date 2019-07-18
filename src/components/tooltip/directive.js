// import Tooltip from './Tooltip';
// import Vue from 'vue';

// const TipCom = Vue.extend(Tooltip);
// const tipInstance = new TipCom();
// const el = tipInstance.$mount();
// const dom = el.$el;
const offset = 8;
import {getDocumentScroll} from "../../utils";

let delayId = 0;

function init() {
    const dom = document.createElement('div');
    dom.$tipMeta = {};
    dom.addEventListener('mouseenter', () => {
        clearTimeout(delayId);
    });
    dom.addEventListener('mouseout', () => {
        !dom.$trigger && handleHide();
    });
    dom.className = 'u-tooltip';
    const content = document.createElement('div');
    content.className = 'u-tooltip__content';
    dom.appendChild(content);
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width', 16);
    svg.setAttribute('height', 10);
    const arrow = document.createElementNS(ns, 'path');
    arrow.setAttribute('d', 'M0 0 L8 6 L16 0 Z');
    svg.appendChild(arrow);
    dom.appendChild(svg);
    return {dom, content};
}


const {dom, content} = init();

function attach(target, val) {

    const {innerWidth, innerHeight} = window;
    content.innerHTML = val;
    document.body.appendChild(dom);
    const {clientWidth, clientHeight} = dom;
    const ds = getDocumentScroll();
    const bound = target.getBoundingClientRect();
    const style = {};
    style.left = bound.left + (bound.width / 2 - clientWidth / 2) + 'px';
    style.top = bound.top + ds.top - dom.clientHeight - offset + 'px';

    // 若右侧的空间不足以容纳提示框，则执行右对齐
    const right = innerWidth - bound.left;
    if (right < clientWidth) {
        style.left = 'auto';
        style.right = right + 'px';
    }
    // 若左侧的空间不足以容纳提示框，则执行左对齐
    const left = bound.left + bound.width;
    if (left < clientWidth) {
        style.left = bound.left + 'px';
        style.right = 'auto';
    }
    dom.style.cssText = Object.keys(style).map(k => k + ':' + style[k]).join(';');
    dom.classList.add('u-tooltip--show');
}

function handleShow(evt) {
    clearTimeout(delayId);
    const {currentTarget} = evt;
    dom.$trigger = currentTarget.$tipTrigger;
    attach(currentTarget, currentTarget.$tipContent);
    evt.stopPropagation();
}

function handleHide() {
    delayId = setTimeout(() => {
        dom.classList.remove('u-tooltip--show');
    }, 0);
}

function handleClick(evt) {
    evt.stopPropagation();
    evt.currentTarget.$tipTrigger && handleShow(evt);
}

export default {
    bind(el, bind) {
        el.$tipContent = bind.value;
        el.$tipTrigger = bind.modifiers.click;
        el.addEventListener('click', handleClick);
        el.$docHandler = evt => {
            !dom.contains(evt.target) && !el.contains(evt.target) && handleHide();
        };
        document.addEventListener('click', el.$docHandler);
        if (!bind.modifiers.click) {
            el.addEventListener('mouseenter', handleShow);
            el.addEventListener('mouseleave', handleHide);
        }
    },
    update(el, bind) {
        el.$tipContent = bind.value;
    },
    unbind(el) {
        el.removeEventListener('click', handleShow);
        el.removeEventListener('mouseenter', handleShow);
        el.removeEventListener('mouseleave', handleHide);
        document.removeEventListener('click', el.$docHandler);
    }
}