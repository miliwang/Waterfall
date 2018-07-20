$(window).on('load', function () {
    initWaterfall();

    $(window).on('scroll', function () {
        if (checkScrollslide()) {
            initWaterfall();
        }
    });
})

function createPics() {
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
            { src: "20.jpg" }
        ]
    }
    var $boxs = $("#main>div");
    $.each(result.data, function (key, value) {
        var oBox = $("<div>").addClass("box").appendTo($("#main"));
        var oPic = $("<div>").addClass("pic").appendTo($(oBox));
        var img = $("<img>").attr("src", "./assets/Images/" + value.src).appendTo($(oPic));
        if (key < 6 && $boxs.length < 6) {
            $(img).load(function () {
                // 加载完成   
                waterfall();
            })
        }
    });

    
}

function waterfall() {
    var $boxs = $("#main>div");
    var eleWidth = $boxs.eq(0).outerWidth();
    // 求列数
    var clos = Math.floor($(window).width() / eleWidth);

    $("#main").width(eleWidth * clos).css("marign", "0 auto");

    var hArry = [];
    $boxs.each(function (index, value) {
        var h = $boxs.eq(index).outerHeight();
        if (index < clos) {
            hArry[index] = h;
            $(value).css({
                "left": index * eleWidth + "px"
            })
        } else {
            //获取数组中的最小值
            var minH = Math.min.apply(null, hArry);
            // 判断最小值的索引
            var minIndex = $.inArray(minH, hArry);
            // 设置当前图片的样式
            $(value).css({
                "top": minH + "px",
                "left": minIndex * eleWidth + "px"
            })
            // 改变数组的值
            hArry[minIndex] += $boxs.eq(index).outerHeight();
        }
    });

    var maxHeight = Math.max(...hArry);
    var maxIdx = $.inArray(maxHeight, hArry);
    maxHeight += $boxs.eq(maxIdx).offset().top;
    if (maxHeight < $(window).height()) {
        console.log("执行……")
        createPics();
    }
}

//
function checkScrollslide() {
    var $lastBox = $("#main>div").last();
    var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight() / 2);
    var scrollTop = $(window).scrollTop();
    var documentH = $(window).height();
    return (lastBoxDis < scrollTop + documentH) ? true : false;
}

function initWaterfall() {
    createPics();
    waterfall();
}