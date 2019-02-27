
$(document).ready(function(){
    $('#overlay').delay(100).show(500);
    var h1="Hello";
    var h2="Welcome to Chatter";
    var h2n1="You are not logged in";
    var h2n2="Enter username to start";
    var h3=document.querySelector("#username");
    var input=document.querySelector("#username_input")
    var user=document.querySelector("#user");
    
    
    $("#overlay-text").html(h1).fadeIn(2000,function(){
        $("#overlay-text").html(h1).fadeOut(1000,function(){
            $("#overlay-text").html(h2).fadeIn(2000,function(){
                $("#overlay-text").html(h2).fadeOut(1000,function(){
                    $("#overlay-text").html(h2n1).fadeIn(2000,function(){
                        $("#overlay-text").html(h2n1).fadeOut(1000,function(){
                            $("#overlay-text").html(h2n2).fadeIn(2000,function(){
                                $("#overlay-text").html(h2n2).fadeOut(1000,function(){
                                    $("#overlay-text").html(h3).fadeIn(2500);
        });
    });
});
}); 
    
});
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
   
    
    var channel_list = document.querySelector("#channel-list");
    var button = document.querySelector("#expand");
    var about = document.querySelector("#about");
    var aboutButton = document.querySelector("#about-button");
    button.onclick = function () {
        if (button.value === "Expand") {
            channel_list.style.height = "300px";
            button.value = "Collapse";
            button.innerHTML = "Hide";
            
        } else {
            channel_list.style.height="20px"            
            button.value = "Expand";
            button.innerHTML = "Chanels";

        }
    };
    aboutButton.onclick = function () {
        if (aboutButton.value === "Expand") {
            about.style.height = "120px";
            aboutButton.value = "Collapse";
            aboutButton.innerHTML = "Hide";
        } else {
            about.style.height = "20px";
            aboutButton.value = "Expand";
            aboutButton.innerHTML = "About";
        }
    };
});
$(function() {
    $('form').each(function() {
        $(this).find('input').keypress(function(e) {
            // Enter pressed?
            if(e.which == 10 || e.which == 13) {
                this.form.submit();
            }
        });

        $(this).find('input[type=submit]').hide();
    });
});
document.addEventListener('DOMContentLoaded', function () {
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    var my_storage = window.localStorage;
    var input=document.querySelector("#username_input");
    socket.on('connect', () => {

        document.querySelector('#send').onclick = function () {
            msg = document.querySelector("#message").value;
            socket.emit('message', { 'msg': msg});
            document.querySelector("#message").value = '';

        };


        socket.on('message', data => {
            console.log('Received');
            const li = document.createElement('div');
            li.className="chat-msg"
            li.innerHTML = `${data.msg}`;
            document.querySelector("#messages").append(li);
        });
        document.querySelector("#user").onclick=function(){
            user = document.querySelector("#user").value;
            socket.emit('status', user);
           
        };
        socket.on('status', data =>{
            console.log('Status send');
            input.innerHTML=`${data.status}`;

        }
    });
});
$(document).ready(function () {
    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            if ($("#overlay").css("display")=="block"){
                $("#user").click();    
            }
            else{
           
            $("#send").click();
            return false;
        }};
    });
});