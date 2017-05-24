const connection = require('./server/connection');

/**
 * 前台页面路由
 * @param app
 */
module.exports = (app) => {
    /**
     * 首页
     */
    app.get('/', (req, res, next)=> {
        res.render('pages/index', {
            title: '首页'
        })
    });

    /**
     * 图片墙首页
     */
    app.get('/pictureWall', (req, res, next)=> {
        var sql = 'select distinct sort from image order by id desc';
        var result;

        connection.query(sql, (err, rows, fields) => {

            if (err) {
                console.error(err);
                result = [];
            } else {
                result = rows;
            }

            result.unshift({sort: '*'});
            res.render('pages/pictureWall', {
                title: '照片墙',
                sortList: result
            });
        }).on('error', (err) => {
            console.warn("----------首页查询数据库失败----------");
        });
    });
    /**
     * 图片墙首页ajax获取图片
     */
    app.get('/getPicture', (req, res, next) => {
        var sort = (req.query.sort !== undefined && req.query.sort != '*') ? ' where sort="' + req.query.sort + '"' : '',
            pageNo = (req.query.pageNo !== undefined) ? req.query.pageNo : 1,
            pageSize = (req.query.pageSize !== undefined) ? req.query.pageSize : 20;
        var start = pageSize * (pageNo - 1);
        var sql = 'select * from image' + sort + ' order by id desc limit ' + start + ',' + pageSize;
        //sql='select * from image where sort="family" order by id desc';
        var result;
        console.log(sql);

        connection.query(sql, (err, rows, fields) => {

            if (err) {
                console.error(err);
                //连接数据库失败时使用临时数据
                result = [{
                    id: 1,
                    type: 'jpg',
                    count: 98,
                    path: '/img/car/',
                    title: '超跑'
                }];
            } else {
                result = rows;
            }
            res.send(result);
        }).on('error', err => {
            console.warn(err);
            console.warn("----------getPicture:查询数据库失败----------");

            //result = [{
            //    id:1,
            //    type: 'jpg',
            //    path: '/img/car/',
            //    title: '超跑'
            //}];
            //res.send(result);
        });
    });
    /**
     * 图片墙内页
     */
    app.get('/pictureWall/:id', (req, res, next) => {

        connection.query('select * from image where id=' + req.params.id, (err, rows, fields) => {

            var sortList = [{sort: '一列'}, {sort: '两列'}, {sort: '三列'}, {sort: '四列'}];

            if (err) {
                console.error(err);
                result = [{
                    title: '超跑',
                    count: 98,
                    path: '/img/car/',
                    type: 'jpg'
                }];
            } else {
                result = rows;
            }
            console.log(result);

            res.render('pages/pic2D', {
                title: result[0].title,
                data: result[0],
                sortList: sortList
            });
        }).on('error', (err) => {
            console.warn("----------内页查询数据库失败----------");
        });
        //res.render('pages/pic3D', {
        //    title: req.params.id
        //});
    });
    /**
     * 通过图片的id返回json数据
     */
    app.get('/getPicById', (req, res, next) => {

        connection.query('select * from image where id=' + req.query.id, (err, rows, fields) => {
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
     * ajax,根据sort分类获取图片
     */
    app.get('/getPicBySort', (req, res, next) => {
        var sort = (req.query.sort !== undefined) ? req.query.pageNo : '*',
            pageNo = (req.query.pageNo !== undefined) ? req.query.pageNo : 1,
            pageSize = (req.query.pageSize !== undefined) ? req.query.pageSize : 20;
        var start = 1 + (pageSize * (pageNo - 1));
        var sql = 'select * from image where sort="' + sort + '" order by id desc limit ' + start + ',' + pageSize;
        var result;

        connection.query(sql, (err, rows, fields) => {

            if (err) {
                console.error(err);
                result = {};
            } else {
                result = rows;
            }
            res.send(result);
        });
    });
};