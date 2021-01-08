let referrer = document.referrer;
$(document).ready(function () {

  if ($(window).width() < 768 && window.location.href.includes("book-an")) {
    $('body').css('background-image', 'url("/images/book-an-appointment/appo-bg.png")')
  }

  if ($(window).width() < 768 && window.location.href.includes("book-a-strategy")) {
    $('body').css('background-image', 'url("/images/book-an-appointment/appo-bg.png")')
  }

  $('#countryCode').val('+')

  $(".child-lists").hide();
  $(".sub-child-lists").hide();
  $(".sub-sub-child-lists").hide();

  $("#mobile-nav-btn").on("click", function () {
    $(this).find(".navbar-toggler").css("outine", "none !important");
    $(".desktop-nav").css("display", "none");
    $(".mobile-header").slideToggle();
  });

  $(".parent-lists").on("click", function () {
    var i = $('.parent-lists').index(this)
    // $($(".parent-lists")[i]).children( ".aa" ).css({background:"yellow"})
    $(this).siblings("li").find("ul").hide();
    $(this).siblings("li").find("i").removeClass("fa-angle-right");
    $(this).siblings("li").find("i").addClass("fa-angle-down");
    // $(this).children('.child-lists').toggle('slow');
    $(this).children(".child-lists").slideToggle(750);
    $(this).find("i").toggleClass("fa-angle-right fa-angle-down");
    $(".stop-anchor-propagation").click(function (e) {
      e.stopPropagation();
    });
  });

  $(".sub-parent-lists").on("click", function () {
    $(this).siblings("li").find("ul").hide();
    $(this).siblings("li").find("i").removeClass("fa-angle-right");
    $(this).siblings("li").find("i").addClass("fa-angle-down");
    $(this).children(".sub-child-lists").toggle("slow");
    $(this).find("i").toggleClass("fa-angle-right fa-angle-down");
    $(".stop-anchor-propagation").click(function (e) {
      e.stopPropagation();
    });
    return false;
  });

  $(".sub-sub-parent-lists").on("click", function () {
    $(this).siblings("li").find("ul").hide();
    $(this).siblings("li").find("i").removeClass("fa-angle-right");
    $(this).siblings("li").find("i").addClass("fa-angle-down");
    $(this).children(".sub-sub-child-lists").toggle("slow");
    $(this).find("i").toggleClass("fa-angle-down fa-angle-right");
    return false;
  });

  $("#general_query_form_submit").on("click", function (e) {
    e.preventDefault();
    $("#general_query_form .modal-body .form-text").hide();

    var name = $("#general_query_form .modal-body #name").val();
    var email = $("#general_query_form .modal-body #email").val();
    var contact = $("#general_query_form .modal-body #number").val();
    var extra_info = $("#general_query_form .modal-body #extra-info").val();
    var page = window.location.href;

    if (IsEmail(email) !== false) {
      $.ajax({
        type: "POST",
        url: "/general-query",
        data: {
          name: name,
          email: email,
          contact: contact,
          extra_info: extra_info,
          page: page,
        },
      }).done(function (res) {});

      $("#general_query_form .modal-body").empty();
      $("#general_query_form .modal-header").remove();

      var appendModal2 =
        '<img src="/images/round-done-button.png" alt="" class="d-block mx-auto">' +
        '<div class="modal2-text text-center">' +
        '<div style="font-size:18px; margin: 35px;">We have received your Query!</div>' +
        "We will get back to you in a couple of hours." +
        "<br> <br>" +
        '<div style="line-height: 2.1"> In the meantime, please check out our All-In-One Service to get an understanding of how we have helped 2500+ applicants get into their dream  schools and how we can help you with the same!</div>' +
        "</div>" +
        '<a id="All in One" href="/mim-all-in-one?generalquery"><button type="submit" href="" style="background: #FBAF19; border-radius: 5px;" class="btn btn-default btn-lg btn-primary d-block mx-auto mt-5 all-in-one-btn">All-in-One Service</button></a>';

      $("#general_query_form .modal-body").append(appendModal2);
    } else {
      $(".modal-body #emailHelp").show();
    }
  });

  $(".book_an_appointment_form_submit").on("click", function (e) {

    e.preventDefault();
    $(".form-text").hide();

    var name = $(this).closest('.appointment-book-model').find(".name").val();

    // var code = $("#countryCode").val();
    var email = $(this).closest('.appointment-book-model').find(".email").val();
    var contact = $(this).closest('.appointment-book-model').find(".number").val();
    var semester_intake = $(this).closest('.appointment-book-model').find(".extra-planning").find(":selected").val();

    var page = window.location.href;

    if (IsEmail(email) === false || email == "") {
      $(this).closest('.appointment-book-model').find(".emailHelp").show();
    } else if (validatePhone(contact) === false || contact == "") {
      $(this).closest('.appointment-book-model').find(".contactHelp").show();
    }
    // else if(countryCode == "" || countryCode.length === 1){
    //   $(this).closest('.appointment-book-model').find("#codeHelp").show();
    // }
    else if (semester_intake == undefined || semester_intake == "") {
      $(this).closest('.appointment-book-model').find(".semIntakeHelp").show();
    } else {
      $.ajax({
        type: "POST",
        url: "/book-an-appointment",
        data: {
          name: name,
          email: email,
          contact: contact,
          semester_intake: semester_intake,
          page: page,
        },
      }).done(function (res) {
        //  window.location.href = '/appointment-booked/';
      });


      $(this).closest('.book-an-appointment-form-container').hide()

      if (semester_intake == '2021 Intake') {

        $(this).closest('.main-appointment-form').find('.show-calendly').show();
        Calendly.initInlineWidget({
          url: 'https://calendly.com/mim-essay-schedule/20-minute-appointment-call',
          parentElement: $(this).closest('.main-appointment-form').find('.show-calendly'),
          prefill: {
            name: name,
            email: email,
            customAnswers: {
              a1: contact,
            }
          }
        });
      } else {
        if (window.location.href.includes("book-an")) {
          $('body').css('background-image', 'none')
          $('.main-con').css({
            'padding-top': '0px'
          })
        } else if (window.location.href.includes("book-a-strategy")) {
          $('body').css('background-image', 'none')
          $('.main-con').css({
            'padding-top': '0px'
          })
        } else {
          $('.main-con').css({
            'padding-top': '0px'
          })
        }
        $(this).closest('.main-appointment-form').find('.app-booked').show();

        // add css in app-booked class if book a call called from recommended schools
        let closestContainer = $(this).closest('.application-score-content');
        if (closestContainer.length > 0) {
          $(this).closest('.application-score-content').find('.app-modal-close').addClass('close');
          $(this).closest('.main-appointment-form').find('.app-booked').css({
            background: 'white',
            padding: '10px'
          });
          $(".application-score-content").animate({
              scrollTop: $(".app-booked").offset().top,
            },
            "slow"
          );
        }

      }
    }
  });

});

