
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
var evidence_fields = $('.evidence-fields');
var notes_fields = $('.notes-fields');
var numOfFields = $('.attainment-fields').length


$( document ).ready(function() {

	if(localStorage.length > 0){
	    for(var index=0; index < numOfFields; index++){

			$('#'+ attainment_fields[index].id).val(localStorage.getItem('attainment' + index));
			$('#'+ evidence_fields[index].id).val(localStorage.getItem('evidence' + index));
			$('#'+ notes_fields[index].id).val(localStorage.getItem('notes' + index));
		}
	}

});




$(attainment_fields).on('change', function(){

	for(var index=0; index < attainment_fields.length; index++){
		//console.log(attainment_fields[index].id);
		localStorage.setItem(('attainment' + index), $('#'+ attainment_fields[index].id).val());
		$('#'+ attainment_fields[index].id).val(localStorage.getItem('attainment' + index));
		//console.log("triggered");
	}

});


$(evidence_fields).on('change', function(){

	for(var index=0; index < evidence_fields.length; index++){
		localStorage.setItem(('evidence' + index), $('#' + evidence_fields[index].id).val());
		$('#'+ evidence_fields[index].id).val(localStorage.getItem('evidence' + index));
		//console.log("triggered");
	}
});


$(notes_fields).on('change', function(){

	for(var index=0; index < notes_fields.length; index++){
		localStorage.setItem(('notes' + index), $('#' + notes_fields[index].id).val());
		$('#'+ notes_fields[index].id).val(localStorage.getItem('notes' + index));
		//console.log("triggered");
	}
});




//console.log(evidence_fields);
//console.log(evidence_fields.length);


$('#clear').on("click", function(){
	localStorage.clear();
});
