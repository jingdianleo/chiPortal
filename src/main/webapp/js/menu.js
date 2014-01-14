$(function() {
	$(" #nav ul ").css( {
		display : "none"
	}); // Opera Fix
	$(" #nav li").hover(function() {
		$(this).find('ul:first').css( {
			visibility : "visible",
			display : "none"
		}).show(300);
	}, function() {
		$(this).find('ul:first').css( {
			visibility : "hidden"
		});
	});
	//for text's color
	$('#nav li ul li').hover(
		function(){
			$(this).css({
				background:'#e8e8e8'
			}).find('a:first').css({
				color:'#c90000'
			}); 
		},
		function(){ 
			$(this).css({
				background:'#fefefe'
			}).find('a:first').css({
				color:'#454545'
			}); 
		}
	);
	//for action
	$('#nav li').each(function(){
		$(this).css("cursor","pointer")
		if($(this).attr('action') && $(this).attr('action')!=""){
			$(this).click(function(){
				doAction($(this).attr('action'));
			});
		}
	});
});
 
 