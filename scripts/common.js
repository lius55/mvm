window.onload = function() {

	// 三角形付きlabelの表示切り替え制御
	$(".label-switch").on("click", function(){
		// 表示切り替え対象要素id取得
		var target_id = "#" + $(this).prop("for");
		// 対象要素の表示切り替え(表示、非表示)
		$(target_id).toggleClass('panel-clicked');
		// 三角形の表示切り替え(三角形の角度変更)
		$(this).parent().toggleClass('clicked');
	});
}