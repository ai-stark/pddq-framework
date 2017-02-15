
// Adds selected arrow to menu selection on worksheet
$('.worksheet-nav').on("click", function(event){
	if(!$(this).hasClass("selected")){
		$('.worksheet-nav').removeClass("selected");
		$(this).addClass("selected");
	}
});


// Creates a fixed menu when scrolling down on the worksheet page
var $window = $(window),
	$stickyMenu = $('#sticky-menu');
	menuToTop = $stickyMenu.offset().top;

$window.scroll(function(){
	$stickyMenu.toggleClass('sticky', $window.scrollTop() > menuToTop);
});

$(function(){
	leftContentWidth = $('.left-content').css('width');
	$('#sticky-menu').css('width', leftContentWidth);
});






var attainment_fields = $('.attainment-fields');
//var evidence_fields = $('.evidence-fields');
var worksheet_fields = $('.worksheet-fields');

var official_score_fields = $('.official-score');


//console.log(official_score_fields);




//var numOfFields = $('.attainment-fields').length


$( document ).ready(function() {


	if(localStorage.length > 0){
		for(var index=0; index < localStorage.length; index++){
			$('#' + localStorage.key(index)).val(localStorage.getItem(localStorage.key(index)));


			//console.log(localStorage.key(index));
		}
	}
});




$(worksheet_fields).on('change', function(){

	localStorage.setItem((this).id, ($(this).val()));

});

$(official_score_fields).on('change', function(){

	localStorage.setItem((this).id, ($(this).val()));

});

function init(){
	$(worksheet_fields).on('change', function(){

		localStorage.setItem((this).id, ($(this).val()));

	});
}







/*$('.calc').on('click', function(e){
	e.preventDefault();
	var foundational = [];
	var building = [];
	var advanced = [];

	var attainGroups = ($("."+$(this).data("store")+"-process-area select"));

	for(index=0; index<attainGroups.length; index++){
		if($(attainGroups[index]).data('tier') == "1"){
			foundational.push((attainGroups[index]));
		}else if($(attainGroups[index]).data('tier') == "2"){
			building.push((attainGroups[index]));
		}else{
			advanced.push((attainGroups[index]));
		}	
	}




	console.log(foundational);
	console.log(building);
	console.log(advanced);
	

	//console.log($(this).data("store"));

});*/



/*$(evidence_fields).on('change', function(){

	localStorage.setItem((this).id, ($(this).val()));

});


$(notes_fields).on('change', function(){

	localStorage.setItem((this).id, ($(this).val()));

});*/





//console.log(evidence_fields);
//console.log(evidence_fields.length);


$('#clear').on("click", function(){
	localStorage.clear();
	location.reload();
});



var g = $('.groups');
//
//var g1 = $('.governance-management-process-area select');
for(var index=0; index < g.length; index++){
	//console.log($(g1[index]).data('tier'));
	//console.log(g[index]);
}



/*for(var index=0; index < attainment_fields.length; index++){

	console.log(attainment_fields[index]);
}*/

var processAreaGroups = $('.process-area-group');

for (var outside=0; outside < processAreaGroups.length; outside++){
	//console.log(processAreaGroups[outside].id);
}





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
		calculate_score("foundational", foundational, parent_class);
	}else if($(this).data("tier") == "2"){
		calculate_score("building", building, parent_class);
	}else if($(this).data("tier") == "3"){
		calculate_score("advanced", advanced, parent_class);
	}

	//calculate_score($(this).data('tier'), foundational, parent_class);
	if ($('#'+parent_class+'-foundational-official').val() == "1" && $('#'+parent_class+'-building-official').val() == "1" && $('#'+parent_class+'-advanced-official').val() == "1"){
		console.log("we are 1-1-1");
		calculate_score("building", building, parent_class);
		calculate_score("advanced", advanced, parent_class);
	}else if($('#'+parent_class+'-foundational-official').val() == "1" && $('#'+parent_class+'-building-official').val() == "1" && $('#'+parent_class+'-advanced-official').val() == "0"){
		console.log("we are 1-1-0");
		calculate_score("advanced", advanced, parent_class);
		//init();
	}else if($('#'+parent_class+'-foundational-official').val() == "1" && $('#'+parent_class+'-building-official').val() == "0" && $('#'+parent_class+'-advanced-official').val() == "0"){
		console.log("We are 1-0-0")
		calculate_score("advanced", advanced, parent_class);
		calculate_score("building", building, parent_class);
	}else if ($('#'+parent_class+'-foundational-official').val() == "1" && $('#'+parent_class+'-building-official').val() == "0"){
		console.log("we are 1-0");
		$('#'+parent_class+'-advanced-official').val("0");
		($('#'+parent_class+'-advanced-official').trigger("change"));
		//init();
	}else if($('#'+parent_class+'-foundational-official').val() == "0") {
		console.log("we are 0");
		$('#'+parent_class+'-building-official').val("0");
		$('#'+parent_class+'-advanced-official').val("0");
		//calculate_score("advanced", advanced, parent_class);
		//calculate_score("building", building, parent_class);
	}

	//console.log($('#'+parent_class+'-foundational-raw').val());

	var foundational_num = parseInt($('#'+parent_class+'-foundational-official').val());
	var building_num = parseInt($('#'+parent_class+'-building-official').val());
	var advanced_num = parseInt($('#'+parent_class+'-advanced-official').val());
	
	var process_area_score = foundational_num + building_num + advanced_num;
	$('#'+parent_class+'-total-score').val(process_area_score);
	$('#'+parent_class+'-total-score').trigger("change");


	//need to get total score on page refresh

	
	//console.log($(this).parent().parent());
	//console.log($(this).parent().parent());
});


function calculate_score(area, array_tier_group, parent_class){

		var weight = (100 / array_tier_group.length);

		var pass = false;

		for(var i=0; i<array_tier_group.length; i++){
			if(array_tier_group[i].value == "full"){
				pass = true;
			}else{
				pass = false;
				break;
			}
			
		}
		if(pass){
			($('#'+parent_class+'-'+ area +'-official').val("1"));
			($('#'+parent_class+'-'+ area +'-official').trigger("change"));
		}else{
			($('#'+parent_class+'-'+ area +'-official').val("0"));
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

}








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


