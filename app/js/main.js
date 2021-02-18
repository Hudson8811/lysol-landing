var wow = new WOW();
new WOW().init();

  $('.viruses-icon').click(function(e){
    e.preventDefault();
    if(!$(this).hasClass('is-active')){
      $('.viruses-item').removeClass('is-active');
      $('.viruses-icon').removeClass('is-active');
      $('.viruses-card').hide();
      $(this).addClass('is-active');
      $(this).parent('.viruses-item').addClass('is-active');
      $(this).siblings('.viruses-card').show();
    } else{
      $(this).parent('.viruses-item').removeClass('is-active');
      $(this).removeClass('is-active'); 
      $(this).siblings('.viruses-card').hide();
    }
  });

  $('.viruses-burger').click(function(e){
    e.preventDefault();
    $('.viruses-item').removeClass('is-active');
    $('.viruses-icon').removeClass('is-active');
    $('.viruses-card').hide();
  });

  $('.next').on('click', function(e) {
    e.preventDefault();
    let href = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(href).offset().top
    });
    return false;
  });


  $(document).ready(function() {
    var total = 0;
    currentQuestion = 0;
    countQuestions = 1;

    $.getJSON('test.json', function(data) {
      quests = data;
      countQuestions = quests.test.length;
      $('.test__counter-total').html(countQuestions);
      currentQuestion ++;
      setQuest(currentQuestion,quests);
    });

    function setQuest(currentQuestion,quests){
      var quest = quests.test[currentQuestion-1],
          id = quest.id,
          variants = quest.variants,
          title = quest.quest
  
  
      $('.l-test-heading span').html(title);
      $('.l-test-heading b').html(id + '.');
      $('#l-test-item-1 .l-test-input').attr('data-points',variants[0].points);
      $('#l-test-item-2 .l-test-input').attr('data-points',variants[1].points);
      $('#l-test-item-3 .l-test-input').attr('data-points',variants[2].points);
      $('#l-test-item-1 .l-test-text').html(variants[0].text);
      $('#l-test-item-2 .l-test-text').html(variants[1].text);
      $('#l-test-item-3 .l-test-text').html(variants[2].text);
    }

    function showResults(total){
      $.getJSON('resault.json', function(data) {
          var results = data;
          var tmp = 0;
          if (total < 6) {
              tmp = 0;
          }  else if (total > 13) {
              tmp = 2;
          } else {
              tmp = 1;
          }
          $('.l-test-item').hide();
          $('.l-test-resault').show();
          $('.l-test-resault-title').html(results.results[tmp].title);
          $('.l-test-resault-desc').html(results.results[tmp].text);
          $('.l-test-resault-ps').html(results.results[tmp].text2);
      });
    }

    $('.js-game-next').on('click',function (e) {
      const $this = $(this);
      e.preventDefault();
          $this.children('.l-test-input').addClass('is-active');
         setTimeout(() => {
          if (currentQuestion < countQuestions){
            $this.children('.l-test-input').removeClass('is-active');
            currentQuestion ++;
            setQuest(currentQuestion,quests);
            total = total + $this.children('.l-test-input').data('points');
          } else {
              showResults(total);
          }
         }, 200);
    });
  });