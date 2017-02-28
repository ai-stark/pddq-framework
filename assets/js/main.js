
// Adds selected arrow to menu selection on worksheet
$('.worksheet-nav').on("click", function(event){
	if(!$(this).hasClass("selected")){
		$('.worksheet-nav').removeClass("selected");
		$(this).addClass("selected");
	}
});

/*var process_area_totals = $('.official-score-total');
for(var index=0; index < process_area_totals.length; index++){
	//console.log(process_area_totals[index].id);
	$('#'+process_area_totals[index].id+"-summary").text("1");
	console.log(localStorage.getItem(process_area_totals[index].id));
}*/





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




//console.log(process_area_totals);

//console.log($('#dg-gm').text('0'));



var attainment_fields = $('.attainment-fields');
//var evidence_fields = $('.evidence-fields');
var worksheet_fields = $('.worksheet-fields');

var official_score_fields = $('.official-score');

var text_fields = $('.text-fields');



//console.log(official_score_fields);
/*var official_score_total = $('.official-score-total');
for(var i=0; i<official_score_total.length; i++){
	console.log(official_score_total[i].id);
}*/



//var numOfFields = $('.attainment-fields').length


$( document ).ready(function() {


	if(localStorage.length > 0){
		for(var index=0; index < localStorage.length; index++){
			$('#' + localStorage.key(index)).val(localStorage.getItem(localStorage.key(index)));

			if(localStorage.key(index).match(/score$/)){
				$('#'+localStorage.key(index)+"-summary").text(localStorage.getItem(localStorage.key(index)));
				//console.log(localStorage.getItem(localStorage.key(index)));
			}

			//console.log(localStorage.key(index));
		}
	}
});



/*
var query_str = "^"
var results = findLocalItems('');
 console.log(results);

// returns an array of localStorage items in key/value pairs based on a query parameter
// returns all localStorage items if query isn't specified
// query can be a string or a RegExp object

function findLocalItems (query) {
  var i, results = [];
  for (i in localStorage) {
    if (localStorage.hasOwnProperty(i)) {
      if (i.match(query) || (!query && typeof i === 'string')) {
        value = JSON.parse(localStorage.getItem(i));
        results.push({key:i,val:value});
      }
    }
  }

  return results;
}
*/



$(attainment_fields).on('change', function(){

	localStorage.setItem((this).id, ($(this).val()));

});


$(text_fields).on('keyup', function(){

	localStorage.setItem((this).id, ($(this).val()));

});



$(official_score_fields).on('change', function(){

	localStorage.setItem((this).id, ($(this).val()));

});





/*function init(){
	$(worksheet_fields).on('change', function(){

		localStorage.setItem((this).id, ($(this).val()));

	});
}*/




$('#clear').on("click", function(e){
	e.preventDefault();
	localStorage.clear();
	location.reload();
});



//var g = $('.groups');
//
//var g1 = $('.governance-management-process-area select');
//for(var index=0; index < g.length; index++){
	//console.log($(g1[index]).data('tier'));
	//console.log(g[index]);
//}

/*for(var index=0; index < attainment_fields.length; index++){

	console.log(attainment_fields[index]);
}*/

/*var processAreaGroups = $('.process-area-group');

for (var outside=0; outside < processAreaGroups.length; outside++){
	//console.log(processAreaGroups[outside].id);
}
*/




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
		console.log("we are 1-1-1");
		calculate_official_score("building", building, parent_class);
		calculate_official_score("advanced", advanced, parent_class);
	}else if ($('#'+parent_class+'-foundational-official').val() == "100%" && $('#'+parent_class+'-building-official').val() != "100%"){
		console.log("we are 1-0-1");
		//$('#'+parent_class+'-building-official').val("0%");
		//($('#'+parent_class+'-building-official').trigger("change"));
		calculate_official_score("advanced", advanced, parent_class);
		//$('#'+parent_class+'-advanced-official').val("0%");
		//($('#'+parent_class+'-advanced-official').trigger("change"));
	}else if ($('#'+parent_class+'-foundational-official').val() == "100%" && $('#'+parent_class+'-building-official').val() == "100%"){
		console.log("we are 1-1");
		calculate_official_score("advanced", advanced, parent_class);
	}

	else if($('#'+parent_class+'-foundational-official').val() == "0%") {
		console.log("we are 0");
		//$('#'+parent_class+'-building-official').val("0%");
		//$('#'+parent_class+'-advanced-official').val("0%");
	}




