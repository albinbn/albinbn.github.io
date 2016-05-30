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
    /*$("#region").append("How's the weather in " + data.region + "?");*/
})

(function() {
    function languages(langs) {
        if (!langs.reduce) {
            return languageMap[langs];
        }
        return langs.reduce(function(a, e) {
            if (e === 'en-US' && langs.indexOf('en-US') > -1) {
                return a;
            }
            return a + (window.languageMap[e] ? (window.languageMap[e].int + ', ') : (e + ', '))
        }, '');
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
            var el = document.getElementById("location");

        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var geolocation = JSON.parse(xhttp.responseText).location;
            var loc = geolocation.lat + ',' + geolocation.lng;
            /*el.innerHTML = '<a target="_blank" href="http://maps.google.com/maps/place/' + loc + '/@' + loc + ',10z/data=!3m1!1e3"><img src=https://maps.googleapis.com/maps/api/staticmap?zoom=10&size=700x400&maptype=roadmap&markers=color:red%7Clabel:C%7C' + loc + '&key=AIzaSyDWO8tV87DC4tCaHOLoADkL71G-jcyBdwk ></a><br><br>';
            // el.innerHTML = '<a target="_blank" href="http://maps.google.com/maps?z=10&q=loc:' + geolocation.lat + ',' + geolocation.lng+'"><img src=https://maps.googleapis.com/maps/api/staticmap?zoom=10&size=700x400&maptype=roadmap&markers=color:red%7Clabel:C%7C' + geolocation.lat + ',' + geolocation.lng + '&key=AIzaSyBM0cQN_J2q4QjjzenttTarUZmvXlj4zl4 ></a><br><br>';
            el.innerHTML += '<b>Geo Coordinates:</b> ' + geolocation.lat + ', ' + geolocation.lng + '<br>';*/


            var xhttp2 = new XMLHttpRequest();
            xhttp2.onreadystatechange = function() {
                if (xhttp2.readyState == 4 && xhttp2.status == 200) {
                    var locationName = JSON.parse(xhttp2.responseText).results;
                    el.innerHTML += '<b>How is the weather in:</b> ' + locationName[6].formatted_address + '?<br>';
                    el.innerHTML += '<b>Languages:</b> ' + languages(navigator.languages || navigator.language || navigator.userLanguage) + '<br>';
                    el.innerHTML += '<b>Local Time:</b> ' + new Date();
                    el.innerHTML += 'city' + kommun[3].object.long_name + '<br>';
                }
            };

            xhttp2.open("POST", 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + geolocation.lat + ',' + geolocation.lng + '&sensor=true', true);
            xhttp2.send();
        }
        if (xhttp.readyState == 4 && (xhttp.status == 403 || xhttp.status == 500)) {
            el.innerHTML += 'Oh shit, you seem to hide your location from me! Good job.';
        }
    };


    var keys = [
        'AIzaSyDyYeKuGnv4UmxM4nu7B_1J0bIrCJZOhA0',
        'AIzaSyCIcWF3JiieNgMafPOj1CbRMdPV1fAuX6Y',
        'AIzaSyDkz8nnFAvSfnI31lop3QE4CUh9lVUyTCA',
        'AIzaSyDNHS8euDYNNP4Ze0ZyrJBnbO5w-mdsqPE',
        'AIzaSyDmIq5giijDQza6fdW6jpN8HfoaisSrR8w',
        'AIzaSyDD4NbRCS4HVjoO6aC2NiNhf8VW2vU2zN8',
        'AIzaSyAojMlS3vYCXLz5yYqYf01p1jmmGltPRbw',
        'AIzaSyCOYkTRKTFGBJcWMqQa527nJrwZeijn0tY',
        'AIzaSyA9B6dlqVKkqm13_4lrLAFzG3XV2svknuI',
        'AIzaSyBM0cQN_J2q4QjjzenttTarUZmvXlj4zl4',
        'AIzaSyDTfkrzfrjYEun31sY1dfjn6Q6_mIyJki8',
        'AIzaSyCG8JMKGUKKRFS0UTBpn3w6hzkih8TLCIU',
        'AIzaSyAw1c8UQKVUXc_3d_9Ax6kAFJuoH66Twig',
        'AIzaSyD7iirfrjBJFWz80VXpK2EdZnUCycSLF6Q',
        'AIzaSyDZUHoADZpq6g3TrCGROa6Wbep3fOw1eRs',
        'AIzaSyB3PJcnWltzrIMDT_AMD8vNL0v7n9PjRhg',
        'AIzaSyDWO8tV87DC4tCaHOLoADkL71G-jcyBdwk',
        'AIzaSyBJZp0aHl9a2wTf03bYbT6Um7WQVEmM4SA',
        'AIzaSyC2nWdIRRA1rZeGbOSBhZcZpj3KawVh02M',
        'AIzaSyB0D0P-tqVaMWZKen164mCMxPo1JAAwKk0',
        'AIzaSyDwgBk_9MES-vsOqfdioTrg5zhqryiuXFo',
        'AIzaSyDMh18_svWqs2IT89F8yXebwfjxNZUOJeY',
        'AIzaSyBdS4niOVhS9SHFBNh3VhYg-XdGwqSuwrA'
    ];

    var index = Math.round((keys.length - 1) * Math.random());
    var key = keys[index];
    xhttp.open("POST", "https://www.googleapis.com/geolocation/v1/geolocate?key=" + key, true);
    xhttp.send();


}())

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