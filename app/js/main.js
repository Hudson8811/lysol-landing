var wow = new WOW();
new WOW().init();


$('.instruction__row').slick({
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: '<div class="slide-arrow arrow-next"><svg class="icon icon-arrow-right"><use xlink:href="#icon-arrow-right"></use></svg></div>',
  prevArrow: '<div class="slide-arrow arrow-prev"><svg class="icon icon-arrow-right"><use xlink:href="#icon-arrow-left"></use></svg></div>',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,        
      }
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,        
      }
    },
  ]
});

$(window).scroll(function() {
  var height = $(window).scrollTop();
   /*Если сделали скролл на 100px задаём новый класс для header*/
  if(height > 70){
  $('header').addClass('header-fixed');
  } else{
  /*Если меньше 100px удаляем класс для header*/
  $('header').removeClass('header-fixed');
  }
  });

  $('#wrapper').fullpage({
    autoScrolling:true,
    scrollBar: true,
    scrollHorizontally: true,
    responsiveWidth: 1024,
    onLeave: function(origin, destination, direction){

      if(destination.index == 0){ // второй слайд
        $('.header').removeClass('header-fixed');
        
          
      }
  
      if(destination.index !== 0){ // не второй слайд
        $('.header').addClass('header-fixed');
       
      }
    }
  });

$('.js-to-game').click(function () {
  fullpage_api.moveTo(3);
});

  


  // $('[data-fancybox="wash"]').fancybox({
  //   btnTpl: {
  
  //     arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left prev" title="{{PREV}}">' +
  //       '<i class="fa fa-angle-left" aria-hidden="true"></i>' +
  //       "</button>",
  
  //     arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right next" title="{{NEXT}}">' +
  //       '<i class="fa fa-angle-right" aria-hidden="true"></i>' +
  //       "</button>"
  
  //   }
  
  // });

  $('.viruses-icon').click(function(e){
    e.preventDefault();
    if(!$(this).hasClass('is-active')){
      $('.viruses-icon').removeClass('is-active');;
      $('.viruses-card').hide();
      $(this).addClass('is-active');
      $(this).siblings('.viruses-card').show();
    } else{
      $(this).removeClass('is-active');
      $(this).siblings('.viruses-card').hide();
    }
  });