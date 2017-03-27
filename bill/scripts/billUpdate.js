$(function(){

	var currentIndex = 1;
	var currentCntrctID = $("#cntrctID").val();
	var currentBillMonth = getMonth($("#billMonth").val());
	var tempBillList;

	var data = {
		cntrctID: 'Ka1234',
		registrationDate: '2016-11-02 15:00',
		billMonth: '2016/11',
		updateDate: '2016-11-02 15:00'
	}
	// $.tmpl($("#billInfoTemplate"), data).appendTo("#billInfo");
	// $.tmpl($("#billDataTemplate"), '').appendTo("#billData");

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
	$("#billList").on('click', '.page-change', function(){
		pageNum = $(this).val();
		console.log("pageNum=" + pageNum);
		if (pageNum != undefined) {
			currentIndex = pageNum;
			getBillList(currentCntrctID, currentBillMonth, currentIndex, showBilllList);
		}
	});

	var getBillList = function(cntrctID, billMonth, index, success) {

		// TODO 必須チェック
		var requestParam = {
			cntrctID: cntrctID,
			billMonth: billMonth,
			limit: eachPageNum,
			pageindex: index
		};

		ajax({
			url: apiList.billUpdateSearch,
			data: requestParam,
			success: success
		});
	};

	var showBilllList = function(response) {
		response = $.parseJSON(response);
		response.index = parseInt(currentIndex);
		response.pagenum = Math.ceil(parseInt(response.recordCount)/eachPageNum);
		tempDetailList = response;
		$("#billList").empty();
		$.tmpl($("#billListTemplate"), response).appendTo("#billList");
	};

	var showBillDetail = function(response) {
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
		$(".month-day").datepicker({
			format: 'mm/dd',
			autoclose: true,
			language: 'ja'
		});
	}

	// 照会更新ボタンイベント
	$("#billList").on('click', '.btn-update', function(){
		var values = $(this).val();
		if (values == undefined) { return; }

		var cntrctID = values.split(",")[0];
		var	billMonth = values.split(",")[1];
		console.log("cntrctID=" + cntrctID + ",billMonth=" + billMonth);
		
		ajax({
			url: apiList.billUpdateShow,
			data: {
				cntrctID: cntrctID,
				billDateMonth: billDateMonth
			},
			success: showBillDetail
		});
	});

	// ---------------
	//    初期処理
	// ---------------
	getBillList(currentCntrctID, currentBillMonth, currentIndex, showBilllList);
});