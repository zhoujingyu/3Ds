/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Create3D = __webpack_require__(4);

	var _Create3D2 = _interopRequireDefault(_Create3D);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var id = $('title').text();

	$.ajax({
	    type: 'get',
	    url: '/getPicById',
	    data: {
	        id: id
	    },
	    dataType: 'json',
	    success: function success(data) {
	        var c3D = new _Create3D2.default(data[0]);
	        c3D.start();
	    },
	    error: function error() {
	        console.log('失败');
	    }
	});

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * 创建3d图片类
	 */
	var Create3D = function () {
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
	    function Create3D(data) {
	        _classCallCheck(this, Create3D);

	        this.count = data.count; //图片数量
	        this.path = data.path; //图片路径
	        this.sort = data.sort; //图片搜索类型
	        this.title = data.title; //图片标题
	        this.suffix = data.type; //图片后缀
	        this.type = ['Circle', 'Cube', 'Book']; //3d类型
	        this.sides = [-1, 6, 1]; //3d类型对应的边数,0为不确定边数
	    }

	    /**
	     * 决定以什么类型把图片显示出来
	     */


	    _createClass(Create3D, [{
	        key: 'start',
	        value: function start() {
	            var t = 0,
	                sides = 0,
	                remain = -1;
	            for (var i = 1; i <= this.count; i += sides) {
	                remain = this.count - i + 1;
	                if (remain < 3) {
	                    //当剩余图片数少于3张时，采取另外的显示方式
	                    console.log('当剩余图片数少于3张时，采取另外的显示方式:' + remain);
	                    sides = remain;
	                    for (var k = 1; k <= remain; k++) {
	                        this.__createBook(1, this.random3D(300, 500), this.path, k);
	                    }
	                    break;
	                } else if (remain <= 5) {
	                    //当剩余图片数>=3,<=5张时，采取Circle显示方式
	                    sides = remain;
	                    this['__create' + this.type[0]](sides, this.random3D(240, 280), this.path, i);
	                } else {
	                    //当剩余图片数>=6张时，采取多种显示方式
	                    t = this.random3D(1, this.type.length); //随机产生一种3d类型
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

	    }, {
	        key: 'random3D',
	        value: function random3D(start, end) {
	            return Math.ceil(Math.random() * (end - start + 1) + (start - 1));
	        }

	        /**
	         * 环
	         * @param sides 圆的边数
	         * @param width 每张图片的宽度
	         * @param path 图片路径
	         * @param start 第一张图片序号
	         */

	    }, {
	        key: '__createCircle',
	        value: function __createCircle(sides, width, path, start) {
	            var deg = parseFloat((360 / sides).toFixed(4)),
	                //每张图偏移的角度
	            r = Math.floor(width / 2 / Math.tan(deg / 2 / 180 * Math.PI)),
	                //围成近似圆的形状的内圆的半径
	            imgArr = []; //图片路径数组
	            for (var i = 0; i < sides; i++) {
	                imgArr.push(new Image());
	                imgArr[i].src = path + (start + i) + '.' + this.suffix;
	            }

	            var rw = -1,
	                rh = -1,
	                loaded = 0,
	                self = this;
	            $(imgArr).on('load', function () {
	                if (this.height > rh) {
	                    rh = this.height; //得到最高的图片高度
	                    rw = this.width; //得到最高的图片宽度
	                }
	                loaded++;
	                if (loaded == sides) {
	                    //全部图片加载完毕
	                    var height = Math.ceil(width * rh / rw),
	                        //按比例得到给定width的最大高度
	                    circle3DHeight = Math.ceil(height + r * Math.sin(deg / 180 * Math.PI) * 2 + 10),
	                        //图片转动过程所占的上下总高度
	                    transform = void 0,
	                        translateX = void 0,
	                        translateZ = void 0,
	                        rotateY = void 0,
	                        //动画属性
	                    url = '';
	                    var circle3DStyle = void 0,
	                        circle3DsStyle = void 0,
	                        divStyle = [];
	                    var style = '';
	                    for (var j = 0; j < sides; j++) {
	                        url = path + (start + j) + "." + self.suffix;
	                        translateX = r * Math.sin(deg * j / 180 * Math.PI);
	                        translateZ = r * Math.cos(deg * j / 180 * Math.PI);
	                        rotateY = j * deg;
	                        transform = 'translate3d(' + translateX + 'px,0,' + translateZ + 'px) rotateY(' + rotateY + 'deg)';
	                        style = "background-image:url('" + url + "')" + ";width:" + width + "px" + ";height:" + height + "px" + ";transform:" + transform;
	                        divStyle.push(style);
	                    }

	                    circle3DsStyle = ['width:' + width + 'px', 'height:' + height + 'px', 'margin-left:' + -width / 2 + 'px', 'margin-top:' + -height / 2 + 'px'];
	                    circle3DStyle = ['height:' + circle3DHeight + 'px'];

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

	    }, {
	        key: '__createCube',
	        value: function __createCube(sides, width, path, start) {
	            if (sides != 6) return false;
	            var deg = 90,
	                //角度
	            r = Math.floor(width / 2 / Math.tan(deg / 2 / 180 * Math.PI)),
	                //正方体的内球的半径
	            translateZ = ['translateZ(' + r * Math.cos(deg * 0 / 180 * Math.PI) + 'px)', 'translateZ(' + r * Math.cos(deg * 1 / 180 * Math.PI) + 'px)', 'translateZ(' + r * Math.cos(deg * 2 / 180 * Math.PI) + 'px)', 'translateZ(' + r * Math.cos(deg * 3 / 180 * Math.PI) + 'px)', 'translateZ(0)', 'translateZ(0)'],
	                translateX = ['translateX(' + r * Math.sin(deg * 0 / 180 * Math.PI) + 'px)', 'translateX(' + r * Math.sin(deg * 1 / 180 * Math.PI) + 'px)', 'translateX(' + r * Math.sin(deg * 2 / 180 * Math.PI) + 'px)', 'translateX(' + r * Math.sin(deg * 3 / 180 * Math.PI) + 'px)', 'translateY(' + -r + 'px)', 'translateY(' + r + 'px)'],
	                rotate = ['rotateY(0)', 'rotateY(90deg)', 'rotateX(180deg) rotateY(180deg)', 'rotateX(180deg) rotateY(270deg)', 'rotateX(90deg)', 'rotateX(-90deg)'];
	            var ImgDiv = [],
	                imgArr = [],
	                style = void 0;
	            for (var i = 0; i < sides; i++) {
	                imgArr.push(new Image());
	                imgArr[i].src = path + (start + i) + '.' + this.suffix;
	                style = ["width:" + width + "px", "height:" + width + "px", "background-image: url('" + (path + (start + i) + "." + this.suffix) + "')", "transform:" + translateX[i] + " " + translateZ[i] + " " + rotate[i]];
	                ImgDiv.push(style.join(";"));
	            }

	            var rw = -1,
	                rh = -1,
	                loaded = 0,
	                self = this;
	            $(imgArr).on('load', function () {
	                if (this.height > rh) {
	                    rh = this.height;
	                    rw = this.width;
	                }
	                loaded++;
	                if (loaded == sides) {

	                    var cube3DsStyle = ['width:' + width + 'px', 'height:' + width + 'px', 'margin-left:-' + width / 2 + 'px', 'margin-top:-' + width / 2 + 'px'];

	                    var cube3DStyle = ["height:" + Math.ceil(width + r * Math.sin(deg / 180 * Math.PI) * 2 + 10) + "px"];

	                    self.__insertIntoBody("cube", cube3DStyle, cube3DsStyle, ImgDiv);
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

	    }, {
	        key: '__createBook',
	        value: function __createBook(sides, width, path, index) {
	            var src = path + index + '.' + this.suffix,
	                img = new Image();
	            img.src = src;
	            img.onload = function () {
	                var rw = this.width,
	                    rh = this.height,
	                    height = Math.ceil(width * rh / rw),
	                    book3DHeight = Math.ceil(Math.sqrt(Math.pow(15, 2) + Math.pow(width / 2, 2) + Math.pow(height / 2, 2)) + height),
	                    backgroundSize = 'background-size: ' + (width + 60) + 'px ' + (height + 60) + 'px',
	                    backgroundImage = "background-image: url('" + src + "')",
	                    book3Ds = ['width:' + width + 'px', 'height:' + height + 'px', 'margin-left:-' + width / 2 + 'px', 'margin-top:-' + height / 2 + 'px'];
	                book3Ds = book3Ds.join(';');
	                var front = '<div class="book3D-front" style="' + backgroundSize + ';' + backgroundImage + '"></div>',
	                    left = '<div class="book3D-left" style="' + backgroundSize + ';' + backgroundImage + '"></div>',
	                    top = '<div class="book3D-top" style="' + backgroundSize + ';' + backgroundImage + '"></div>',
	                    right = '<div class="book3D-right" style="' + backgroundSize + ';' + backgroundImage + ';transform: translateX(' + (width - 30) + 'px) translateZ(-15px) rotateY(90deg)"></div>',
	                    back = '<div class="book3D-back" style="' + backgroundSize + ';' + backgroundImage + '"></div>',
	                    bottom = '<div class="book3D-bottom" style="' + backgroundSize + ';' + backgroundImage + ';transform: translateY(' + (height - 30) + 'px) translateZ(-15px) rotateX(-90deg)"></div>';

	                var book = '<div class="book3D" style="height: ' + book3DHeight + 'px">' + '<div class="book3Ds" style="' + book3Ds + '">' + front + left + top + right + back + bottom + '</div>' + '</div>';
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

	    }, {
	        key: '__insertIntoBody',
	        value: function __insertIntoBody(type, _3DStyle, _3DsStyle, divStyle) {
	            var d = type + '3D',
	                ds = type + '3Ds';
	            var style = '';
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = divStyle[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var i = _step.value;

	                    style += '<div style="' + i + '"></div>';
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            var el = '<div class="' + d + '" style="' + _3DStyle.join(';') + '">' + '<div class="' + ds + '" style="' + _3DsStyle.join(';') + '">' + style + '</div>' + '</div>';
	            $('body').append(el);
	        }
	    }]);

	    return Create3D;
	}();

	module.exports = Create3D;
	//

	//Create3D.prototype.createCube = function (sides, width, path, start) {

	//};
	//

	//Create3D.prototype.createBook = function (sides, width, path, index) {

	//};

/***/ }
/******/ ]);