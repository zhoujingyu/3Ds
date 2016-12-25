$(function () {
    var lazyLoad=new LazyLoad({
        keepOutLiving:false
    });

    var $scale = $('#scale');
    /**
     * 点击图片，满屏查看
     */
    $('body').on('click', '.pic2D-padding', function () {
        if ($scale.is(':hidden')) {
            $scale.css({
                'background-image': 'url("' + $(this).find('img').attr('src') + '")'
            }).show();
        }
    }).on(util.getScrollEvent(), function (e) {
        $scale.is(':visible') && e.preventDefault();
    });

    /**
     * 点击隐藏满屏查看
     */
    $scale.on('click', function () {
        $scale.hide();
    });

    new SortBtn({
       action:function(){
           setCols(this.sort);
       }
    });

    var cols=[],$pic2D=$('.pic2D-padding');//列数
    cols['一列']='100%';
    cols['两列']='50%';
    cols['三列']='33.33%';
    cols['四列']='25%';

    /**
     * 设置图片一行显示多少列
     * @param sort
     */
    var setCols=function(sort){
        $pic2D.css('width',cols[sort]);
        lazyLoad.collectCanLoadImg();
    }
});