

if(localStorage){
	$('#notes').val(localStorage.getItem("notes"));
	$('#background-1-1-attainment').val(localStorage.getItem("attainment"));
}


$('.worksheet-nav').on("click", function(event){
	if(!$(this).hasClass("selected")){
		$('.worksheet-nav').removeClass("selected");
		$(this).addClass("selected");
	}
});




$('#button').on("click", function(){
	localStorage.clear();
	localStorage.setItem("notes", $('#notes').val());
	localStorage.setItem("attainment", $('#background-1-1-attainment').val());
});