function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!regex.test(email)) {
    return false;
  } else {
    return true;
  }
}

function validatePhone(txtPhone) {
  var a = txtPhone;
  var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
  if (filter.test(a)) {
    if (a.length <= 15) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function checkedServices(page) {
  var extra_info, services;
  if (page == 'dash') {
    extra_info = $("#EXTRA-INFO")
      .find(":selected")
      .val();
    services = $("#SERVICES")
    services.css({
      'color': '#495057 !important'
    });
  } else {
    extra_info = $("#extra-info")
      .find(":selected")
      .val();
    services = $('#services')
    services.css({
      'color': '#495057 !important'
    });

  }

  if (extra_info != "") {
    if (extra_info != "Interested in our Services") {
      services.parent().removeClass("d-none");
    } else {
      services.parent().addClass("d-none");
    }
  }
}

$('.js-app-form-select').on('change', function () {
  if ($(this).val()) {
    if ($(this).hasClass('app-form-select')) {
      $(this).removeClass('app-form-select')
    }
    $(this).addClass('select-selected')
  } else {
    $(this).removeClass('select-selected')
    $(this).addClass('app-form-select')
  }
});

function user_journey(col) {
  $.ajax({
    type: "POST",
    url: "user-journey-update",
    async: true,
    data: {
      col: col,
    },
  }).done(function () {});
}

function dashboard_kpis(event) {
  $.ajax({
    type: "POST",
    url: "/api/update-kpi",
    async: true,
    data: {
      event,
      referrer,
    },
  }).done(function () {});
}

$(document).ready(function () {
  $(`.sub-navigation__school-data--1`).show();
  $(".sub-navigation__school").mouseover(function () {
    let target = $(this).data("target");
    $(`.sub-navigation__school-data`).hide();
    $(`.sub-navigation__school-data--${target}`).show();
    $(`.sub-navigation__school`).removeClass("sub-navigation__school--active");
    $(`.sub-navigation__school--${target}`).addClass(
      "sub-navigation__school--active"
    );
  });
});