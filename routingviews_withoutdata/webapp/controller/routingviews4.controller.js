sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.dproutingviews_withoutdata.controller.routingviews4", {
		onPressButton4 : function () {
			this.getOwnerComponent().getRouter().navTo("routingviews1");
		}
	});
});