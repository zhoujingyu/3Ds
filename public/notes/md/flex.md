# flex布局展示
## 1、display声明：
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-box;// 1:一般只兼容这三个
    display: -webkit-flex;// 2:一般只兼容这三个
    display: flex;// 3:一般只兼容这三个
## 2、定义子元素排列
目前有两种写法，新的写法*flex-direction*和旧的写法*box-orient + box-direction*

    -moz-box-orient:vertical;
    -moz-box-direction:normal;
    -webkit-box-orient:vertical;// #####一起#####
    -webkit-box-direction:normal;// ####使用######
    -webkit-flex-direction:column;
    flex-direction:column;
        
### 代码展示⇩

    <div class="tex"></div>
    
### 页面效果⇩

<div class="tex"></div>