$(function(){
	$('#hidemenu').click(function () {
		var  src = $("#hidemenu").attr('src');
		if (src == './share/img/hidemenu.png') {
			$('.menu').css('width', '40px');
			$('.menu-list').css('display', 'none');
			$('#hidemenu').css('hidemenu');
			$('#hidemenu').attr('src', './share/img/select.png');
		}else{
			$('.menu').css('width', '270px');
			$('.menu-list').css('display', 'inline');
			$('#hidemenu').css('hidemenu');
			$('#hidemenu').attr('src', './share/img/hidemenu.png');
		}
	});
	$('.on-off').change(function(){
		var id = $(this).attr('id');
		if ($(this).is(':checked')) {
			$("label").addClass('off');
			$("label").removeClass('on');
			$('.on-off').prop('checked', false);
			$("label[for='"+ id + "']").addClass('on');
			$("label[for='"+ id + "']").removeClass('off');
			$(this).prop("checked",true);
		} else {
			$("label[for='"+ id + "']").addClass('off');
			$("label[for='"+ id + "']").removeClass('on');
		}
	});
	$('#main-frame').on('load', function(){
		var src = $('#main-frame').attr('src');
//		$('[href="' + src + '"]').parent('input');
		$('[href="' + src + '"]').addClass('on');
		$('[href="' + src + '"]').removeClass('off');
	});
	$('[target="main-frame"]').click(function () {
		$('[target="main-frame"]').parent('li').addClass('lioff');
		$('[target="main-frame"]').parent('li').addClass('lion');
		$('[target="main-frame"]').parent('li').removeClass('lion');
		$(this).parent('li').removeClass('lioff');
		$(this).parent('li').addClass('lion');
		var path = $(this).parent('li').parent('ul').prev().prev('label').text() + ' > ' + $(this).text();
		$('#subtitle').html(path);
	});
});



