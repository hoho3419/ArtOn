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
    // 맨 아래 오른쪽에 이미지 누르면 페이지 상단으로 천천히 가기
    $('.btn_gotop').click(function(){
        $('html, body').animate({scrollTop:0},400);
    });
    // 햄버거 버튼 누르면 왼쪽에 있는 사이드 바 나오가
    $(document).on('click', '.hamberg', function(){
        $('.ham_box').toggleClass('ham_active')
    });
    $('.side_hamberg').click(function(){
        $('.hamberg').trigger('click')
    })
})