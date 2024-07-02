sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.dproutingviews_withoutdata.controller.routingviews", {
		onPressButton1 : function () {
			this.getOwnerComponent().getRouter().navTo("routingviews3");
		}
	});
});