sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("com.dpz_routingTenViews.controller.View7", {
		onInit: function(){
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("View7").attachPatternMatched(this.onRouteMatchedEnableForm, this);
		},
		onRouteMatchedEnableForm: function(){
			debugger
			var oModel = this.getOwnerComponent().getModel("dataModel");
			var bankCustomerDetailsEntity = oModel.getData().BankDetailsEntity;
			if(bankCustomerDetailsEntity){
				this.getView().byId("bankCustomerDetailsFormId").setVisible(true);
			}else{
				MessageBox.information("No Customer Data available");
			}
		},
		_OnPressBackGoToView1: function(){
			this.getOwnerComponent().getRouter().navTo("View1");
		}
	});
});