var designApp = {};
var q;


designApp.init = function() {


	$(".roomImg").on('click', function () {
		var q = $(this).find('img').attr('alt');
		$(".iSearch").hide();
			if (q=="kitchen") {
				$(".kitchenItems").show();
			} else if (q=="dining room") {
				$(".diningItems").show();
			} else if (q=="living room") {
				$(".livingItems").show();
			} else if (q=="bedroom") {
				$(".bedroomItems").show(); 
			} else if (q=="home office") {
				$(".officeItems").show();
			}
	});

$(".roomImg").hover(function(){sortRooms(1,$(this).find('img').attr('alt'))},
		function () { sortRooms(0,$(this).find('img').attr('alt'))});

	function sortRooms(status, roomToChange){
		if(status == 0){
			if(roomToChange == "kitchen"){
				$(".kitchenText").show();
			} else if(roomToChange == "dining room"){
				$(".diningText").show();
			} else if(roomToChange == "living room"){
				$(".livingText").show();
			} else if(roomToChange == "bedroom"){
				$(".bedroomText").show();
			} else if(roomToChange == "home office"){
				$(".officeText").show();
			}
			$("submit").show();
		} else if (status == 1) {
			if(roomToChange == "kitchen"){
				$(".kitchenText").hide();
			} else if(roomToChange == "dining room"){
				$(".diningText").hide();
			} else if(roomToChange == "living room"){
				$(".livingText").hide();
			} else if(roomToChange == "bedroom"){
				$(".bedroomText").hide();
			} else if(roomToChange == "home office"){
				$(".officeText").hide();
			}			
		}

	}


	$('.iSearch').on('submit',function(e) {
		// var q = $("input[name='radioName']:checked").val();
		var q = $(this).find('img').attr('alt');
		e.preventDefault();

	var checkboxes = $(".l:checked").map(function() {
		return this.value;}).get();
			for (var i = 0; i < checkboxes.length; i++) {
			var checker = checkboxes[i];
			// alert(q + " " + checker);
			var q = q + " " + checker;
			if (i == 0) {
				var q = q + " interior design";
			}

	}
		console.log(q);

		// console.log("search for the room " + q);
		designApp.getRoom(q);
	})
}

	


designApp.getRoom = function(q) {
	$.ajax({
		url : 'https://api.flickr.com/services/rest/?method=flickr.photos.search',
		dataType : 'jsonp',
		type : 'GET',
		jsonp: 'jsoncallback',
		data : {
			api_key : designApp.key,
			format : 'json',
			text : q,
			callback  : '?'
		},
		success: function(result) {
	      	// console.log(result);
	      	designApp.getImages(result);
		}
	})
} // end getRoom()


designApp.getImages = function(result) {
	// console.log(result);
		$('#images').html('');
		var pictures = result.photos.photo;
		for (var i = 0; i < pictures.length; i++){
			console.log(pictures[i]);
			var div = $('<div>').addClass('pictures');
			// var h2 = $('<h2>').text(pictures[i].title);

			var imgSrc = "https://farm"+pictures[i].farm+".staticflickr.com/"+pictures[i].server+"/"+pictures[i].id+"_"+pictures[i].secret+".jpg";

			var img = $("<img>").attr('src',imgSrc);

			div.append(img);
			$('#images').append(div);
		}
}

designApp.key = "9ffc680dbb093e647be2784acdb4eb56";

$(function() {
	designApp.init();
	$(".iSearch").hide();
});