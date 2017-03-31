$(function(){

	$("#download").on('click', function() {
		// 入力チェック
		if(validate($("[validate]"))) { return; }

		var convertArr = function (data) {
			var arr = [];
			for (var i = 0; i < data.length; i++) {
				var item = $.map(data[i], function(el) { return el; });
				arr.push(item);
			}
			return arr;
		};

		var getDownloadFile = function(response) {
			var data = response.csvData;

			var downloadData = new Blob([data], {type: 'text/csv'});
		  	var filename = $("#billDateMonth").val() + '.csv';

		  	if (window.navigator.msSaveBlob) {
		    	window.navigator.msSaveBlob(downloadData, filename); // IE用
		  	} else {
		    	var downloadUrl  = (window.URL || window.webkitURL).createObjectURL(downloadData);
		    	var link = document.createElement('a');
		    	link.href = downloadUrl;
		    	link.download = filename;
		    	link.click();
		    	(window.URL || window.webkitURL).revokeObjectURL(downloadUrl);
		  	}
		};

		ajax({
			url: apiList.billSettlement,
			data: {
				billDateMonth: getParamValue($("#billDateMonth"))
			},
			success: getDownloadFile
		});
	});
});