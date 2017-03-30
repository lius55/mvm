$(function(){

	var currentIndex = 1;
	var currentSimNumber = $("#simNumber").val();
	var currentUseDateMonth = getParamValue($("#useDateMonth"));
	var tempDetailList;

	// クリアボタンイベント
	$("#clear").on('click', function(){
		$("#useDateMonth").val("");;
	});

	// 検索ボタンイベント
	$("#search").on('click', function(){

		// 入力チェック
		if(validate($("[validate]"))) { return; }
		currentSimNumber = $("#simNumber").val();
		currentUseDateMonth = getParamValue($("#useDateMonth"));
		getDetailList(currentSimNumber, currentUseDateMonth, currentIndex, showDetailList);
	});

	// ページ変更イベント
	$("#detailList").on('click', '.page-change', function(){
		pageNum = $(this).val();
		console.log("pageNum=" + pageNum);
		if (pageNum != undefined) {
			currentIndex = pageNum;
			getDetailList(currentSimNumber, currentUseDateMonth, currentIndex, showDetailList);
		}
	});

	// 照会更新ボタンイベント
	$("#detailList").on('click', '.btn-inquery-update', function(){
		var values = $(this).val();
		if (values == undefined) {
			return;
		}
		var simNumber = values.split(",")[0];
		var	useDateMonth = values.split(",")[1];
		console.log("simNumber=" + simNumber + ",useDateMonth=" + useDateMonth);
		var targetDetailInfo;
		$.each(tempDetailList.res, function(index, element) {
			if(element.simNumber == simNumber && element.useDateMonth == useDateMonth) {
				targetDetailInfo = element;
				return false;
			}
		});

		// 表示制御
		$("#detailListContainer").hide();
		$("#detailInfoContainer").show();
		$("#detailInfoContainer").empty();
		$.tmpl($("#detailInfoTemplate"), targetDetailInfo).appendTo("#detailInfoContainer");
		// カレンダー初期化
		initDatePicker($(".date"));
		dataFormat($("[format]"));
	});

	// キャンセルボタンイベント
	$("#detailInfoContainer").on('click', "#cancel", function(){
		// 表示制御
		$("#detailListContainer").show();
		$("#detailInfoContainer").hide();
	});

	// アップデートボタンイベント
	$("#detailInfoContainer").on('click', "#update", function(){
		// 入力チェック
		if(validate($("[validate]"))) { return; }

		// リクエストパラメターター情報取得
		var paramSimNumber = $("#selectedSimNumber").val();
		var paramUseDateMonth = $("#selectedUseDateMonth").val();
		var detailInfo = {
			simNumber: paramSimNumber,
			useDateMonth: paramUseDateMonth,
			billDateMonth: getParamValue($("diBillDateMonth")),
			billStatus: $("#diBillStatus").val(),
			dataUsage_byte: getParamValue($("#diDataUsageByte")),
			dataUsage_packet: getParamValue($("#diDataUsagePacket")),
			dataUsage_commFree: getParamValue($("#diDataUsageCommFree")),
			commRecordCount: getParamValue($("#diCommRecordCount")),
			commUsageSpanCom: getParamValue($("#diCommUsageSpanCom")),
			commUsageSpanOut: getParamValue($("#diCommUsageSpanOut")),
			commFreeTotal: getParamValue($("#diCommFreeTotal")),
			productCode: $("#diProductCode").val(),
			reserved1: $("#diReserved1").val(),
			reserved2: $("#diReserved2").val(),
		};

		var success = function() {
			alert("更新完了しました。");
		};
 
		ajax({
			url: apiList.commUpdate,
			data: detailInfo,
			success: success
		});
	});

	var getDetailList = function(simNumber, useDateMonth, index, success) {

		if(validate($("[validate]"))) { return; }

		var requestParam = {
			simNumber: simNumber,
			useDateMonth: useDateMonth,
			limit: eachPageNum,
			index: index
		};

		ajax({
			url: apiList.commUpdateSearch,
			data: requestParam,
			success: success
		});
	};

	var showDetailList = function(response) {
		response = $.parseJSON(response);
		response.index = parseInt(currentIndex);
		response.pagenum = Math.ceil(parseInt(response.recordCount)/eachPageNum);
		tempDetailList = response;
		$("#detailList").empty();
		$.tmpl($("#detailListTemplate"), response).appendTo("#detailList");
		dataFormat($("[format]"));
	};

	// ---------------
	//    初期処理
	// ---------------
	// getDetailList(currentSimNumber, currentUseDateMonth, currentIndex, showDetailList);
});