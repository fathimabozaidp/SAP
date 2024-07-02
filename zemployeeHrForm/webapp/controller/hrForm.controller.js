sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/m/MessageBox"
], function(Controller, Fragment, MessageBox) {
	"use strict";

	return Controller.extend("com.dpzemployeeHrForm.controller.hrForm", {
		onInit : function() {
			// debugger;
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("hrForm").attachMatched(this.enableDisableApproveRejectButtons, this);
		},
		enableDisableApproveRejectButtons: function(){
			debugger;
			var oTable = this.getView().byId("hrActionOnEmployeeTableId");
			if(oTable.getItems().length >= 1){
				this.getView().byId("approveEmployeeButtonId").setEnabled(true);
				this.getView().byId("rejecteEmployeeButtonId").setEnabled(true);
				oTable.removeSelections(true);
			}else{
				this.getView().byId("approveEmployeeButtonId").setEnabled(false);
				this.getView().byId("rejecteEmployeeButtonId").setEnabled(false);
			}
		},
		_OnBackButtonPressGoToEmployeeDetailsForm: function(){
			this.getOwnerComponent().getRouter().navTo("employeeDetailsForm");
		},
		_OnPressDispositionedGoToViewHrActionsView: function(){
			this.getOwnerComponent().getRouter().navTo("viewHrActions");
		},
		_OnPressOpenApproveRejectFragment: function(oEvent){
			if(!this.approveRejectFragment){
				//creates a fragment
				this.approveRejectFragment = sap.ui.xmlfragment("com.dpzemployeeHrForm.view.fragments.approveRejectEmployeeFragment", this);
				//attach fragment to the view
				this.getView().addDependent(this.approveRejectFragment);
				//Oevent.getSource().addDependent();
			}
			//opens the fragment
			// this.approveRejectFragment.open();
			
			var oModel = this.getOwnerComponent().getModel("employeeHrModel");
			var oTable = this.getView().byId("hrActionOnEmployeeTableId");
			var buttonClicked = oEvent.getSource().getText();
			var selectedRow;
			var selectedItems = oTable.getSelectedItems();
			var totalRowsSelected = 0;
			var randomRegistrationId;
			var eStatus;
			// var employeeDataArray = oModel.getData().HrData;
			// Loop through the selected items array
			selectedItems.forEach(function(selectedItem) {
    			selectedRow = selectedItem.getBindingContext("employeeHrModel").getObject();
    			totalRowsSelected++;
			});
			if(totalRowsSelected > 1 || totalRowsSelected < 1){
				MessageBox.error("Please select atleast one record to perform this operation");
			}else if(totalRowsSelected === 1){
				debugger;
				if(buttonClicked === "Approve"){
					this.approveRejectFragment.open();	
					randomRegistrationId = "A_" + Math.round(Math.random(1,30) * 100000000);
					eStatus = buttonClicked;
					sap.ui.getCore().byId("employeeRegistrationId").setValue(randomRegistrationId);
					sap.ui.getCore().byId("employeeStatusId").setValue(eStatus);
					// this.approveRejectFragment.byId("employeeRegistrationId").setValue(randomRegistrationId);
			
					// if(!oModel.getData().ViewHrData){
					// 	oModel.setProperty("/ViewHrData", selectedRow);
					// }
					// oModel.getData().ViewHrData.RegistrationId = randomRegistrationId;
					// oModel.setProperty("/ViewHrData", selectedRow);
					// oModel.getData().ViewHrData.Status = eStatus;
					// oModel.setProperty("/ViewHrData", selectedRow);
					// oModel.refresh(true);
				}else if(buttonClicked === "Reject"){
					this.approveRejectFragment.open();
					randomRegistrationId = "R_" + Math.round(Math.random(1,30) * 100000000);
					eStatus = buttonClicked;
					sap.ui.getCore().byId("employeeRegistrationId").setValue(randomRegistrationId);
					sap.ui.getCore().byId("employeeStatusId").setValue(eStatus);
					// if(!oModel.getData().ViewHrData){
					// 	oModel.setProperty("/ViewHrData", selectedRow);
					// }
					// oModel.getData().ViewHrData.RegistrationId = randomRegistrationId;
					// oModel.setProperty("/ViewHrData", selectedRow);
					// oModel.getData().ViewHrData.Status = eStatus;
					// oModel.setProperty("/ViewHrData", selectedRow);
					// oModel.refresh(true);
				}
			}
		
		},
		_OnSubmitPushDetailsToHrTableInViewHr: function(oEvent){
			var oModel = this.getOwnerComponent().getModel("employeeHrModel");
			var oTable = this.getView().byId("hrActionOnEmployeeTableId");
			// var buttonClicked = oEvent.getSource().getText();
			var selectedRow;
			var selectedItems = oTable.getSelectedItems();
			var totalRowsSelected = 0;
			var randomRegistrationId;
			var eStatus;
			// var employeeDataArray = oModel.getData().HrData;
			// Loop through the selected items array
			selectedItems.forEach(function(selectedItem) {
    			selectedRow = selectedItem.getBindingContext("employeeHrModel").getObject();
    			totalRowsSelected++;
			});
			
			var regExpComments = /^[a-zA-Z0-9\s,'-]*$/;
			var eComments = sap.ui.getCore().byId("employeeCommentsId").getValue();
			var eRegistrationId = sap.ui.getCore().byId("employeeRegistrationId").getValue();
			var eStatus = sap.ui.getCore().byId("employeeStatusId").getValue();
			if(eComments.match(regExpComments) && eComments !== ""){
				sap.ui.getCore().byId("employeeCommentsId").setValueState("None");
			}else{
				sap.ui.getCore().byId("employeeCommentsId").setValueState("Error");
			}
			if(eRegistrationId !== "" && eStatus !== "" && (eComments.match(regExpComments) && eComments !== ""))
			{	if(eStatus == "Approve"){
					eStatus = "Approved";
				}else if(eStatus == "Reject"){
					eStatus = "Rejected";
				}
				var fragmentPayload = {
					"RegistrationId" : eRegistrationId,
					"Comments" : eComments,
					"Status" : eStatus
				};
				debugger;
				var employeePayload;
				var employeeandFragmentPayload;
				var oModel = this.getOwnerComponent().getModel("employeeHrModel");
				//push will add data , instead you should merge objects when eId matches oModel.getData().ViewHrData.push(fragmentPayload);    
				var employeeArrayInHr = oModel.getData().HrData;
				employeeArrayInHr.forEach((item, index)=>{
					if(item.Id == selectedRow.Id){
						employeePayload = item;
						employeeandFragmentPayload = {
							... item,
							... fragmentPayload
						};
						oModel.getData().FinalViewHrData.push(employeeandFragmentPayload);
						oModel.getData().HrData.splice(index, 1);
						var employeeArrayInEmployeeDetails = oModel.getData().EmployeeData;
						employeeArrayInEmployeeDetails.forEach((item, index) => {
							if(item.Id == selectedRow.Id){
								employeeArrayInEmployeeDetails[index].Status = eStatus;
							}
						})
						// oModel.getData().EmployeeData[index].Status = eStatus;
						this.approveRejectFragment.close();
						oModel.refresh(true);
						oTable.removeSelections(true);
						MessageBox.success(`Employee ${eStatus} successfully`);
						this.enableDisableApproveRejectButtons();
					}
				});
				sap.ui.getCore().byId("employeeCommentsId").setValue("");
				sap.ui.getCore().byId("employeeRegistrationId").setValue("");
				sap.ui.getCore().byId("employeeStatusId").setValue("");
				sap.ui.getCore().byId("employeeCommentsId").setValueState("None");
			}else{
				MessageBox.error("Fill mandatory field");
			}
			},
		_OnPressCloseFragment: function(){
			sap.ui.getCore().byId("employeeCommentsId").setValue("");
			sap.ui.getCore().byId("employeeRegistrationId").setValue("");
			sap.ui.getCore().byId("employeeStatusId").setValue("");
			sap.ui.getCore().byId("employeeCommentsId").setValueState("None");
			this.approveRejectFragment.close();
			var oTable = this.getView().byId("hrActionOnEmployeeTableId");
			oTable.removeSelections(true);
		}
	});
});