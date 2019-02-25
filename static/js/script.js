function hello() {
    document.getElementById("overlay").style.display = "block";
    document.querySelector(".flashit").innerHTML = "Hello";
};
function hello2() {
    document.querySelector(".flashit").innerHTML = "Welcome to Chatter";
};
function hello3() {
    document.querySelector(".flashit").innerHTML = "Hope You would have a good time";
    document.getElementById("overlay").style.display = "none";
};
function welcomescreen() {
    hello();
    hello2()
    hello3()
}

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
    socket.on('connect', () => {

        document.querySelector('#send').onclick = function () {
            msg = document.querySelector("#message").value;
            socket.emit('message', { 'msg': msg});
            document.querySelector("#message").value = '';

        };


        socket.on('message', data => {
            console.log('Received');
            const li = document.createElement('li');
            li.innerHTML = `${data.msg}`;
            document.querySelector("#messages").append(li);
        });
    });
});
$(document).ready(function () {
    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
});