sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("com.dpzeightviews.controller.graduateformdata", {
		onInit: function(){
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("graduateformdata").attachMatched(this.onRouteMatched, this);
			var oDatePicker = this.getView().byId("gEdittedDateOfBirthId");
            var oToday = new Date();
            oDatePicker.setMaxDate(oToday);
		},
		onRouteMatched: function(){
			var oData = this.getOwnerComponent().getModel("multiFormModel").getData().EdittedGraduateData;
			var oView = this.getView();
			if(oData.ButtonText === "Information"){
				oView.byId("graduationDetailsLabelTextFormId").setVisible(true);
				oView.byId("graduationDetailsEditFormId").setVisible(false);
				oView.byId("saveEdittedGraduateFormButtonId").setVisible(false);
			}else if(oData.ButtonText === "Edit"){
				oView.byId("graduationDetailsLabelTextFormId").setVisible(false);
				oView.byId("graduationDetailsEditFormId").setVisible(true);
				oView.byId("saveEdittedGraduateFormButtonId").setVisible(true);
			}
		},
		_OnPressBackButtonGoToGraduateForm: function(){
			this.getOwnerComponent().getRouter().navTo("graduateform");
		},
		calculateEdittedAge : function(){
			var gEdittedDateOfBirth = this.getView().byId("gEdittedDateOfBirthId").getValue();
			var dobDate = new Date(gEdittedDateOfBirth);
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
		     this.getView().byId("gEdittedAgeId").setValue(calculatedAge);
		},
		_OnPressSaveButtonGoToGraduateForm: function(){
			var regExpName = /^[A-Za-z\s]+$/;
			var regExpRollNo = /^G[0-9]{2}[A-Z]{1}$/;
			// var regExpDOB = //;
			var regExpBranch = /^[A-Za-z\s]+$/;
			var regExpMobile = /[6-9]{1}[0-9]{9}$/;
			var regExpEmail = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
			var regExpPlace = /^[A-Za-z\s]+$/;
			
			var gEdittedName = this.getView().byId("gEdittedNameId").getValue();
			var gEdittedRollNo = this.getView().byId("gEdittedRollNoId").getValue();
			var gEdittedDateOfBirth = this.getView().byId("gEdittedDateOfBirthId").getValue();
			var gEdittedAge = this.getView().byId("gEdittedAgeId").getValue();
			var gEdittedBranch = this.getView().byId("gEdittedBranchId").getValue();
			var gEdittedEmail = this.getView().byId("gEdittedEmailId").getValue();
			var gEdittedFatherName = this.getView().byId("gEdittedFatherNameId").getValue();
			var gEdittedFatherMobile = this.getView().byId("gEdittedMobileId").getValue();
			var gEdittedPlace = this.getView().byId("gEdittedPlaceId").getValue();
		
			//name
			if(gEdittedName.match(regExpName)){
				this.getView().byId("gEdittedNameId").setValueState("None");	
			}else{
				this.getView().byId("gEdittedNameId").setValueState("Error");
				this.getView().byId("gEdittedNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			//rollno
			if(gEdittedRollNo.match(regExpRollNo)){
				this.getView().byId("gEdittedRollNoId").setValueState("None");
			}else{
				this.getView().byId("gEdittedRollNoId").setValueState("Error");
				this.getView().byId("gEdittedRollNoId").setValueStateText("Rollno format eg:G12A (G2Digits1Alphabet)");
			}
			//dob
			if(gEdittedDateOfBirth !== ""){
				this.getView().byId("gEdittedDateOfBirthId").setValueState("None");	
			}else{
				this.getView().byId("gEdittedDateOfBirthId").setValueState("Error");
				this.getView().byId("gEdittedDateOfBirthId").setValueStateText("Enter proper date");
			}
			//age should be between 20 to 25 inclusive
			if(gEdittedAge >= 20 && gEdittedAge <= 25){
				this.getView().byId("gEdittedDateOfBirthId").setValueState("None");
			}else{
				this.getView().byId("gEdittedDateOfBirthId").setValueState("Error");
				this.getView().byId("gEdittedDateOfBirthId").setValueStateText("Age should be between 20 to 25");
			}
			//branch
			if(gEdittedBranch.match(regExpBranch)){
				this.getView().byId("gEdittedBranchId").setValueState("None");
			}else{
				this.getView().byId("gEdittedBranchId").setValueState("Error");
				this.getView().byId("gEdittedBranchId").setValueStateText("Enter grade in 2-digit format");
			}
			//email
			if(gEdittedEmail.match(regExpEmail)){
				this.getView().byId("gEdittedEmailId").setValueState("None");	
			}else{
				this.getView().byId("gEdittedEmailId").setValueState("Error");
				this.getView().byId("gEdittedEmailId").setValueStateText("Enter proper Email eg: userid@domain.com");
			}
			//father's name
			if(gEdittedFatherName.match(regExpName)){
				this.getView().byId("gEdittedFatherNameId").setValueState("None");	
			}else{
				this.getView().byId("gEdittedFatherNameId").setValueState("Error");
				this.getView().byId("gEdittedFatherNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			//father's mobile number
			if(gEdittedFatherMobile.match(regExpMobile)){
				this.getView().byId("gEdittedMobileId").setValueState("None");	
			}else{
				this.getView().byId("gEdittedMobileId").setValueState("Error");
				this.getView().byId("gEdittedMobileId").setValueStateText("Starting Digit >=6 and only 10 digits long");
			}
			//place
			if(gEdittedPlace.match(regExpPlace)){
				this.getView().byId("gEdittedPlaceId").setValueState("None");	
			}else{
				this.getView().byId("gEdittedPlaceId").setValueState("Error");
				this.getView().byId("gEdittedPlaceId").setValueStateText("No numbers allowed");
			}
			//match all
			if(gEdittedName === "" || gEdittedRollNo === "" || gEdittedDateOfBirth === "" || gEdittedBranch === "" || gEdittedEmail === "" || gEdittedFatherName === "" || gEdittedFatherMobile === "" || gEdittedPlace === "")
			{
				MessageBox.error("Fill all mandatory fields");	
			}
			else if(gEdittedName.match(regExpName) && gEdittedRollNo.match(regExpRollNo)
				&& gEdittedDateOfBirth !== "" && (gEdittedAge >= 20 && gEdittedAge <= 25) && gEdittedBranch.match(regExpBranch) 
				&& gEdittedEmail.match(regExpEmail) && gEdittedFatherName.match(regExpName)
				&& gEdittedFatherMobile.match(regExpMobile) &&  gEdittedPlace.match(regExpPlace))
			{
				MessageBox.success("Editted Successfully");
				
				var updatedGraduateDataPayload = {
					"Name" : gEdittedName,
					"RollNo" : gEdittedRollNo,
					"DOB" : gEdittedDateOfBirth,
					"Age" : gEdittedAge,
					"Branch" : gEdittedBranch,
					"Email" : gEdittedEmail,
					"FatherName" : gEdittedFatherName,
					"FatherMobile" : gEdittedFatherMobile,
					"Place" : gEdittedPlace
				};
				
				var oModel = this.getOwnerComponent().getModel("multiFormModel");
				var graduateDataArray = oModel.getData().GraduateData;
				graduateDataArray.forEach((item, index) => {
					if(item.RollNo === gEdittedRollNo){
						this.selectedObjectAtIndex = index;
					}
				});
				var previousGraduateObject = oModel.getData().GraduateData[this.selectedObjectAtIndex];
				Object.assign(previousGraduateObject, updatedGraduateDataPayload);
				oModel.refresh(true);
				this.getOwnerComponent().getRouter().navTo("graduateform");
			}
		},
		_OnPressCancelButtonGoToGraduateForm: function(){
			this.getOwnerComponent().getRouter().navTo("graduateform");
		}
	});
});