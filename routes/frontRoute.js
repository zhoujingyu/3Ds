var connection=require('./server/connection');
connection.connect();
/**
 * 前台页面路由
 * @param app
 */
module.exports=function(app){
    /**
     * 图片墙首页
     */
    app.get(/^\/(pictureWall)?$/,function(req,res){
        var sql='select distinct sort from image order by id desc';
        var result;
        
        connection.query(sql,function(err, rows, fields) {
            
            if (err) {
                console.error(err);
                result={};
            }else{
                result=rows;
            }
            result.unshift({sort:'*'});
            res.render('pages/pictureWall',{
                title:'照片墙',
                sortList:result
            });
        });
    });
    /**
     * 图片墙内页
     */
    app.get('/pictureWall/:id',function(req,res){

        connection.query('select * from image where id='+req.params.id,function(err, rows, fields) {
            if (err) {
                console.error(err);
                result = {};
            } else {
                result = rows;
            }
            console.log(result);
            var sortList=[{sort:'一列'},{sort:'两列'},{sort:'三列'},{sort:'四列'}];
            res.render('pages/pic2D', {
                title: result[0].title,
                data: result[0],
                sortList:sortList
            });
        });
        //res.render('pages/pic3D', {
        //    title: req.params.id
        //});
    });
    /**
     * 通过图片的id返回json数据
     */
    app.get('/getPicById',function(req,res){

        connection.query('select * from image where id='+req.query.id,function(err, rows, fields) {
            if (err) {
                console.error(err);
                result = {};
            } else {
                result = rows;
            }
            res.json(result);
        });
    });
    /**
     * 图片墙首页ajax获取图片
     */
    app.get('/getPicture',function(req,res){
        var sort=(req.query.sort!==undefined&&req.query.sort!='*')?' where sort="'+req.query.sort+'"':'',
            pageNo=(req.query.pageNo!==undefined)?req.query.pageNo:1,
            pageSize=(req.query.pageSize!==undefined)?req.query.pageSize:20;
        var start=pageSize*(pageNo-1);
        var sql='select * from image'+sort+' order by id desc limit '+start+','+pageSize;
        //sql='select * from image where sort="family" order by id desc';
        var result;
        console.log(sql);
        
        connection.query(sql,function(err, rows, fields) {

            if (err) {
                console.error(err);
                result={};
            }else{
                result=rows;
            }
            res.send(result);
        });
    });
    /**
     * ajax,根据sort分类获取图片
     */
    app.get('/getPicBySort',function(req,res){
        var sort=(req.query.sort!==undefined)?req.query.pageNo:'*',
            pageNo=(req.query.pageNo!==undefined)?req.query.pageNo:1,
            pageSize=(req.query.pageSize!==undefined)?req.query.pageSize:20;
        var start=1+(pageSize*(pageNo-1));
        var sql='select * from image where sort="'+sort+'" order by id desc limit '+start+','+pageSize;
        var result;

        connection.query(sql,function(err, rows, fields) {

            if (err) {
                console.error(err);
                result={};
            }else{
                result=rows;
            }
            res.send(result);
        });
    });
};