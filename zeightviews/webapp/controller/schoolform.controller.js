sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("com.dpzeightviews.controller.schoolform", {
		// this.sName = this.getView().byId().getValue();
		onInit: function (){
    		var oTable = this.getView().byId("studentTableId");
    		oTable.attachItemPress(this._OnPressRowGoToEditSchoolForm, this);
    		
    		var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("schoolform").attachMatched(this.clearSchoolFormData, this);
			
			// oRouter.getRoute("schoolform").attachMatched(this.identifyBackOrSave, this);
			var oDatePicker = this.getView().byId("sDateOfBirthId");
            var oToday = new Date();
            oDatePicker.setMaxDate(oToday);
			
		},
		clearSchoolFormData: function(){
			this.getView().byId("sNameId").setValue("");
			this.getView().byId("sRollNoId").setValue("");
			this.getView().byId("sDateOfBirthId").setValue("");
			this.getView().byId("sClassId").setValue("");
			this.getView().byId("sFatherNameId").setValue("");
			this.getView().byId("sMotherNameId").setValue("");
			this.getView().byId("sMobileId").setValue("");
			this.getView().byId("sEmailId").setValue("");
			
			this.getView().byId("sNameId").setValueState("None");
			this.getView().byId("sRollNoId").setValueState("None");
			this.getView().byId("sDateOfBirthId").setValueState("None");
			this.getView().byId("sClassId").setValueState("None");
			this.getView().byId("sFatherNameId").setValueState("None");
			this.getView().byId("sMotherNameId").setValueState("None");
			this.getView().byId("sMobileId").setValueState("None");
			this.getView().byId("sEmailId").setValueState("None");
			
		},
		_OnPressIntermediateGoToIntermediateFormView: function() {
			var sName = this.getView().byId("sNameId").getValue();
			var sRollNo = this.getView().byId("sRollNoId").getValue();
			var sDateOfBirth = this.getView().byId("sDateOfBirthId").getValue();
			var sClass = this.getView().byId("sClassId").getValue();
			var sFatherName = this.getView().byId("sFatherNameId").getValue();
			var sMotherName = this.getView().byId("sMotherNameId").getValue();
			var sFatherMobile = this.getView().byId("sMobileId").getValue();
			var sEmail = this.getView().byId("sEmailId").getValue();
			debugger;
			//data is present and you are navigating to different form
			if(sName !== "" || sRollNo !== "" || sDateOfBirth !== "" || sClass !== "" || sFatherName !== "" || sMotherName !== "" || sFatherMobile !== "" || sEmail !== ""){
				//prompt user
				MessageBox.confirm("Your Form Data will be cleared !! Are you sure you want to navigate?",{
				onClose: (oAction) => { // Using arrow function to maintain scope of 'this'
	            	if (oAction === MessageBox.Action.OK) { // Using MessageBox.Action.OK for comparison
	            		debugger;
	                	this.getOwnerComponent().getRouter().navTo("intermediateform");
	            	}
        		}	
				});
			}else{
				this.getOwnerComponent().getRouter().navTo("intermediateform");
			}
		
		},
		_OnPresGraduateGoToGraduateFormView : function() {
			var sName = this.getView().byId("sNameId").getValue();
			var sRollNo = this.getView().byId("sRollNoId").getValue();
			var sDateOfBirth = this.getView().byId("sDateOfBirthId").getValue();
			var sClass = this.getView().byId("sClassId").getValue();
			var sFatherName = this.getView().byId("sFatherNameId").getValue();
			var sMotherName = this.getView().byId("sMotherNameId").getValue();
			var sFatherMobile = this.getView().byId("sMobileId").getValue();
			var sEmail = this.getView().byId("sEmailId").getValue();
			//data is present and you are navigating to different form
			if(sName !== "" || sRollNo !== "" || sDateOfBirth !== "" || sClass !== "" || sFatherName !== "" || sMotherName !== "" || sFatherMobile !== "" || sEmail !== ""){
				//prompt user
				MessageBox.confirm("Your Form Data will be cleared !! Are you sure you want to navigate?",{
				onClose: (oAction) => { // Using arrow function to maintain scope of 'this'
            	if (oAction === MessageBox.Action.OK) { // Using MessageBox.Action.OK for comparison
            		debugger;
                	this.getOwnerComponent().getRouter().navTo("graduateform");
            	}
        	}	
				});
			}else{
				this.getOwnerComponent().getRouter().navTo("graduateform");
			}
		},
		_OnPressEmployeeGoToEmployeeFormView : function() {
			var sName = this.getView().byId("sNameId").getValue();
			var sRollNo = this.getView().byId("sRollNoId").getValue();
			var sDateOfBirth = this.getView().byId("sDateOfBirthId").getValue();
			var sClass = this.getView().byId("sClassId").getValue();
			var sFatherName = this.getView().byId("sFatherNameId").getValue();
			var sMotherName = this.getView().byId("sMotherNameId").getValue();
			var sFatherMobile = this.getView().byId("sMobileId").getValue();
			var sEmail = this.getView().byId("sEmailId").getValue();
			//data is present and you are navigating to different form
			if(sName !== "" || sRollNo !== "" || sDateOfBirth !== "" || sClass !== "" || sFatherName !== "" || sMotherName !== "" || sFatherMobile !== "" || sEmail !== ""){
				//prompt user
				MessageBox.confirm("Your Form Data will be cleared !! Are you sure you want to navigate?",{
				onClose: (oAction) => { // Using arrow function to maintain scope of 'this'
            	if (oAction === MessageBox.Action.OK) { // Using MessageBox.Action.OK for comparison
            		debugger;
                		this.getOwnerComponent().getRouter().navTo("employeeform");
            	}
        	}	
				});
			}else{
				this.getOwnerComponent().getRouter().navTo("employeeform");
			}
		},
		_OnPressSubmitButtonDisplayStudentTable : function (){
			var regExpName = /^[a-zA-Z].*[\s\.]*$/g;
			var regExpRollNo = /^[A-Z]{3}[0-9]{2}[A-Z]{1}$/;
			// var regExpDOB = //;
			var regExpClass = /^[0-9]{2}$/;
			var regExpMobile = /^[6-9]{1}[0-9]{9}$/;
			var regExpEmail = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.com$/;
			
			var sName = this.getView().byId("sNameId").getValue();
			var sRollNo = this.getView().byId("sRollNoId").getValue();
			var sDateOfBirth = this.getView().byId("sDateOfBirthId").getValue();
			var sClass = this.getView().byId("sClassId").getValue();
			var sFatherName = this.getView().byId("sFatherNameId").getValue();
			var sMotherName = this.getView().byId("sMotherNameId").getValue();
			var sFatherMobile = this.getView().byId("sMobileId").getValue();
			var sEmail = this.getView().byId("sEmailId").getValue();
			
			//name
			if(sName.match(regExpName)){
				this.getView().byId("sNameId").setValueState("None");	
			}else{
				this.getView().byId("sNameId").setValueState("Error");
				this.getView().byId("sNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			//rollno
			if(sRollNo.match(regExpRollNo)){
				this.getView().byId("sRollNoId").setValueState("None");
			}else{
				this.getView().byId("sRollNoId").setValueState("Error");
				this.getView().byId("sRollNoId").setValueStateText("Rollno format(3Alphabets2Digits1Alphabet) eg : ABC12D");
			}
			//dob
			if(sDateOfBirth !== "" || sDateOfBirth === ""){
				this.getView().byId("sDateOfBirthId").setValueState("None");	
			}else{
				this.getView().byId("sDateOfBirthId").setValueState("Error");
				this.getView().byId("sDateOfBirthId").setValueStateText("Enter proper date");
			}
			//class
			if(sClass.match(regExpClass) || sClass === ""){
				this.getView().byId("sClassId").setValueState("None");
			}else{
				this.getView().byId("sClassId").setValueState("Error");
				this.getView().byId("sClassId").setValueStateText("Enter grade in 2-digit format");
			}
			//father's name
			if(sFatherName.match(regExpName)){
				this.getView().byId("sFatherNameId").setValueState("None");	
			}else{
				this.getView().byId("sFatherNameId").setValueState("Error");
				this.getView().byId("sFatherNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			//mother's name
			if(sMotherName.match(regExpName) || sMotherName === ""){
				this.getView().byId("sMotherNameId").setValueState("None");	
			}else{
				this.getView().byId("sMotherNameId").setValueState("Error");
				this.getView().byId("sMotherNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			//father's mobile number
			if(sFatherMobile.match(regExpMobile)){
				this.getView().byId("sMobileId").setValueState("None");	
			}else{
				this.getView().byId("sMobileId").setValueState("Error");
				this.getView().byId("sMobileId").setValueStateText("Starting Digit >=6 and only 10 digits long");
			}
			//email
			if(sEmail.match(regExpEmail)){
				this.getView().byId("sEmailId").setValueState("None");	
			}else{
				this.getView().byId("sEmailId").setValueState("Error");
				this.getView().byId("sEmailId").setValueStateText("Enter proper Email eg: userid@domain.com");
			}
			//mandatory fields
			if(sName === "" || sRollNo === "" || sFatherName === "" || sFatherMobile === "" || sEmail === ""){
				debugger;
				MessageBox.error("Fill all mandatory fields");	
			}else if(sName.match(regExpName) && sRollNo.match(regExpRollNo)
				&& (sDateOfBirth !== "" || sDateOfBirth === "") && (sClass.match(regExpClass) || sClass === "") 
				&& sFatherName.match(regExpName) && ((sMotherName.match(regExpName) || sMotherName === ""))
				&& sFatherMobile.match(regExpMobile) && sEmail.match(regExpEmail)
			)
			{
				MessageBox.success("Success");
				var schoolPayload = 
				{
					"Name" : sName,
					"RollNo" : sRollNo,
					"DOB" : sDateOfBirth,
					"Class" : sClass,
					"FatherName" : sFatherName,
					"MotherName" : sMotherName,
					"FatherMobile" : sFatherMobile,
					"Email" : sEmail 
				};
				//get model
				var oModel = this.getOwnerComponent().getModel("multiFormModel");
				oModel.getData().SchoolData.push(schoolPayload);
				oModel.refresh(true);
				
				//make table visible
				this.getView().byId("studentTableId").setVisible(true);
				// this.getOwnerComponent().getRouter().navTo("zstudentstatictableview");
				// oModel.setProperty("/FormData", payload);
				// var table = this.getView().byId("table2Id");
				// table.setVisible(true);
					
				//clear input fields
				this.getView().byId("sNameId").setValue("");
				this.getView().byId("sRollNoId").setValue("");
				this.getView().byId("sDateOfBirthId").setValue("");
				this.getView().byId("sClassId").setValue("");
				this.getView().byId("sFatherNameId").setValue("");
				this.getView().byId("sMotherNameId").setValue("");
				this.getView().byId("sMobileId").setValue("");
				this.getView().byId("sEmailId").setValue("");
			}
		},
		_OnPressRowGoToEditSchoolForm: function (){
			var oModel = this.getOwnerComponent().getModel("multiFormModel");
			var selectedRow = this.getView().byId("studentTableId").getSelectedItem().getBindingContext("multiFormModel").getObject();
			if(!oModel.getData().EdittedSchoolData){
					oModel.setProperty("/EdittedSchoolData", selectedRow);
			}
			oModel.getData().EdittedSchoolData.ButtonText = "Edit";
			oModel.setProperty("/EdittedSchoolData", selectedRow);
			oModel.refresh(true);
			this.getOwnerComponent().getRouter().navTo("schoolformdata");
		},
		//Information
		_OnPressInfoButtonDisplayLabelAndTextInSchoolFormData: function(oEvent){
			var oModel = this.getOwnerComponent().getModel("multiFormModel");
			var selectedRow = oEvent.getSource().getParent().getBindingContext("multiFormModel").getObject();
			// this.getView().byId("studentTableId").getSelectedItem().getBindingContext("multiFormModel").getObject();
			if(!oModel.getData().EdittedSchoolData){
				oModel.setProperty("/EdittedSchoolData", selectedRow);
			}
			oModel.getData().EdittedSchoolData.ButtonText = "Information";
			oModel.setProperty("/EdittedSchoolData", selectedRow);
			oModel.refresh(true);
			this.getOwnerComponent().getRouter().navTo("schoolformdata");
		},
		//delete
		_OnPressDeleteButtonDeleteRowInSchoolForm: function(oEvent){
			var oModel = this.getOwnerComponent().getModel("multiFormModel");
			var selectedRow = oEvent.getSource().getParent().getBindingContext("multiFormModel").getObject();
			
			// var oTable = this.getView().byId("studentTableId");
			// var rowToBeDeleted = oEvent.getSource().getParent().getParent();
			MessageBox.confirm("Are you sure you want to delete it permanently?", 
			{
				onClose: function (oAction){
					if(oAction === "OK")
					{
						if(oModel.getData().SchoolData){
							var selectedObjectAtIndex = oModel.getData().SchoolData.indexOf(selectedRow);
							oModel.getData().SchoolData.splice(selectedObjectAtIndex, 1);
							// oModel.getData().SchoolData.pop();
						}
						oModel.refresh(true);
					}
				}
			});
			// if(oModel.getData().SchoolData){
			// 	oModel.getData().SchoolData.pop();
			// }
			// oModel.refresh(true);
		}
	});
});