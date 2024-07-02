sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("com.dproutingviews_withoutdata.controller.routingviews2", {
		onInit: function () {
			debugger;
			MessageBox.error("onInit");
		},
		onBeforeRendering: function () {
			debugger;
			MessageBox.information("onBeforeRendering");
		},
		onAfterRendering: function () {
			debugger;
			MessageBox.warning("onAfterRendering");
		},
		onExit: function () {
			debugger;
			MessageBox.success("onExit");
		},
		
		onPressButton2 : function () {
			this.getView().destroy();
			this.getOwnerComponent().getRouter().navTo("routingviews4");	
		}
	});
});