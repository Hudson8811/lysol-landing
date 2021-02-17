$(document).ready(function() {
    currentOpros = 0;
    countOpros = 1;
    oprosResults = [];
    blocked = false;


    $.getJSON('opros.json', function(data) {
        opros = data;
        countOpros = opros.opros.length;
        $('.interview__counter-total').html(countOpros);
        currentOpros ++;
        setOpros(currentOpros,opros);
    });

    $('.js-interview-btn').click(function () {
        blocked = true;
        var id = parseInt($(this).data('id'));
        setResultsOpros(id,currentOpros,opros,oprosResults)
    });

    $('.js-next-interview').on('click',function () {
        if (blocked){
            if (currentOpros < countOpros){
                currentOpros ++;
                setOpros(currentOpros,opros);
                if (currentOpros == countOpros){
                    $('.js-next-interview').text('далее').on('click', function () {
											$('.interview-step--2').removeClass('active').addClass('noactive');
											$('.interview__inner').addClass('noactive');
											$('.interview-step--3').addClass('active');
											$(this).parents('.section').addClass('blue');
										});
                    $('.interview__row--mt').addClass('pb');
                }
            } else {
            }
        }
    });
});

function setOpros(currentOpros,opros){
    var quest = opros.opros[currentOpros-1],
        title = quest.quest,
        variants = quest.variants;
    $('.interview__counter-current').html(currentOpros);
    $('.interview__subtitle').html(title);
    $('.js-interview-btn--1').html(variants[0].text);
    $('.js-interview-btn--2').html(variants[1].text);
    $('.js-interview-btn--3').html(variants[2].text);
    $('.interview-step--1').removeClass('noactive').addClass('active');
    $('.interview-step--2').removeClass('active').addClass('noactive');
    blocked = false;
}

function setResultsOpros(id,currentOpros,opros,oprosResults){
    var points = opros.opros[currentOpros-1].variants[id].points;
    oprosResults.push(points);

    $.ajax({
        type: "POST",
        url: "http://localhost/save_data/",
        data: { quest : currentOpros, answer : id },
        success: function(data) {
            var parse = JSON.parse(data);
            var percent = parse.percent;
            $('.interview-procent').html(percent);
        }
    });



    $('.interview-step--1').removeClass('active').addClass('noactive');
    $('.interview-step--2').addClass('active').removeClass('noactive');
}
