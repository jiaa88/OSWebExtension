(function(context) {
	"use strict";

	if (!context) {
		return void console.warn("'window.browser' is undefined.");
	}

	var $enableToggler = document.querySelector("#enable-toggler");
	var $homepageSelector = document.querySelector("#homepage-selector");

	$enableToggler.addEventListener("change", function(event) {
		context.runtime.sendMessage({
			type: "SET_STATE",
			key: "enable",
			value: event.target.checked ? "true" : "false"
		});
	});

	$homepageSelector.addEventListener("change", function(event) {
		switch (event.target.value) {
			case "home":
			case "subscriptions": {
				context.runtime.sendMessage({
					type: "SET_STATE",
					key: "homepage",
					value: event.target.value
				});
			}
		}
	});

	context.runtime.sendMessage({ type: "GET_STATE" }, function(state) {
		$enableToggler.checked = state.enable === "true";
		$homepageSelector.value = state.homepage;
	});
})(window.browser || window.chrome);
