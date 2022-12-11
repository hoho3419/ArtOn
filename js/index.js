$(document).ready(function(){
    // 메인 슬라이드 인덱스
    let main_idx = 0;
    // 서브 슬라이드 인덱스
    let sub_idx = 0;
    // 리뷰 슬라이드 인덱스
    let rev_dix = 0;
    // 돌아가면서 띄워줄 img 포스터 개수 구하기(메인 슬라이드 포스터 개수)
    const main_img_length = $('.main_img').length;
    // 돌아가면서 띄워줄 img 포스터 개수 구하기(서브 슬라이드 포스터 개수)
    const sub_img_length = $('.sub_banner').length;
    // 돌아가면서 띄워줄 img 포스터 개수 구하기(리뷰 슬라이드 포스터 개수) 
    const review_img_length = $('.review_img_box').length;
    // 메인 인디케이터 위치 값
    const main_img_move = 120;
    // 리뷰 이미지 위치값
    const review_move = 460;
    const timer = 500;
    // 메인,서브,리뷰  setInterval 변수 
    let main_interval;
    let sub_interval;
    let rev_interval;
    $('.main_box').eq(main_idx).fadeIn(0)
    // 자동으로 메인,서브,리뷰 슬라이드 작동하기
    auto_main_slide();
    auto_sub_slide();
    auto_rev_slide()
    /************* 초기화 작업들 *************/
    // 메인 슬라이드에 아이콘 동적으로 넣기
    for(let i = 0;i<main_img_length;i++){
        let item = `<img class="indi" src="./img/main/item${i + 1}.jpg" alt="포스터">`;
        $('.indi_section').append(item);
    }
    $('.indi').eq(0).addClass('item1')
    // 서브 슬라이드 인디케이터 동적으로 넣기
    for(let i = 0;i<sub_img_length;i++){
        let sub_item = `<div class="sub_indi_icon"></div>`;
        $('.sub_indi').append(sub_item);
    }
    // 서브 슬라이드 인디케이터 0번째에 색깔 들어오게 하는 클래스 넣어주기
    $('.sub_indi_icon').eq(sub_idx).addClass('sub_icon_chk')
    // 메인 img 인디케이터 위치 잡아주기
    for(let i = 0;i<main_img_length;i++){
        $('.indi').eq(i).css({left: `${i * main_img_move}px`})
    }
    // 메인배너 왼쪽 버튼
    $('.left_icon').on('click',function(){
        // 클릭하고 동적인 일들이 끝날때까지 버튼막기
        button_ban($('.left_icon'));
        slide((main_idx - 1) % main_img_length,'left');
        main_idx--;
        // indi 클래스에 item1 다 삭제하고 현재 요소에 item1 클래스 넣어주기
        $('.indi').removeClass('item1');
        $('.indi').eq(main_idx % main_img_length).addClass('item1')
    })
    // 메인배너 오른쪽 버튼
    $('.right_icon').on('click',function(){
        // 다음 요소 포스터를 보여주고 있으면 인디케이터만 움직여주기
        if($('.indi').eq((main_idx + 1) % main_img_length).hasClass('item1')){
            $('.indi').animate({left: `-=${main_img_move}`},timer).eq(main_idx % main_img_length).animate({left: 600},0)
        }else{
            slide((main_idx + 1) % main_img_length,'right');
        }
        main_idx++;
        $('.indi').removeClass('item1');
        $('.indi').eq(main_idx % main_img_length).addClass('item1')
        // 클릭하고 동적인 일들이 끝날때까지 버튼막기
        button_ban($('.right_icon'));
        // indi 클래스에 item1 다 삭제하고 현재 요소에 item1 클래스 넣어주기 
    })
    // 메인배너 인디케이터 이벤트(클릭한 n번째 요소 배경,포스터,글자 바꾸기) 클릭한 인디케이터 상승
    $('.indi').on('click',function(){
        // 현재 클릭한 요소가 현재 보여주고 있는 요소면 아무일도 일어나지 않음
    let curr_idx = $(this).index();
        if(!$('.indi').eq(curr_idx).hasClass('item1')){
            button_ban($('.indi'))
            $('.main_box').fadeOut(timer)
            $('.main_box').eq(curr_idx).fadeIn(timer)
            $('.indi').removeClass('item1');
            $('.indi').eq(curr_idx).addClass('item1')
        }
    })
    // 서브 슬라이드 왼쪽 버튼 이벤트
    $('#sub_left').on('click',function(){
        button_ban($('#sub_left'))
        sub_slide($('.sub_banner'),sub_idx % sub_img_length,"100%",(sub_idx - 1) % sub_img_length,"-100%");
        sub_idx--;
        indi_chk();
    })
    // 서브 슬라이드 오른쪽 버튼 이벤트
    $('#sub_right').on('click',function(){
        button_ban($('#sub_right'))
        sub_slide($('.sub_banner'),sub_idx % sub_img_length,"-100%",(sub_idx + 1) % sub_img_length,"100%")
        sub_idx++;
        indi_chk();
    })
    // 서브 슬라이드 인디케이터 이벤트
    $('.sub_indi_icon').on('click',function(){
        button_ban($('.sub_indi_icon'))
        let click_idx = $(this).index() - $('.sub_icon_chk').index();
        if(click_idx < 0){
            sub_slide($('.sub_banner'),sub_idx % sub_img_length,"100%",$(this).index() % sub_img_length,"-100%");
        }
        else if(click_idx > 0){
            sub_slide($('.sub_banner'),sub_idx % sub_img_length,"-100%",$(this).index() % sub_img_length,"100%")
        }
        sub_idx = $(this).index();
        indi_chk();
    })
    // 리뷰 슬라이드 오른쪽 버튼
    $('#review_r_button').on('click',function(){
        button_ban($('#review_r_button'))
        $('.review_img_box').animate({left: `-=${review_move}px`},timer).eq(rev_dix %review_img_length).animate({left: "1380px"},0)
        rev_dix++
    })
    // 리뷰 슬라이드 왼쪽 버튼
    $('#review_l_button').on('click',function(){
        button_ban($('#review_l_button'))
        $('.review_img_box').eq((rev_dix -1) % review_img_length).animate({left: `-${review_move}px`},0)
        $('.review_img_box').animate({left: `+=${review_move}px`},timer)
        rev_dix--
    })
    // 클릭하면 선택한 카테고리 랭킹 1,2,3위 보여주기
    $('.rank_item').on('click',function(){
        let curr = $(this).index();
        $('.rank_item').removeClass('rank_item_chk');
        $('.rank_item').eq(curr).addClass('rank_item_chk');
        $('.rank_article').removeClass('dis_flex');
        $('.rank_article').eq(curr).addClass('dis_flex');
    })
    // 마우스 호버시 해당 슬라이드 멈춤 떼면 다시 시작
    $('.main_slide').hover(function(){
        clearInterval(main_interval);
    },function(){
        auto_main_slide()
    });
    $('.sub_slide_section').hover(function(){
        clearInterval(sub_interval);
    },function(){
        auto_sub_slide();
    })
    $('.review_area').hover(function(){
        clearInterval(rev_interval);
    },function(){
        auto_rev_slide();
    })
    // 현재 선택된 인디케이터에 클래스 추가 함수
    function indi_chk(){
        $('.sub_indi_icon').removeClass('sub_icon_chk');
        $('.sub_indi_icon').eq(sub_idx % sub_img_length).addClass('sub_icon_chk');
    }
    // 서브 슬라이드 함수
    function sub_slide(el,f_idx,f_move,s_dix,s_move){
        el.eq(f_idx).animate({left: f_move},timer)
        el.eq(s_dix).animate({left: s_move},0).animate({left: '0%'},timer)
    }
    // 메인 슬라이드 함수
    function slide(s_idx,direction){
        // 지금 포스터에 맞는 ITEM_LIST 가르키기
        if(direction == "left"){
            // 맨 끝에 있는 인디케이터 위치 맞춰주고 들어오게 하고 모든 인디케이터 오른쪽으로 이동
            $('.indi').eq((main_idx - 1) % main_img_length).animate({left: `${-main_img_move}`},0)
            $('.indi').animate({left: `+=${main_img_move}`},timer)
        }
        else if(direction == "right"){
            // 모든 요소 먼저 왼쪽으로 이동하고 나갔던 맨 처음 인디케이터 맨 끝으로 이동시키기
            $('.indi').animate({left: `-=${main_img_move}`},timer).eq(main_idx % main_img_length).animate({left: 600},0)
        }
        // main_box 넣기
        $('.main_box').fadeOut(timer)
        $('.main_box').eq(s_idx).fadeIn(timer)
    }
    // 버튼막는 함수
    function button_ban(el){
        el.css({pointerEvents: "none"})
        setTimeout(function(){
            el.css({pointerEvents: "auto"})
        },timer)
    }
    // 메인,서브,리뷰 슬라이드 자동으로 실행
    function auto_main_slide(){
        main_interval = setInterval(function(){
            $('.right_icon').trigger('click');
        },timer + 1800)
    }
    function auto_sub_slide(){
        sub_interval = setInterval(function(){
            $('#sub_right').trigger('click')
        },timer + 1800)
    }
    function auto_rev_slide(){
        rev_interval = setInterval(function(){
            $('#review_r_button').trigger('click')
        },timer + 1800)
    }
})