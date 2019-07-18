import './style.scss'

let el = null;
let progress = 0;
let startId = 0;
let finishId = 0;
const MAX = 80;
const VX = MAX / 200;


function init() {
    if (!el) {
        el = document.createElement('div');
        el.className = 'u-loading-bar__progress';
        const wrapper = document.createElement('div');
        wrapper.className = 'u-loading-bar';
        wrapper.appendChild(el);
        document.body.appendChild(wrapper);
    }
    el.style.cssText = '';
    el.classList.remove('u-loading-bar__progress--error');
}


function clear() {
    cancelAnimationFrame(startId);
    cancelAnimationFrame(finishId);
}

function updateView() {
    el.style.cssText = `transform:scaleX(${progress / 100})`
}

export default {
    start() {
        init();
        clear();
        progress = 0;
        let vx = VX;
        function update() {
            progress += vx;
            vx *= .99;
            updateView();
            if (progress >= MAX) {
                return;
            }
            startId = requestAnimationFrame(update);
        }

        update();
    },
    finish(err=false) {
        init();
        clear();
        err && el.classList.add('u-loading-bar__progress--error');
        if (progress >= 100) {
            progress = 0;
        }
        let vx = (100 - progress) / 200;
        function update() {
            progress += vx;
            vx *= 1.2;
            updateView();
            if (progress >= 100) {
                clear();
                el.style.cssText = 'opacity:0';
                return;
            }
            finishId = requestAnimationFrame(update);
        }

        update();
    },
    error() {
        this.finish(true);
    }
}