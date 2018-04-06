$("a.whoami").click(function(){
    $("ad.whoami").html('<span style="color:grey">Loading Server Instance IP ...</span>');
    $(this).addClass("disabled btn-default").removeClass("btn-info");
    $.ajax({url: "/api/whoami", cache:false, success: function(result){
      var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      $("td.whoami").html(result + "   @ "+time);
      $("a.whoami").removeClass("disabled btn-default").addClass("btn-info");
    }});
});

$("a.sleep-10").click(function(){
    $(this).addClass("disabled btn-default").removeClass("btn-success");
    $("td.sleep-10").html('<span style="color:grey">Timer Start</span>');
    $.ajax({url: "/api/sleep/10", cache:false, success: function(result){
      $("a.sleep-10").removeClass("disabled btn-default").addClass("btn-success");
      var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      $("td.sleep-10").html(result + "   ,Finished @ "+time);
    }});
});

$("a.sleep-100").click(function(){
    $(this).addClass("disabled btn-default").removeClass("btn-warning");
    $("td.sleep-100 ").html('<span style="color:grey">Timer Start</span>');
    $.ajax({url: "/api/sleep/100", cache:false, success: function(result){
      $("a.sleep-100").removeClass("disabled btn-default").addClass("btn-warning");
      var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      $("td.sleep-100").html(result + "   ,Finished @ "+time);
    }});
});

$("input.pi").change(function(){
  var value = $(this).val() || 2;
  $("td.pi").html('Calculating ...');
  $.ajax({url: "/api/calcpi/"+value, cache:false, success: function(result){
    $("td.pi").html(result);
  }});
});

$("a.crashme").click(function(){
    $("td.crashme").html('<span style="color:grey">Prepare for Server shutdown</span>');
    $.ajax({url: "/api/crashme", cache:false, error: function(result){
      var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      $("td.crashme").html("Forcely crashed one server instance @ "+time);
    }});
});
