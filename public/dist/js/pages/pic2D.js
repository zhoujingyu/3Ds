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

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _LazyLoad = __webpack_require__(1);

	var _LazyLoad2 = _interopRequireDefault(_LazyLoad);

	var _SortBtn = __webpack_require__(2);

	var _SortBtn2 = _interopRequireDefault(_SortBtn);

	var _Util = __webpack_require__(3);

	var _Util2 = _interopRequireDefault(_Util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var util = new _Util2.default();
	var lazyLoad = null;

	var Pic2D = function () {
	    function Pic2D() {
	        _classCallCheck(this, Pic2D);

	        this.$scale = $('#scale');

	        this.cols = [];
	        this.cols['一列'] = '100%';
	        this.cols['两列'] = '50%';
	        this.cols['三列'] = '33.33%';
	        this.cols['四列'] = '25%';

	        this.$pic2D = $('.pic2D-padding'); //列数

	        this._showScreenFull();
	        this._hideScreenFull();
	    }

	    /**
	     * 点击图片，满屏查看
	     * @private
	     */


	    _createClass(Pic2D, [{
	        key: "_showScreenFull",
	        value: function _showScreenFull() {
	            var self = this;
	            $('body').on('click', '.pic2D-padding', function () {
	                if (self.$scale.is(':hidden')) {
	                    self.$scale.css({
	                        'background-image': 'url("' + $(this).find('img').attr('src') + '")'
	                    }).show();
	                }
	            }).on(util.getScrollEvent(), function (event) {
	                self.$scale.is(':visible') && event.preventDefault();
	            });
	        }

	        /**
	         * 点击隐藏满屏查看
	         * @private
	         */

	    }, {
	        key: "_hideScreenFull",
	        value: function _hideScreenFull() {
	            var _this = this;

	            this.$scale.on('click', function (event) {
	                _this.$scale.hide();
	            });
	        }

	        /**
	         * 设置图片一行显示多少列
	         * @param sort
	         */

	    }, {
	        key: "setCols",
	        value: function setCols(sort) {
	            this.$pic2D.css('width', this.cols[sort]);
	            lazyLoad.reset();
	            lazyLoad.collectCanLoadImg();
	        }
	    }]);

	    return Pic2D;
	}();

	$(function () {
	    lazyLoad = new _LazyLoad2.default({
	        keepOutLiving: false
	    });

	    var pic2D = new Pic2D();

	    new _SortBtn2.default({
	        action: function action() {
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LazyLoad = function () {
	    function LazyLoad(obj) {
	        _classCallCheck(this, LazyLoad);

	        if (obj === undefined) obj = {};

	        this.winH = document.documentElement.clientHeight || document.body.clientHeight; //窗口高度
	        this.winW = document.documentElement.clientWidth || document.body.clientWidth; //窗口宽度
	        this.x = document.documentElement.scrollLeft || document.body.scrollLeft; //窗口左上角x坐标
	        this.y = document.documentElement.scrollTop || document.body.scrollTop; //窗口左上角y坐标
	        this.loadingImg = '/img/common/loading.png'; //默认正在加载图片路径
	        this.keepOutLiving = obj.keepOutLiving !== undefined ? obj.keepOutLiving : true; //true:保持窗口外的图片显示原图, false:保持窗口外的图片显示默认图
	        this.expand = this.keepOutLiving ? 0 : document.documentElement.clientHeight; //当keepOutLiving=false时，窗口高度上下扩大的距离

	        this.resize();
	        this.scroll();
	        this.collectCanLoadImg();
	    }

	    _createClass(LazyLoad, [{
	        key: 'resize',
	        value: function resize() {
	            var _this = this;

	            window.addEventListener('resize', function (event) {
	                _this.winH = document.documentElement.clientHeight || document.body.clientHeight;
	                _this.winW = document.documentElement.clientWidth || document.body.clientWidth;
	                _this.x = document.documentElement.scrollLeft || document.body.scrollLeft;
	                _this.y = document.documentElement.scrollTop || document.body.scrollTop;
	                _this.reset();
	                _this.collectCanLoadImg();
	            });
	        }
	    }, {
	        key: 'scroll',
	        value: function scroll() {
	            var _this2 = this;

	            window.addEventListener('scroll', function (event) {
	                _this2.x = document.documentElement.scrollLeft || document.body.scrollLeft;
	                _this2.y = document.documentElement.scrollTop || document.body.scrollTop;
	                _this2.collectCanLoadImg();
	            });
	        }
	    }, {
	        key: 'collectCanLoadImg',
	        value: function collectCanLoadImg() {
	            var img = document.getElementsByTagName('img'),
	                x = void 0,
	                y = void 0,
	                w = void 0,
	                h = void 0,
	                len = img.length;
	            for (var i = 0; i < len; i++) {
	                x = this.getX(img[i]);
	                y = this.getY(img[i]);
	                w = $(img[i]).width();
	                h = $(img[i]).height();
	                if (x + w > this.x && this.x + this.winW > x && y + h + this.expand > this.y && this.y + this.winH + this.expand > y) {
	                    this.loadImg(img[i]);
	                } else {
	                    if (!this.keepOutLiving) {
	                        img[i].getAttribute('src') != this.loadingImg && img[i].setAttribute('src', this.loadingImg);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            var img = document.getElementsByTagName('img');
	            var height = void 0,
	                width = void 0;

	            for (var i = 0; i < img.length; i++) {
	                img[i].style.height = '';
	                img[i].style.width = '';

	                if (img[i].getAttribute('src') == this.loadingImg) {
	                    img[i].style.height = '';
	                    img[i].style.width = '';
	                } else {
	                    height = img[i].clientHeight;
	                    width = img[i].clientWidth;

	                    img[i].style.height = height + 'px';
	                    img[i].style.width = width + 'px';
	                }
	            }
	        }
	    }, {
	        key: 'loadImg',
	        value: function loadImg(obj) {
	            var src = obj.getAttribute('src'),
	                dataSrc = obj.getAttribute('data-src');

	            var loadHandler = function loadHandler() {
	                obj.removeEventListener('load', 'loadHandler');
	                var height = obj.clientHeight,
	                    width = obj.clientWidth;
	                obj.style.height = height + 'px';
	                obj.style.width = width + 'px';
	            };

	            if (src != dataSrc) {
	                obj.setAttribute('src', dataSrc);
	                obj.addEventListener('load', loadHandler);
	            }
	        }
	    }, {
	        key: 'getY',
	        value: function getY(e) {
	            var offset = e.offsetTop;
	            if (e.offsetParent != null) offset += this.getY(e.offsetParent);
	            return offset;
	        }
	    }, {
	        key: 'getX',
	        value: function getX(e) {
	            var offset = e.offsetLeft;
	            if (e.offsetParent != null) offset += this.getX(e.offsetParent);
	            return offset;
	        }
	    }]);

	    return LazyLoad;
	}();

	module.exports = LazyLoad;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SortBtn = function () {
	    function SortBtn(obj) {
	        _classCallCheck(this, SortBtn);

	        var defaults = {
	            parent: 'sortBox', //父元素id
	            sortBtn: 'sort', //主按钮id
	            children: 'sort-child', //分类子元素class
	            sort: '*', //默认分类，全部
	            action: '' //点击具体分类的动作函数
	        };

	        defaults = $.extend(defaults, obj);

	        this.$sortBox = $('#' + defaults.parent);
	        this.$sortBtn = $('#' + defaults.sortBtn);
	        this.$sortChild = this.$sortBox.find('.' + defaults.children);
	        this.sortLen = this.$sortChild.length;
	        this.sortListShow = false;
	        this.action = defaults.action;
	        this._timeoutId = 0;

	        this.clickSort();
	        this.clickSortChild();
	    }

	    /**
	     * 点击分类按钮
	     */


	    _createClass(SortBtn, [{
	        key: 'clickSort',
	        value: function clickSort() {
	            var _this = this;

	            this.$sortBtn.on('click', function (event) {
	                if (_this.sortListShow) {
	                    _this.sortLen > 0 && _this.hideSort();
	                } else {
	                    _this.showSort();
	                }
	            });
	        }

	        /**
	         * 点击分类详细项
	         */

	    }, {
	        key: 'clickSortChild',
	        value: function clickSortChild() {
	            var self = this;
	            this.$sortChild.on('click', function () {
	                var key = $(this).attr('data-key');
	                if (self.sort != key) {
	                    self.sort = key;
	                    self.hideSort();
	                    self.action();
	                }
	            });
	        }

	        /**
	         * 开始倒计时，3s后分类子项自动收起
	         * @private
	         */

	    }, {
	        key: '_startTimeout',
	        value: function _startTimeout() {
	            var _this2 = this;

	            this._timeoutId = setTimeout(function () {
	                if (_this2.sortListShow) {
	                    _this2.hideSort();
	                }
	            }, 3000);
	        }

	        /**
	         * 显示分类
	         */

	    }, {
	        key: 'showSort',
	        value: function showSort() {
	            this.sortListShow = true;
	            this.$sortBtn.addClass('hover');
	            this._startTimeout();
	            for (var i = 0; i < this.sortLen; i++) {
	                var s = this.getXY(this.sortLen, i + 1, 4, 2, 70),
	                    k = this.getRGB();
	                $(this.$sortChild[i]).css({
	                    'opacity': '1',
	                    'transform': 'translate(' + s.x + 'px,' + -s.y + 'px)',
	                    '-webkit-transform': 'translate(' + s.x + 'px,' + -s.y + 'px)',
	                    'background-color': 'rgba(' + k.r + ',' + k.g + ',' + k.b + ',.8)'
	                });
	            }
	        }

	        /**
	         * 隐藏分类
	         */

	    }, {
	        key: 'hideSort',
	        value: function hideSort() {
	            this.sortListShow = false;
	            clearTimeout(this._timeoutId);
	            this.$sortBtn.removeClass('hover');
	            for (var i = 0; i < this.sortLen; i++) {
	                $(this.$sortChild[i]).attr('style', 'display:\'none\'');
	            }
	        }

	        /**
	         * 获得一个包含随机生成rgb三色的对象
	         * @returns {{r: number, g: number, b: number}}
	         */

	    }, {
	        key: 'getRGB',
	        value: function getRGB() {
	            return {
	                r: Math.floor(Math.random() * 256),
	                g: Math.floor(Math.random() * 256),
	                b: Math.floor(Math.random() * 256)
	            };
	        }

	        /**
	         * 获取一个子元素的xy坐标
	         * @param len 子元素总长
	         * @param index 当前是第几个元素
	         * @param firstNum 第一圈个数
	         * @param step 每一圈增加的元素个数
	         * @param r 半径
	         * @returns {{x: number, y: number}} 返回一个包含xy坐标值得对象
	         */

	    }, {
	        key: 'getXY',
	        value: function getXY(len, index, firstNum, step, r) {
	            var x = 0,
	                y = 0;
	            //先知道一共有多少圈，
	            var tmpLen = len,
	                k = 0,
	                position = { x: 0, y: 0 };
	            while (tmpLen > 0) {
	                tmpLen = tmpLen - (firstNum + k * step);
	                k++;
	            }

	            //然后得到当前索引在第几圈
	            for (var i = 1; i <= k; i++) {
	                if (index <= firstNum * i + step * (i - 1) * i / 2) {
	                    position.x = i;
	                    break;
	                }
	            }

	            //得到这圈一共应有分类个数
	            var circleNum = firstNum + step * (position.x - 1);

	            //再得到在这圈的第几个
	            position.y = circleNum - (firstNum * position.x + step * (position.x - 1) * position.x / 2 - index);

	            //当前索引的真实半径
	            var realr = r * position.x;

	            //水平向右为x轴正方向
	            //当前索引相对原点的角度
	            var angle = 180 / (circleNum - 1) * (position.y - 1);

	            position.x = Math.floor(realr * Math.sin(angle / 180 * Math.PI));
	            position.y = Math.floor(realr * Math.cos(angle / 180 * Math.PI));

	            return {
	                x: position.x,
	                y: position.y
	            };
	        }
	    }]);

	    return SortBtn;
	}();

	module.exports = SortBtn;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Util = function () {
	    function Util() {
	        _classCallCheck(this, Util);
	    }

	    /**
	     * 判断是否为移动端
	     * @returns {boolean}
	     */


	    _createClass(Util, [{
	        key: 'isMobile',
	        value: function isMobile() {
	            return (/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent)
	            );
	        }

	        /**
	         * 返回滚动的手机或pc事件
	         * @returns {string}
	         */

	    }, {
	        key: 'getScrollEvent',
	        value: function getScrollEvent() {
	            return this.isMobile() ? 'touchmove' : 'wheel';
	        }

	        /**
	         * 阻止手机长按事件
	         */

	    }, {
	        key: 'preventLongTap',
	        value: function preventLongTap() {
	            document.oncontextmenu = function () {
	                return false;
	            };
	            document.onselectstart = function () {
	                return false;
	            };
	            $('body').css({
	                '-moz-user-select': 'none',
	                '-webkit-user-select': 'none',
	                '-webkit-touch-callout': 'none'
	            });
	        }
	    }]);

	    return Util;
	}();

	module.exports = Util;

/***/ }
/******/ ]);