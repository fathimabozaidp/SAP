sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/m/MessageBox"
], 

function(Controller, Fragment, MessageBox) {
	"use strict";

	return Controller.extend("com.dpzsimplebillingforminfragment.controller.zbillingforminfragment_View", {
		onPressOpenBillingForm : function () {
			if(!this.billingSimpleForm){
				//creates a fragment
				this.billingSimpleForm = sap.ui.xmlfragment("com.dpzsimplebillingforminfragment.view.fragments.zbillingform", this);
				//attach fragment to the view
				this.getView().addDependent(this.billingSimpleForm);
			}
			//opens the fragment
			this.billingSimpleForm.open();
		},
		 onPressCloseFragment: function(oEvent){
		    this.billingSimpleForm.close();
		 },
		 onPressSubmitButton : function(){
		 	MessageBox.success("Submitted Successfully");
		 }
	});
});