(function (window, undefined) {
    // Prepare our Variables
    var $ = window.jQuery,
        document = window.document;

    // Wait for Document
    $(function () {
        var $map = $('#2think-location'),
            point = new google.maps.LatLng(25.027159,121.52466),
            MY_MAPTYPE_ID = 'custom_style',
            MY_COLOURS = {
                white: '#ffffff',
                black: '#333333',
                dark: '#808080',
                mid: '#e4e4e4',
                light: '#E6E6E6',
                blue: '#E1EAEF'
            },
            featureOpts = [
            {
                stylers: [ 
                    { saturation: -100 },
                    { weight: 1 }]
            },
            {
                featureType: 'water',
                stylers: [
                    { color: MY_COLOURS.blue },
                    { weight: 0.1 }]
            },
            {
                elementType: 'labels',
                stylers: [
                  { visibility: 'off' }]
            },
            {
                featureType: 'administrative.locality',
                elementType: 'labels',
                stylers: [
                  { visibility: 'on' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels',
                stylers: [
                    { visibility: 'off' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text',
                stylers: [
                  { visibility: 'on' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.fill',
                stylers: [
                    { color: MY_COLOURS.white },
                    { weight: 5 }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [
                    { color: MY_COLOURS.mid },
                    { weight: 2 }]
            },
            {
                featureType: 'road.arterial',
                elementType: 'geometry.fill',
                stylers: [
                    { color: MY_COLOURS.white },
                    { weight: 4 }]
            },
            {
                featureType: 'road.arterial',
                elementType: 'geometry.stroke',
                stylers: [
                    { color: MY_COLOURS.mid },
                    { weight: 2, }]
            },
            {
                featureType: 'road.arterial',
                elementType: 'labels',
                stylers: [
                    { visibility: 'on' }]
            }],
            myMapOptions = {
                zoom: 15,
                center: point,
                mapTypeControl: false,
                mapTypeId: MY_MAPTYPE_ID,
                scrollwheel: false,
                panControl: false,
                zoomControl: false,
                streetViewControl: false
            },
            map = new google.maps.Map($map.get(0), myMapOptions),
            image = {
                url: 'images/marker.png',
                size: new google.maps.Size(80, 106),
                scaledSize: new google.maps.Size(40, 53),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(15, 50)
            },
            marker = new google.maps.Marker({
                draggable: false,
                icon: image,
                map: map,
                position: point
            }),
            customMapType = new google.maps.StyledMapType(featureOpts);

        map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
        google.maps.event.addListener(marker, 'click', function () {
            window.open('https://goo.gl/maps/wpOF5', '_blank');
        });

        $(window).on('resized', function () {
            map.setCenter(point);
        });

    }); // end onDomLoad

})(window); // end closure