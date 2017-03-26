$(function() {

	// 三角形付きlabelの表示切り替え制御
	$(".well-switch").on("click", function(){
		// 表示切り替え対象要素id取得
		var targetId = "#" + $(this).attr("for");
		// 対象要素の表示切り替え(表示、非表示)
		$(targetId).toggleClass('panel-clicked');
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
});

// APIパス設定
var apiBaseUrl = location.protocol + "//" + location.host + '/mvm/api/';
// var apiBaseUrl = location.protocol + "//" + location.host + '/app/mvm/api/';
var apiList = {
    commRegistInput: apiBaseUrl + '/comm/register/input.php',
    commError: apiBaseUrl + 'comm/register/errorlog',
    commUpdate: apiBaseUrl + 'comm/register/update'
};

// 各ページの表示件数
var eachPageNum = 30;

/**
 * カレンダーの文字列よりリクエスト用のフォーマットへの変換
 */
var getMonth = function(str) {
    if (str == undefined) { 
        return ''; 
    } else {
        return str.replace('/', '');
    }
};

/**
 * api呼び出し用ajaxラッピング関数
 */
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

/**
 * ファイルアップロード用
 */
var ajaxUpload = function(option) {
    $.ajax({
        type: 'POST',
        url: option.url,
        data: option.data,
        dataType: 'json',
        cache: false,
        processData: false,
        contentType: false,
        success: option.success,
        error: function(){
            if (option.error == undefined) {
                alert("システムエラー発生しました。");
            } else {
                return option.error;
            }
        }
    });   
}

var getYenText = function(num) {

};