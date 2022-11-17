$(document).ready(function(){
    let box_heigt = $('.box').height();
    let box_top = $('.box').offset().top + box_heigt;
    
    $(window).scroll(function(){
        let header_bot = $(window).scrollTop();
        let header_height = $('.header').height();
        if(box_top <= header_bot){
            $('.header').addClass('header_event')
            $("#wrap").css({
                paddingTop: header_height
            })
        }
        else if(box_top >= header_bot){
            $('.header').removeClass('header_event')
            $("#wrap").css({
                paddingTop: 0
            })
        }
    })
})