
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


//var numOfFields = $('.attainment-fields').length


$( document ).ready(function() {

	if(localStorage.length > 0){
		for(var index=0; index < localStorage.length; index++){
			$('#' + localStorage.key(index)).val(localStorage.getItem(localStorage.key(index)));
			console.log(localStorage.key(index));
		}
	}
});




$(worksheet_fields).on('change', function(){

	localStorage.setItem((this).id, ($(this).val()));

});


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
});
