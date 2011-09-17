function initialize(lat, lng, scale){
	var base = new google.maps.LatLng(lat,lng);
	var myOptions = {
			zoom: scale,
			center: base,
			mapTypeId: google.maps.MapTypeId.ROADMAP 
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	return map;
}

function set_marker(latitude, longitude, lat, lng, map){
	var base = new google.maps.LatLng(lat, lng);
	
	var infowindow = new google.maps.InfoWindow({
        content: "I am here"
    });
 
    var marker = new google.maps.Marker({
        position: base,
        map: map  
    });
    google.maps.event.addListener(map, 'click', function(event){
        if(marker)
        	marker.setMap(null);
        marker = new google.maps.Marker({
            position: event.latLng,
            map: map
        });
        tileStr = "Location:"+"<br />"+event.latLng.lat()+";"+"<br />"+ event.latLng.lng(); 
        latitude.val(event.latLng.lat());
        longitude.val(event.latLng.lng());
        infowindow.setContent(tileStr);
        infowindow.open(map,marker);
    });	
}

function set_your_area(latitude,longitude,scale, input_lat, input_lng, input_scale) {
    var map = initialize(input_lat,input_lng,input_scale);      
    google.maps.event.addListener(map, 'dragend', function() {  
        var center = map.getCenter();
        latitude.val(center.lat());
        longitude.val(center.lng());
        });  
    google.maps.event.addListener(map, 'zoom_changed', function() {  
        scale.val(map.getZoom());  
        }); 
  }

var infowindow;
function add_marker(lat, lng, title, body, map) {
	var length;
	length = body.length;
	if(length>10)
		body = body.substring(0,10);
	var contentString = '<h2>'+
	title+
	'</a></h2>'+
	'<div class="blog-post-tease">'+
	body+
	'</div>';
	var location = new google.maps.LatLng(lat, lng);
	var marker = new google.maps.Marker({
	      position: location,
	      map: map
	    });

	google.maps.event.addListener(marker, 'click', function() {
		if(infowindow)
	    	infowindow.close();
		infowindow = new google.maps.InfoWindow({
			content: contentString,
		});
	    infowindow.open(map,marker);
	    });
}

function show_marker(lat, lng, map) {
	var location = new google.maps.LatLng(lat, lng);
	var marker = new google.maps.Marker({
	      position: location,
	      map: map
	    });
}