
// Adds selected arrow to menu selection on worksheet
$('.worksheet-nav').on("click", function(event){
	if(!$(this).hasClass("selected")){
		$('.worksheet-nav').removeClass("selected");
		$(this).addClass("selected");
	}
});


// Creates a fixed menu when scrolling down on the worksheet page
$(function(){
	if($('.has-fixed-menu').length > 0){

		var $window = $(window);
		var	$stickyMenu = $('#sticky-menu');
		var	menuToTop = $stickyMenu.offset().top;

		$window.scroll(function(){
			$stickyMenu.toggleClass('sticky', $window.scrollTop() > menuToTop);
		});

		var leftContentWidth = $('.left-content').css('width');
		$('#sticky-menu').css('width', leftContentWidth);

	}
});


var attainment_fields = $('.attainment-fields');

var worksheet_fields = $('.worksheet-fields');

var official_score_fields = $('.official-score');

var text_fields = $('.text-fields');


$( document ).ready(function() {


	if(localStorage.length > 0){
		for(var index=0; index < localStorage.length; index++){
			$('#' + localStorage.key(index)).val(localStorage.getItem(localStorage.key(index)));

			if(localStorage.key(index).match(/score$/)){
				$('#'+localStorage.key(index)+"-summary").text(localStorage.getItem(localStorage.key(index)));
			}
		}
	}
});



$(attainment_fields).on('change', function(){

	localStorage.setItem((this).id, ($(this).val()));

});


$(text_fields).on('keyup', function(){

	localStorage.setItem((this).id, ($(this).val()));

});



$(official_score_fields).on('change', function(){

	localStorage.setItem((this).id, ($(this).val()));

});



$('#clear').on("click", function(e){
	e.preventDefault();
	localStorage.clear();
	location.reload();
});


$(attainment_fields).on('change', function(){
	var parent_group = $(this).parent().parent();
	var this_attain_fields = parent_group.find('select');
	var parent_class = (parent_group).attr('class');
	var foundational = [];
	var building = [];
	var advanced = [];

	for(index=0; index<this_attain_fields.length; index++){
		if($(this_attain_fields[index]).data('tier') == "1"){
			foundational.push((this_attain_fields[index]));
		}else if($(this_attain_fields[index]).data('tier') == "2"){
			building.push((this_attain_fields[index]));
		}else{
			advanced.push((this_attain_fields[index]));
		}	
	}

	if($(this).data("tier") == "1"){
		calculate_official_score("foundational", foundational, parent_class);
	}else if($(this).data("tier") == "2"){
		calculate_official_score("building", building, parent_class);
	}else if($(this).data("tier") == "3"){
		calculate_official_score("advanced", advanced, parent_class);
	}



	if ($('#'+parent_class+'-foundational-official').val() == "100%" && $('#'+parent_class+'-building-official').val() == "100%" && $('#'+parent_class+'-advanced-official').val() == "100%"){
		calculate_official_score("building", building, parent_class);
		calculate_official_score("advanced", advanced, parent_class);
	}else if ($('#'+parent_class+'-foundational-official').val() == "100%" && $('#'+parent_class+'-building-official').val() != "100%"){
		calculate_official_score("advanced", advanced, parent_class);
	}else if ($('#'+parent_class+'-foundational-official').val() == "100%" && $('#'+parent_class+'-building-official').val() == "100%"){
		calculate_official_score("advanced", advanced, parent_class);
	}
	else if($('#'+parent_class+'-foundational-official').val() == "0%") {
	}


	var foundational_num = parseInt($('#'+parent_class+'-foundational-official').val());
	var building_num = parseInt($('#'+parent_class+'-building-official').val());
	var advanced_num = parseInt($('#'+parent_class+'-advanced-official').val());
	var process_area_score = 0;

	if(foundational_num != 100){
		$('#'+parent_class+'-total-score').val('0%');
		$('#'+parent_class+'-total-score').trigger("change");
	}else if(foundational_num > 0 && building_num == 0){
		process_area_score = foundational_num;
		$('#'+parent_class+'-total-score').val(process_area_score/100);
		$('#'+parent_class+'-total-score').trigger("change");		
	}else if(foundational_num == 100 && building_num < 100){
		process_area_score = foundational_num + building_num;
		$('#'+parent_class+'-total-score').val(process_area_score/100);
		$('#'+parent_class+'-total-score').trigger("change");		
	}else{
		process_area_score = foundational_num + building_num + advanced_num;
		$('#'+parent_class+'-total-score').val(process_area_score/100);
		$('#'+parent_class+'-total-score').trigger("change");		
	}

});



function calculate_raw_score(array_tier_group){
	//Raw Level Score = Sum of Score Value x (1/Number of Questions within that Level)
	var weight = (100 / array_tier_group.length);

}


function calculate_official_score(area, array_tier_group, parent_class){

		var weight = (100 / array_tier_group.length);
		var partial = weight/2;
		var running = 0;

		for(var i=0; i<array_tier_group.length; i++){

			if(array_tier_group[i].value == "full"){
				running = running + (weight * 1);
			}else if(array_tier_group[i].value == "partial"){
				running = running + (partial * 1);
			}else{

			}	
		}

		($('#'+parent_class+'-'+ area +'-official').val((Math.round(running)) + '%'));
		($('#'+parent_class+'-'+ area +'-official').trigger("change"));

}
	
