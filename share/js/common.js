String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

$(function() {

	// 三角形付きlabelの表示切り替え制御
	$(".container, .container-extend").on("click", ".well-switch", function(){
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
    commRegistInput: apiBaseUrl + 'comm/register/input',
    commError: apiBaseUrl + 'comm/register/errorlog',
    commUpdateSearch: apiBaseUrl + 'comm/update/search', // TODO 検索API呼び出し
    commUpdate: apiBaseUrl + 'comm/update/update',
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

/**
 * 入力チェック
 *
 * @return true:エラーあり、false:エラーなし
 */
var validate = function(target) {

    /**
     * エラー表示
     */
    var showError = function(target, text) {
        
        // TODO コメントを書く
        var targetDiv = $(target).parent().find(".error");
        if (targetDiv.length < 1) {
            targetDiv = $(target).parent().parent().find(".error");
        }
        $(targetDiv).text(text);

        if ($(target).prop("tagName") == "INPUT") {
            $(target).addClass("input-error");
        }

        // エラー表示解除
        $(target).on('change', function() {
            if ($(target).hasClass('input-error')) {
                $(target).removeClass('input-error');
            }
            // 
            if ($(targetDiv).hasClass('error')) {
                $(targetDiv).text('');
                $(targetDiv).removeClass('input-error');
            }
        });
        console.log("showError=" + $(target) +  ",text=" + text);
        return true;
    }
    /**
     * 必須チェック
     */
    var notNull = function(target) {
        var value = $(target).val();
        if (isNull(value)) {
            return showError(target, "必須項目"); 
        }
        return false;
    };
    /**
     * Regex式エラーチェック
     */
    var checkDateError =function(target, regex, errorMsg) {
        var value = $(target).val();
        if (isNull(value)) { return; }
        if (value.search(regex) < 0) {
            return showError(target, errorMsg);
        }
        return false;
    };
    /**
     * 英数字チェック
     */
    var ac = function(target) {
        var value = $(target).val();
        if (isNull(value)) { return false; }
        var maxLen = $(target).attr("max-len");
        if (value.search(/^[0-9A-Za-z]*$/) < 0) {
            return showError(target, "英数字で入力してください。");
        } else if(!isNull(maxLen) && value.length > parseInt(maxLen)) {
            return showError(target, maxLen + "桁まで入力してください。");
        } 
        return false;
    };
    /**
     * 数字チェック
     */
    var num = function(target) {
        var value = $(target).val();
        if (isNull(value)) { return false; }
        value = value.replaceAll(",", "");
        var max = $(target).attr("max");
        var min = $(target).attr("min");
        if (value.search(/^\d*$/) < 0) {
            return showError(target, "数字を入力してください。");
        } else if (!isNull(max) && (parseInt(value) - parseInt(max) > 0)) {
            return showError(target, "最大" + max + "までの数字を入力してください。");
        } else if (!isNull(min) && (parseInt(value) - parseInt(min) < 0)) {
            return showError(target, min + "以上の数字を入力してください。");
        }
        return false;
    };

    var errorFlag = false;

    $.each(target, function(index, element){
        console.log("value=" + $(this).val() + ",validate=" + $(this).attr("validate"));
        // 非表示の場合チェックしない
        if (!$(this).is(":visible")) { return true; }
        var str = $(this).attr("validate");
        var value = $(this).val();
        $.each(str.split(","), function(i, e){
            switch (e) {
                case 'mst':
                    errorFlag = notNull(element);
                    break;
                case 'ym':
                    errorFlag = checkDateError(element, /^\d{4}\/\d{2}$/, "YYYY/MMのフォーマットで入力してください。");
                    break;
                case 'md':
                    errorFlag = checkDateError(element, /^\d{2}\/\d{2}$/, "MM/DDのフォーマットで入力してください。");
                    break;
                case 'ymd':
                    errorFlag = checkDateError(element, /^\d{4}\/\d{2}\/\d{2}$/, "YYYY/MM/DDのフォーマットで入力してください。");
                    break;
                case 'ac':
                    errorFlag = ac(element);
                    break;
                case 'num':
                    errorFlag = num(element);
                    break;
            }
            // eachループbreak判定
            if (errorFlag) { return false; }
        });
        // eachループbreak判定
        if (errorFlag) { return false; }
    });

    if (errorFlag) {
        alert("入力エラー発生しました。ご確認ください。");
    }
    return errorFlag;
}

/**
 * APIより受け取ったデータを画面に表示する際、
 * 表示フォーマットの整形を行う
 * tagにformatを記載すれば、それに沿って、
 * フォマット処理を行う
 * 例： 
 * <label format='ym'>201601</label> 
 * ↓
 * <label format='ym'>2016/01</label> 
 *　
 * フォーマット区分：
 * ymd:  年月日(20170101)
 * ym:   年月(201701)
 * md:   月日(0102)
 * num:  数字(min: 最小値,max: 最大値)
 * g:    英数字(len: 最大桁数)
 * 
 * @param target 対象となる要素リスト
 */
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
    var formatYmd = function(target) {
        var value = getValue(target);
        if (isNull(value) && value.length != 8) { return; }
        var formatted = 
            value.substr(0, 4) + "/" + value.substr(4,2) + "/" + value.substr(6,2);
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
            case 'ymd': 
                formatYmd(element);
                break;
            case 'num':
                formatNum(element);
                break;
        }
    });
}

/**
 * Null判定
 */
var isNull = function(obj) {
    if (obj == undefined || (obj != undefined && obj.length < 1)) {
        return true;
    } else {
        return false;
    }
}

/**
 * datePicker初期化処理
 */
var initDatePicker = function(target) {

    $.each(target, function(index, element) {

        if(isNull($(this).attr("format"))) { return; }

        var format = '';
        var minViewMode = '';
        switch ($(this).attr("format")) {
            case 'ym':
                format = 'yyyy/mm';
                minViewMode = 'months';
                break;
            case 'ymd':
                format = 'yyyy/mm/dd';
                minViewMode = 'days';
                break;
            case 'md':
                format = 'mm/dd';
                minViewMode = 'days';
                break;
        }

        $(this).datepicker({
            format: format,             // 日付フォマット
            autoclose: true,            // 自動閉じる
            minViewMode: minViewMode,   // デフォルトを月選択に設定
            language: 'ja'              // カレンダー日本語化のため
        });
    });
}