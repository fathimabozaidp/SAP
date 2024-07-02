sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.dpz_routingTenViews.controller.View6", {
		_OnPressBackGoToView1: function() {
			this.getOwnerComponent().getRouter().navTo("View1");
		}
	});
});