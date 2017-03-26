$(function(){

	var currentIndex = 1;
	var currentSimNumber = $("#simNumber").val();
	var currentUseDateMonth = getMonth($("#useDateMonth").val());
	var tempDetailList;

	// クリアボタンイベント
	$("#clear").on('click', function(){
		$("#useDateMonth").val("");;
	});

	// 検索ボタンイベント
	$("#search").on('click', function(){
		currentSimNumber = $("#simNumber").val();
		currentUseDateMonth = getMonth($("#useDateMonth").val());
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
	$("#detailList").on('click', '.btn-update', function(){
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
		// TODO カレンダー初期化
		$("#diBillDateMonth").datepicker({
			format: 'yyyy/mm',     // 日付フォマット
	        autoclose: true,       // 自動閉じる
	    	minViewMode: 'months', // デフォルトを月選択に設定
	    	language: 'ja'         // カレンダー日本語化のため
		});
	});

	// キャンセルボタンイベント
	$("#detailInfoContainer").on('click', "#cancel", function(){
		// 表示制御
		$("#detailListContainer").show();
		$("#detailInfoContainer").hide();
	});

	// アップデートボタンイベント
	$("#detailInfoContainer").on('click', "#update", function(){

		var paramSimNumber = $("#selectedSimNumber").val();
		var paramUseDateMonth = $("#selectedUseDateMonth").val();
	
		// TODO データフォーマットの変換
		var detailInfo = {
			simNumber: paramSimNumber,
			useDateMonth: paramUseDateMonth,
			billDateMonth: $("diBillDateMonth").val(),
			billStatus: $("#diBillStatus").val(),
			dataUsage_byte: $("#diDataUsageByte").val(),
			dataUsage_packet: $("#diDataUsagePacket").val(),
			dataUsage_commFree: $("#diDataUsageCommFree").val(),
			commRecordCount: $("#diCommRecordCount").val(),
			commUsageSpanCom: $("#diCommUsageSpanCom").val(),
			commUsageSpanOut: $("#diCommUsageSpanOut").val(),
			commFreeTotal: $("#diCommFreeTotal").val(),
			productCode: $("#diProductCode").val(),
			reserved1: $("#diReserved1").val(),
			reserved2: $("#diReserved2").val(),
		};
	});

	var getDetailList = function(simNumber, useDateMonth, index, success) {

		// TODO 必須チェック
		var requestParam = {
			simNumber: simNumber,
			useDateMonth: useDateMonth,
			limit: eachPageNum,
			index: index
		};

		ajax({
			url: apiList.commUpdate,
			data: requestParam,
			success: success
		});
	};

	var showDetailList = function(response) {
		var response = $.parseJSON(response);
		response.index = parseInt(currentIndex);
		response.pagenum = Math.ceil(parseInt(response.recordCount)/eachPageNum);
		tempDetailList = response;
		$("#detailList").empty();
		$.tmpl($("#detailListTemplate"), response).appendTo("#detailList");
	};

	// ---------------
	//    初期処理
	// ---------------
	getDetailList(currentSimNumber, currentUseDateMonth, currentIndex, showDetailList);
});