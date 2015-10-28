

jQuery.parseJSON( jsonString );

var myLatlng = new google.maps.LatLng(latitude, longitude);
var mapOptions = {
  zoom: 8,
  center: myLatlng,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById("map"),
    mapOptions);

