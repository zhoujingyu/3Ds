class LazyLoad {
    constructor(obj) {
        if (obj === undefined)obj = {};

        this.winH = document.documentElement.clientHeight || document.body.clientHeight;//窗口高度
        this.winW = document.documentElement.clientWidth || document.body.clientWidth;//窗口宽度
        this.x = document.documentElement.scrollLeft || document.body.scrollLeft;//窗口左上角x坐标
        this.y = document.documentElement.scrollTop || document.body.scrollTop;//窗口左上角y坐标
        this.loadingImg = '/img/common/loading.png';//默认正在加载图片路径
        this.keepOutLiving = obj.keepOutLiving !== undefined ? obj.keepOutLiving : true;//true:保持窗口外的图片显示原图, false:保持窗口外的图片显示默认图
        this.expand = this.keepOutLiving ? 0 : document.documentElement.clientHeight;//当keepOutLiving=false时，窗口高度上下扩大的距离

        this.resize();
        this.scroll();
        this.collectCanLoadImg();
    }

    resize() {
        window.addEventListener('resize', event => {
            this.winH = document.documentElement.clientHeight || document.body.clientHeight;
            this.winW = document.documentElement.clientWidth || document.body.clientWidth;
            this.x = document.documentElement.scrollLeft || document.body.scrollLeft;
            this.y = document.documentElement.scrollTop || document.body.scrollTop;
            this.collectCanLoadImg();
        });
    }

    scroll() {
        window.addEventListener('scroll', event => {
            this.x = document.documentElement.scrollLeft || document.body.scrollLeft;
            this.y = document.documentElement.scrollTop || document.body.scrollTop;
            this.collectCanLoadImg();
        });
    }

    collectCanLoadImg() {
        let self = this,
            img = document.getElementsByTagName('img'),
            x, y, w, h, len = img.length;
        for (var i = 0; i < len; i++) {
            x = this.getX(img[i]);
            y = this.getY(img[i]);
            w = $(img[i]).width();
            h = $(img[i]).height();
            if (x + w > this.x &&
                this.x + this.winW > x &&
                y + h + this.expand > this.y &&
                this.y + this.winH + this.expand > y) {
                this.loadImg(img[i]);
            } else {
                if (!this.keepOutLiving) {
                    (function (img) {
                        if (img.clientHeight == 0 && img.getAttribute('src') != img.getAttribute('data-src')) {//图片未下载完，且正在载入的不是默认图
                            //img.onload=function(){
                            //var height=img.clientHeight,
                            //    width=img.clientWidth;
                            //img.style.height=height+'px';
                            //img.style.width=width+'px';
                            //}
                        } else {//图片已下载完
                            let height = img.clientHeight,
                                width = img.clientWidth;
                            img.style.height = height + 'px';
                            img.style.width = width + 'px';
                        }
                        img.setAttribute('src', self.loadingImg);
                    })(img[i]);
                }
            }
        }
    }

    loadImg(obj) {
        let src = obj.getAttribute('src'),
            dataSrc = obj.getAttribute('data-src');
        if (src != dataSrc) {
            obj.style.height = '';
            obj.style.width = '';
            obj.setAttribute('src', dataSrc);
            obj.onload = () => {
                this.collectCanLoadImg();
            }
        }
    }

    getY(e) {
        let offset = e.offsetTop;
        if (e.offsetParent != null) offset += this.getY(e.offsetParent);
        return offset;
    }

    getX(e) {
        let offset = e.offsetLeft;
        if (e.offsetParent != null) offset += this.getX(e.offsetParent);
        return offset;
    }
}

module.exports = LazyLoad;
