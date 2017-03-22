function initialize() 
{
	// datepicker設定
    $('.date').datepicker({
    	format: 'yyyy/mm',
    	minViewMode: '1',
    	language: 'ja'    // カレンダー日本語化のため
    });

    // カレンダーを現在時刻に設定
    $('.date').datepicker('setDate', new Date());

}