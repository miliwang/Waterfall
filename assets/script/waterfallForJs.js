window.onload = function () {
    // waterfall('main', 'box');
    getPicData(true);
    // 滚动条滚动动态加载图片
    window.onscroll = function () {
        if (checkScrollSlide()) {
            isClear = false;
            getPicData();
        }
    }
}

// 创建图片结构
function createElementPic(src, isClear) {
    var oParent = document.getElementById('main');
    var oBox = document.createElement('div');
    oBox.className = "box";

    var oPic = document.createElement("div");
    oPic.className = 'pic';

    var image = new Image()
    image.src = "./assets/images/" + src
    if(isClear) {
        image.onload = function() {
            // oBox.style.height = image.naturalHeight + 22 + 15;
            waterfall("main", "box");
        }
    }
    oPic.appendChild(image);
    oBox.appendChild(oPic);
    oParent.appendChild(oBox);
}

function getPicData(isClear) {
    if (isClear) {
        var oParent = document.getElementById("main");
        oParent.html = "";
    }
    // 有待更改（调用接口，分页处理实现懒加载）
    var result = {
        data: [
            { src: "0.jpg" },
            { src: "2.jpg" },
            { src: "3.jpg" },
            { src: "4.jpg" },
            { src: "5.jpg" },
            { src: "6.jpg" },
            { src: "7.jpg" },
            { src: "8.jpg" },
            { src: "9.jpg" },
            { src: "10.jpg" },
            { src: "11.jpg" },
            { src: "12.jpg" },
            { src: "13.jpg" },
            { src: "14.jpg" },
            { src: "15.jpg" },
            { src: "16.jpg" },
            { src: "17.jpg" },
            { src: "18.jpg" },
            { src: "19.jpg" },
            { src: "20.jpg" },
            { src: "21.jpg" },
            { src: "22.jpg" },
            { src: "23.jpg" },
            { src: "24.jpg" },
            { src: "25.jpg" },
            { src: "26.jpg" },
            { src: "27.jpg" },
            { src: "28.jpg" },
            { src: "29.jpg" },
            { src: "30.jpg" },
            { src: "31.jpg" },
            { src: "32.jpg" },
            { src: "33.jpg" },
            { src: "34.jpg" },
            { src: "35.jpg" },
        ]
    }
    var data = result.data;
    // 将数据加载到页面尾部
    for (var i = 0; i < data.length; i++) {
        createElementPic(data[i].src , isClear);
    }
    if(!isClear){
        waterfall("main", "box");
    }
    
}
// 处理照片墙中图片的位置处理
function waterfall(parent, target) {
    // 将 main 下所有 class 为 box 的元素取出来
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent, target);
    // 计算整个页面显示的列数（页面宽 / box 的宽）
    var oBoxW = oBoxs[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth / oBoxW);
    // 设置 main 的宽度
    oParent.style.cssText = "width:" + oBoxW * cols + 'px; margin: 0 auto';

    // 存放每一列图片的高度的数组
    var hArry = [];
    var index = 0;
    for (var i = 0; i < oBoxs.length; i++) {
        if (i < cols) {
            index = i;
            hArry.push(oBoxs[i].offsetHeight);
        } else {
            // console.log(hArry)
            var minH = Math.min.apply(null, hArry);
            index = getMinHIndex(hArry, minH);
            oBoxs[i].style.top = minH + "px";

            hArry[index] += oBoxs[i].offsetHeight;
        }
        // 设置元素左偏移距离
        // oBoxs[i].style.left = oBoxs[index].offsetWidth + "px";
        oBoxs[i].style.left = oBoxW * index + "px";
    }
}

// 根据 class 获取元素
function getByClass(parent, clsName) {
    // 用来存储获取到的所有的 class 为 box的元素
    var oElements = parent.getElementsByTagName("*");
    var arry = [];
    // 这里不使用getElementByClassName 选取元素是因为其有兼容性问题，低版本浏览器不支持 
    for (var i = 0; i < oElements.length; i++) {
        if (oElements[i].className == clsName) {
            arry.push(oElements[i]);
        }
    }
    return arry;
}

// 获取当前图片的索引
function getMinHIndex(arry, val) {
    for (var i in arry) {
        if (arry[i] == val) {
            return i;
        }
    }
}

// 检测是否具备了关东加载数据的条件
function checkScrollSlide() {
    var oParent = document.getElementById("main");
    var oBoxs = getByClass(oParent, "box");
    var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight / 2);
    // 处理兼容性问题
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    return (lastBoxH < scrollTop + height) ? true : false;
}