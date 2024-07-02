sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
	"sap/ui/model/Sorter"
], function(Controller, JSONModel, MessageBox, Filter, FilterOperator, FilterType, Sorter) {
	"use strict";

	return Controller.extend("com.dpzemployeeHrForm.controller.employeeDetailsForm", {
		onInit : function() {
			var oToday = new Date();
			var oJoiningDatePicker = this.getView().byId("employeeJoiningDateId");
            oJoiningDatePicker.setMinDate(oToday);
            var oBirthDatePicker = this.getView().byId("employeeBirthDateId");
            oBirthDatePicker.setMaxDate(oToday);
			//for select
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
			oRouter.getRoute("employeeDetailsForm").attachMatched(this.clearEmployeeFormData, this);
			
			this.count = 1;
		},
		clearEmployeeFormData: function (){
			this.getView().byId("employeeNameId").setValue("");
			this.getView().byId("employeeId").setValue("");
			this.getView().byId("employeeEmailId").setValue("");
			this.getView().byId("employeeMobileId").setValue("");
			this.getView().byId("employeeBirthDateId").setValue("");
			this.getView().byId("employeeJoiningDateId").setValue("");
			this.getView().byId("employeeExperienceId").setSelectedKey("");	
			
			this.getView().byId("employeeNameId").setValueState("None");
			this.getView().byId("employeeId").setValueState("None");
			this.getView().byId("employeeEmailId").setValueState("None");
			this.getView().byId("employeeMobileId").setValueState("None");
			this.getView().byId("employeeBirthDateId").setValueState("None");
			this.getView().byId("employeeJoiningDateId").setValueState("None");
			this.getView().byId("employeeExperienceId").setValueState("None");
			debugger;
			this.getView().byId("employeeTableId").removeSelections(true);
		},
		_OnChangeValidateName: function(){
			var regExpName = /^[A-Za-z\s]+$/;
			var eName = this.getView().byId("employeeNameId").getValue().trim();
			
			if(eName.match(regExpName) || eName === ""){
				this.getView().byId("employeeNameId").setValueState("None");
			}else{
				this.getView().byId("employeeNameId").setValueState("Error");
				this.getView().byId("employeeNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
		},
		_OnChangeValidateId: function(){
			var regExpId = /^[0-9]{8}$/;
			var eId = this.getView().byId("employeeId").getValue();
			
			if(eId.match(regExpId) || eId === ""){
				this.getView().byId("employeeId").setValueState("None");
			}else{
				this.getView().byId("employeeId").setValueState("Error");
				this.getView().byId("employeeId").setValueStateText("Id Formatis 8 DIgits");
			}
		},
		_OnChangeValidateEmail: function(){
			var regExpEmail = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.com$/;
			var eEmail = this.getView().byId("employeeEmailId").getValue();
			
			if(eEmail.match(regExpEmail) || eEmail === ""){
				this.getView().byId("employeeEmailId").setValueState("None");	
			}else{
				this.getView().byId("employeeEmailId").setValueState("Error");
				this.getView().byId("employeeEmailId").setValueStateText("Enter proper Email eg: userid@domain.com");
			}
		},
		_OnChangeValidateMobile: function(){
			debugger;
			var regExpMobile = /[6-9]{1}[0-9]{9}$/;
			var eMobile = this.getView().byId("employeeMobileId").getValue();
			
			if(eMobile.match(regExpMobile) || eMobile === ""){
				this.getView().byId("employeeMobileId").setValueState("None");	
			}else{
				this.getView().byId("employeeMobileId").setValueState("Error");
				this.getView().byId("employeeMobileId").setValueStateText("Starting Digit >=6 and only 10 digits long");
			}
		},
		_OnChangeValidateDOB: function(){
			debugger;
			var eDOB = this.getView().byId("employeeBirthDateId").getValue();
			var dobDate = new Date(eDOB);
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
		    if(calculatedAge >= 24 || eDOB === ""){
				this.getView().byId("employeeBirthDateId").setValueState("None");	
			}else{
				this.getView().byId("employeeBirthDateId").setValueState("Error");
				this.getView().byId("employeeBirthDateId").setValueStateText("Age cannot be less than 24");
			}
		},
		// _OnChangeValidateDOJ: function(){
		// 	var eDOJ = this.getView().byId("employeeJoiningDateId").getValue();
		// 	if(eDOJ !== ""){
		// 		this.getView().byId("employeeJoiningDateId").setValueState("None");	
		// 	}else{
		// 		this.getView().byId("employeeJoiningDateId").setValueState("Error");
		// 		this.getView().byId("employeeJoiningDateId").setValueStateText("Joining Date cannot have past dates");
		// 	}
		// },
		_OnChangeValidateExperience: function(){
			var eExperience = this.getView().byId("employeeExperienceId").getSelectedKey();
			var eExperienceNumber = eExperience.split(" ").shift();
			var eDOB = this.getView().byId("employeeBirthDateId").getValue();
			var dobDate = new Date(eDOB);
			var dobDay = dobDate.getDate();
			var dobMonth = dobDate.getMonth() + 1;
			var dobYear = dobDate.getFullYear();
			var calculatedAge = 0;
			var todayDate = new Date();
			var todayDay = todayDate.getDate();
		    var todayMonth = todayDate.getMonth() + 1; //STRANGE NUMBERING //January is 0!
		    var todayYear = todayDate.getFullYear();
		    debugger;
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
		    if(eDOB === ""){
		    		this.getView().byId("employeeExperienceId").setValueState("Error");
					this.getView().byId("employeeExperienceId").setValueStateText("Please enter Date of Birth");
		    }else if(eDOB !== ""){
			    if((calculatedAge - eExperienceNumber) >= 24){
					this.getView().byId("employeeExperienceId").setValueState("None");	
				}else{
					this.getView().byId("employeeExperienceId").setValueState("Error");
					this.getView().byId("employeeExperienceId").setValueStateText("Experience is fake");
				}	
		    }
			
		},
		_OnSubmitPushDetailsToEmployeeTable: function (){
			var regExpName = /^[A-Za-z\s]+$/;
			var regExpId = /^[0-9]{8}$/;
			var regExpEmail = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.com$/;
			var regExpMobile = /[6-9]{1}[0-9]{9}$/;
		
			
			var eName = this.getView().byId("employeeNameId").getValue().trim();
			var eId = this.getView().byId("employeeId").getValue();
			var eEmail = this.getView().byId("employeeEmailId").getValue();
			var eMobile = this.getView().byId("employeeMobileId").getValue();
			var eDOB = this.getView().byId("employeeBirthDateId").getValue();
			var eDOJ = this.getView().byId("employeeJoiningDateId").getValue();
			var eExperience = this.getView().byId("employeeExperienceId").getSelectedKey();
			
			//DOB validation
			var dobDate = new Date(eDOB);
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
		    if(calculatedAge >= 24 || eDOB === ""){
				this.getView().byId("employeeBirthDateId").setValueState("None");	
			}else{
				this.getView().byId("employeeBirthDateId").setValueState("Error");
				this.getView().byId("employeeBirthDateId").setValueStateText("Age cannot be less than 24");
			}
			
			//Experience
			var eExperienceNumber = eExperience.split(" ").shift();
			
			if(eName.match(regExpName)){
				this.getView().byId("employeeNameId").setValueState("None");
			}else{
				this.getView().byId("employeeNameId").setValueState("Error");
				this.getView().byId("employeeNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			if(eId.match(regExpId)){
				this.getView().byId("employeeId").setValueState("None");
			}else{
				this.getView().byId("employeeId").setValueState("Error");
				this.getView().byId("employeeId").setValueStateText("Id Formatis 8 DIgits");
			}
			if(eEmail.match(regExpEmail) || eEmail === ""){
				this.getView().byId("employeeEmailId").setValueState("None");	
			}else{
				this.getView().byId("employeeEmailId").setValueState("Error");
				this.getView().byId("employeeEmailId").setValueStateText("Enter proper Email eg: userid@domain.com");
			}
			if(eMobile.match(regExpMobile) || eMobile === ""){
				this.getView().byId("employeeMobileId").setValueState("None");	
			}else{
				this.getView().byId("employeeMobileId").setValueState("Error");
				this.getView().byId("employeeMobileId").setValueStateText("Starting Digit >=6 and only 10 digits long");
			}
			if(calculatedAge >= 24){
				this.getView().byId("employeeBirthDateId").setValueState("None");	
			}else{
				this.getView().byId("employeeBirthDateId").setValueState("Error");
				this.getView().byId("employeeBirthDateId").setValueStateText("Age cannot be less than 24");
			}
			if(eDOJ !== ""){
				this.getView().byId("employeeJoiningDateId").setValueState("None");	
			}else{
				this.getView().byId("employeeJoiningDateId").setValueState("Error");
				this.getView().byId("employeeJoiningDateId").setValueStateText("Joining Date cannot have past dates");
			}
			if(eDOB === ""){
		    		this.getView().byId("employeeExperienceId").setValueState("Error");
					this.getView().byId("employeeExperienceId").setValueStateText("Please enter Date of Birth");
		    }else if(eDOB !== ""){
			    if((calculatedAge - eExperienceNumber) >= 24){
					this.getView().byId("employeeExperienceId").setValueState("None");	
				}else{
					this.getView().byId("employeeExperienceId").setValueState("Error");
					this.getView().byId("employeeExperienceId").setValueStateText("Experience is fake");
				}	
		    }
		    if(eExperience !== ""){
		    	this.getView().byId("employeeExperienceId").setValueState("None");
		    }else{
		    	this.getView().byId("employeeExperienceId").setValueState("Error");
				this.getView().byId("employeeExperienceId").setValueStateText("Experience cannot be empty");
		    }
			//All fields on SUBMIT
			if(eName === "" || eId === "" || eDOB === "" || eDOJ === "" || eExperience === ""){
				MessageBox.error("Fill all Mandatory Fields");
				// this.getView().byId("employeeNameId").setValueState("Error");
				// this.getView().byId("employeeId").setValueState("Error");
				// this.getView().byId("employeeBirthDateId").setValueState("Error");
				// this.getView().byId("employeeJoiningDateId").setValueState("Error");
				// this.getView().byId("employeeExperienceId").setValueState("Error");
			}else if(eName.match(regExpName) && eId.match(regExpId) && (eMobile.match(regExpMobile) || eMobile === "") && (eEmail.match(regExpEmail) || eEmail === "") && 
					calculatedAge >= 24 && eDOB !=="" && eDOJ !== "" && (calculatedAge - eExperienceNumber >= 24 )&& eExperience !== "")
			{
				
				debugger;
				var oModel = this.getOwnerComponent().getModel("employeeHrModel");
				var EmployeeDataArray = oModel.getData().EmployeeData;
				var duplicateId;
				//if EDA has data(Submitting not for first time)
				if(EmployeeDataArray.length >= 1){
					for(var i=0; i<EmployeeDataArray.length; i++){
						if(EmployeeDataArray[i].Id == eId){
							duplicateId = true;
							break;
						}else{
							duplicateId = false;
						}
					}
					if(duplicateId == true){
						MessageBox.error("Employee with same Id already exists!!");
						this.getView().byId("employeeId").setValueState("Error");
						this.getView().byId("employeeId").setValueStateText("Id already exists");
						// break;
					}else{
							var employeeDetails =
							{
								"Name" : eName,
								"Id" : eId,
								"Email": eEmail,
								"Mobile": eMobile,
								"DateOfBirth": eDOB,
								"DateOfJoining": eDOJ,
								"Experience": eExperience,
								"Status": "In Progress"
							};
							oModel.getData().EmployeeData.push(employeeDetails);
							oModel.getData().HrData.push(employeeDetails);
							oModel.getData().ViewHrData.push(employeeDetails);
							oModel.refresh(true);
							MessageBox.success("Employee Added Successfully");
							//clear form irrespective of first time submit or second time submit
							this.getView().byId("employeeNameId").setValue("");
							this.getView().byId("employeeId").setValue("");
							this.getView().byId("employeeEmailId").setValue("");
							this.getView().byId("employeeMobileId").setValue("");
							this.getView().byId("employeeBirthDateId").setValue("");
							this.getView().byId("employeeJoiningDateId").setValue("");
							this.getView().byId("employeeExperienceId").setSelectedKey("");
							
							//enable Edit and Delete Buttons as Table has data by now
							this.getView().byId("editEmployeeButtonId").setEnabled(true);
							this.getView().byId("deleteEmployeeButtonId").setEnabled(true);
					}
				}
				//Submit First time
				else 
				{
					var employeeDetails = {
						"Name" : eName,
						"Id" : eId,
						"Email": eEmail,
						"Mobile": eMobile,
						"DateOfBirth": eDOB,
						"DateOfJoining": eDOJ,
						"Experience": eExperience,
						"Status": "In Progress"
					};
					oModel.getData().EmployeeData.push(employeeDetails);
					oModel.getData().HrData.push(employeeDetails);
					oModel.getData().ViewHrData.push(employeeDetails);
					oModel.refresh(true);
					MessageBox.success("Employee Added Successfully");
						//clear form irrespective of first time submit or second time submit
					this.getView().byId("employeeNameId").setValue("");
					this.getView().byId("employeeId").setValue("");
					this.getView().byId("employeeEmailId").setValue("");
					this.getView().byId("employeeMobileId").setValue("");
					this.getView().byId("employeeBirthDateId").setValue("");
					this.getView().byId("employeeJoiningDateId").setValue("");
					this.getView().byId("employeeExperienceId").setSelectedKey("");
					
					//enable Edit and Delete Buttons as Table has data by now
					this.getView().byId("editEmployeeButtonId").setEnabled(true);
					this.getView().byId("deleteEmployeeButtonId").setEnabled(true);
				}
			}
		},
		_OnApprovedGoToHrFormView : function (){
			//check if form has data
			var eName = this.getView().byId("employeeNameId").getValue().trim();
			var eId = this.getView().byId("employeeId").getValue();
			var eEmail = this.getView().byId("employeeEmailId").getValue();
			var eMobile = this.getView().byId("employeeMobileId").getValue();
			var eDOB = this.getView().byId("employeeBirthDateId").getValue();
			var eDOJ = this.getView().byId("employeeJoiningDateId").getValue();
			var eExperience = this.getView().byId("employeeExperienceId").getSelectedKey();
			var that = this;
			if(eName !== "" || eId !== "" || eEmail !== "" || eMobile !== "" || eDOB !== "" || eDOJ !== "" || eExperience !== "" ){
				MessageBox.confirm("Are you sure you want to navigate to HR Form?", {
					onClose : function(oAction){
						if(oAction === "OK")
						{
							that.getOwnerComponent().getRouter().navTo("hrForm");
						}
					}
				});
			}else{
				this.getOwnerComponent().getRouter().navTo("hrForm");	
			}
		},
		_OnEditGoToEditEmployeeDetailsView: function (){
			debugger;
			//get model
			var oModel = this.getOwnerComponent().getModel("employeeHrModel");
			var oTable = this.getView().byId("employeeTableId");
			//gets single selected row
			// var selectedRow = oTable.getSelectedItem().getBindingContext("employeeHrModel").getObject();  
			// gets multiple selectes rows
			var selectedRow;
			var selectedItems = oTable.getSelectedItems();
			var totalRowsSelected = 0;
			var allRowsInTable = 0;
			// Loop through the selected items array
			selectedItems.forEach(function(selectedItem) {
    			selectedRow = selectedItem.getBindingContext("employeeHrModel").getObject();
    			totalRowsSelected++;
    			// Get the data object of the selected row
				// Do whatever you want with the selected row data
			});
			//if multiple rows selected, then throw message box
			if(totalRowsSelected > 1){
				MessageBox.error("Please select only one record to perform the operation!");
				oTable.removeSelections(true);
			}
			else if(totalRowsSelected === 1){
				if(!oModel.getData().EdittedEmployeeData){
					oModel.setProperty("/EdittedEmployeeData", selectedRow);
				}
				oModel.getData().EdittedEmployeeData.ButtonText = "Edit";
				oModel.setProperty("/EdittedEmployeeData", selectedRow);
				oModel.refresh(true);
				this.getOwnerComponent().getRouter().navTo("editEmployeeDetails");
			}else{
				MessageBox.error("Please select a record to perform the operation");
			}
			// var totalRowsInTable = this.getOwnerComponent().getModel("employeeHrModel").getData().EmployeeData.forEach((item)=>{
			// 	allRowsInTable++;
			// });
			// var selectedRowCount = totalRowsSelected +" / " + totalRowsInTable;
			// this.getView().byId("showsSelectedRowsInputId").setText(selectedRowCount);
			// this.getOwnerComponent().getRouter().navTo("editEmployeeDetails");
		},
		_OnDeleteRemoveEmployeeFromTable: function (){
			//get model
			var oModel = this.getOwnerComponent().getModel("employeeHrModel");
			//get table
			var oTable = this.getView().byId("employeeTableId");
			// var oHrTable = this.getView().byId("hrActionOnEmployeeTableId");
			var totalRowsSelected = 0;
			var selectedRow;
			var selectedRowsArray = [];
			var hrDataArray =[];
			var employeeArray=[];
			var indexInHrArray;
			var rowIndexOfItemToBeDeleted;
				var that = this;
			//gets single row
			// var selectedRow = oTable.getSelectedItem().getBindingContext("employeeHrModel").getObject();
			//gets multiple rows 
			var selectedRows = oTable.getSelectedItems();
			selectedRows.forEach((item)=>{
				selectedRow = item.getBindingContext("employeeHrModel").getObject();
				selectedRowsArray.push(selectedRow);
				totalRowsSelected++;
			});
			if(totalRowsSelected > 1){
				MessageBox.confirm("Are you sure you want to delete all records permanently?",{
					onClose: function(oAction){
						if(oAction === "OK"){
							// if(oModel.getData().EmployeeData){
							debugger;
							employeeArray = oModel.getData().EmployeeData;
							hrDataArray = oModel.getData().HrData;
							selectedRowsArray.forEach((item, index)=>{
								// selectedRow = item.getBindingContext("employeeHrModel").getObject();
							if(hrDataArray.includes(item)){
									employeeArray.splice(index, 1);
									indexInHrArray = hrDataArray.indexOf(item);
									hrDataArray.splice(indexInHrArray, 1);
								}else{
									// employeeArray.splice(index, 1)
									rowIndexOfItemToBeDeleted = employeeArray.indexOf(item);
									employeeArray.splice(rowIndexOfItemToBeDeleted, 1);
								}
							});
							debugger;
							//deletes same records as that of employee table from hr table
							oModel.refresh(true);
								if(oModel.getData().EmployeeData.length > 1){
									oTable.removeSelections(false);
								}else if(oModel.getData().EmployeeData.length === 1){
									oTable.removeSelections(false);
								}else{
									that.getView().byId("editEmployeeButtonId").setEnabled(false);
									that.getView().byId("deleteEmployeeButtonId").setEnabled(false);
								}
						}
					}
				});
				// oTable.removeSelections(true);
			}else if(totalRowsSelected === 1){
				MessageBox.confirm("Are you sure you want to delete selected record permanently?", {
					onClose: function(oAction){
						if(oAction === "OK"){
							debugger;
							if(oModel.getData().EmployeeData){
								var selectedItemAtIndex = oModel.getData().EmployeeData.indexOf(selectedRow);
								oModel.getData().EmployeeData.splice(selectedItemAtIndex, 1);
								debugger;
								hrDataArray = oModel.getData().HrData;
								hrDataArray.forEach((item, index)=> {
									if(selectedRow.Id == item.Id){
										hrDataArray.splice(index, 1);
									}
								});
								oModel.refresh(true);
								if(oModel.getData().EmployeeData.length > 1){
									oTable.removeSelections(true);
								}else if(oModel.getData().EmployeeData.length === 1){
									oTable.removeSelections(true);
								}else{
									that.getView().byId("editEmployeeButtonId").setEnabled(false);
									that.getView().byId("deleteEmployeeButtonId").setEnabled(false);
								}
							}
						}
					}
				});
				oTable.removeSelections(true);
			}else{
				MessageBox.error("Please select atleast one record to perform the operation");
			}
		},
		_OnSelectionCalculateSelectedRowsCount : function (){
			debugger;
			var showsSelectedRowsInputText = this.getView().byId("showsSelectedRowsInputId");
			var showsSelectedRowsInputTextValue;
			var oModel = this.getOwnerComponent().getModel("employeeHrModel");
			var oTable = this.getView().byId("employeeTableId");
			var selectedRow;
			var selectedItems = oTable.getSelectedItems();
			var totalRowsSelected = 0;
			var totalRowsInEmployeeTable = oTable.getItems().length;
			selectedItems.forEach(function(selectedItem) {
    			selectedRow = selectedItem.getBindingContext("employeeHrModel").getObject();
    			totalRowsSelected++;
			});
			showsSelectedRowsInputTextValue = " : { " + totalRowsSelected + " / " + totalRowsInEmployeeTable +" }";
			showsSelectedRowsInputText.setText(showsSelectedRowsInputTextValue);
			// if(totalRowsSelected > 1){
			// 	totalRowsInEmployeeTable = oTable.getItems().length;
			// }else if(totalRowsSelected === 1){
			// 	totalRowsInEmployeeTable = oTable.getItems().length;
			// }
		},
		_OnSearchFilterTable: function(oEvent){
			debugger;
			var oView = this.getView();
			var searchValue = oView.byId("searchInEmployeeId").getValue();
			var oFilter = new Filter([
										new	Filter("Name", FilterOperator.Contains, searchValue),
										new Filter("Id", FilterOperator.Contains, searchValue),
										new Filter("Email", FilterOperator.Contains, searchValue),
										new	Filter("Mobile", FilterOperator.Contains, searchValue),
										new Filter("DateOfBirth", FilterOperator.Contains, searchValue),
										new Filter("DateOfJoining", FilterOperator.Contains, searchValue),
										new Filter("Experience", FilterOperator.Contains, searchValue),
										new	Filter("Status", FilterOperator.Contains, searchValue)
										]);
			oView.byId("employeeTableId").getBinding("items").filter(oFilter, FilterType.Application);
		},
		_OnPressSortEmployeeTable: function(){
			debugger;
			this.count++;
			var sortOrder;
			if(this.count % 2 == 0){
				sortOrder = true;
			}else{
				sortOrder = false;
			}
			var sColumn = "Id";
			var aSorter = [];
			var oTable = this.getView().byId("employeeTableId");
			var oBinding = oTable.getBinding("items");
			var oSorter = new Sorter(sColumn, sortOrder);
			aSorter.push(oSorter);
			// if (aSorter.length > 0 && sColumn === aSorter[0].sPath) {
   //             // Reverse the sorting order
   //             oSorter.bDescending = !aSorter.bDescending;
   //         }
			oBinding.sort(aSorter);
		},
		_OnPressGroupByEmployeeTable: function(){
			debugger;
			this.count++;
			var oTable = this.getView().byId("employeeTableId");
			var oBinding = oTable.getBinding("items");
	
			if(this.count % 2 == 0){
				var oGroup = new Sorter("Experience", true, true);
			}else{
				var oGroup = new Sorter("Experience", false, true);
			}
		
			oBinding.sort(oGroup);
		}
	});
});