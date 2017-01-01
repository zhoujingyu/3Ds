/**
 * 创建3d图片类
 */
class Create3D {
    /**
     * 构造函数
     * 默认需要以下参数
     * @param data obj
     * @param data.count 图片数量
     * @param data.path 图片路径
     * @param data.sort 图片搜索类型
     * @param data.title 图片标题
     * @param data.type 图片后缀
     */
    constructor(data) {
        this.count = data.count;//图片数量
        this.path = data.path;//图片路径
        this.sort = data.sort;//图片搜索类型
        this.title = data.title;//图片标题
        this.suffix = data.type;//图片后缀
        this.type = ['Circle', 'Cube', 'Book'];//3d类型
        this.sides = [-1, 6, 1];//3d类型对应的边数,0为不确定边数
    }

    /**
     * 决定以什么类型把图片显示出来
     */
    start() {
        let t = 0, sides = 0, remain = -1;
        for (let i = 1; i <= this.count; i += sides) {
            remain = this.count - i + 1;
            if (remain < 3) {//当剩余图片数少于3张时，采取另外的显示方式
                console.log('当剩余图片数少于3张时，采取另外的显示方式:' + remain);
                sides = remain;
                for (var k = 1; k <= remain; k++) {
                    this.__createBook(1, this.random3D(300, 500), this.path, k);
                }
                break;
            } else if (remain <= 5) { //当剩余图片数>=3,<=5张时，采取Circle显示方式
                sides = remain;
                this['__create' + this.type[0]](sides, this.random3D(240, 280), this.path, i);
            } else {//当剩余图片数>=6张时，采取多种显示方式
                t = this.random3D(1, this.type.length);//随机产生一种3d类型
                t = 2;
                sides = this.sides[t - 1] == -1 ? this.random3D(3, remain >= 12 ? 12 : remain) : this.sides[t - 1];
                this['__create' + this.type[t - 1]](sides, this.random3D(240, 280), this.path, i);
            }
        }
    }

    /**
     *
     * @param start
     * @param end
     * @returns {number}
     */
    random3D(start, end) {
        return Math.ceil(Math.random() * (end - start + 1) + (start - 1))
    }

    /**
     * 环
     * @param sides 圆的边数
     * @param width 每张图片的宽度
     * @param path 图片路径
     * @param start 第一张图片序号
     */
    __createCircle(sides, width, path, start) {
        let deg = parseFloat((360 / sides).toFixed(4)),//每张图偏移的角度
            r = Math.floor((width / 2) / (Math.tan(deg / 2 / 180 * Math.PI))),//围成近似圆的形状的内圆的半径
            imgArr = [];//图片路径数组
        for (let i = 0; i < sides; i++) {
            imgArr.push(new Image());
            imgArr[i].src = path + (start + i) + '.' + this.suffix;
        }

        let rw = -1, rh = -1, loaded = 0, self = this;
        $(imgArr).on('load', function () {
            if (this.height > rh) {
                rh = this.height;//得到最高的图片高度
                rw = this.width;//得到最高的图片宽度
            }
            loaded++;
            if (loaded == sides) {
                //全部图片加载完毕
                let height = Math.ceil(width * rh / rw),//按比例得到给定width的最大高度
                    circle3DHeight = Math.ceil(height + (r * Math.sin(deg / 180 * Math.PI)) * 2 + 10),//图片转动过程所占的上下总高度
                    transform, translateX, translateZ, rotateY,//动画属性
                    url = '';
                let circle3DStyle, circle3DsStyle, divStyle = [];
                let style = '';
                for (let j = 0; j < sides; j++) {
                    url = path + (start + j) + "." + self.suffix;
                    translateX = r * (Math.sin(deg * j / 180 * Math.PI));
                    translateZ = r * (Math.cos(deg * j / 180 * Math.PI));
                    rotateY = j * deg;
                    transform = 'translate3d(' + translateX + 'px,0,' + translateZ + 'px) rotateY(' + rotateY + 'deg)';
                    style = "background-image:url('" + url + "')" + ";width:" + width + "px" + ";height:" + height + "px" + ";transform:" + transform;
                    divStyle.push(style);
                }

                circle3DsStyle = [
                    'width:' + width + 'px',
                    'height:' + height + 'px',
                    'margin-left:' + (-width / 2) + 'px',
                    'margin-top:' + (-height / 2) + 'px'
                ];
                circle3DStyle = [
                    'height:' + circle3DHeight + 'px'
                ];

                self.__insertIntoBody('circle', circle3DStyle, circle3DsStyle, divStyle);
            }
        });
    }

