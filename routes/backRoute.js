var connection=require('./server/connection');
/**
 * 后台页面路由
 * @param app
 */
module.exports=function(app){
    app.get('/addData',function(req,res){
        res.render('addData', {
            title: "添加数据"
        });
    });
    app.get('/addPictureData',function(req,res){
        var path=req.query.path;
        var title=req.query.title;
        var count=req.query.count;
        var type=req.query.type;
        var sql='insert into image(path,title,count,type) values("'+path+'","'+title+'",'+count+',"'+type+'")';
        connection.query(sql,function(err, rows, fields) {
            if (err) {
                console.log(err);
                res.send({
                    success:false,
                    message:"添加图片数据失败。。。"
                })
            } else {
                res.send({
                    success:true,
                    message:"添加图片数据成功！！！"
                })
            }
        });
    });
};