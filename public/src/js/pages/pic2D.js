import LazyLoad from "../lib/LazyLoad.js";
import SortBtn from "../components/SortBtn.js";
import Util from "../lib/Util.js";

let util = new Util();
let lazyLoad = null;

class Pic2D {
    constructor() {
        this.$scale = $('#scale');

        this.cols = [];
        this.cols['一列'] = '100%';
        this.cols['两列'] = '50%';
        this.cols['三列'] = '33.33%';
        this.cols['四列'] = '25%';

        this.$pic2D = $('.pic2D-padding');//列数

        this._showScreenFull();
        this._hideScreenFull();
    }

    /**
     * 点击图片，满屏查看
     * @private
     */
    _showScreenFull() {
        let self = this;
        $('body').on('click', '.pic2D-padding', function () {
            if (self.$scale.is(':hidden')) {
                self.$scale.css({
                    'background-image': 'url("' + $(this).find('img').attr('src') + '")'
                }).show();
            }
        }).on(util.getScrollEvent(), event => {
            self.$scale.is(':visible') && event.preventDefault();
        });
    }

    /**
     * 点击隐藏满屏查看
     * @private
     */
    _hideScreenFull() {
        this.$scale.on('click', event=> {
            this.$scale.hide();
        });
    }

    /**
     * 设置图片一行显示多少列
     * @param sort
     */
    setCols(sort) {
        this.$pic2D.css('width', this.cols[sort]);
        lazyLoad.reset();
        lazyLoad.collectCanLoadImg();
    }
}

$(function () {
    lazyLoad = new LazyLoad({
        keepOutLiving: false
    });

    let pic2D=new Pic2D();

    new SortBtn({
        action: function () {
            pic2D.setCols(this.sort);
        }
    });


    //http://120.52.73.43/adultvideo.science/media/videos/iphone/one_#num.mp4
    //var url='http://120.52.73.43/adultvideo.science/media/videos/iphone/one_#num.mp4';
    //var str='';
    //for(var i=1;i<=1000;i++){
    //    str+=url.replace('#num',i);
    //    str+='\n';
    //}

});