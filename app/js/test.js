$('.js-game-start').click(function () {
    $('.game-step--1').removeClass('active').addClass('noactive');
    $('.game-step--2').addClass('active').removeClass('noactive');
});
$('.js-new-game').click(function () {
    $('.game-step--3').removeClass('active').addClass('noactive');
    $('.game-step--2').addClass('active').removeClass('noactive');
    currentQuestion = 0;
    countQuestions = 1;
    testResults = [];
    blocked = false;
    countQuestions = quests.test.length;
    $('.test__counter-total').html(countQuestions);
    currentQuestion ++;
    setQuest(currentQuestion,quests);
});

$(document).ready(function() {

    currentQuestion = 0;
    countQuestions = 1;
    testResults = [];
    blocked = false;


    $.getJSON('test.json', function(data) {
        quests = data;
        countQuestions = quests.test.length;
        $('.test__counter-total').html(countQuestions);
        currentQuestion ++;
        setQuest(currentQuestion,quests);
    });

    $('.js-game-button').click(function () {
        blocked = true;
        var id = parseInt($(this).data('id'));
        setResults(id,currentQuestion,quests,testResults)
    });

    $('.js-game-next').on('click',function () {
        if (blocked){
            if (currentQuestion < countQuestions){
                currentQuestion ++;
                setQuest(currentQuestion,quests);
            } else {
                showResults(testResults);
            }
        }
    });
});


function setQuest(currentQuestion,quests){
    var quest = quests.test[currentQuestion-1],
        title = quest.quest,
        img = quest.image,
        variants = quest.variants,
        ansver = quest.ansver,
        img2 = ansver.image,
        title2 = ansver.title,
        text2 = ansver.text,
        subtext2 = ansver.subtext;


    $('.test__counter-current').html(currentQuestion);
    $('.game-page__title').html(title);
    $('.game-quest-img').attr('src',img);
    $('.game-ansver-img').attr('src',img2);
    $('.game-title2').html(title2);
    $('.game-text').html(text2);
    $('.game-subtext').html(subtext2);
    $('.js-game-button--1').html(variants[0].text);
    $('.js-game-button--2').html(variants[1].text);
    $('.js-game-button--3').html(variants[2].text);

    $('.game-question').removeClass('noactive').addClass('active');
    $('.game-answer').removeClass('active').addClass('noactive');

    $('.game-page').addClass('stage-1').removeClass('stage-2');
    blocked = false;
}


function setResults(id,currentQuestion,quests,testResults){
    var points = quests.test[currentQuestion-1].variants[id].points;
    testResults.push(points);
    $('.game-question').removeClass('active').addClass('noactive');
    $('.game-answer').addClass('active').removeClass('noactive');
    $('.game-page').removeClass('stage-1').addClass('stage-2');
}

function showResults(testResults){
    var total = testResults.reduce(function(a, b) {
        return a + b;
    });
    $.getJSON('results.json', function(data) {
        var results = data;
        var tmp = 0;
        if (total < 10) {
            tmp = 0;
        }  else if (total < 15) {
            tmp = 1;
        } else {
            tmp = 2;
        }
        $('.game-result__title').html(results.results[tmp].title);
        $('.game-result__text').html(results.results[tmp].text);
        $('.game-step--2').addClass('noactive').removeClass('active');
        $('.game-step--3').addClass('active').removeClass('noactive');

        var dataUrl = 'https://lysol.woman.ru/share/'+(tmp+1)+'/',
            dataTitle = 'Вы - ' +results.results[tmp].title,
            dataImg = 'https://lysol.woman.ru/images/share/'+(tmp+1)+'.jpg';
        $('.game-result__social-row').attr({'data-url':dataUrl, 'data-title':dataTitle, 'data-image':dataImg});
    });
}