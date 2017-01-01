class Util {
    constructor() {

    }

    /**
     * 判断是否为移动端
     * @returns {boolean}
     */
    isMobile() {
        return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent);
    }

    /**
     * 返回滚动的手机或pc事件
     * @returns {string}
     */
    getScrollEvent() {
        return this.isMobile() ? 'touchmove' : 'wheel';
    }

    /**
     * 阻止手机长按事件
     */
    preventLongTap() {
        document.oncontextmenu = function () {
            return false
        };
        document.onselectstart = function () {
            return false
        };
        $('body').css({
            '-moz-user-select': 'none',
            '-webkit-user-select': 'none',
            '-webkit-touch-callout': 'none'
        });
    }
}

module.exports = Util;