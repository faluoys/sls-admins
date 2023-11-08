/**
 * 创建一个防抖函数，用于延迟执行目标函数。
 * @param {Function} fn - 目标函数，将被防抖执行。
 * @param {number} delay - 延迟的毫秒数，防抖时间窗口。
 * @returns {Function} - 返回一个新函数，可以安全地用于事件处理。
 */
export function debounce(fn, delay = 500) {
    let timerId;

    return function (...args) {
        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}
