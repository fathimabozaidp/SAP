sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.dproutingviews_withoutdata.controller.routingviews3", {
		onPressButton3 : function () {
			this.getOwnerComponent().getRouter().navTo("routingviews2");	
		}
	});
});