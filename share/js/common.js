window.onload = function() {

	// 三角形付きlabelの表示切り替え制御
	$(".well-switch").on("click", function(){
		// 表示切り替え対象要素id取得
		var target_id = "#" + $(this).attr("for");
		// 対象要素の表示切り替え(表示、非表示)
		$(target_id).toggleClass('panel-clicked');
		// 三角形の表示切り替え(三角形の角度変更)
		$(this).toggleClass('clicked');
	});

	// datepicker設定
    $('.date').datepicker({
    	format: 'yyyy/mm',     // 日付フォマット
        autoclose: true,       // 自動閉じる
    	minViewMode: 'months', // デフォルトを月選択に設定
    	language: 'ja'         // カレンダー日本語化のため
    });
    // デフォルトで当月表示する
    $('.date').datepicker('setDate', new Date());
};

// api呼び出し用ajaxラッピング関数
var ajax = function(option) {
	$.ajax({
		type: 'POST',
		url: option.url,
    	data: option.data,
    	cache: false,
    	success: option.success,
    	error: function(){
    		if (option.error == undefined) {
    			alert("システムエラー発生しました。");
    		} else {
    			return option.error;
    		}
    	}
	});
};