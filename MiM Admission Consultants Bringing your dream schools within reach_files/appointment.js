$(document).ready(function() {

    $(".appointment_head").hover(function(){
        $(".appointment_head").hide()
        $(".appointment_sidenav-open").css({"display":"block","transition-duration": "0.5s"});
        }, function(){
        $(".appointment_sidenav-open").css({"display":"none","transition-duration": "0.5s"});
        $(".appointment_head").show();
      });
    
      $(".appointment_sidenav-open").hover(function(){
        $(".appointment_head").hide()
        $(".appointment_sidenav-open").css({"display":"block","transition-duration": "0.5s"});
        }, function(){
        $(".appointment_sidenav-open").css({"display":"none","transition-duration": "0.5s"});
        $(".appointment_head").show();
      }); 
});