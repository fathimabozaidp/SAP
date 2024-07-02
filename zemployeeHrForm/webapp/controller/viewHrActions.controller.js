sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.dpzemployeeHrForm.controller.viewHrActions", {
		// onInit : function() {
			
		// },
		_OnBackButtonPressGoToHrForm: function(){
				this.getOwnerComponent().getRouter().navTo("hrForm");
		}
	});
});