/*
	//calculate_score($(this).data('tier'), foundational, parent_class);
	if ($('#'+parent_class+'-foundational-official').val() == "100%" && $('#'+parent_class+'-building-official').val() == "100%" && $('#'+parent_class+'-advanced-official').val() == "100%"){
		console.log("we are 1-1-1");
		calculate_official_score("building", building, parent_class);
		calculate_official_score("advanced", advanced, parent_class);
	}else if($('#'+parent_class+'-foundational-official').val() == "100%" && $('#'+parent_class+'-building-official').val() == "100%" && $('#'+parent_class+'-advanced-official').val() == "0%"){
		console.log("we are 1-1-0");
		calculate_official_score("advanced", advanced, parent_class);
		//init();
	}else if($('#'+parent_class+'-foundational-official').val() == "100%" && $('#'+parent_class+'-building-official').val() == "0%" && $('#'+parent_class+'-advanced-official').val() == "0%"){
		console.log("We are 1-0-0")
		calculate_official_score("advanced", advanced, parent_class);
		calculate_official_score("building", building, parent_class);
	}else if ($('#'+parent_class+'-foundational-official').val() == "100%" && $('#'+parent_class+'-building-official').val() == "0%"){
		console.log("we are 1-0");
		$('#'+parent_class+'-advanced-official').val("0%");
		($('#'+parent_class+'-advanced-official').trigger("change"));
		//init();
	}else if($('#'+parent_class+'-foundational-official').val() == "0%") {
		console.log("we are 0");
		$('#'+parent_class+'-building-official').val("0%");
		$('#'+parent_class+'-advanced-official').val("0%");
	}

*/

	//console.log($('#'+parent_class+'-foundational-raw').val());

	var foundational_num = parseInt($('#'+parent_class+'-foundational-official').val());
	var building_num = parseInt($('#'+parent_class+'-building-official').val());
	var advanced_num = parseInt($('#'+parent_class+'-advanced-official').val());
	var process_area_score = 0;

	console.log(foundational_num);
	console.log(building_num);
	console.log(advanced_num);


	if(foundational_num != 100){
		console.log("1");
		$('#'+parent_class+'-total-score').val('0%');
		$('#'+parent_class+'-total-score').trigger("change");
	}else if(foundational_num > 0 && building_num == 0){
		console.log("2");
		process_area_score = foundational_num;
		$('#'+parent_class+'-total-score').val(process_area_score/100);
		$('#'+parent_class+'-total-score').trigger("change");		
	}else if(foundational_num == 100 && building_num < 100){
		console.log("3");
		process_area_score = foundational_num + building_num;
		$('#'+parent_class+'-total-score').val(process_area_score/100);
		$('#'+parent_class+'-total-score').trigger("change");		
	}else{
		console.log("4");
		process_area_score = foundational_num + building_num + advanced_num;
		$('#'+parent_class+'-total-score').val(process_area_score/100);
		$('#'+parent_class+'-total-score').trigger("change");		
	}

	
	//var process_area_score = foundational_num + building_num + advanced_num;
	//$('#'+parent_class+'-total-score').val(process_area_score/100);
	//$('#'+parent_class+'-total-score').trigger("change");


	//need to get total score on page refresh

	
	//console.log($(this).parent().parent());
	//console.log($(this).parent().parent());
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
	
	

/*	if(tier_num == "1"){
		var weight = (100 / array_tier_group.length);
		var pass = false;
		for(var i=0; i<array_tier_group.length; i++){
			if(array_tier_group[i].value == "full"){
				pass = true;
			}else{
				pass = false;
			}
		}
		if(pass){
			($('#'+parent_class+'-foundational-raw').val("1"));
			($('#'+parent_class+'-foundational-raw').trigger("change"));
		}else{
			($('#'+parent_class+'-foundational-raw').val("0"));
			($('#'+parent_class+'-foundational-raw').trigger("change"));
		}
	}*/










//var value = parseInt($('#governance-management-foundational-raw').text());
//value = value + 1;
//$('#governance-management-foundational-raw').text(value);
//console.log(typeof(value));




/***********************************
		TIER HELP BUTTONS
	RIGHT CONTENT INCLUDE FILE
************************************/

// $('.tier-help-group').on('click', function(){
// 	$(this).css('display', 'block');
// });


