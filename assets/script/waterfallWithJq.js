$(window.on('load'),function(){
    waterfall();
})

function waterfall () {
    var $boxs = $("#main>div");
    var eleWidth = $boxs.eq(0).outerWidth();

    var clos = Math.floor($(window).width() / eleWidth)
}