sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("com.dpzeightviews.controller.graduateform", {
		onInit: function (){
			var oTable = this.getView().byId("graduateTableId");
			oTable.attachItemPress(this._OnPressRowGoToEditGraduateForm, this);
			//clears form data
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("graduateform").attachMatched(this.clearGraduateFormData, this);
			var oDatePicker = this.getView().byId("gDateOfBirthId");
            var oToday = new Date();
            oDatePicker.setMaxDate(oToday);
		},
		clearGraduateFormData: function(){
			this.getView().byId("gNameId").setValue("");
			this.getView().byId("gRollNoId").setValue("");
			this.getView().byId("gDateOfBirthId").setValue("");
			this.getView().byId("gAgeId").setValue("");
			this.getView().byId("gBranchId").setValue("");
			this.getView().byId("gEmailId").setValue("");
			this.getView().byId("gFatherNameId").setValue("");
			this.getView().byId("gMobileId").setValue("");
			this.getView().byId("gPlaceId").setValue("");
			
			this.getView().byId("gNameId").setValueState("None");
			this.getView().byId("gRollNoId").setValueState("None");
			this.getView().byId("gDateOfBirthId").setValueState("None");
			this.getView().byId("gAgeId").setValueState("None");
			this.getView().byId("gBranchId").setValueState("None");
			this.getView().byId("gEmailId").setValueState("None");
			this.getView().byId("gFatherNameId").setValueState("None");
			this.getView().byId("gMobileId").setValueState("None");
			this.getView().byId("gPlaceId").setValueState("None");
			
		},
		_OnPressSchoolGoToSchoolFormView : function() {
			var gName = this.getView().byId("gNameId").getValue();
			var gRollNo = this.getView().byId("gRollNoId").getValue();
			var gDateOfBirth = this.getView().byId("gDateOfBirthId").getValue();
			var gAge = this.getView().byId("gAgeId").getValue();
			var gBranch = this.getView().byId("gBranchId").getValue();
			var gEmail = this.getView().byId("gEmailId").getValue();
			var gFatherName = this.getView().byId("gFatherNameId").getValue();
			var gFatherMobile = this.getView().byId("gMobileId").getValue();
			var gPlace = this.getView().byId("gPlaceId").getValue();
			
			if(gName !== "" || gRollNo !== "" || gDateOfBirth !== "" || gAge !== "" 
				|| gBranch !== "" || gEmail !== "" || gFatherName !== "" || gFatherMobile !== "" || gPlace !== ""){
				
				//prompt user
					MessageBox.confirm("Your Form Data will be cleared !! Are you sure you want to navigate?",{
						onClose: (oAction) => { // Using arrow function to maintain scope of 'this'
			            	if (oAction === MessageBox.Action.OK) { // Using MessageBox.Action.OK for comparison
			            		debugger;
			                	this.getOwnerComponent().getRouter().navTo("schoolform");
			            	}
		        		}	
					});
			}else{
				this.getOwnerComponent().getRouter().navTo("schoolform");
			}
			
		},
		_OnPressIntermediateGoToIntermediateFormView: function() {
			var gName = this.getView().byId("gNameId").getValue();
			var gRollNo = this.getView().byId("gRollNoId").getValue();
			var gDateOfBirth = this.getView().byId("gDateOfBirthId").getValue();
			var gAge = this.getView().byId("gAgeId").getValue();
			var gBranch = this.getView().byId("gBranchId").getValue();
			var gEmail = this.getView().byId("gEmailId").getValue();
			var gFatherName = this.getView().byId("gFatherNameId").getValue();
			var gFatherMobile = this.getView().byId("gMobileId").getValue();
			var gPlace = this.getView().byId("gPlaceId").getValue();
			
			if(gName !== "" || gRollNo !== "" || gDateOfBirth !== "" || gAge !== "" 
				|| gBranch !== "" || gEmail !== "" || gFatherName !== "" || gFatherMobile !== "" || gPlace !== ""){
				
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
		_OnPressEmployeeGoToEmployeeFormView : function() {
			var gName = this.getView().byId("gNameId").getValue();
			var gRollNo = this.getView().byId("gRollNoId").getValue();
			var gDateOfBirth = this.getView().byId("gDateOfBirthId").getValue();
			var gAge = this.getView().byId("gAgeId").getValue();
			var gBranch = this.getView().byId("gBranchId").getValue();
			var gEmail = this.getView().byId("gEmailId").getValue();
			var gFatherName = this.getView().byId("gFatherNameId").getValue();
			var gFatherMobile = this.getView().byId("gMobileId").getValue();
			var gPlace = this.getView().byId("gPlaceId").getValue();
			
			if(gName !== "" || gRollNo !== "" || gDateOfBirth !== "" || gAge !== "" 
				|| gBranch !== "" || gEmail !== "" || gFatherName !== "" || gFatherMobile !== "" || gPlace !== ""){
				
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
		_OnPressBackButtonGoToIntermediateForm : function() { 
			var gName = this.getView().byId("gNameId").getValue();
			var gRollNo = this.getView().byId("gRollNoId").getValue();
			var gDateOfBirth = this.getView().byId("gDateOfBirthId").getValue();
			var gAge = this.getView().byId("gAgeId").getValue();
			var gBranch = this.getView().byId("gBranchId").getValue();
			var gEmail = this.getView().byId("gEmailId").getValue();
			var gFatherName = this.getView().byId("gFatherNameId").getValue();
			var gFatherMobile = this.getView().byId("gMobileId").getValue();
			var gPlace = this.getView().byId("gPlaceId").getValue();
			
			if(gName !== "" || gRollNo !== "" || gDateOfBirth !== "" || gAge !== "" 
				|| gBranch !== "" || gEmail !== "" || gFatherName !== "" || gFatherMobile !== "" || gPlace !== ""){
				
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
		calculateAge : function(){
			var gDateOfBirth = this.getView().byId("gDateOfBirthId").getValue();
			var dobDate = new Date(gDateOfBirth);
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
		     this.getView().byId("gAgeId").setValue(calculatedAge);
		    
		},
		_OnPressSubmitButtonDisplayGraduateTable : function() {
			var regExpName = /^[A-Za-z\s]+$/;
			var regExpRollNo = /^G[0-9]{2}[A-Z]{1}$/;
			// var regExpDOB = //;
			var regExpBranch = /^[A-Za-z\s]+$/;
			var regExpMobile = /[6-9]{1}[0-9]{9}$/;
			var regExpEmail = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
			var regExpPlace = /^[A-Za-z\s]+$/;
			
			var gName = this.getView().byId("gNameId").getValue();
			var gRollNo = this.getView().byId("gRollNoId").getValue();
			var gDateOfBirth = this.getView().byId("gDateOfBirthId").getValue();
			var gAge = this.getView().byId("gAgeId").getValue();
			var gBranch = this.getView().byId("gBranchId").getValue();
			var gEmail = this.getView().byId("gEmailId").getValue();
			var gFatherName = this.getView().byId("gFatherNameId").getValue();
			var gFatherMobile = this.getView().byId("gMobileId").getValue();
			var gPlace = this.getView().byId("gPlaceId").getValue();
		
			//name
			if(gName.match(regExpName)){
				this.getView().byId("gNameId").setValueState("None");	
			}else{
				this.getView().byId("gNameId").setValueState("Error");
				this.getView().byId("gNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			//rollno
			if(gRollNo.match(regExpRollNo)){
				this.getView().byId("gRollNoId").setValueState("None");
			}else{
				this.getView().byId("gRollNoId").setValueState("Error");
				this.getView().byId("gRollNoId").setValueStateText("Rollno format eg:G12A (G2Digits1Alphabet)");
			}
			//dob
			if(gDateOfBirth !== ""){
				this.getView().byId("gDateOfBirthId").setValueState("None");	
			}else{
				this.getView().byId("gDateOfBirthId").setValueState("Error");
				this.getView().byId("gDateOfBirthId").setValueStateText("Enter proper date");
			}
			//age should be between 20 to 25 inclusive
			if(gAge >= 20 && gAge <= 25){
				this.getView().byId("gDateOfBirthId").setValueState("None");
			}else{
				this.getView().byId("gDateOfBirthId").setValueState("Error");
				this.getView().byId("gDateOfBirthId").setValueStateText("Age should be between 20 to 25");
			}
			//branch
			if(gBranch.match(regExpBranch)){
				this.getView().byId("gBranchId").setValueState("None");
			}else{
				this.getView().byId("gBranchId").setValueState("Error");
				this.getView().byId("gBranchId").setValueStateText("Enter grade in 2-digit format");
			}
			//email
			if(gEmail.match(regExpEmail)){
				this.getView().byId("gEmailId").setValueState("None");	
			}else{
				this.getView().byId("gEmailId").setValueState("Error");
				this.getView().byId("gEmailId").setValueStateText("Enter proper Email eg: userid@domain.com");
			}
			//father's name
			if(gFatherName.match(regExpName)){
				this.getView().byId("gFatherNameId").setValueState("None");	
			}else{
				this.getView().byId("gFatherNameId").setValueState("Error");
				this.getView().byId("gFatherNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			//father's mobile number
			if(gFatherMobile.match(regExpMobile)){
				this.getView().byId("gMobileId").setValueState("None");	
			}else{
				this.getView().byId("gMobileId").setValueState("Error");
				this.getView().byId("gMobileId").setValueStateText("Starting Digit >=6 and only 10 digits long");
			}
			//place
			if(gPlace.match(regExpPlace)){
				this.getView().byId("gPlaceId").setValueState("None");	
			}else{
				this.getView().byId("gPlaceId").setValueState("Error");
				this.getView().byId("gPlaceId").setValueStateText("No numbers allowed");
			}
			//match all
			if(gName === "" || gRollNo === "" || gDateOfBirth === "" || gBranch === "" || gEmail === "" || gFatherName === "" || gFatherMobile === "" || gPlace === "")
			{
				MessageBox.error("Fill all mandatory fields");	
			}
			else if(gName.match(regExpName) && gRollNo.match(regExpRollNo)
				&& gDateOfBirth !== "" && (gAge >= 20 && gAge <=25) && gBranch.match(regExpBranch) 
				&& gEmail.match(regExpEmail) && gFatherName.match(regExpName)
				&& gFatherMobile.match(regExpMobile) &&  gPlace.match(regExpPlace))
			{
				MessageBox.success("Success");
				var graduatePayload = 
				{
					"Name" : gName,
					"RollNo" : gRollNo,
					"DOB" : gDateOfBirth,
					"Age" : gAge,
					"Branch" : gBranch,
					"Email" : gEmail,
					"FatherName" : gFatherName,
					"FatherMobile" : gFatherMobile,
					"Place" : gPlace
				};
				//get model
				var oModel = this.getOwnerComponent().getModel("multiFormModel");
				oModel.getData().GraduateData.push(graduatePayload);
				oModel.refresh(true);
				// this.getOwnerComponent().getRouter().navTo("zstudentstatictableview");
				// oModel.setProperty("/FormData", payload);
				// var table = this.getView().byId("table2Id");
				// table.setVisible(true);
				//clear input fields
				this.getView().byId("gNameId").setValue("");
				this.getView().byId("gRollNoId").setValue("");
				this.getView().byId("gDateOfBirthId").setValue("");
				this.getView().byId("gAgeId").setValue("");
				this.getView().byId("gBranchId").setValue("");
				this.getView().byId("gEmailId").setValue("");
				this.getView().byId("gFatherNameId").setValue("");
				this.getView().byId("gMobileId").setValue("");
				this.getView().byId("gPlaceId").setValue("");
			}
		},
		_OnPressRowGoToEditGraduateForm: function(){
			var oModel = this.getOwnerComponent().getModel("multiFormModel");
			var selectedRow = this.getView().byId("graduateTableId").getSelectedItem().getBindingContext("multiFormModel").getObject();
			if(!oModel.getData().EdittedGraduateData){
				oModel.setProperty("/EdittedGraduateData", selectedRow);
			}
			oModel.getData().EdittedGraduateData.ButtonText = "Edit";
			oModel.setProperty("/EdittedGraduateData", selectedRow);
			oModel.refresh(true);
			this.getOwnerComponent().getRouter().navTo("graduateformdata");
		},
		//information
		_OnPressInfoButtonDisplayLabelAndTextInGraduateFormData: function(oEvent){
			var oModel = this.getOwnerComponent().getModel("multiFormModel");
			var selectedRow = oEvent.getSource().getParent().getBindingContext("multiFormModel").getObject();
			// this.getView().byId("studentTableId").getSelectedItem().getBindingContext("multiFormModel").getObject();
			if(!oModel.getData().EdittedGraduateData){
					oModel.setProperty("/EdittedGraduateData", selectedRow);
			}
			oModel.getData().EdittedGraduateData.ButtonText = "Information";
			oModel.setProperty("/EdittedGraduateData", selectedRow);
			oModel.refresh(true);
			this.getOwnerComponent().getRouter().navTo("graduateformdata");
		},
		//delete
		_OnPressDeleteButtonDeleteRowInGraduateForm: function(oEvent){
		var oModel = this.getOwnerComponent().getModel("multiFormModel");
		var selectedRow = oEvent.getSource().getParent().getBindingContext("multiFormModel").getObject();
			MessageBox.confirm("Are you sure you want to delete it permanently?", 
			{
				onClose: function (oAction){
					if(oAction === "OK")
					{
						if(oModel.getData().GraduateData){
							var selectedObjectAtIndex = oModel.getData().GraduateData.indexOf(selectedRow);
							oModel.getData().GraduateData.splice(selectedObjectAtIndex, 1);
							// oModel.getData().GraduateData.pop();
						}
						oModel.refresh(true);
					}
				}
			});
		}
	});
});