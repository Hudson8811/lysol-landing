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

  $(document).on('click', '.l-test-input', function(e){
    setTimeout(() => {
      const item = $(this).data('item');
      $('.l-test-item').removeClass('is-active');
      $(`.l-test-item[data-item="${item}"]`).addClass('is-active');
    }, 300);
  });