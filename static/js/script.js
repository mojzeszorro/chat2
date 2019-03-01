
$(document).ready(function(){
    var user = localStorage.getItem("username");
    if (!user){
    $('#overlay').delay(100).show(500);
    var h1="Hello";
    var h2="Welcome to Chatter";
    var h2n1="You are not logged in";
    var h2n2="Enter username to start";
    var h3=document.querySelector("#username");
    var input=document.querySelector("#username_input")
     
    
    
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
    }
    else{
        document.querySelector("#chat-title").innerHTML="Chatter - "+user;
    };
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
            user = my_storage.getItem('username');
            socket.emit('message', { 'msg': msg, 'user':user});
            document.querySelector("#message").value = '';

        };
        
        document.querySelector('#user_button').onclick = function() {
            let user_name = document.querySelector('#username_input').value;
            if (user_name === ''){
                alert("Name cannot be empty !");
            }
            else {
                my_storage.setItem('username',document.querySelector("#username_input").value);
                socket.emit('username',my_storage.getItem('username'));
                document.querySelector("#chat-title").innerHTML="Chatter - "+my_storage.getItem('username');
                $('#overlay').delay(100).hide(500);
                
                
                

            }
        };

        socket.on('message', data => {
            console.log('Received');
            const li = document.createElement('div');
            if (`${data.user}`=== my_storage.getItem('username')){
            li.className="chat-msg";}
            else{
                li.className="msg-other";
            } ; 
            document.querySelector("#messages").append(li);
            li.innerHTML = `<strong class="name">${data.user} </strong> <p>${data.msg}</p> <span class = 'time'>(${data.my_time})</span>`;
            
        });
        
        socket.on('my response'),function(user){
            console.log(user);
            document.querySelector("#chat-title").innerHTML= `<b>user.user_name</b> - Chatter`;
        };
    });
});
$(document).ready(function () {
    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            if ($("#overlay").css("display")=="block"){
                $("#user_button").click();    
            }
            else{
           
            $("#send").click();
            return false;
        }};
    });
});