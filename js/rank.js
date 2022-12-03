$(document).ready(function(){
    let dt = new Date();
    let year = dt.getFullYear();
    let month = dt.getMonth()+1;
    let date = dt.getDate();
    $.datepicker.setDefaults({
        // dateFormat: 'yy-mm-dd', // 날짜 표현방식
        // showMonthAfterYear: true, // 년도 먼저 표시

        // // 한글화
        // monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        // dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], // 달력에 나타나는 요일
        // dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'], // 요일에 마우스 올려놓으면 나타나는 툴팁

        // // 표시되는 달력 개수
        // numberOfMonths: [2,4],

        dateFormat: 'yy-mm-dd' //Input Display Format 변경

        ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
        ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
        // ,changeYear: true //콤보박스에서 년 선택 가능
        // ,changeMonth: true //콤보박스에서 월 선택 가능                
        ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
        ,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
        ,buttonImageOnly: true //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
        ,buttonText: "선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트   
        
        ,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
        ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
        ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
        ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
        ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
        ,minDate: "-1M" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
        ,maxDate: "+1M" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)          
    });
    $('.date_pick').datepicker({
        onSelect : function(dateString) {
            console.log(dateString);
        }
    });
    // 현재 탭에서 전체인지 콘서트인지 뮤지컬인지 체크해서 해당탭에 색깔 들어오게 하기
    let curr_cate = get_url_info('rank');
    $('.rank_li').removeClass('rank_cnk')
    $('.rank_li').eq(curr_cate).addClass('rank_cnk')
    // 달력 기본값은 오늘 날짜로 보여주게 하기
    $('.date_pick').val(`${year}-${zero(month)}-${zero(date)}`)
    // 처음 들어왔을때 첫번째 일간,주간,월간,연간 중 일간에 효과 들어오게 하기
    $('.date').eq(0).css({color: '#22974a'})
    $('.high_bar').eq(0).css({width:'61%'})
    // 4위부터 동적 데이터 24개 넣기
    for(let i = 0;i<24;i++){
        let tmp = `
        <li class="rank_list_box">
            <div class="list_rank">${i +5}위</div>
            <a href="#">
                <div class="list_img_box">
                    <img class="list_img" src="./img/rank/rank_1.jpg" alt="">
                </div>
            </a>
            <div class="list_title_box">
                <a href="#">
                    <p class="list_title">2022 HAPPY CHANYEOL-DAY</p>
                </a>
                <div class="wish_total">
                    <img src="./img/rank/love_icon.png" style="margin-right: 8px;" alt="찜하기 아이콘"><span>233</span> 
                    <img src="./img/rank/star_5.jpg" style="width: 88px;margin-left: 30px;" alt="별점 아이콘">
                </div>
            </div>
            <div class="list_info">
                <p>2022.12.01~2022.12.01</p>
                <p>건국대학교 새천년관 대공연장</p>
            </div>
            <div class="reservate_percen">20.5%</div>
        </li>  
         `;
         $('.rank_item_list').append(tmp);
    }
    // 일간,주간,월간,연간 중 클릭한 요소에 효과넣기
    $('.date').on('click',function(){
        let curr = $(this).index();
        $('.date').css({color: '#8f8787'})
        $('.date').eq(curr).css({color: '#22974a'})
        $('.high_bar').css({width:'0%'})
        $('.high_bar').eq(curr).css({width:'61%'})
    })
    // 숫자를 넣을때 10보다 작으면 앞에 0붙여주는 함수
    function zero(input) {
        if(input < 10) {
            input = "0" + input;
        }
        return input;
    }
    // rank_li 중 클릭한 탭에 있는 주소 중 ? 뒤에 있는 url 파악해서 몇번인지 알려주는 함수
    function get_url_info(key){
        let curr = location.href;
        curr = curr.split('?');
        if(curr.length > 1){
            curr = curr[1].split('&');
            for(let i=0;i<curr.length;i++){
                let tmp = curr[i].split('=')
                if(tmp[0] == key){
                    return tmp[1];
                }
            }
        }
        return 0;
    }
})