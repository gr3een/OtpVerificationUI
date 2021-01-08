if ($(window).width() > 992) {
  $(".js-degree-card:eq(2)").addClass("js-change-card");
  $(".triangle:eq(2)").show();
  $(".triangle:eq(2)").css({ bottom: "-59px" });
  $(".js-hover:eq(2)").show();

  $(".js-degree-card").hover(function (event) {
    $(".js-hover:eq(2)").hide();
    $(".triangle:eq(2)").hide();
    $(".js-hover").hide();
    $(".triangle").hide();
    $(".js-degree-card:eq(2)").removeClass("js-change-card");

    var i = $(".js-degree-card").index(this);
    $($(".js-degree-card")[i]).toggleClass("js-change-card");
    $($(".triangle")[i]).css({ bottom: "-59px" });
    $($(".triangle")[i]).show();
    $($(".js-hover")[i]).show();
  });

  $(".js-degree-card").mouseleave(function () {
    $(".js-degree-card").removeClass("js-change-card");
    $(".triangle").css({ bottom: "-75px" });
  });

  $(".js-degree-card").on("click", function (event) {
    event.stopPropagation();
  });
}


var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  // var delta = 300  - Math.random() * 100;
  var delta = 125;
  if (this.isDeleting) {
    delta /= 2;
  } //lag for deleting

  if (!this.isDeleting && this.txt === fullTxt) {
    //full text is written
    delta = this.period + 1000;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    //full text deleted
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);

  jQuery(".btn-degree-popupone").click(function () {
    jQuery("#popup-one").hide();
    jQuery("#popup-two").show();
    var value = this.innerHTML;
    var degree = jQuery(this).attr("value");
    if (value === "Early Career MBA") {
      jQuery("#nor_div").hide();
      jQuery("#ear_MBA").show();
    } else {
      jQuery("#ear_MBA").hide();
      jQuery("#nor_div").show();
      jQuery("#degreeBtn").html("Consulting services for " + value);
      jQuery("#schoolReviewUrl").attr(
        "href",
        info_dict[degree]["schoolReviewUrl"]
      );
      jQuery("#degreeUrl").attr("href", info_dict[degree]["degreeUrl"]);
      jQuery("#profileEvalUrl").attr(
        "href",
        info_dict[degree]["profileEvalUrl"]
      );
    }
  });

  jQuery("#popup_back").click(function () {
    jQuery("#popup-one").show();
    jQuery("#popup-two").hide();
  });
};

var info_dict = {
  mim: {
    schoolReviewUrl: "http://www.clkmg.com/mim-essay/mim-info-btn",
    degreeUrl: "http://www.clkmg.com/mim-essay/mim-consul-btn",
    profileEvalUrl: "http://www.clkmg.com/mim-essay/mim-pe",
  },
  mem: {
    schoolReviewUrl: "http://www.clkmg.com/mim-essay/mem-info-btn",
    degreeUrl: "http://www.clkmg.com/mim-essay/mem-consul-btn",
    profileEvalUrl: "http://www.clkmg.com/mim-essay/mem-pe",
  },
  msc: {
    schoolReviewUrl: "http://www.clkmg.com/mim-essay/analytics-info-btn",
    degreeUrl: "http://www.clkmg.com/mim-essay/analytics-consul-btn",
    profileEvalUrl: "http://www.clkmg.com/mim-essay/analytics-pe",
  },
  mfin: {
    schoolReviewUrl: "http://www.clkmg.com/mim-essay/fin-info-btn",
    degreeUrl: "http://www.clkmg.com/mim-essay/fin-consul-btn",
    profileEvalUrl: "http://www.clkmg.com/mim-essay/fin-pe",
  },
  sms: {
    schoolReviewUrl: "http://www.clkmg.com/mim-essay/spl-info-btn",
    degreeUrl: "http://www.clkmg.com/mim-essay/spl-consul-btn",
    profileEvalUrl: "http://www.clkmg.com/mim-essay/spl-pe",
  },
  "ms/mem": {
    schoolReviewUrl: "http://bit.ly/more_info_on_msengg",
    degreeUrl: "http://bit.ly/consulting_services_for_msengg",
    profileEvalUrl: "http://www.clkmg.com/mim-essay/mim-pe",
  },
};

//Carousel

$(function () {
  $(".owl-carousel").on(
    "initialized.owl.carousel translate.owl.carousel",
    function (e) {
      idx = e.item.index;
      $(".owl-item.medium").removeClass("medium").addClass("notFocused");
      $(".owl-item.small").removeClass("small").addClass("notFocused");
      // 1st card
      $(".owl-item").eq(idx).addClass("small");
      // 3rd card
      $(".owl-item")
        .eq(idx + 2)
        .addClass("small");
      // Focused Class i.e second card
      $(".owl-item")
        .eq(idx + 1)
        .addClass("medium")
        .removeClass("notFocused");
    }
  );

  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    items: 3,
    nav: true,
    slideTransition: "ease-in-out",
    dots: false,
    navText: [
      "<span><img src='/images/dashboard/carousel-left.png'/></span>",
      "<span><img src='/images/dashboard/carousel-right.png'/></span>",
    ],
    autoplay: true,
    autoplayHoverPause: true,
    smartSpeed: 500,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 3,
      },
    },
  });

  var owl = $("#owl-demo-2");
  owl.owlCarousel({
    items: 3,
    itemsDesktop: [992, 3],
    itemsDesktopSmall: [768, 2],
    itemsTablet: [480, 2],
    itemsMobile: [320, 1],
  });
  $(".next").click(function () {
    owl.trigger("owl.next");
  });
  $(".prev").click(function () {
    owl.trigger("owl.prev");
  });
});

function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}

const testomonialText = $(".hm-carousel-card-sub").find(".card-text");

testomonialText.map((i, test) => {
  let eachText = $(test).text();
  if (eachText.length > 340) {
    let restText = eachText.slice(340).replace(/[\s+]/g, " ");
    let cutText = eachText.slice(0, 340).replace(/[\s+]/g, " ");

    $(test).html(
      `${cutText}<span class="showWhenClicked">${restText}</span><span class="cardTextDots">...</span><span onclick={showRestTesto(this)} class="carousel-read-more"><b>read more</b></span><span onclick={hideRestTesto(this)} class="carousel-read-less"><b>&nbsp;&nbsp;read less</b></span>`
    );
  }
});

$("carousel-read-more").on("click", function () {
  showRestTesto(e);
});
$("carousel-read-less").on("click", function () {
  hideRestTesto(e);
});

function showRestTesto(e) {
  $(e).parent().find(".showWhenClicked").show();
  $(e).parent().find(".cardTextDots").hide();
  $(e).hide();
  $(e).parent().find(".carousel-read-less").show();
  $(e).parent().parent().addClass("card-body-overflow");
}
function hideRestTesto(e) {
  $(e).parent().find(".showWhenClicked").hide();
  $(e).parent().find(".cardTextDots").show();
  $(e).hide();
  $(e).parent().parent().removeClass("card-body-overflow");
  $(e).parent().find(".carousel-read-more").show();
}

//End of Carousel
