$("a.whoami").click(function(){
    $("ad.whoami").html('<span style="color:grey">Loading Server Instance IP ...</span>');
    $.ajax({url: "/api/whoami", success: function(result){
      var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      $("td.whoami").html(result + "   @ "+time);
    }});
});

$("a.sleep-10").click(function(){
    $(this).addClass("disabled btn-default").removeClass("btn-success");
    $("td.sleep-10").html('<span style="color:grey">Timer Start</span>');
    $.ajax({url: "/api/sleep/10", success: function(result){
      $("a.sleep-10").removeClass("disabled btn-default").addClass("btn-success");
      var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      $("td.sleep-10").html(result + "   ,Finished @ "+time);
    }});
});

$("a.sleep-300").click(function(){
    $(this).addClass("disabled btn-default").removeClass("btn-warning");
    $("td.sleep-300 ").html('<span style="color:grey">Timer Start</span>');
    $.ajax({url: "/api/sleep/100", success: function(result){
      $("a.sleep-300").removeClass("disabled btn-default").addClass("btn-warning");
      var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      $("td.sleep-300").html(result + "   ,Finished @ "+time);
    }});
});

$("input.pi").change(function(){
  var value = $(this).val() || 2;
  $("td.pi").html('Calculating ...');
  $.ajax({url: "/api/calcpi/"+value, success: function(result){
    // $("input.pi").removeClass("disabled").addClass("btn-warning");
    $("td.pi").html(result);
  }});
});

$("a.crashme").click(function(){
    $("td.crashme").html('<span style="color:grey">Force Shutdown</span>');
    $.ajax({url: "/api/crashme", error: function(result){
      var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      $("td.crashme").html("Forcely crashed one server instance @ "+time);
    }});
});
