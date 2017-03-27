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
// var apiBaseUrl = "http://ec2-52-68-169-84.ap-northeast-1.compute.amazonaws.com:10001/";
var apiList = {
    commRegistInput: apiBaseUrl + 'comm/register/input.php',
    commError: apiBaseUrl + 'comm/register/errorlog',
    commUpdateSearch: apiBaseUrl + 'comm/update/search', // TODO 検索API呼び出し
    commUpdate: apiBaseUrl + 'comm/register/update',
    commMonthly: apiBaseUrl + 'comm/register/monthly',
    billRegister: apiBaseUrl + 'billing/register/create',
    billError: apiBaseUrl + 'billing/register/errorlog',
    billUpdateSearch: apiBaseUrl + 'billing/update/search',
    billUpdateShow: apiBaseUrl + 'billing/update/show',
    billUpdate: apiBaseUrl + 'billing/update/update',
    billSettlement: apiBaseUrl + 'billing/download/settlement',
    billBilling: apiBaseUrl + 'billing/download/billing',
    billUpload: apiBaseUrl + 'billing/upload/result',
    billPayment: apiBaseUrl + 'billing/paymentclearance'
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
    	error: function(xhr){
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

/**
 * 日付文字列の「/」削除
 * 2016/01⇒201601
 */
var formatDate = function(str) {
    return str.replace("/", "");
};

/**
 * 年月文字列を「/」追加で表示
 * 201601⇒2016/01
 */
var showDateMonth = function(str) {
    return str.substr(0,4) + "/" + str.substr(4,2);
};

/**
 * 月日文字列を「/」追加で表示
 * 0102⇒01/02
 */
var showMonthDay = function(str) {
    return str.substr(0,2) + "/" + str.substr(2,2);
}

var formatNumber = function(number) {

}

var validate = function(target) {

    var showError = function(target, text) {
        var targetDiv = $(target).parent().find(".error");
        if (targetDiv.length < 1) {
            targetDiv = $(target).parent().parent().find(".error");
        }
        $(targetDiv).text(text);
    }

    /**
     * 必須チェック
     */
    var notNull = function(target) {
        var value = $(target).val();
        if (value == undefined || (value != undefined && value.length < 1)) {
            showError(target, "必須項目")
            return false; 
        }
    };

    /**
     * 年月チェック
     */
    var ym = function(target) {
        var value = $(target).val();
        if (value.search(/^\d{4}\/\d{2}/) < 0) {
            showError(target, "YYYY/MMのフォーマットで入力してください。");
            return false;
        }
    }

    /**
     * 月日チェック
     */
    var md = function(target) {
        var value = $(target).val();
        if (value.search(/^\d{2}\/\d{2}/) < 0) {
            showError(target, "MM/DDのフォーマットで入力してください。");
            return false;
        }
    }

    $.each(target, function(index, element){
        var str = $(this).attr("validate");
        var value = $(this).val();
        console.log("validate=" + str);
        console.log("value=" + value);
        $.each(str.split(","), function(i, e){
            switch (e) {
                case 'mst':
                    return notNull(element);
                case 'ym':
                    return ym(element);
                case 'md':
                    return md(element);
            }
        });
    });
}

var dataFormat = function(target) {

    var getValue = function(target) {
        if($(target).prop("tagName") == "INPUT") {
            return $(target).val();
        } else {
            return $(target).text();
        }
    }

    var setValue = function(target, text) {
        if($(target).prop("tagName") == "INPUT") {
            return $(target).val(text);
        } else {
            return $(target).text(text);
        }
    }

    var formatYm = function(target) {
        var value = getValue(target);
        if (isNull(value) && value.length != 6) { return; }
        var formatted = value.substr(0, 4) + "/" + value.substr(4,2);
        setValue(target, formatted);
    }

    var formatMd = function(target) {
        var value = getValue(target);
        if (isNull(value) && value.length != 4) { return; }
        var formatted = value.substr(0, 2) + "/" + value.substr(2,2);
        setValue(target, formatted);
    }

    var formatNum = function(target) {
        var value = getValue(target);
        if (isNull(value)) { return; }

        var addComma = function(str) {
            if (str.length > 3) {
                return addComma(str.substr(0, str.length-3)) 
                    + "," + str.substr(str.length-3, 3);
            } else {
                return str;
            }
        }
        var formatted = addComma(value);
        setValue(target, formatted);
    }

    $.each(target, function(index, element){
        var format = $(this).attr("format");
        if (isNull(format)) { return; }
        switch (format) {
            case 'ym':
                formatYm(element);
                break;
            case 'md':
                formatMd(element);
                break;
            case 'num':
                formatNum(element);
                break;
        }
    });
}

var isNull = function(obj) {
    if (obj == undefined || (obj != undefined && obj.length < 1)) {
        return true;
    } else {
        return false;
    }
}