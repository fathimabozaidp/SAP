sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("com.dpzeightviews.controller.schoolformdata", {
		onInit: function(){
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("schoolformdata").attachMatched(this.onRouteMatched, this);
			var oDatePicker = this.getView().byId("sEdittedDateOfBirthId");
            var oToday = new Date();
            oDatePicker.setMaxDate(oToday);
			debugger;
			var oModel = this.getOwnerComponent().getModel("multiFormModel");
			oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);	
		},
		onRouteMatched: function(){
			var oData = this.getOwnerComponent().getModel("multiFormModel").getData().EdittedSchoolData;
			// var oModel = this.getOwnerComponent().getModel("multiFormModel");
			var oView = this.getView();
			if(oData.ButtonText === "Information"){
				oView.byId("studentDetailsLabelTextFormId").setVisible(true);
				oView.byId("studentDetailsEditFormId").setVisible(false);
				oView.byId("saveEdittedSchoolFormButtonId").setVisible(false);
				oView.byId("cancelButtonId_InSchoolFormDataLabelText").setVisible(true);
			}else if(oData.ButtonText === "Edit"){
				oView.byId("studentDetailsLabelTextFormId").setVisible(false);
				oView.byId("studentDetailsEditFormId").setVisible(true);
				oView.byId("saveEdittedSchoolFormButtonId").setVisible(true);
				oView.byId("cancelButtonId_InSchoolFormDataLabelText").setVisible(false);
			}
		},
		_OnPressBackButtonGoToSchoolForm: function (){
			//stop auto binding when you press back button
			// var oModel = this.getOwnerComponent().getModel("multiFormModel");
			// oModel.getData().SchoolData.ButtonText = "Back";
			this.getOwnerComponent().getRouter().navTo("schoolform");
		},
		_OnPressSaveButtonGoToSchoolForm: function(oEvent){
			var regExpName = /^[A-Za-z\s]+$/;
			var regExpRollNo = /^[A-Z]{3}[0-9]{2}[A-Z]{1}$/;
			// var regExpDOB = //;
			var regExpClass = /^[0-9]{2}$/;
			var regExpMobile = /^[6-9]{1}[0-9]{9}$/;
			var regExpEmail = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
			
			var sEdittedName = this.getView().byId("sEdittedNameId").getValue();
			var sEdittedRollNo = this.getView().byId("sEdittedRollNoId").getValue();
			var sEdittedDateOfBirth = this.getView().byId("sEdittedDateOfBirthId").getValue();
			var sEdittedClass = this.getView().byId("sEdittedClassId").getValue();
			var sEdittedFatherName = this.getView().byId("sEdittedFatherNameId").getValue();
			var sEdittedMotherName = this.getView().byId("sEdittedMotherNameId").getValue();
			var sEdittedFatherMobile = this.getView().byId("sEdittedMobileId").getValue();
			var sEdittedEmail = this.getView().byId("sEdittedEmailId").getValue();	
			
			// var isFormValid = true;
			//name
			if(sEdittedName.match(regExpName)){
				this.getView().byId("sEdittedNameId").setValueState("None");	
			}else{
				this.getView().byId("sEdittedNameId").setValueState("Error");
				this.getView().byId("sEdittedNameId").setValueStateText("Name cannot contain numbers and special characters");
				// isFormValid = false; // Set form validity to false
			}
			//rollno
			if(sEdittedRollNo.match(regExpRollNo)){
				this.getView().byId("sEdittedRollNoId").setValueState("None");
			}else{
				this.getView().byId("sEdittedRollNoId").setValueState("Error");
				this.getView().byId("sEdittedRollNoId").setValueStateText("Rollno format(3Alphabets2Digits1Alphabet) eg : ABC12D");
				// isFormValid = false; 
			}
			//dob
			if(sEdittedDateOfBirth !== "" || sEdittedDateOfBirth === ""){
				this.getView().byId("sEdittedDateOfBirthId").setValueState("None");	
			}else{
				this.getView().byId("sEdittedDateOfBirthId").setValueState("Error");
				this.getView().byId("sEdittedDateOfBirthId").setValueStateText("Enter proper date");
				// isFormValid = false; 
			}
			//class
			if(sEdittedClass.match(regExpClass) || sEdittedClass === ""){
				this.getView().byId("sEdittedClassId").setValueState("None");
			}else{
				this.getView().byId("sEdittedClassId").setValueState("Error");
				this.getView().byId("sEdittedClassId").setValueStateText("Enter grade in 2-digit format");
				// isFormValid = false; 
			}
			//father's name
			if(sEdittedFatherName.match(regExpName)){
				this.getView().byId("sEdittedFatherNameId").setValueState("None");	
			}else{
				this.getView().byId("sEdittedFatherNameId").setValueState("Error");
				this.getView().byId("sEdittedFatherNameId").setValueStateText("Name cannot contain numbers and special characters");
				// isFormValid = false; 
			}
			//mother's name
			if(sEdittedMotherName.match(regExpName) || sEdittedMotherName === ""){
				this.getView().byId("sEdittedMotherNameId").setValueState("None");	
			}else{
				this.getView().byId("sEdittedMotherNameId").setValueState("Error");
				this.getView().byId("sEdittedMotherNameId").setValueStateText("Name cannot contain numbers and special characters");
				// isFormValid = false; 
			}
			//father's mobile number
			if(sEdittedFatherMobile.match(regExpMobile)){
				this.getView().byId("sEdittedMobileId").setValueState("None");	
			}else{
				this.getView().byId("sEdittedMobileId").setValueState("Error");
				this.getView().byId("sEdittedMobileId").setValueStateText("Starting Digit >=6 and only 10 digits long");
				// isFormValid = false; 
			}
			//email
			if(sEdittedEmail.match(regExpEmail)){
				this.getView().byId("sEdittedEmailId").setValueState("None");	
			}else{
				this.getView().byId("sEdittedEmailId").setValueState("Error");
				this.getView().byId("sEdittedEmailId").setValueStateText("Enter proper Email eg: userid@domain.com");
				// isFormValid = false; 
			}
			//mandatory fields
			if(sEdittedName === "" || sEdittedRollNo === "" || sEdittedFatherName === "" || sEdittedFatherMobile === "" || sEdittedEmail === ""){
				MessageBox.error("Fill all mandatory fields");	
				// isFormValid = false;
			}
			else if(sEdittedName.match(regExpName) && sEdittedRollNo.match(regExpRollNo)
				&& (sEdittedDateOfBirth !== "" || sEdittedDateOfBirth === "") && (sEdittedClass.match(regExpClass) || sEdittedClass === "") 
				&& sEdittedFatherName.match(regExpName) && ((sEdittedMotherName.match(regExpName) || sEdittedMotherName === ""))
				&& sEdittedFatherMobile.match(regExpMobile) && sEdittedEmail.match(regExpEmail))
			{
			
				// if(isFormValid){
					MessageBox.success("Editted Successfully");
					// this.getOwnerComponent().getRouter().navTo("schoolform");
				// }
				var updatedSchoolDataPayload = 
				{
					"Name" : sEdittedName,
					"RollNo" : sEdittedRollNo,
					"DOB" : sEdittedDateOfBirth,
					"Class" : sEdittedClass,
					"FatherName" : sEdittedFatherName,
					"MotherName" : sEdittedMotherName,
					"FatherMobile" : sEdittedFatherMobile,
					"Email" : sEdittedEmail 
				};
				debugger;
				//get model
				var oModel = this.getOwnerComponent().getModel("multiFormModel");
				
				//getArray
				var schoolDataArray = oModel.getData().SchoolData;
				
				//check for roll no match, if matched then get that record's index
				schoolDataArray.forEach((item, index) => {
					if(item.RollNo === sEdittedRollNo){
						this.selectedObjectAtIndex = index;
					}
				});
				//get the object/record of that index
				var previousStudentObject = oModel.getData().SchoolData[this.selectedObjectAtIndex];
				//replace old(previousStucentObject) with new/Editted(updatedPayload)
				Object.assign(previousStudentObject, updatedSchoolDataPayload);
				oModel.refresh(true);
				// oModel.getData().SchoolData.splice(selectedObjectAtIndex, 1);
				// oModel.getData().SchoolData.push(updatedSchoolDataPayload);
				// oModel.getData().SchoolData.ButtonText = "Save";
				// oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
				// oModel.getData().SchoolData.push(schoolPayload);
				// oModel.refresh(true);
				this.getOwnerComponent().getRouter().navTo("schoolform");
			}
		},
		_OnPressCancelButtonGoToSchoolForm: function(){
			this.getOwnerComponent().getRouter().navTo("schoolform");
		}
	});
});