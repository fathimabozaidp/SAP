sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.dpinitialtask.controller.initialtaskview", {
		onSaveDisplayDetails : function (evt) {
			var productId = this.getView().byId("productId").getValue();
			var productName = this.getView().byId("productNameId").getValue();
			var productType = this.getView().byId("productTypeId").getValue();
			var productQuantity = this.getView().byId("productQuantityId").getValue();
			var productPrice = this.getView().byId("productPriceId").getValue();
			
			this.getView().byId("productIdTextId").setText(productId);
			this.getView().byId("productNameTextId").setText(productName);
			this.getView().byId("productTypeTextId").setText(productType);
			this.getView().byId("productQuantityTextId").setText(productQuantity);
			this.getView().byId("productPriceTextId").setText(productPrice);
				
			this.getView().byId("productId").setEditable(false);
			this.getView().byId("productNameId").setEditable(false);
			this.getView().byId("productTypeId").setEditable(false);
			this.getView().byId("productQuantityId").setEditable(false);
			this.getView().byId("productPriceId").setEditable(false);
			
			this.getView().byId("saveButtonId").setEnabled(false);
			this.getView().byId("editButtonId").setEnabled(true);
		},
		onEditPopUpDetailsInFields : function (){
			this.getView().byId("productId").setEditable(true);
			this.getView().byId("productNameId").setEditable(true);
			this.getView().byId("productTypeId").setEditable(true);
			this.getView().byId("productQuantityId").setEditable(true);
			this.getView().byId("productPriceId").setEditable(true);
			this.getView().byId("productIdTextId").setText("");
			this.getView().byId("productNameTextId").setText("");
			this.getView().byId("productTypeTextId").setText("");
			this.getView().byId("productQuantityTextId").setText("");
			this.getView().byId("productPriceTextId").setText("");
			this.getView().byId("editButtonId").setEnabled(false);
			this.getView().byId("saveButtonId").setEnabled(true);
			
		}
	});
});