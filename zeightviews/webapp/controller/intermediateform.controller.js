sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("com.dpzeightviews.controller.intermediateform", {
		onInit:function(){
			var oTable = this.getView().byId("intermediateTableId");
			oTable.attachItemPress(this._OnPressRowGoToEditIntermediateForm, this);
			//clears form data
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("intermediateform").attachMatched(this.clearIntermediateFormData, this);
			// oRouter.getRoute("intermediateform").attachMatched(this.checkNavigationWithOrWithoutDataInPreviousView, this);
			var oDatePicker = this.getView().byId("iDateOfBirthId");
            var oToday = new Date();
            oDatePicker.setMaxDate(oToday);
		},
		clearIntermediateFormData: function(){
			this.getView().byId("iNameId").setValue("");
			this.getView().byId("iRollNoId").setValue("");
			this.getView().byId("iDateOfBirthId").setValue("");
			this.getView().byId("iAgeId").setValue("");
			this.getView().byId("iClassId").setValue("");
			this.getView().byId("iFatherNameId").setValue("");
			this.getView().byId("iMotherNameId").setValue("");
			this.getView().byId("iMobileId").setValue("");
			this.getView().byId("iEmailId").setValue("");
			
			this.getView().byId("iNameId").setValueState("None");
			this.getView().byId("iRollNoId").setValueState("None");
			this.getView().byId("iDateOfBirthId").setValueState("None");
			this.getView().byId("iAgeId").setValueState("None");
			this.getView().byId("iClassId").setValueState("None");
			this.getView().byId("iFatherNameId").setValueState("None");
			this.getView().byId("iMotherNameId").setValueState("None");
			this.getView().byId("iMobileId").setValueState("None");
			this.getView().byId("iEmailId").setValueState("None");
		},
		_OnPressSchoolGoToSchoolFormView : function() {
				
			var iName = this.getView().byId("iNameId").getValue();
			var iRollNo = this.getView().byId("iRollNoId").getValue();
			var iDateOfBirth = this.getView().byId("iDateOfBirthId").getValue();
			var iAge = this.getView().byId("iAgeId").getValue();
			var iClass = this.getView().byId("iClassId").getValue();
			var iFatherName = this.getView().byId("iFatherNameId").getValue();
			var iMotherName = this.getView().byId("iMotherNameId").getValue();
			var iFatherMobile = this.getView().byId("iMobileId").getValue();
			var iEmail = this.getView().byId("iEmailId").getValue();
			
			//if you are navigating with form data
			if(iName !== "" || iRollNo !== "" || iDateOfBirth !== "" || iAge !== "" || iClass !== "" 
				|| iFatherName !== "" || iMotherName !== "" || iFatherMobile !== "" || iEmail !== ""){
				//prompt user
					MessageBox.confirm("Your Form Data will be cleared !! Are you sure you want to navigate?",{
						onClose: (oAction) => { // Using arrow function to maintain scope of 'this'
			            	if (oAction === MessageBox.Action.OK) { // Using MessageBox.Action.OK for comparison
			            		debugger;
			                	this.getOwnerComponent().getRouter().navTo("schoolform");
			            	}
		        		}	
					});
			}
			else{
				this.getOwnerComponent().getRouter().navTo("schoolform");
			}
		},
		_OnPresGraduateGoToGraduateFormView : function() {
			var iName = this.getView().byId("iNameId").getValue();
			var iRollNo = this.getView().byId("iRollNoId").getValue();
			var iDateOfBirth = this.getView().byId("iDateOfBirthId").getValue();
			var iAge = this.getView().byId("iAgeId").getValue();
			var iClass = this.getView().byId("iClassId").getValue();
			var iFatherName = this.getView().byId("iFatherNameId").getValue();
			var iMotherName = this.getView().byId("iMotherNameId").getValue();
			var iFatherMobile = this.getView().byId("iMobileId").getValue();
			var iEmail = this.getView().byId("iEmailId").getValue();
			
			//if you are navigating with form data
			if(iName !== "" || iRollNo !== "" || iDateOfBirth !== "" || iAge !== "" || iClass !== "" 
				|| iFatherName !== "" || iMotherName !== "" || iFatherMobile !== "" || iEmail !== ""){
				//prompt user
					MessageBox.confirm("Your Form Data will be cleared !! Are you sure you want to navigate?",{
						onClose: (oAction) => { // Using arrow function to maintain scope of 'this'
			            	if (oAction === MessageBox.Action.OK) { // Using MessageBox.Action.OK for comparison
			            		debugger;
			                	this.getOwnerComponent().getRouter().navTo("graduateform");
			            	}
		        		}	
					});
			}
			else{
				this.getOwnerComponent().getRouter().navTo("graduateform");
			}
		
		},
		_OnPressEmployeeGoToEmployeeFormView : function() {
			var iName = this.getView().byId("iNameId").getValue();
			var iRollNo = this.getView().byId("iRollNoId").getValue();
			var iDateOfBirth = this.getView().byId("iDateOfBirthId").getValue();
			var iAge = this.getView().byId("iAgeId").getValue();
			var iClass = this.getView().byId("iClassId").getValue();
			var iFatherName = this.getView().byId("iFatherNameId").getValue();
			var iMotherName = this.getView().byId("iMotherNameId").getValue();
			var iFatherMobile = this.getView().byId("iMobileId").getValue();
			var iEmail = this.getView().byId("iEmailId").getValue();
			
			//if you are navigating with form data
			if(iName !== "" || iRollNo !== "" || iDateOfBirth !== "" || iAge !== "" || iClass !== "" 
				|| iFatherName !== "" || iMotherName !== "" || iFatherMobile !== "" || iEmail !== ""){
				//prompt user
					MessageBox.confirm("Your Form Data will be cleared !! Are you sure you want to navigate?",{
						onClose: (oAction) => { // Using arrow function to maintain scope of 'this'
			            	if (oAction === MessageBox.Action.OK) { // Using MessageBox.Action.OK for comparison
			            		debugger;
			                	this.getOwnerComponent().getRouter().navTo("employeeform");
			            	}
		        		}	
					});
			}
			else{
				this.getOwnerComponent().getRouter().navTo("employeeform");
			}
		
		},
		_OnPressBackButtonGoToSchoolForm : function() { 
			var iName = this.getView().byId("iNameId").getValue();
			var iRollNo = this.getView().byId("iRollNoId").getValue();
			var iDateOfBirth = this.getView().byId("iDateOfBirthId").getValue();
			var iAge = this.getView().byId("iAgeId").getValue();
			var iClass = this.getView().byId("iClassId").getValue();
			var iFatherName = this.getView().byId("iFatherNameId").getValue();
			var iMotherName = this.getView().byId("iMotherNameId").getValue();
			var iFatherMobile = this.getView().byId("iMobileId").getValue();
			var iEmail = this.getView().byId("iEmailId").getValue();
			
			//if you are navigating with form data
			if(iName !== "" || iRollNo !== "" || iDateOfBirth !== "" || iAge !== "" || iClass !== "" 
				|| iFatherName !== "" || iMotherName !== "" || iFatherMobile !== "" || iEmail !== ""){
				//prompt user
					MessageBox.confirm("Your Form Data will be cleared !! Are you sure you want to navigate?",{
						onClose: (oAction) => { // Using arrow function to maintain scope of 'this'
			            	if (oAction === MessageBox.Action.OK) { // Using MessageBox.Action.OK for comparison
			            		debugger;
			                	this.getOwnerComponent().getRouter().navTo("schoolform");
			            	}
		        		}	
					});
			}
			else{
				this.getOwnerComponent().getRouter().navTo("schoolform");
			}
		
		},
		calculateAge : function(){
			var iDateOfBirth = this.getView().byId("iDateOfBirthId").getValue();
			var dobDate = new Date(iDateOfBirth);
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
		     this.getView().byId("iAgeId").setValue(calculatedAge);
		    
		},
		_OnPressSubmitButtonDisplayIntermediateTable : function () {
			var regExpName = /^[A-Za-z\s]+$/;
			var regExpRollNo = /^I[0-9]{2}[A-Z]{1}$/;
			// var regExpDOB = //;
			var regExpClass = /^[0-9]{2}$/;
			var regExpMobile = /[6-9]{1}[0-9]{9}$/;
			var regExpEmail = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
			
			var iName = this.getView().byId("iNameId").getValue();
			var iRollNo = this.getView().byId("iRollNoId").getValue();
			var iDateOfBirth = this.getView().byId("iDateOfBirthId").getValue();
			var iAge = this.getView().byId("iAgeId").getValue();
			var iClass = this.getView().byId("iClassId").getValue();
			var iFatherName = this.getView().byId("iFatherNameId").getValue();
			var iMotherName = this.getView().byId("iMotherNameId").getValue();
			var iFatherMobile = this.getView().byId("iMobileId").getValue();
			var iEmail = this.getView().byId("iEmailId").getValue();
			//name
			if(iName.match(regExpName)){
				this.getView().byId("iNameId").setValueState("None");	
			}else{
				this.getView().byId("iNameId").setValueState("Error");
				this.getView().byId("iNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			//rollno
			if(iRollNo.match(regExpRollNo)){
				this.getView().byId("iRollNoId").setValueState("None");
			}else{
				this.getView().byId("iRollNoId").setValueState("Error");
				this.getView().byId("iRollNoId").setValueStateText("Rollno format(I2Digits1Alphabet) eg: I12A ");
			}
			//dob
			if(iDateOfBirth !== ""){
				this.getView().byId("iDateOfBirthId").setValueState("None");	
			}else{
				this.getView().byId("iDateOfBirthId").setValueState("Error");
				this.getView().byId("iDateOfBirthId").setValueStateText("Enter proper date");
			}
			//age should be > than 15
			if(iAge >= 15){
					this.getView().byId("iDateOfBirthId").setValueState("None");
					// this.getView().byId("iAgeId").setValueState("None");
			}else{
				this.getView().byId("iDateOfBirthId").setValueState("Error");
				this.getView().byId("iDateOfBirthId").setValueStateText("Age should be greater than or equal to 15");
			}
			//class
			if(iClass.match(regExpClass) || iClass === ""){
				this.getView().byId("iClassId").setValueState("None");
			}else{
				this.getView().byId("iClassId").setValueState("Error");
				this.getView().byId("iClassId").setValueStateText("Enter grade in 2-digit format");
			}
			//father's name
			if(iFatherName.match(regExpName)){
				this.getView().byId("iFatherNameId").setValueState("None");	
			}else{
				this.getView().byId("iFatherNameId").setValueState("Error");
				this.getView().byId("iFatherNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			//mother's name
			if(iMotherName.match(regExpName) || iMotherName === ""){
				this.getView().byId("iMotherNameId").setValueState("None");	
			}else{
				this.getView().byId("iMotherNameId").setValueState("Error");
				this.getView().byId("iMotherNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			//father's mobile number
			if(iFatherMobile.match(regExpMobile)){
				this.getView().byId("iMobileId").setValueState("None");	
			}else{
				this.getView().byId("iMobileId").setValueState("Error");
				this.getView().byId("iMobileId").setValueStateText("Starting Digit >=6 and only 10 digits long");
			}
			//email
			if(iEmail.match(regExpEmail) || iEmail === ""){
				this.getView().byId("iEmailId").setValueState("None");	
			}else{
				this.getView().byId("iEmailId").setValueState("Error");
				this.getView().byId("iEmailId").setValueStateText("Enter proper Email eg: userid@domain.com");
			}
			//match all
			if(iName === "" || iRollNo === "" || iFatherName === "" || iFatherMobile === "" || iDateOfBirth === ""){
				MessageBox.error("Fill all mandatory fields");	
			}else if(iName.match(regExpName) && iRollNo.match(regExpRollNo)
				&& iDateOfBirth !== "" && iAge >= 15 &&
				(iClass.match(regExpClass) || iClass === "") && iFatherName.match(regExpName) && 
				((iMotherName.match(regExpName) || iMotherName === ""))
				&& iFatherMobile.match(regExpMobile) && (iEmail.match(regExpEmail) || iEmail === "")
			)
			{
				MessageBox.success("Success");
				var intermediatePayload = 
				{
					"Name" : iName,
					"RollNo" : iRollNo,
					"DOB" : iDateOfBirth,
					"Age" : iAge,
					"Class" : iClass,
					"FatherName" : iFatherName,
					"MotherName" : iMotherName,
					"FatherMobile" : iFatherMobile,
					"Email" : iEmail 
				};
				//get model
				var oModel = this.getOwnerComponent().getModel("multiFormModel");
				oModel.getData().IntermediateData.push(intermediatePayload);
				oModel.refresh(true);
			
				//clear input fields
				this.getView().byId("iNameId").setValue("");
				this.getView().byId("iRollNoId").setValue("");
				this.getView().byId("iDateOfBirthId").setValue("");
				this.getView().byId("iAgeId").setValue("");
				this.getView().byId("iClassId").setValue("");
				this.getView().byId("iFatherNameId").setValue("");
				this.getView().byId("iMotherNameId").setValue("");
				this.getView().byId("iMobileId").setValue("");
				this.getView().byId("iEmailId").setValue("");
			}
		},
		_OnPressRowGoToEditIntermediateForm: function(){
			var oModel = this.getOwnerComponent().getModel("multiFormModel");
			var selectedRow = this.getView().byId("intermediateTableId").getSelectedItem().getBindingContext("multiFormModel").getObject();
			if(!oModel.getData().EdittedIntermediateData){
					oModel.setProperty("/EdittedIntermediateData", selectedRow);
			}
			oModel.getData().EdittedIntermediateData.ButtonText = "Edit";
			oModel.setProperty("/EdittedIntermediateData", selectedRow);
			oModel.refresh(true);
			this.getOwnerComponent().getRouter().navTo("intermediateformdata");
		},
		//information
		_OnPressInfoButtonDisplayLabelAndTextInIntermediateFormData: function(oEvent){
			var oModel = this.getOwnerComponent().getModel("multiFormModel");
			var selectedRow = oEvent.getSource().getParent().getBindingContext("multiFormModel").getObject();
			// this.getView().byId("studentTableId").getSelectedItem().getBindingContext("multiFormModel").getObject();
			if(!oModel.getData().EdittedIntermediateData){
					oModel.setProperty("/EdittedIntermediateData", selectedRow);
			}
			oModel.getData().EdittedIntermediateData.ButtonText = "Information";
			oModel.setProperty("/EdittedIntermediateData", selectedRow);
			oModel.refresh(true);
			this.getOwnerComponent().getRouter().navTo("intermediateformdata");
		},
		//delete
		_OnPressDeleteButtonDeleteRowInIntermediateForm: function(oEvent){
			var oModel = this.getOwnerComponent().getModel("multiFormModel");
			var selectedRow = oEvent.getSource().getParent().getBindingContext("multiFormModel").getObject();
			MessageBox.confirm("Are you sure you want to delete it permanently?", 
			{
				onClose: function (oAction){
					if(oAction === "OK")
					{
						if(oModel.getData().IntermediateData){
							var selectedObjectAtIndex = oModel.getData().IntermediateData.indexOf(selectedRow);
							oModel.getData().IntermediateData.splice(selectedObjectAtIndex, 1);
							// oModel.getData().IntermediateData.pop();
						}
						oModel.refresh(true);
					}
				}
			});
		}
	});
});