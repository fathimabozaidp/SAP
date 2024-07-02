sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/dpz_jsonmodelwithsimpleformandtable/model/models",
	"sap/ui/model/json/JSONModel"
], function(UIComponent, Device, models, JSONModel) {
	"use strict";

	return UIComponent.extend("com.dpz_jsonmodelwithsimpleformandtable.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			//Initialize the router
			this.getRouter().initialize();
			
			//Reading the studentdata.json in the model folder
			var oModel = new JSONModel("model/studentdata.json");
			//setting the read model in oModel and giving it an alias name StudentModel
			this.setModel(oModel,"StudentModel");
		}
	});
});