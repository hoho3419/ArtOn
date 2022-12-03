$(document).ready(function(){
    // 메인 슬라이드 아래 높이값
    // let box_heigt = $('.main_slide').height();
    // let box_top = $('.main_slide').offset().top + box_heigt;
    
    $(window).scroll(function(){
        let header_bot = $(window).scrollTop();
        let header_height = $('.header').height();
        if(630 <= header_bot){
            $('.header').addClass('header_event')
            $("#wrap").css({
                paddingTop: header_height
            })
        }
        else if(630 >= header_bot){
            $('.header').removeClass('header_event')
            $("#wrap").css({
                paddingTop: 0
            })
        }
    })
    $(window).scroll(function(){
        if ($(this).scrollTop() > 1000){
            $('.btn_gotop').show();
        } else{
            $('.btn_gotop').hide();
        }
    });
    $('.btn_gotop').click(function(){
        $('html, body').animate({scrollTop:0},400);
    });
})