$(document).ready(function(){
    for(let i =0;i<3;i++){
        let tmp = `
        <div class="result_box">
            <a class="result_img" href="#">
                <img src="./img/rank/rank_1.jpg" alt="포스터">
            </a>
            <div class="result_title_box">
                <a href="#">
                    2022 HAPPY CHANYEOL-DAY
                </a>
            </div>
            <div class="result_date">
                2022.12.01~2022.12.01
            </div>
            <div class="result_place">
                건국대학교 새천년관 대공연장
            </div>
        </div> 
        `;
        $('.result_table').append(tmp)
    }
})