    /**
     * 正方体
     * @param sides
     * @param width
     * @param path
     * @param start
     */
    __createCube(sides, width, path, start) {
        if (sides != 6)return false;
        let deg = 90,//角度
            r = Math.floor((width / 2) / (Math.tan(deg / 2 / 180 * Math.PI))),//正方体的内球的半径
            translateZ = ['translateZ(' + (r * (Math.cos(deg * (0) / 180 * Math.PI))) + 'px)',
                'translateZ(' + (r * (Math.cos(deg * (1) / 180 * Math.PI))) + 'px)',
                'translateZ(' + (r * (Math.cos(deg * (2) / 180 * Math.PI))) + 'px)',
                'translateZ(' + (r * (Math.cos(deg * (3) / 180 * Math.PI))) + 'px)',
                'translateZ(0)',
                'translateZ(0)'],
            translateX = ['translateX(' + (r * (Math.sin(deg * (0) / 180 * Math.PI))) + 'px)',
                'translateX(' + (r * (Math.sin(deg * (1) / 180 * Math.PI))) + 'px)',
                'translateX(' + (r * (Math.sin(deg * (2) / 180 * Math.PI))) + 'px)',
                'translateX(' + (r * (Math.sin(deg * (3) / 180 * Math.PI))) + 'px)',
                'translateY(' + (-r) + 'px)',
                'translateY(' + (r) + 'px)'],
            rotate = ['rotateY(0)',
                'rotateY(90deg)',
                'rotateX(180deg) rotateY(180deg)',
                'rotateX(180deg) rotateY(270deg)',
                'rotateX(90deg)', 'rotateX(-90deg)'];
        let ImgDiv = [], imgArr = [], style;
        for (let i = 0; i < sides; i++) {
            imgArr.push(new Image());
            imgArr[i].src = path + (start + i) + '.' + this.suffix;
            style = [
                "width:" + width + "px",
                "height:" + width + "px",
                "background-image: url('" + (path + (start + i) + "." + this.suffix) + "')",
                "transform:" + translateX[i] + " " + translateZ[i] + " " + rotate[i]
            ];
            ImgDiv.push(style.join(";"));
        }

        let rw = -1, rh = -1, loaded = 0, self = this;
        $(imgArr).on('load', function () {
            if (this.height > rh) {
                rh = this.height;
                rw = this.width;
            }
            loaded++;
            if (loaded == sides) {

                let cube3DsStyle = [
                    'width:' + width + 'px',
                    'height:' + width + 'px',
                    'margin-left:-' + (width / 2) + 'px',
                    'margin-top:-' + (width / 2) + 'px'
                ];

                let cube3DStyle = [
                    "height:" + Math.ceil(width + (r * Math.sin(deg / 180 * Math.PI)) * 2 + 10) + "px"
                ];

                self.__insertIntoBody("cube", cube3DStyle, cube3DsStyle, ImgDiv)
            }
        });
    }

    /**
     * 书
     * @param sides
     * @param width
     * @param path
     * @param index
     */
    __createBook(sides, width, path, index) {
        let src = path + index + '.' + this.suffix,
            img = new Image();
        img.src = src;
        img.onload = function () {
            let rw = this.width,
                rh = this.height,
                height = Math.ceil(width * rh / rw),
                book3DHeight = Math.ceil(Math.sqrt(Math.pow(15, 2) + Math.pow(width / 2, 2) + Math.pow(height / 2, 2)) + height),
                backgroundSize = 'background-size: ' + (width + 60) + 'px ' + (height + 60) + 'px',
                backgroundImage = "background-image: url('" + src + "')",
                book3Ds = [
                    'width:' + width + 'px',
                    'height:' + height + 'px',
                    'margin-left:-' + (width / 2) + 'px',
                    'margin-top:-' + (height / 2) + 'px'
                ];
            book3Ds = book3Ds.join(';');
            let front = '<div class="book3D-front" style="' + backgroundSize + ';' + backgroundImage + '"></div>',
                left = '<div class="book3D-left" style="' + backgroundSize + ';' + backgroundImage + '"></div>',
                top = '<div class="book3D-top" style="' + backgroundSize + ';' + backgroundImage + '"></div>',
                right = '<div class="book3D-right" style="' + backgroundSize + ';' + backgroundImage + ';transform: translateX(' + (width - 30) + 'px) translateZ(-15px) rotateY(90deg)"></div>',
                back = '<div class="book3D-back" style="' + backgroundSize + ';' + backgroundImage + '"></div>',
                bottom = '<div class="book3D-bottom" style="' + backgroundSize + ';' + backgroundImage + ';transform: translateY(' + (height - 30) + 'px) translateZ(-15px) rotateX(-90deg)"></div>';

            let book = '<div class="book3D" style="height: ' + book3DHeight + 'px">' +
                '<div class="book3Ds" style="' + book3Ds + '">' +
                front + left + top + right + back + bottom +
                '</div>' +
                '</div>';
            $('body').append(book);
        };
    }


    /**
     * 插入数据
     * @param type
     * @param _3DStyle
     * @param _3DsStyle
     * @param divStyle
     */
    __insertIntoBody(type, _3DStyle, _3DsStyle, divStyle) {
        let d = type + '3D', ds = type + '3Ds';
        let style = '';
        for (let i of divStyle) {
            style += '<div style="' + i + '"></div>';
        }
        let el =
            '<div class="' + d + '" style="' + (_3DStyle.join(';')) + '">' +
            '<div class="' + ds + '" style="' + (_3DsStyle.join(';')) + '">' +
            style +
            '</div>' +
            '</div>';
        $('body').append(el);
    }
}

module.exports = Create3D;
//

//Create3D.prototype.createCube = function (sides, width, path, start) {

//};
//

//Create3D.prototype.createBook = function (sides, width, path, index) {

//};