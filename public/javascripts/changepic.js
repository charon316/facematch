$(document).ready(function(){
	var ClickAndChange = function (_click, _change) {
		$(_click).click(function () {
			// console.log(_click + ' clicked');
			$.ajax({
				type: "get",
				url: "/judge",
				data: {"side": _click},
				success: function (result) {
					console.log("result:" + result);
					$(_change).attr('src', result);
				},
				error: function (xhr, status, err) {
					console.log("Error: " + error.message);
				},
			});
		});
	};
	ClickAndChange('#leftimg', '#rightimg');
	ClickAndChange('#rightimg', '#leftimg');
});