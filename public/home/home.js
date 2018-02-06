$("a.whoami").click(function(){
    $.ajax({url: "/api/whoami", success: function(result){
      var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      $("td.whoami").html(result + "   @ "+time);
    }});
});

$("a.sleep-10").click(function(){
    $(this).addClass("disabled btn-default").removeClass("btn-success");
    $.ajax({url: "/api/sleep/10", success: function(result){
      $("a.sleep-10").removeClass("disabled btn-default").addClass("btn-success");
      var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      $("td.sleep-10").html(result + "   Finished @ "+time);
    }});
});

$("a.slepp-100").click(function(){
    $(this).addClass("disabled btn-default").removeClass("btn-warning");
    $.ajax({url: "/api/sleep/100", success: function(result){
      $("a.sleep-100").removeClass("disabled btn-default").addClass("btn-warning");
      var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      $("td.slepp-100").html(result + "   Finished @ "+time);
    }});
});

$("a.crashme").click(function(){
    $.ajax({url: "/api/crashme", error: function(result){
      var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      $("td.crashme").html("Forcely crashed one server instance @ "+time);
    }});
});
