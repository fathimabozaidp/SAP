sap.ui.define([
	"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"sap/m/MessageBox"
], function(Controller, JSONModel, MessageBox) {
	"use strict";

	return Controller.extend("com.dpzemployeeHrForm.controller.editEmployeeDetails", {
		onInit: function(){
			debugger;
				// var oEdittedEmployeeData = this.getOwnerComponent().getModel("employeeHrModel").getData().EdittedEmployeeData;
				var oExperienceData = {
				"ExperienceData":[
					{
						"yearsId" : "1 Years",
						"years" : "1 Years"
					},
					{
						"yearsId" : "2 Years",
						"years" : "2 Years"
					},
					{
						"yearsId" : "3 Years",
						"years" : "3 Years"
					},
						{
						"yearsId" : "4 Years",
						"years" : "4 Years"
					},
						{
						"yearsId" : "5 Years",
						"years" : "5 Years"
					},
						{
						"yearsId" : "6 Years",
						"years" : "6 Years"
					},
						{
						"yearsId" : "7 Years",
						"years" : "7 Years"
					},
						{
						"yearsId" : "8 Years",
						"years" : "8 Years"
					},
						{
						"yearsId" : "9 Years",
						"years" :"9 Years"
					},
					{
						"yearsId" : "10 Years",
						"years" : "10 Years"
					}
			],
				"Editable": true,
				"Enabled": true
			};
				var oModel = new JSONModel(oExperienceData);
				this.getView().setModel(oModel);
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.getRoute("editEmployeeDetails").attachMatched(this.onRouteMatched, this);
		},
		onRouteMatched: function(){
			var oData = this.getOwnerComponent().getModel("employeeHrModel").getData().EdittedEmployeeData;
			debugger;
			if(oData.ButtonText !== "Edit"){
				debugger;
				this.clearEditEmployeeFormData();
			}
		},
		clearEditEmployeeFormData: function(){
			debugger;
			this.getView().byId("employeeEdittedNameId").setValue("");
			this.getView().byId("employeeEdittedId").setValue("");
			this.getView().byId("employeeEdittedEmailId").setValue("");
			this.getView().byId("employeeEdittedMobileId").setValue("");
			this.getView().byId("employeeEdittedBirthDateId").setValue("");
			this.getView().byId("employeeEdittedJoiningDateId").setValue("");
			this.getView().byId("employeeEdittedExperienceId").setForceSelection(false);
			this.getView().byId("employeeEdittedExperienceId").setSelectedKey("");
			this.getView().byId("employeeEdittedExperienceId").setValue("");
			
			this.getView().byId("employeeEdittedNameId").setValueState("None");
			this.getView().byId("employeeEdittedId").setValueState("None");
			this.getView().byId("employeeEdittedEmailId").setValueState("None");
			this.getView().byId("employeeEdittedMobileId").setValueState("None");
			this.getView().byId("employeeEdittedBirthDateId").setValueState("None");
			this.getView().byId("employeeEdittedJoiningDateId").setValueState("None");
			this.getView().byId("employeeEdittedExperienceId").setValueState("None");
			
		},
		_OnChangeValidateEdittedName: function(){
			var regExpName = /^[A-Za-z\s]+$/;
			var eEdittedName = this.getView().byId("employeeEdittedNameId").getValue().trim();
			
			if(eEdittedName.match(regExpName) || eEdittedName === ""){
				this.getView().byId("employeeEdittedNameId").setValueState("None");
			}else{
				this.getView().byId("employeeEdittedNameId").setValueState("Error");
				this.getView().byId("employeeEdittedNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
		},
		_OnChangeValidateEdittedId: function(){
			var regExpId = /^[0-9]{8}$/;
			var eEdittedId = this.getView().byId("employeeEdittedId").getValue();
			
			if(eEdittedId.match(regExpId) || eEdittedId === ""){
				this.getView().byId("employeeEdittedId").setValueState("None");
			}else{
				this.getView().byId("employeeEdittedId").setValueState("Error");
				this.getView().byId("employeeEdittedId").setValueStateText("Id Formatis 8 DIgits");
			}
		},
		_OnChangeValidateEdittedEmail: function(){
			var regExpEmail = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.com$/;
			var eEdittedEmail = this.getView().byId("employeeEdittedEmailId").getValue();
			
			if(eEdittedEmail.match(regExpEmail) || eEdittedEmail === ""){
				this.getView().byId("employeeEdittedEmailId").setValueState("None");	
			}else{
				this.getView().byId("employeeEdittedEmailId").setValueState("Error");
				this.getView().byId("employeeEdittedEmailId").setValueStateText("Enter proper Email eg: userid@domain.com");
			}
		},
		_OnChangeValidateEdittedMobile: function(){
			
			var regExpMobile = /[6-9]{1}[0-9]{9}$/;
			var eEdittedMobile = this.getView().byId("employeeEdittedMobileId").getValue();
			
			if(eEdittedMobile.match(regExpMobile) || eEdittedMobile === ""){
				this.getView().byId("employeeEdittedMobileId").setValueState("None");	
			}else{
				this.getView().byId("employeeEdittedMobileId").setValueState("Error");
				this.getView().byId("employeeEdittedMobileId").setValueStateText("Starting Digit >=6 and only 10 digits long");
			}
		},
		_OnChangeValidateEdittedDOB: function(){
			
			var eEdittedDOB = this.getView().byId("employeeEdittedBirthDateId").getValue();
			var dobDate = new Date(eEdittedDOB);
			var dobDay = dobDate.getDate();
			var dobMonth = dobDate.getMonth() + 1;
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
		    		calculatedAge = todayYear - dobYear - 1;
		    	}
		    }
		    else{
				 calculatedAge = todayYear - dobYear - 1;	
		    }
		    if(calculatedAge >= 24 || eEdittedDOB === ""){
				this.getView().byId("employeeEdittedBirthDateId").setValueState("None");	
			}else{
				this.getView().byId("employeeEdittedBirthDateId").setValueState("Error");
				this.getView().byId("employeeEdittedBirthDateId").setValueStateText("Age cannot be less than 24");
			}
		},
		_OnChangeValidateEdittedDOJ: function(){
			var eEdittedDOJ = this.getView().byId("employeeEdittedJoiningDateId").getValue();
			if(eEdittedDOJ !== ""){
				this.getView().byId("employeeEdittedJoiningDateId").setValueState("None");	
			}else{
				this.getView().byId("employeeEdittedJoiningDateId").setValueState("Error");
				this.getView().byId("employeeEdittedJoiningDateId").setValueStateText("Joining Date cannot have past dates");
			}
		},
		_OnChangeValidateEdittedExperience: function(){
			var eEdittedExperience = this.getView().byId("employeeEdittedExperienceId").getSelectedKey();
			var eEdittedExperienceNumber = eEdittedExperience.split(" ").shift();
			var eEdittedDOB = this.getView().byId("employeeEdittedBirthDateId").getValue();
			var dobDate = new Date(eEdittedDOB);
			var dobDay = dobDate.getDate();
			var dobMonth = dobDate.getMonth() + 1;
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
		    		calculatedAge = todayYear - dobYear - 1;
		    	}
		    }
		    else{
				 calculatedAge = todayYear - dobYear - 1;	
		    }
		    if(eEdittedDOB === ""){
		    		this.getView().byId("employeeEdittedExperienceId").setValueState("Error");
					this.getView().byId("employeeEdittedExperienceId").setValueStateText("Please enter Date of Birth");
		    }else if(eEdittedDOB !== ""){
			    if((calculatedAge - eEdittedExperienceNumber) >= 24){
					this.getView().byId("employeeEdittedExperienceId").setValueState("None");	
				}else{
					this.getView().byId("employeeEdittedExperienceId").setValueState("Error");
					this.getView().byId("employeeEdittedExperienceId").setValueStateText("Experience is fake");
				}	
		    }
			
		},
		_OnSaveUpdateDetailsToEmployeeTable: function(){
			var regExpName = /^[A-Za-z\s]+$/;
			var regExpId = /^[0-9]{8}$/;
			var regExpEmail = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.com$/;
			var regExpMobile = /[6-9]{1}[0-9]{9}$/;
			
			var eEdittedName = this.getView().byId("employeeEdittedNameId").getValue().trim();
			var eEdittedId = this.getView().byId("employeeEdittedId").getValue();
			var eEdittedEmail = this.getView().byId("employeeEdittedEmailId").getValue();
			var eEdittedMobile = this.getView().byId("employeeEdittedMobileId").getValue();
			var eEdittedDOB = this.getView().byId("employeeEdittedBirthDateId").getValue();
			var eEdittedDOJ = this.getView().byId("employeeEdittedJoiningDateId").getValue();
			var eEdittedExperience = this.getView().byId("employeeEdittedExperienceId").getSelectedKey();
			
			//DOB validation
			var dobDate = new Date(eEdittedDOB);
			var dobDay = dobDate.getDate();
			var dobMonth = dobDate.getMonth() + 1;
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
		    		calculatedAge = todayYear - dobYear - 1;
		    	}
		    }
		    else{
				 calculatedAge = todayYear - dobYear - 1;	
		    }
		    if(calculatedAge >= 24 || eEdittedDOB === ""){
				this.getView().byId("employeeEdittedBirthDateId").setValueState("None");	
			}else{
				this.getView().byId("employeeEdittedBirthDateId").setValueState("Error");
				this.getView().byId("employeeEdittedBirthDateId").setValueStateText("Age cannot be less than 24");
			}
			
			//Experience
			var eEdittedExperienceNumber = eEdittedExperience.split(" ").shift();
			//name
			if(eEdittedName.match(regExpName) || eEdittedName === ""){
				this.getView().byId("employeeEdittedNameId").setValueState("None");
			}else{
				this.getView().byId("employeeEdittedNameId").setValueState("Error");
				this.getView().byId("employeeEdittedNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			//id
			if(eEdittedId.match(regExpId) || eEdittedId === ""){
				this.getView().byId("employeeEdittedId").setValueState("None");
			}else{
				this.getView().byId("employeeEdittedId").setValueState("Error");
				this.getView().byId("employeeEdittedId").setValueStateText("Id Formatis 8 DIgits");
			}
			//email
			if(eEdittedEmail.match(regExpEmail) || eEdittedEmail === ""){
				this.getView().byId("employeeEdittedEmailId").setValueState("None");	
			}else{
				this.getView().byId("employeeEdittedEmailId").setValueState("Error");
				this.getView().byId("employeeEdittedEmailId").setValueStateText("Enter proper Email eg: userid@domain.com");
			}
			//mobile
			if(eEdittedMobile.match(regExpMobile) || eEdittedMobile === ""){
				this.getView().byId("employeeEdittedMobileId").setValueState("None");	
			}else{
				this.getView().byId("employeeEdittedMobileId").setValueState("Error");
				this.getView().byId("employeeEdittedMobileId").setValueStateText("Starting Digit >=6 and only 10 digits long");
			}
			//dob
			 if(calculatedAge >= 24 || eEdittedDOB === ""){
				this.getView().byId("employeeEdittedBirthDateId").setValueState("None");	
			}else{
				this.getView().byId("employeeEdittedBirthDateId").setValueState("Error");
				this.getView().byId("employeeEdittedBirthDateId").setValueStateText("Age cannot be less than 24");
			}
			//doj
				if(eEdittedDOJ !== ""){
				this.getView().byId("employeeEdittedJoiningDateId").setValueState("None");	
			}else{
				this.getView().byId("employeeEdittedJoiningDateId").setValueState("Error");
				this.getView().byId("employeeEdittedJoiningDateId").setValueStateText("Joining Date cannot have past dates");
			}
			//experience
			if(eEdittedDOB === ""){
		    		this.getView().byId("employeeEdittedExperienceId").setValueState("Error");
					this.getView().byId("employeeEdittedExperienceId").setValueStateText("Please enter Date of Birth");
		    }else if(eEdittedDOB !== ""){
			    if((calculatedAge - eEdittedExperienceNumber) >= 24){
					this.getView().byId("employeeEdittedExperienceId").setValueState("None");	
				}else{
					this.getView().byId("employeeEdittedExperienceId").setValueState("Error");
					this.getView().byId("employeeEdittedExperienceId").setValueStateText("Experience is fake");
				}	
		    }
		    
		    if(eEdittedName === "" || eEdittedId === "" || eEdittedDOB === "" || eEdittedDOJ === "" || eEdittedExperience === ""){
		    	MessageBox.error("Fill all Mandatory Fields");
		    }else if(eEdittedName.match(regExpName) && eEdittedId.match(regExpId) && (eEdittedEmail.match(regExpEmail) || eEdittedEmail === "") && (eEdittedMobile.match(regExpMobile) || eEdittedMobile === "")
		    			&& calculatedAge >= 24 && eEdittedDOB !=="" && eEdittedDOJ !== "" && (calculatedAge - eEdittedExperienceNumber >= 24 )&& eEdittedExperience !== ""){
				debugger;
				MessageBox.Succes("Edit Operation Successfull")
			    var updatedEmployeeDataPayload = {
			    	"Name" : eEdittedName,
					"Id" : eEdittedId,
					"Email": eEdittedEmail,
					"Mobile": eEdittedMobile,
					"DateOfBirth": eEdittedDOB,
					"DateOfJoining": eEdittedDOJ,
					"Experience": eEdittedExperience
			    };
			    
			    var oModel = this.getOwnerComponent().getModel("employeeHrModel");
			    //get employeedataarray to match id
			    var employeeDataArray = oModel.getData().EmployeeData;
			    employeeDataArray.forEach((item, index) => {
			    	if(item.Id === eEdittedId){
			    		this.selectedItemIndex = index;
			    	}
			    });
			    var previousEmployeeData = oModel.getData().EmployeeData[this.selectedItemIndex];
			    Object.assign(previousEmployeeData, updatedEmployeeDataPayload);
			    
			    oModel.refresh(true);
			   
			    this.getOwnerComponent().getRouter().navTo("employeeDetailsForm");
		    }else{
		    	MessageBox.error("Ediited Operation cannot be performed");
		    }
		},
		
		_OnBackButtonPressGoToEmployeeDetailsForm: function(){
			
			var eEdittedName = this.getView().byId("employeeEdittedNameId").getValue().trim();
			var eEdittedId = this.getView().byId("employeeEdittedId").getValue();
			var eEdittedEmail = this.getView().byId("employeeEdittedEmailId").getValue();
			var eEdittedMobile = this.getView().byId("employeeEdittedMobileId").getValue();
			var eEdittedDOB = this.getView().byId("employeeEdittedBirthDateId").getValue();
			var eEdittedDOJ = this.getView().byId("employeeEdittedJoiningDateId").getValue();
			var eEdittedExperience = this.getView().byId("employeeEdittedExperienceId").getSelectedKey();
			var that = this;
			if(eEdittedName !== "" || eEdittedId !== "" || eEdittedEmail !== "" || eEdittedMobile !== "" || eEdittedDOB !== "" || eEdittedDOJ !== "" || eEdittedExperience !== "" ){
				MessageBox.confirm("Are you sure you want to navigate to HR Form?", {
					onClose : function(oAction){
						if(oAction === "OK")
						{
								that.getOwnerComponent().getRouter().navTo("employeeDetailsForm");
								var oModel = that.getOwnerComponent().getModel("employeeHrModel");
								oModel.getData().EdittedEmployeeData.ButtonText = "NoEdit";
								// oModel.setProperty("/EdittedEmployeeData", selectedRow);
								oModel.refresh(true);
						}
					}
				});
			}else{
				this.getOwnerComponent().getRouter().navTo("employeeDetailsForm");	
			}

		}

	});
});