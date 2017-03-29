$(function(){

	var currentIndex = 1;
	var currentCntrctID = $("#cntrctID").val();
	var currentBillMonth = getMonth($("#billMonth").val());
	var tempBillList;

	// クリアボタンイベント
	$("#clear").on('click', function(){
		$("#useDateMonth").val("");;
	});

	// 検索ボタンイベント
	$("#search").on('click', function(){
		// 入力チェック
		if(validate($("[validate]"))) { return; }
		currentSimNumber = $("#simNumber").val();
		currentUseDateMonth = getMonth($("#useDateMonth").val());
		getBillList(currentCntrctID, currentBillMonth, currentIndex, showBilllList);
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
		// データ整形
		dataFormat($("[format]"));
		initDatePicker($(".date"));
	};

	var showBillDetail = function(response) {
		// 表示制御
		$("#billListContainer").hide();
		$("#billUpateContainer").show();

		response = $.parseJSON(response);
		// 請求情報表示
		$("#billInfo").empty();
		$("#billInfoTemplate").tmpl(response).appendTo("#billInfo");
		// 請求データ表示
		$("#billData").empty();
		$("#billDataTemplate").tmpl(response).appendTo("#billData");
		// 請求詳細データ表示
		$("#billDetail").empty();
		$("#billDetailTemplate").tmpl(response).appendTo("#billDetail");

		// データ表示整形処理
		dataFormat($("[format]"));
		initDatePicker($(".date"));
	}

	// 照会更新ボタンイベント
	$("#billList").on('click', '.btn-inquery-update', function(){
		var values = $(this).val();
		if (values == undefined) { return; }

		var cntrctID = values.split(",")[0];
		var	billMonth = values.split(",")[1];
		console.log("cntrctID=" + cntrctID + ",billMonth=" + billMonth);
		
		ajax({
			url: apiList.billUpdateShow,
			data: {
				cntrctID: cntrctID,
				billMonth: billMonth
			},
			success: showBillDetail
		});
	});

	$("#billInfo").on('click', '.btn-update', function(){
		// 入力チェック
		if(validate($("[validate]"))) { return; }

  		// 請求明細情報取得
  		var billingReportInfo = new Array();
  		$.each($(".billDetail"), function(index, element) {
  			var billInfoParam = {
  				cntrctID: $("#billInfo").find("[name=cntrctID]").val(),
  				billMonth: $("#billInfo").find("[name=billMonth]").val(),
  				billReportNumber: $(this).find("[name=billReportNumber]").val(),
  				productCode: $(this).find("[name=productCode]").val(),
  				useDateMonth: $(this).find("[name=useDateMonth]").val(),
  				salesDate: $(this).find("[name=salesDate]").val(),
  				quantity: $(this).find("[name=quantity]").val(),
  				taxExcludedPrice: $(this).find("[name=taxExcludedPrice]").val(),
  				reserved1: $(this).find("[name=reserved1]").val(),
  				reserved2: $(this).find("[name=reserved2]").val()
  			}
  			billingReportInfo.push(billInfoParam);
  		});

  		// 請求データ情報取得
  		var requestParam = {
  			cntrctID:　$("#billInfo").find("[name=cntrctID]").val(),
  			billMonth: $("#billInfo").find("[name=billMonth]").val(),
  			billingDate: $("#billData").find("[name=billingDate]").val(),
  			billMethod: $("#billData").find("[name=billMethod]").val(),
  			acTranReqNum: $("#billData").find("[name=acTranReqNum]").val(),
  			transferResult: $("#billData").find("[name=transferResult]").val(),
  			transferResultDate: $("#billData").find("[name=transferResultDate]").val(),
  			billingReportInfo: billingReportInfo
  		};

  		var updateSuccess = function(){
  			alert("更新完了しました。");
  		};

  		ajax({
  			url: apiList.billUpdate,
  			data: requestParam,
  			success: updateSuccess
  		});
	});

	$("#billInfo").on('click', '.btn-cancel', function(){
		$("#billListContainer").show();
		$("#billUpateContainer").hide();
	});

	// ---------------
	//    初期処理
	// ---------------
	// getBillList(currentCntrctID, currentBillMonth, currentIndex, showBilllList);
});