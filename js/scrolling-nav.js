//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

$.getJSON('http://ipinfo.io', function (data) {
  console.log(data);
  console.log("YO");
   $("#ip").append("Some people wants to hide this but it's pretty easy to get... " + data.ip + " Yeah, that's your IP."); 
    $("#region").append("How's the weather in " + data.region + "?");
})

(function() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("connection").innerHTML += '<b>Public IP:</b> ' + JSON.parse(xhttp.responseText).ip + '<br>';
        }
    };
    xhttp.open("GET", "https://api.ipify.org?format=json", true);
    xhttp.send();

    var xhttp3 = new XMLHttpRequest();
    xhttp3.onreadystatechange = function() {
        if (xhttp3.readyState == 4 && xhttp3.status == 200) {
            document.getElementById("isp").innerHTML += '<b>Service Provider:</b> ' + JSON.parse(xhttp3.responseText).isp + '<br>';
        }
    };
    xhttp3.open("GET", "http://ip-api.com/json", true);
    xhttp3.send();

    if(document.referrer && document.referrer!==''){
            document.getElementById("referrer").innerHTML = '<b>Previous Page:</b>  '+document.referrer+'<br>';
    }

    //get the IP addresses associated with an account
    function getIPs(callback) {
        var ip_dups = {};

        //compatibility for firefox and chrome
        var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        var useWebKit = !!window.webkitRTCPeerConnection;

        //bypass naive webrtc blocking using an iframe
        if (!RTCPeerConnection) {
            //NOTE: you need to have an iframe in the page right above the script tag
            //
            //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
            //<script>...getIPs called in here...
            //
            var win = iframe.contentWindow;
            RTCPeerConnection = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection;
            useWebKit = !!win.webkitRTCPeerConnection;
        }

        //minimal requirements for data connection
        var mediaConstraints = {
            optional: [{
                RtpDataChannels: true
            }]
        };

        var servers = {
            iceServers: [{
                urls: "stun:stun.services.mozilla.com"
            }]
        };

        //construct a new RTCPeerConnection
        var pc = new RTCPeerConnection(servers, mediaConstraints);

        var sentResult = false;

        function handleCandidate(candidate) {
            //match just the IP address
            var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
            var ip_addr = ip_regex.exec(candidate)[1];

            //remove duplicates
            if (!sentResult && ip_dups[ip_addr] === undefined) {
                sentResult = true;
                callback(ip_addr);
            }

            ip_dups[ip_addr] = true;
        }

        //listen for candidate events
        pc.onicecandidate = function(ice) {

            //skip non-candidate events
            if (ice.candidate)
                handleCandidate(ice.candidate.candidate);
        };

        //create a bogus data channel
        pc.createDataChannel("");

        //create an offer sdp
        pc.createOffer(function(result) {

            //trigger the stun server request
            pc.setLocalDescription(result, function() {}, function() {});

        }, function() {});

        //wait for a while to let everything done
        setTimeout(function() {
            //read candidate info from local description
            var lines = pc.localDescription.sdp.split('\n');

            lines.forEach(function(line) {
                if (line.indexOf('a=candidate:') === 0)
                    handleCandidate(line);
            });
        }, 1000);
    }

    //Test: Print the IP addresses into the console
    getIPs(function(ip) {
        document.getElementById("connection").innerHTML += '<b>Local IP:</b> ' + ip + '<br>';
        window.ip = ip;
    });
}())
