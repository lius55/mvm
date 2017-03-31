String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

// -------------
//   初期化処理
// -------------
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

    // TODO
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
 * api呼び出し用ajaxラッピング関数
 */
var ajax = function(option) {
	$.ajax({
		type: 'POST',
		url: option.url,
    	data: JSON.stringify(option.data),
        // data: option.data,
        dataType: 'json',
        header: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
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

/*
 * validate区分：
 * mst:  必須入力
 * ym:   日付フォーマット(yyyy/mm)
 * ymd:  日付フォーマット(yyyy/mm/dd)
 * md:   日付フォーマット(mm/dd)
 * num:  数字(minとmaxも合わせてチェックする)
 * ac:   英数字(max-len合わせてチェックする)
 * msn:  電話番号(000-0000-0000)
 */
var validateKbn = {
    mst:    'mst',
    ym:     'ym',
    md:     'md',
    ymd:    'ymd',
    ac:     'ac',
    num:    'num',
    msn:    'msn' 
};

/**
 * 入力チェック
 * APIにrequestする際、パラメーターのフォーマットチェックを行う処理
 * tagにvalidateを記載すれば、それに従ってチェックを行います 
 * 例：
 * <input type="text" validate="mst,ymd" label="利用年月"/> 
 * label属性:
 * 「${label}を入力してください。」などのエラーメッセージ表示用
 * err-msg属性: 
 * エラー時の表示文言、設定された場合、表示する優先順位一覧高い 
 *
 * 
 * @param  チェック対象要素リスト
 * @return true:エラーあり、false:エラーなし
 */
var validate = function(target) {

    /**
     * エラー表示
     */
    var displayError = function(target, text) {
        
        // TODO コメントを書く
        var targetDiv = $(target).parent().find(".error");
        if (targetDiv.length < 1) {
            targetDiv = $(target).parent().parent().find(".error");
        }
        $(targetDiv).text(text);

        if ($(target).prop("tagName") == "INPUT") {
            $(target).addClass("input-error");
        }

        // 再度入力された際に、エラー表示解除
        $(target).on('change', function() {
            if ($(target).hasClass('input-error')) {
                $(target).removeClass('input-error');
            }
            if ($(targetDiv).hasClass('error')) {
                $(targetDiv).text('');
                $(targetDiv).removeClass('input-error');
            }
        });
        console.log("displayError=" + $(target) +  ",text=" + text);
        return true;
    }
    /**
     * 必須チェック
     */
    var notNull = function(target) {
        var value = $(target).val();
        if (isNull(value)) {
            var errorMsg = 
                $(target).attr("err-msg") ? $(target).attr("err-msg") : "必須項目";
            return displayError(target, errorMsg);
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
            return displayError(target, errorMsg);
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
            return displayError(target, $(target).attr("label") + "は英数字で入力してください。");
        } else if(!isNull(maxLen) && value.length > parseInt(maxLen)) {
            return displayError(target, $(target).attr("label") + "は" + maxLen + "桁まで入力してください。");
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
            return displayError(target, $(target).attr("label") + "は数字で入力してください。");
        } else if (!isNull(max) && (parseInt(value) - parseInt(max) > 0)) {
            return displayError(target, $(target).attr("label") + "は最大" + max + "までの数字を入力してください。");
        } else if (!isNull(min) && (parseInt(value) - parseInt(min) < 0)) {
            return displayError(target, $(target).attr("label") + "は" + min + "以上の数字を入力してください。");
        }
        return false;
    };
    /**
     * 電番チェック
     */
    var msn = function(target) {
        var value = $(target).val();
        if (isNull(value)) { return false; }
        // TODO
        return false;
    }

    var errorFlag = false;

    $.each(target, function(index, element){
        console.log("value=" + $(this).val() + ",validate=" + $(this).attr("validate"));
        // 非表示の場合チェックしない
        if (!$(this).is(":visible")) { return true; }
        var str = $(this).attr("validate");
        var value = $(this).val();
        $.each(str.split(","), function(i, e){
            switch (e) {
                case validateKbn.mst:
                    errorFlag = notNull(element);
                    break;
                case validateKbn.ym:
                    errorFlag = 
                        checkDateError(element, /^\d{4}\/\d{2}$/, $(element).attr("label") + "はYYYY/MMのフォーマットで入力してください。");
                    break;
                case validateKbn.md:
                    errorFlag = 
                        checkDateError(element, /^\d{2}\/\d{2}$/, $(element).attr("label") + "はMM/DDのフォーマットで入力してください。");
                    break;
                case validateKbn.ymd:
                    errorFlag = 
                        checkDateError(element, /^\d{4}\/\d{2}\/\d{2}$/, $(element).attr("label") + "はYYYY/MM/DDのフォーマットで入力してください。");
                    break;
                case validateKbn.ac:
                    errorFlag = ac(element);
                    break;
                case validateKbn.num:
                    errorFlag = num(element);
                    break;
                case validateKbn.msn:
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
};

/*
 * フォーマット区分：
 * ymd:  年月日(20170101)
 * ym:   年月(201701)
 * md:   月日(0102)
 * num:  数字(min: 最小値,max: 最大値)
 * ac:    英数字(len: 最大桁数)
 */
var formatKbn = {
    ym:     'ym',
    ymd:    'ymd',
    md:     'md',
    num:    'num',
    ac:     'ac',
    msn:    'msn' 
};

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
        if (isNull(value)) { return; }
        if (value.search(/^\d{6}$/) < 0) { return; }
        var formatted = value.substr(0, 4) + "/" + value.substr(4,2);
        setValue(target, formatted);
    }
    var formatMd = function(target) {
        var value = getValue(target);
        if (isNull(value)) { return; }
        if (value.search(/^\d{4}$/) < 0) { return; }
        var formatted = value.substr(0, 2) + "/" + value.substr(2,2);
        setValue(target, formatted);
    }
    var formatYmd = function(target) {
        var value = getValue(target);
        if (isNull(value)) { return; }
        if (value.search(/^\d{8}$/) < 0) { return; }
        var formatted = 
            value.substr(0, 4) + "/" + value.substr(4,2) + "/" + value.substr(6,2);
        setValue(target, formatted);
    }
    var formatDate = function(target, formatKbn) {
        // TODO リファクタリング予定
    }
    var formatNum = function(target) {
        var value = getValue(target);
        if (isNull(value)) { return; }
        // カンマ追加
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
    var formatMsn = function(target) {
        var value = getValue(target);
        if (isNull(value)) { return; }
        if (value.search(/^\d{11}$/) > -1) {
            var formatted = value.substr(0, 3) + '-' + value.substr(3, 4) + '-' + value.substr(7, 4);
            setValue(target, formatted);
        }
    }

    $.each(target, function(index, element){
        var format = $(this).attr("format");
        if (isNull(format)) { return; }
        switch (format) {
            case formatKbn.ym:
                formatYm(element);
                break;
            case formatKbn.md:
                formatMd(element);
                break;
            case formatKbn.ymd: 
                formatYmd(element);
                break;
            case formatKbn.num:
                formatNum(element);
                break;
            case formatKbn.msn:
                formatMsn(element);
                break;
        }
    });
};

/**
 * リクエストパラーメターの値取得
 * 
 * @param　target 対象要素
 * @return 整形後のパラメーター値
 */
var getParamValue = function(target) {
    if (isNull($(target))) { return; }
    var value = ($(target).prop("tagName") == "INPUT") ? $(target).val() : $(target).text();
    if (isNull(value)) { return ''; }
    var format = $(target).attr("format");
    if (!isNull(format)) {
        switch (format) {
            case formatKbn.ym:
            case formatKbn.ymd:
            case formatKbn.md:
                // 「/」削除
                value = value.replaceAll('/', '');
                break;
            case formatKbn.num:
                // 「,」削除
                value = value.replaceAll(',', '');
                break;
        }
    }
    return value;
};

/**
 * Null判定
 *
 * @return true: null,false: not null
 */
var isNull = function(obj) {
    if (obj == undefined || (obj != undefined && obj.length < 1)) {
        return true;
    } else {
        return false;
    }
};

/**
 * datePicker初期化処理
 * 対象要素リスト
 */
var initDatePicker = function(target) {

    $.each(target, function(index, element) {

        if(isNull($(this).attr("format"))) { return; }

        var format = '';
        var minViewMode = '';
        switch ($(this).attr("format")) {
            case formatKbn.ym:
                format = 'yyyy/mm';
                minViewMode = 'months';
                break;
            case formatKbn.ymd:
                format = 'yyyy/mm/dd';
                minViewMode = 'days';
                break;
            case formatKbn.md:
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
};

/**
 *
 */
var downloadCsvFile = function(data, fileName) {

    var downloadData = new Blob([data], {type: 'text/csv'});

    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(downloadData, fileName); // IE用
    } else {
        var downloadUrl  = (window.URL || window.webkitURL).createObjectURL(downloadData);
        var link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        link.click();
        (window.URL || window.webkitURL).revokeObjectURL(downloadUrl);
    }
};

/**
 *
 * @return true:エラーあり、false:エラーなし
 */
var validateResponse = function(response) {
    if (!isNull(response.response) && response.response != 'OK') {
        alert("システムエラーが発生しました。");
        return true;
    }
    return false;
};

var initFileInput = function(target) {

    $.each(target, function(index, element) {
        
        var fileInput = $("#" + $(this).attr("for"));
        var fileNameInput = $("#" + $(this).attr("display"));

        $(this).on('click', function() {
            $(fileInput).click();           
        });

        $(fileInput).change(function() {
            $(fileNameInput).val($(this).val());            
        });
    });
};