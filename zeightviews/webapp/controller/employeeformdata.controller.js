sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function(Controller, JSONModel, MessageBox) {
	"use strict";

	return Controller.extend("com.dpzeightviews.controller.employeeformdata", {
		onInit: function(){
			
			var oTable = this.getView().byId("employeeTableId");     
			oTable.attachItemPress(this._OnPressRowDisplayEditEmployeeFormBelowTable, this);
			
			var oData = {
				"EmployeeAgeGroup": [
					{
						"AgeId": "22 Y",
						"Age": "22 Y"
					},
					{
						"AgeId": "23 Y",
						"Age": "23 Y"
					},
					{
						"AgeId": "24 Y",
						"Age": "24 Y"
					},
					{
						"AgeId": "25 Y",
						"Age": "25 Y"
					},
					{
						"AgeId": "26 Y",
						"Age": "26 Y"
					},
					{
						"AgeId": "27 Y",
						"Age": "27 Y"
					},
					{
						"AgeId": "28 Y",
						"Age": "28 Y"
					},
					{
						"AgeId": "29 Y",
						"Age": "29 Y"
					},
					{
						"AgeId": "30 Y",
						"Age": "30 Y"
					},
					{
						"AgeId": "31 Y",
						"Age": "31 Y"
					},
					{
						"AgeId": "32 Y",
						"Age": "32 Y"
					},
					{
						"AgeId": "33 Y",
						"Age": "33 Y"
					},
					{
						"AgeId": "34 Y",
						"Age": "34 Y"
					},
					{
						"AgeId": "35 Y",
						"Age": "35 Y"
					},
					{
						"AgeId": "36 Y",
						"Age": "36 Y"
					},
					{
						"AgeId": "37 Y",
						"Age": "37 Y"
					},
					{
						"AgeId": "38 Y",
						"Age": "38 Y"
					},
					{
						"AgeId": "39 Y",
						"Age": "39 Y"
					},
					{
						"AgeId": "40 Y",
						"Age": "40 Y"
					},
					{
						"AgeId": "41 Y",
						"Age": "41 Y"
					},
					{
						"AgeId": "42 Y",
						"Age": "42 Y"
					},
					{
						"AgeId": "43 Y",
						"Age": "43 Y"
					},{
						"AgeId": "44 Y",
						"Age": "44 Y"
					},
					{
						"AgeId": "45 Y",
						"Age": "45 Y"
					}
				],
				EmployeeCompany :[
					{
						"CompanyId" : "Techmahindra",
						"CompanyName" : "Tech Mahindra"
					},
					{
						"CompanyId" : "Ibm",
						"CompanyName" : "IBM"
					},
					{
						"CompanyId" : "Wipro",
						"CompanyName" : "Wipro"
					},
					{
						"CompanyId" : "Deloitte",
						"CompanyName" : "Deloitte"
					},
					{
						"CompanyId" : "Tcs",
						"CompanyName" : "TCS"
					},
					{
						"CompanyId" : "EY",
						"CompanyName" : "EY"
					}
					],
				EmployeeLocation:[
					{
						"LocationId" : "Hyderabad",
						"LocationName" : "Hyderabad"
					},
					{
						"LocationId" : "Bangalore",
						"LocationName" : "Bangalore"
					},
					{
						"LocationId" : "Delhi",
						"LocationName" : "Delhi"
					},
					{
						"LocationId" : "Mumbai",
						"LocationName" : "Mumbai"
					},
					{
						"LocationId" : "Indore",
						"LocationName" : "Indore"
					},
					{
						"LocationId" : "Pune",
						"LocationName" : "Pune"
					}
					],
				
				"Editable": true,
				"Enabled": true
			};

			// set explored app's demo model on this sample
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);
			
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("employeeformdata").attachMatched(this.hideAllFormsAndButtons, this);
		
		},
		hideAllFormsAndButtons: function(){
				this.getView().byId("employeeDetailsLabelTextFormId").setVisible(false);
				this.getView().byId("cancelButtonId_InEmployeeFormDataLabelText").setVisible(false);
				this.getView().byId("employeeDetailsEditFormId").setVisible(false);
				this.getView().byId("saveEdittedEmployeeFormButtonId").setVisible(false);
		},
		_OnPressBackButtonGoToEmployeeForm: function(){
			this.getOwnerComponent().getRouter().navTo("employeeform");
		},
		_OnPressRowDisplayEditEmployeeFormBelowTable: function(){
			debugger;
			var oModel = this.getOwnerComponent().getModel("multiFormModel");
			var selectedRow = this.getView().byId("employeeTableId").getSelectedItem().getBindingContext("multiFormModel").getObject();
			// if(!oModel.getData().EdittedEmployeeData){
					oModel.setProperty("/EdittedEmployeeData", selectedRow);
			// }
			// oModel.getData().EdittedEmployeeData.ButtonText = "Edit";
			// oModel.setProperty("/EdittedEmployeeData", selectedRow);
			oModel.refresh(true);
			this.getView().byId("employeeDetailsLabelTextFormId").setVisible(false);
			this.getView().byId("cancelButtonId_InEmployeeFormDataLabelText").setVisible(false);
			this.getView().byId("employeeDetailsEditFormId").setVisible(true);
			this.getView().byId("saveEdittedEmployeeFormButtonId").setVisible(true);
			// this.getOwnerComponent().getRouter().navTo("employeeformdata");
		},
		_OnPressSaveButtonUpdateChangesInTableAbove: function(){
			var regExpName = /^[A-Za-z\s]+$/;
			var regExpId = /^EMP[0-9]{2}[A-Z]{1}$/;
			var regExpMobile = /[6-9]{1}[0-9]{9}$/;
			var regExpEmail = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
			var regExpAddress = /^[a-zA-Z0-9\s,'-]*$/;
			
			var eEdittedName = this.getView().byId("eEdittedNameId").getValue();
			var eEdittedId = this.getView().byId("eEdittedId").getValue();
			var eEdittedAge = this.getView().byId("eEdittedAgeId").getSelectedKey();
			var eEdittedMobile = this.getView().byId("eEdittedMobileId").getValue();
			var eEdittedEmail = this.getView().byId("eEdittedEmailId").getValue();
			var eEdittedAddress = this.getView().byId("eEdittedAddressId").getValue();
			var eEdittedCompany = this.getView().byId("eEdittedCompanyId").getSelectedKey();
			var eEdittedLocation = this.getView().byId("eEdittedLocationId").getSelectedKey();
			
			if(eEdittedName.match(regExpName)){
				this.getView().byId("eEdittedNameId").setValueState("None");
			}else{
				this.getView().byId("eEdittedNameId").setValueState("Error");
				this.getView().byId("eEdittedNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			
			if(eEdittedId.match(regExpId)){
				this.getView().byId("eEdittedId").setValueState("None");
			}else{
				this.getView().byId("eEdittedId").setValueState("Error");
				this.getView().byId("eEdittedId").setValueStateText("Id Format(EMP2Digits1Alphabet) eg: EMP12A");
			}
			
			if(eEdittedAge !== ""){
				this.getView().byId("eEdittedAgeId").setValueState("None");
			}else{
				this.getView().byId("eEdittedAgeId").setValueState("Error");
				this.getView().byId("eEdittedAgeId").setValueStateText("Age cannot be empty");	
			}
			
			if(eEdittedMobile.match(regExpMobile)){
				this.getView().byId("eEdittedMobileId").setValueState("None");	
			}else{
				this.getView().byId("eEdittedMobileId").setValueState("Error");
				this.getView().byId("eEdittedMobileId").setValueStateText("Starting Digit >=6 and only 10 digits long");
			}
			
			if(eEdittedEmail.match(regExpEmail)){
				this.getView().byId("eEdittedEmailId").setValueState("None");	
			}else{
				this.getView().byId("eEdittedEmailId").setValueState("Error");
				this.getView().byId("eEdittedEmailId").setValueStateText("Enter proper Email eg: userid@domain.com");
			}
			
			if(eEdittedAddress.match(regExpAddress) || eEdittedAddress === ""){
				this.getView().byId("eEdittedAddressId").setValueState("None");	
			}else{
				this.getView().byId("eEdittedAddressId").setValueState("Error");
				this.getView().byId("eEdittedAddressId").setValueStateText("Enter proper Address");
			}
			
			if(eEdittedCompany !== ""){
				this.getView().byId("eEdittedCompanyId").setValueState("None");	
			}else{
				this.getView().byId("eEdittedCompanyId").setValueState("Error");
				this.getView().byId("eEdittedCompanyId").setValueStateText("Company cannot be empty");
			}
			
			if(eEdittedLocation !== ""){
				this.getView().byId("eEdittedLocationId").setValueState("None");	
			}else{
				this.getView().byId("eEdittedLocationId").setValueState("Error");
				this.getView().byId("eEdittedLocationId").setValueStateText("Location cannot be empty");
			}
			debugger;
			if(eEdittedName === "" || eEdittedId === "" || eEdittedAge === "" || eEdittedMobile === "" || eEdittedEmail === "" || eEdittedCompany === "" || eEdittedLocation === ""){
				MessageBox.error("Fill All Mandatory fields");
			}else if(eEdittedName.match(regExpName) && eEdittedId.match(regExpId) && eEdittedAge !== "" && eEdittedMobile.match(regExpMobile) 
				&& eEdittedEmail.match(regExpEmail) && (eEdittedAddress.match(regExpAddress) || eEdittedAddress === "")
				&& eEdittedCompany !== "" && eEdittedLocation !== ""){
				MessageBox.success("Success !!");
				var updatedEmployeeDataPayload = {
					"Name" : eEdittedName,
					"Id" : eEdittedId,
					"Age" : eEdittedAge,
					"Mobile": eEdittedMobile,
					"Email": eEdittedEmail,
					"Address": eEdittedAddress,
					"Company": eEdittedCompany,
					"Location": eEdittedLocation
				};
				//get model
				var oModel = this.getOwnerComponent().getModel("multiFormModel");         
				//get array
				var employeeDataArray = oModel.getData().EmployeeData;
				
				employeeDataArray.forEach((item, index)=>{
					if(item.Id === eEdittedId){
						//record is matched based on ID
						//extract the record's index after matching cndtn satisfied
						this.selectedObjectAtIndex = index;                         
					}
				});
				var previousEmployeeObject = oModel.getData().EmployeeData[this.selectedObjectAtIndex];
				Object.assign(previousEmployeeObject, updatedEmployeeDataPayload);
				oModel.refresh(true);
				this.getView().byId("employeeDetailsLabelTextFormId").setVisible(false);
				this.getView().byId("cancelButtonId_InEmployeeFormDataLabelText").setVisible(false);
				this.getView().byId("employeeDetailsEditFormId").setVisible(false);
				this.getView().byId("saveEdittedEmployeeFormButtonId").setVisible(false);
			}
		},
		//Information
		
		_OnPressInfoButtonDisplayLabelAndTextInEmployeeFormData: function(oEvent){
			debugger;
			var oModel = this.getOwnerComponent().getModel("multiFormModel");
			var selectedRow = oEvent.getSource().getParent().getBindingContext("multiFormModel").getObject();
			// this.getView().byId("studentTableId").getSelectedItem().getBindingContext("multiFormModel").getObject();
			// if(!oModel.getData().EdittedEmployeeData){
				oModel.setProperty("/EdittedEmployeeData", selectedRow);
			// }
			// oModel.getData().EdittedEmployeeData.ButtonText = "Information";
			// oModel.setProperty("/EdittedEmployeeData", selectedRow);
			oModel.refresh(true);
			this.getView().byId("employeeDetailsLabelTextFormId").setVisible(true);
			this.getView().byId("cancelButtonId_InEmployeeFormDataLabelText").setVisible(true);
			this.getView().byId("employeeDetailsEditFormId").setVisible(false);
			this.getView().byId("saveEdittedEmployeeFormButtonId").setVisible(false);
			
		},
		//delete
		_OnPressDeleteButtonDeleteRowInEmployeeFormData: function(oEvent){
			var that = this;
			var oModel = this.getOwnerComponent().getModel("multiFormModel");
			var selectedRow = oEvent.getSource().getParent().getBindingContext("multiFormModel").getObject();
			MessageBox.confirm("Are you sure you want to delete it permanently?", 
			{
				onClose: function (oAction){
					if(oAction === "OK")
					{
						if(oModel.getData().EmployeeData){
							var selectedObjectAtIndex = oModel.getData().EmployeeData.indexOf(selectedRow);
							oModel.getData().EmployeeData.splice(selectedObjectAtIndex, 1);
							that.getView().byId("employeeDetailsLabelTextFormId").setVisible(false);
							that.getView().byId("cancelButtonId_InEmployeeFormDataLabelText").setVisible(false);
							that.getView().byId("employeeDetailsEditFormId").setVisible(false);
							that.getView().byId("saveEdittedEmployeeFormButtonId").setVisible(false);
							// oModel.getData().EmployeeData.pop();
						}
						oModel.refresh(true);
					}
				}
			});
		},
		_OnPressCancelButtonHideEmployeeInfoForm : function(){
			this.getView().byId("employeeDetailsLabelTextFormId").setVisible(false);
			this.getView().byId("cancelButtonId_InEmployeeFormDataLabelText").setVisible(false);
		}
	});
});