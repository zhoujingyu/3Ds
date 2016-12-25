function Util(){

}

/**
 * 判断是否为移动端
 * @returns {boolean}
 */
Util.prototype.isMobile=function(){
    return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent);
}

/**
 * 返回滚动的手机或pc事件
 * @returns {string}
 */
Util.prototype.getScrollEvent=function(){
    return this.isMobile()?'touchmove':'wheel';
}

/**
 * 阻止手机长按事件
 */
Util.prototype.preventLongTap=function(){
    document.oncontextmenu=function(){return false};
    document.onselectstart=function(){return false};
    $('body').css({
        '-moz-user-select':'none',
        '-webkit-user-select':'none',
        '-webkit-touch-callout':'none'
    });
}

const util=new Util();