class SortBtn {
    constructor(obj) {
        let defaults = {
            parent: 'sortBox',//父元素id
            sortBtn: 'sort',//主按钮id
            children: 'sort-child',//分类子元素class
            sort: '*',//默认分类，全部
            action: ''//点击具体分类的动作函数
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
    clickSort() {
        this.$sortBtn.on('click', event => {
            if (this.sortListShow) {
                this.sortLen > 0 && this.hideSort();
            } else {
                this.showSort();
            }
        });
    }

    /**
     * 点击分类详细项
     */
    clickSortChild() {
        let self=this;
        this.$sortChild.on('click', function () {
            let key = $(this).attr('data-key');
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
    _startTimeout() {
        this._timeoutId = setTimeout(()=> {
            if (this.sortListShow) {
                this.hideSort();
            }
        }, 3000);
    }

    /**
     * 显示分类
     */
    showSort() {
        this.sortListShow = true;
        this.$sortBtn.addClass('hover');
        this._startTimeout();
        for (let i = 0; i < this.sortLen; i++) {
            let s = this.getXY(this.sortLen, i + 1, 4, 2, 70),
                k = this.getRGB();
            $(this.$sortChild[i]).css({
                'opacity': '1',
                'transform': 'translate(' + s.x + 'px,' + (-s.y) + 'px)',
                '-webkit-transform': 'translate(' + s.x + 'px,' + (-s.y) + 'px)',
                'background-color': 'rgba(' + k.r + ',' + k.g + ',' + k.b + ',.8)'
            });
        }
    }

    /**
     * 隐藏分类
     */
    hideSort() {
        this.sortListShow = false;
        clearTimeout(this._timeoutId);
        this.$sortBtn.removeClass('hover');
        for (let i = 0; i < this.sortLen; i++) {
            $(this.$sortChild[i]).attr('style', 'display:\'none\'');
        }
    }

    /**
     * 获得一个包含随机生成rgb三色的对象
     * @returns {{r: number, g: number, b: number}}
     */
    getRGB() {
        return {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
        }
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
    getXY(len, index, firstNum, step, r) {
        let x = 0, y = 0;
        //先知道一共有多少圈，
        let tmpLen = len, k = 0, position = {x: 0, y: 0};
        while (tmpLen > 0) {
            tmpLen = tmpLen - (firstNum + k * step);
            k++;
        }

        //然后得到当前索引在第几圈
        for (let i = 1; i <= k; i++) {
            if (index <= firstNum * i + step * (i - 1) * i / 2) {
                position.x = i;
                break;
            }
        }

        //得到这圈一共应有分类个数
        let circleNum = firstNum + step * (position.x - 1);

        //再得到在这圈的第几个
        position.y = circleNum - (firstNum * position.x + step * (position.x - 1) * position.x / 2 - index);

        //当前索引的真实半径
        let realr = r * position.x;

        //水平向右为x轴正方向
        //当前索引相对原点的角度
        let angle = 180 / (circleNum - 1) * (position.y - 1);

        position.x = Math.floor(realr * Math.sin(angle / 180 * Math.PI));
        position.y = Math.floor(realr * Math.cos(angle / 180 * Math.PI));

        return {
            x: position.x,
            y: position.y
        }
    }
}

module.exports = SortBtn;