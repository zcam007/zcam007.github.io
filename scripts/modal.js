$(document).ready(function(){

  // MODAL
  var modalText = {
    pathealthmonsys: {
      title: 'Patient Health Care Monitoring System',
      tag: 'Internet of Things(IOT)',
      detail: 'Developed a Raspberry Pi based IOT-device to provide mobile, low-cost, and efficient remote health monitoring through web services. It processes heart rate and temperature metrics to recommend the necessary actions to be taken for achieving good health.',
      link: '#'
    },
    foodspoilage: {
      title: 'System for detecting Food Spoilage.',
      tag: 'Internet of Things(IOT)',
      detail: 'There are more chances of food spoiling when stored in refrigerators or cold storage because of overseeing or forgetting for long time. There is a need of regulated system to overcome this scenario and decrease the amount of food wasted. It is known that specific compounds are produced when food spoil. For example, commonly recognised spoilage markers include ethanol for ripened fruits and Methane, Carbon dioxide for fish and other bacteria prone food. As the entire headspace of the spoiled food changes it is possible to detect the spoilage of food by measuring the amount present of these markers. A fast and accurate technique using chemical gas sensor is examined for the above food products.',
    },
    carpooling: {
      title: 'Car Pooling System',
      tag: 'Website',
      detail: 'An ASP.NET web app to maintain a web based interactive application that enables the corporate student/employee within an organization to avail the facility of car-pooling effectively.',
      link: '#'
    },
    flightticket: {
      title: 'Online Flight Ticket booking portal',
      tag: 'Website',
      detail: 'An ASP.NET web app where the user can log in to the site with valid credentials and book the available flight tickets.',
    },
    minichat: {
      title: 'Mini Chat Application',
      tag: 'Socket Programming',
      detail: 'This project is intended to depict the concurrency between processes using semaphores and shared memory in the Unix operating system. It is to show how one kind of Inter-Process Communication(IPC) works.Users can send instant messages in real time.Storage is maintained using shared memory.',
    },
    themall: {
      title: 'The Mall',
      tag: 'PEER GUIDED SHOPPING.',
      detail: 'The Mall is a place to follow the latest fashion purchases of your friends and favorite celebrities. Built with Node.js and Handlebars. Features the ability to import thousands of top brands products into one shopping site.',
    }
  };

  $('#gallery .button').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
      slideWidth = 700,
      threshold = slideWidth/3,
      dragStart, 
      dragEnd;

  setDimensions();

  $('#next').click(function(){ shiftSlide(-1) })
  $('#prev').click(function(){ shiftSlide(1) })

  carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
      dragEnd = event.pageX;
      $(this).css('transform','translateX('+ dragPos() +'px)');
    });
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1)
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
    setTimeout(function(){
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform','translateX(0px)'); 
    },700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) $('#modal .button').addClass('visible')
                                               .parent()
                                               .attr('href', modalText[id].link)

    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background: "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
              
    });
  }
})
