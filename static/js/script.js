
$(document).ready(function(){
    var user = localStorage.getItem("username");
    var my_storage = window.localStorage;
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
        document.querySelector("#chat-title").innerHTML=`<b id="user_b">Chatter</b> <span id="title">User: ${my_storage.getItem('username')}</span> `;
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
        if(my_storage.getItem('channel')){
            socket.emit("join_channel", my_storage.getItem("channel"));
        };

        document.querySelector('#send').onclick = function () {
            msg = document.querySelector("#message").value;
            user = my_storage.getItem('username');
            const channel = my_storage.getItem('channel');
            socket.emit('message', { 'msg': msg, 'user':user, 'channel':channel});
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
                document.querySelector("#chat-title").innerHTML=`<b id="user_b">Chatter</b> <span id="title">User: ${my_storage.getItem('username')}</span> `;
                $('#overlay').delay(100).hide(500);                                                
            }
        };
        document.querySelector("#channel_button").onclick = function(){
            const channel = document.querySelector("#channel_input").value;
            socket.emit("channel_creation", channel);
            document.querySelector("#chat-title").innerHTML=`<b id="user_b">Chatter</b> <span id="title">User: ${my_storage.getItem('username')}</span> <span id="channel-panel">Active channel: <span id = "channel">${my_storage.getItem('channel')}</span></span>`;
            
            var name = document.createElement('li');
            var location = document.querySelector('#channel-changer');
            location.append(name);
            name.innerHTML = channel;
            name.dataset.channel=channel;
            name.className="my-channel";
            
            
        }
        document.querySelectorAll(".my-channel").forEach(li => {
            li.onclick = () =>{
                socket.emit('change_channel', my_storage.getItem('channel'), li.dataset.channel);
                
                var channel_list = document.querySelector("#channel-list");
                var button = document.querySelector("#expand");
                channel_list.style.height="20px";
                button.value = "Expand";
                button.innerHTML = "Channels";
                
            }
        })

        socket.on('error', msg => {
            // Notify the user about the error
            alert(msg);
        });

        socket.on('message', data => {
            console.log('Received');
            const li = document.createElement('div');
            if (`${data.user}`=== my_storage.getItem('username')){
            li.className="chat-msg";}
            else{
                li.className="msg-other";
            } ; 
            
            li.innerHTML = `<strong class="name">${data.user} </strong> <p>${data.msg}</p> <span class = 'time'>(${data.my_time})</span>`;
            document.querySelector("#messages").append(li);
        });
        
        socket.on('my response'),function(user){
            console.log(user);
            document.querySelector("#chat-title").innerHTML= `<b>user.user_name</b> - Chatter`;
        };
        socket.on('join_channel', data => {
            my_storage.setItem('channel', data['channel']);
            document.querySelector('#messages').innerHTML='';
            document.querySelector("#chat-title").innerHTML=`<b id="user_b">Chatter</b> <span id="title">User: ${my_storage.getItem('username')}</span> <span id="channel-panel">Active channel: <span id = "channel">${my_storage.getItem('channel')}</span></span>`;
            var msg;
            for (msg in data["messages"]) {
                const li = document.createElement('div');
            if (`${data.user}`=== my_storage.getItem('username')){
            li.className="chat-msg";}
            else{
                li.className="msg-other";
            } ; 
            
            li.innerHTML = `<strong class="name">${data["messages"][msg].user} </strong> <p>${data["messages"][msg].msg}</p> <span class = 'time'>(${data["messages"][msg].my_time})</span>`;
            document.querySelector("#messages").append(li);
            };
        })
        
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