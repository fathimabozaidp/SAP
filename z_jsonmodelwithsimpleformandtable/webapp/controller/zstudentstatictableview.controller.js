sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.dpz_jsonmodelwithsimpleformandtable.controller.zstudentstatictableview", {
		_OnPressNextGoToFormView : function(){
			this.getOwnerComponent().getRouter().navTo("zstudentdetailsformandtableview");
		}
	});
});