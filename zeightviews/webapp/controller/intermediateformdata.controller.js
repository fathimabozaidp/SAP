sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("com.dpzeightviews.controller.intermediateformdata", {
		onInit: function(){
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("intermediateformdata").attachMatched(this.onRouteMatched, this);
			var oDatePicker = this.getView().byId("iEdittedDateOfBirthId");
            var oToday = new Date();
            oDatePicker.setMaxDate(oToday);
		},
		onRouteMatched: function(){
			var oData = this.getOwnerComponent().getModel("multiFormModel").getData().EdittedIntermediateData;
			var oView = this.getView();
			if(oData.ButtonText === "Information"){
				oView.byId("intermediateDetailsLabelTextFormId").setVisible(true);
				oView.byId("intermediateDetailsEditFormId").setVisible(false);
				oView.byId("saveEdittedIntermediateFormButtonId").setVisible(false);
			}else if(oData.ButtonText === "Edit"){
				oView.byId("intermediateDetailsLabelTextFormId").setVisible(false);
				oView.byId("intermediateDetailsEditFormId").setVisible(true);
				oView.byId("saveEdittedIntermediateFormButtonId").setVisible(true);
			}
		},
		_OnPressBackButtonGoToIntermediateForm: function (){
			this.getOwnerComponent().getRouter().navTo("intermediateform");
		},
		calculateEdittedAge : function(){
			var iEdittedDateOfBirth = this.getView().byId("iEdittedDateOfBirthId").getValue();
			var dobDate = new Date(iEdittedDateOfBirth);
			var dobDay = dobDate.getDate();
			var dobMonth = dobDate.getMonth()+1;
			var dobYear = dobDate.getFullYear();
			var calculatedAge = 0;
			var todayDate = new Date();
			var todayDay = todayDate.getDate();
		    var todayMonth = todayDate.getMonth() + 1; //STRANGE NUMBERING //January is 0!
		    var todayYear = todayDate.getFullYear();
		    if(todayMonth > dobMonth){
		    	calculatedAge = todayYear - dobYear;	
		    }else if(todayMonth === dobMonth){
		    	if(todayDay >= dobDay){
		    		calculatedAge = todayYear - dobYear;
		    	}else{
		    		calculatedAge = todayYear - dobYear-1;
		    	}
		    }
		    else{
				 calculatedAge = todayYear - dobYear-1;	
		    }
		     this.getView().byId("iEdittedAgeId").setValue(calculatedAge);
		    
		},
		_OnPressSaveButtonGoToIntermediateForm: function (){
			var regExpName = /^[A-Za-z\s]+$/;
			var regExpRollNo = /^I[0-9]{2}[A-Z]{1}$/;
			var regExpClass = /^[0-9]{2}$/;
			var regExpMobile = /[6-9]{1}[0-9]{9}$/;
			var regExpEmail = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
			
			var iEdittedName = this.getView().byId("iEdittedNameId").getValue();
			var iEdittedRollNo = this.getView().byId("iEdittedRollNoId").getValue();
			var iEdittedDateOfBirth = this.getView().byId("iEdittedDateOfBirthId").getValue();
			var iEdittedAge = this.getView().byId("iEdittedAgeId").getValue();
			var iEdittedClass = this.getView().byId("iEdittedClassId").getValue();
			var iEdittedFatherName = this.getView().byId("iEdittedFatherNameId").getValue();
			var iEdittedMotherName = this.getView().byId("iEdittedMotherNameId").getValue();
			var iEdittedFatherMobile = this.getView().byId("iEdittedMobileId").getValue();
			var iEdittedEmail = this.getView().byId("iEdittedEmailId").getValue();
			//name
			if(iEdittedName.match(regExpName)){
				this.getView().byId("iEdittedNameId").setValueState("None");	
			}else{
				this.getView().byId("iEdittedNameId").setValueState("Error");
				this.getView().byId("iEdittedNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			//rollno
			if(iEdittedRollNo.match(regExpRollNo)){
				this.getView().byId("iEdittedRollNoId").setValueState("None");
			}else{
				this.getView().byId("iEdittedRollNoId").setValueState("Error");
				this.getView().byId("iEdittedRollNoId").setValueStateText("Rollno format(I2Digits1Alphabet) eg: I12A ");
			}
			//dob
			if(iEdittedDateOfBirth !== ""){
				this.getView().byId("iEdittedDateOfBirthId").setValueState("None");	
			}else{
				this.getView().byId("iEdittedDateOfBirthId").setValueState("Error");
				this.getView().byId("iEdittedDateOfBirthId").setValueStateText("Enter proper date");
			}
			//age should be greater than or equal to 15
			if(iEdittedAge >= 15){
					this.getView().byId("iEdittedDateOfBirthId").setValueState("None");
			}else{
				this.getView().byId("iEdittedDateOfBirthId").setValueState("Error");
				this.getView().byId("iEdittedDateOfBirthId").setValueStateText("Age should be greater than or equal to 15");
			}
			//class
			if(iEdittedClass.match(regExpClass) || iEdittedClass === ""){
				this.getView().byId("iEdittedClassId").setValueState("None");
			}else{
				this.getView().byId("iEdittedClassId").setValueState("Error");
				this.getView().byId("iEdittedClassId").setValueStateText("Enter grade in 2-digit format");
			}
			//father's name
			if(iEdittedFatherName.match(regExpName)){
				this.getView().byId("iEdittedFatherNameId").setValueState("None");	
			}else{
				this.getView().byId("iEdittedFatherNameId").setValueState("Error");
				this.getView().byId("iEdittedFatherNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			//mother's name
			if(iEdittedMotherName.match(regExpName) || iEdittedMotherName === ""){
				this.getView().byId("iEdittedMotherNameId").setValueState("None");	
			}else{
				this.getView().byId("iEdittedMotherNameId").setValueState("Error");
				this.getView().byId("iEdittedMotherNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			//father's mobile number
			if(iEdittedFatherMobile.match(regExpMobile)){
				this.getView().byId("iEdittedMobileId").setValueState("None");	
			}else{
				this.getView().byId("iEdittedMobileId").setValueState("Error");
				this.getView().byId("iEdittedMobileId").setValueStateText("Starting Digit >=6 and only 10 digits long");
			}
			//email
			if(iEdittedEmail.match(regExpEmail) || iEdittedEmail === ""){
				this.getView().byId("iEdittedEmailId").setValueState("None");	
			}else{
				this.getView().byId("iEdittedEmailId").setValueState("Error");
				this.getView().byId("iEdittedEmailId").setValueStateText("Enter proper Email eg: userid@domain.com");
			}
			//match all
			if(iEdittedName === "" || iEdittedRollNo === "" || iEdittedFatherName === "" || iEdittedFatherMobile === "" || iEdittedDateOfBirth === ""){
				MessageBox.error("Fill all mandatory fields");	
			}else if(iEdittedName.match(regExpName) && iEdittedRollNo.match(regExpRollNo)
				&& iEdittedDateOfBirth !== "" && iEdittedAge >= 15 && (iEdittedClass.match(regExpClass) || iEdittedClass === "") 
				&& iEdittedFatherName.match(regExpName) && ((iEdittedMotherName.match(regExpName) || iEdittedMotherName === ""))
				&& iEdittedFatherMobile.match(regExpMobile) && (iEdittedEmail.match(regExpEmail) || iEdittedEmail === "")
			)
			{
				MessageBox.success("Editted Successfully");
				var updatedIntermediateDataPayload = {
					"Name" : iEdittedName,
					"RollNo" : iEdittedRollNo,
					"DOB" : iEdittedDateOfBirth,
					"Age" : iEdittedAge,
					"Class" : iEdittedClass,
					"FatherName" : iEdittedFatherName,
					"MotherName" : iEdittedMotherName,
					"FatherMobile" : iEdittedFatherMobile,
					"Email" : iEdittedEmail 
				};
				var oModel = this.getOwnerComponent().getModel("multiFormModel"); 
				
				var intermediateDataArray = oModel.getData().IntermediateData;
				intermediateDataArray.forEach((item, index) => {
					if(item.RollNo === iEdittedRollNo){
						this.selectedObjectAtIndex = index;
					}
				});
				var previousIntermediateObject = oModel.getData().IntermediateData[this.selectedObjectAtIndex];
				Object.assign(previousIntermediateObject, updatedIntermediateDataPayload);
				oModel.refresh(true);
				this.getOwnerComponent().getRouter().navTo("intermediateform");
			}
		},
		_OnPressCancelButtonGoToIntermediateForm: function(){
			this.getOwnerComponent().getRouter().navTo("intermediateform");
		}
	});
});