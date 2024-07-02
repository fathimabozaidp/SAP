sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.dpz_routingTenViews.controller.View3", {
		// onInit: function(){
		// 	// this.getOwnerComponent().getModel("dataModel");
		// },
		_OnPressBackGoToView1: function(){
			this.getOwnerComponent().getRouter().navTo("View1");
		}
	});
});