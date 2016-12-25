$(function(){
    var lazyLoad=new LazyLoad({
        keepOutLiving:false
    });//懒加载

    util.preventLongTap();

    var currentPage=0,//当前页数
        loading=false,//是否正在请求数据
        sort=localStorage.getItem('pictureWallSort')?localStorage.getItem('pictureWallSort'):'*',//默认分类,"全部"
        $picBox=$('#picBox'),
        st= 0,//滚动值
        wh=$(window).height(),//窗口高度
        dh=$(document).height();//页面高度

    var sortBtn=new SortBtn({
        action:function(){
            currentPage=0;
            $picBox.html('');
            sort=this.sort;
            localStorage.setItem('pictureWallSort',sort);
            getNextPage();
        }
    });

    /**
     * 获取下一页数据
     * @returns {boolean}
     */
    var getNextPage=function(){
        if(loading)return false;
        $.ajax({
            type:'get',
            url:'/getPicture',
            data:{
                sort:sort,
                pageNo:currentPage+1
            },
            dataType:'JSON',
            beforeSend:function(){
                loading=true;
            },
            success:function(data){
                loading=false;
                var tmp='',len=data.length;//=buildList(data);
                for(var i=0;i<len;i++){
                    tmp+=buildList(data[i]);
                }
                $picBox.append(tmp);
                currentPage++;
                resize();
                lazyLoad.collectCanLoadImg();
            },
            error:function(){
                loading=false;
                console.log('连接错误');
            }
        })
    };

    /**
     * 构建图片列表
     * @param data
     * @returns {string}
     */
    var buildList=function(data){
        return '<a href="/pictureWall/'+data.id+'" class="pic-padding">'+
                '<div class="pic-shadow">'+
                    '<img src="/img/common/loading.png" data-src="'+data.path+'1.'+data.type+'">'+
                '</div>'+
                '<div class="pic-title">'+data.title+'</div>'+
               '</a>';
    };

    /**
     * 屏幕滚动事件，将到底时加载下一页
     */
    //window.onscroll=function(){
    //    st=document.documentElement.scrollTop || document.body.scrollTop;
    //};

    window.addEventListener('scroll',function(){
        st=document.documentElement.scrollTop || document.body.scrollTop;
        if(st+wh+10>=dh&&!loading){
            getNextPage();
        }
    });

    /**
     * 重置窗口高度、页面高度
     */
    var resize=function(){
        wh=$(window).height();
        dh=$(document).height();
    };

    $(window).resize(function(){
        resize();
    });

    $picBox.on('resize',function(){
        console.log('$picBox:resize');
        resize();
    });

    getNextPage();

    //----------------------------------------------------------------------------------------------------------------

    //$('#sortBox').on('click','.sort-child',function(){
    //    var key=$(this).attr('data-key');
    //    if(sort!=key){
    //        sort=key;
    //        currentPage=0;
    //        $picBox.html('');
    //        hideSort();
    //        getNextPage();
    //    }
    //});
});