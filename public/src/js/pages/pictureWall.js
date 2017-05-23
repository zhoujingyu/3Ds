import SortBtn from "../components/SortBtn.js";
import Util from "../lib/Util.js";
import LazyLoad from "../lib/LazyLoad.js";

let lazyLoad = null;
let util = new Util();

class PictureWall {
    constructor() {
        this.currentPage = 0;//当前页数
        this.loading = false;//是否正在请求数据
        this.sort = localStorage.getItem('pictureWallSort') ? localStorage.getItem('pictureWallSort') : '*';//默认分类,"全部"
        this.$picBox = $('#picBox');
        this.st = 0;//滚动值
        this.wh = $(window).height();//窗口高度
        this.dh = $(document).height();//页面高度

        this._scroll();
        this._resize();
    }

    /**
     * 获取下一页数据
     * @returns {boolean}
     */
    getNextPage() {
        if (this.loading)return false;
        $.ajax({
            type: 'get',
            url: '/getPicture',
            data: {
                sort: this.sort,
                pageNo: this.currentPage + 1
            },
            dataType: 'JSON',
            beforeSend: () => {
                this.loading = true;
            },
            success: data => {
                this.loading = false;
                let tmp = '', len = data.length;//=buildList(data);
                for (let i = 0; i < len; i++) {
                    tmp += this.buildList(data[i]);
                }
                this.$picBox.append(tmp);
                this.currentPage++;
                this.resize();
                lazyLoad.collectCanLoadImg();
            },
            error: () => {
                this.loading = false;
                console.log('连接错误');
            }
        })
    }

    /**
     * 构建图片列表
     * @param data
     * @returns {string}
     */
    buildList(data) {
        return '<a href="/pictureWall/' + data.id + '" class="pic-padding">' +
            '<div class="pic-si">' +
            '<div class="pic-shadow"></div>' +
            '<img src="/img/common/loading.png" data-src="' + data.path.replace(/\+/g,'-') + '1.' + data.type + '">' +
            '</div>' +
            '<div class="pic-title">' + data.title + '</div>' +
            '</a>';
    }

    /**
     * 重置窗口高度、页面高度
     */
    resize() {
        this.wh = $(window).height();
        this.dh = $(document).height();
    }

    _resize() {
        window.addEventListener('resize', () => {
            this.resize();
        });
    }

    /**
     * 屏幕滚动事件，将到底时加载下一页
     */
    _scroll() {
        window.addEventListener('scroll', () => {
            this.st = document.documentElement.scrollTop || document.body.scrollTop;
            if (this.st + this.wh + 10 >= this.dh && !this.loading) {
                this.getNextPage();
            }
        });
    }
}
$(function () {

    lazyLoad = new LazyLoad({
        keepOutLiving: true
    });

    let pictureWall = new PictureWall();
    pictureWall.getNextPage();

    new SortBtn({
        action: function () {
            pictureWall.currentPage = 0;
            pictureWall.$picBox.html('');
            pictureWall.sort = this.sort;
            localStorage.setItem('pictureWallSort', this.sort);
            pictureWall.getNextPage();
        }
    });

    util.preventLongTap();
});