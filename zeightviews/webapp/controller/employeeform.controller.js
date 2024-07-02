sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel"
], function(Controller, MessageBox, JSONModel) {
	"use strict";

	return Controller.extend("com.dpzeightviews.controller.employeeform", {
		onInit: function () {
			//clears form data
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("employeeform").attachMatched(this.clearEmployeeFormData, this);
			
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
				"EmployeeCompany" :[
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
				"EmployeeLocation":[
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
		},
		clearEmployeeFormData: function(){
			this.getView().byId("eNameId").setValue("");
			this.getView().byId("eId").setValue("");
			this.getView().byId("eAgeId").setValue("");
			this.getView().byId("eMobileId").setValue("");
			this.getView().byId("eEmailId").setValue("");
			this.getView().byId("eAddressId").setValue("");
			this.getView().byId("eCompanyId").setValue("");
			this.getView().byId("eLocationId").setValue("");
			
			this.getView().byId("eNameId").setValueState("None");
			this.getView().byId("eId").setValueState("None");
			this.getView().byId("eAgeId").setValueState("None");
			this.getView().byId("eMobileId").setValueState("None");
			this.getView().byId("eEmailId").setValueState("None");
			this.getView().byId("eAddressId").setValueState("None");
			this.getView().byId("eCompanyId").setValueState("None");
			this.getView().byId("eLocationId").setValueState("None");
		},
		_OnPressSchoolGoToSchoolFormView : function() {
			var eName = this.getView().byId("eNameId").getValue();
			var eId = this.getView().byId("eId").getValue();
			var eAge = this.getView().byId("eAgeId").getSelectedKey();
			var eMobile = this.getView().byId("eMobileId").getValue();
			var eEmail = this.getView().byId("eEmailId").getValue();
			var eAddress = this.getView().byId("eAddressId").getValue();
			var eCompany = this.getView().byId("eCompanyId").getSelectedKey();
			var eLocation = this.getView().byId("eLocationId").getSelectedKey();
			
			if(eName !== "" || eId !== "" || eAge !== "" || eMobile !== "" 
				|| eEmail !== "" || eAddress !== "" || eCompany !== "" || eLocation !== ""){
				
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
			var eName = this.getView().byId("eNameId").getValue();
			var eId = this.getView().byId("eId").getValue();
			var eAge = this.getView().byId("eAgeId").getSelectedKey();
			var eMobile = this.getView().byId("eMobileId").getValue();
			var eEmail = this.getView().byId("eEmailId").getValue();
			var eAddress = this.getView().byId("eAddressId").getValue();
			var eCompany = this.getView().byId("eCompanyId").getSelectedKey();
			var eLocation = this.getView().byId("eLocationId").getSelectedKey();
			
			if(eName !== "" || eId !== "" || eAge !== "" || eMobile !== "" 
				|| eEmail !== "" || eAddress !== "" || eCompany !== "" || eLocation !== ""){
				
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
			var eName = this.getView().byId("eNameId").getValue();
			var eId = this.getView().byId("eId").getValue();
			var eAge = this.getView().byId("eAgeId").getSelectedKey();
			var eMobile = this.getView().byId("eMobileId").getValue();
			var eEmail = this.getView().byId("eEmailId").getValue();
			var eAddress = this.getView().byId("eAddressId").getValue();
			var eCompany = this.getView().byId("eCompanyId").getSelectedKey();
			var eLocation = this.getView().byId("eLocationId").getSelectedKey();
			
			if(eName !== "" || eId !== "" || eAge !== "" || eMobile !== "" 
				|| eEmail !== "" || eAddress !== "" || eCompany !== "" || eLocation !== ""){
				
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
		_OnPressBackButtonGoToGraduateForm: function(){
			var eName = this.getView().byId("eNameId").getValue();
			var eId = this.getView().byId("eId").getValue();
			var eAge = this.getView().byId("eAgeId").getSelectedKey();
			var eMobile = this.getView().byId("eMobileId").getValue();
			var eEmail = this.getView().byId("eEmailId").getValue();
			var eAddress = this.getView().byId("eAddressId").getValue();
			var eCompany = this.getView().byId("eCompanyId").getSelectedKey();
			var eLocation = this.getView().byId("eLocationId").getSelectedKey();
			
			if(eName !== "" || eId !== "" || eAge !== "" || eMobile !== "" 
				|| eEmail !== "" || eAddress !== "" || eCompany !== "" || eLocation !== ""){
				
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
		_OnPressSubmitButtonDisplayEmployeeTable: function(){
			var regExpName = /^[A-Za-z\s]+$/;
			var regExpId = /^EMP[0-9]{2}[A-Z]{1}$/;
			var regExpMobile = /[6-9]{1}[0-9]{9}$/;
			var regExpEmail = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
			var regExpAddress = /^[a-zA-Z0-9\s,'-]*$/;
			
			var eName = this.getView().byId("eNameId").getValue();
			var eId = this.getView().byId("eId").getValue();
			var eAge = this.getView().byId("eAgeId").getSelectedKey();
			var eMobile = this.getView().byId("eMobileId").getValue();
			var eEmail = this.getView().byId("eEmailId").getValue();
			var eAddress = this.getView().byId("eAddressId").getValue();
			var eCompany = this.getView().byId("eCompanyId").getSelectedKey();
			var eLocation = this.getView().byId("eLocationId").getSelectedKey();
			
			if(eName.match(regExpName)){
				this.getView().byId("eNameId").setValueState("None");
			}else{
				this.getView().byId("eNameId").setValueState("Error");
				this.getView().byId("eNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			
			if(eId.match(regExpId)){
				this.getView().byId("eId").setValueState("None");
			}else{
				this.getView().byId("eId").setValueState("Error");
				this.getView().byId("eId").setValueStateText("Id Format(EMP2Digits1Alphabet) eg: EMP12A");
			}
			
			if(eAge !== ""){
				this.getView().byId("eAgeId").setValueState("None");
			}else{
				this.getView().byId("eAgeId").setValueState("Error");
				this.getView().byId("eAgeId").setValueStateText("Age cannot be empty");	
			}
			
			if(eMobile.match(regExpMobile)){
				this.getView().byId("eMobileId").setValueState("None");	
			}else{
				this.getView().byId("eMobileId").setValueState("Error");
				this.getView().byId("eMobileId").setValueStateText("Starting Digit >=6 and only 10 digits long");
			}
			
			if(eEmail.match(regExpEmail)){
				this.getView().byId("eEmailId").setValueState("None");	
			}else{
				this.getView().byId("eEmailId").setValueState("Error");
				this.getView().byId("eEmailId").setValueStateText("Enter proper Email eg: userid@domain.com");
			}
			
			if(eAddress.match(regExpAddress) || eAddress === ""){
				this.getView().byId("eAddressId").setValueState("None");	
			}else{
				this.getView().byId("eAddressId").setValueState("Error");
				this.getView().byId("eAddressId").setValueStateText("Enter proper Address");
			}
			
			if(eCompany !== ""){
				this.getView().byId("eCompanyId").setValueState("None");	
			}else{
				this.getView().byId("eCompanyId").setValueState("Error");
				this.getView().byId("eCompanyId").setValueStateText("Company cannot be empty");
			}
			
			if(eLocation !== ""){
				this.getView().byId("eLocationId").setValueState("None");	
			}else{
				this.getView().byId("eLocationId").setValueState("Error");
				this.getView().byId("eLocationId").setValueStateText("Location cannot be empty");
			}
			
			if(eName === "" || eId === "" || eAge === "" || eMobile === "" || eEmail === "" || eCompany === "" || eLocation === ""){
				MessageBox.error("Fill All Mandatory fields");
			}else if(eName.match(regExpName) && eId.match(regExpId) && eAge !== "" && eMobile.match(regExpMobile) 
				&& eEmail.match(regExpEmail) && (eAddress.match(regExpAddress) || eAddress === "")
				&& eCompany !== "" && eLocation !== ""){
				MessageBox.success("Success !!");
				var employeePayload = {
					"Name" : eName,
					"Id" : eId,
					"Age" : eAge,
					"Mobile": eMobile,
					"Email": eEmail,
					"Address": eAddress,
					"Company": eCompany,
					"Location": eLocation
				};
				var oModel = this.getOwnerComponent().getModel("multiFormModel");
				oModel.getData().EmployeeData.push(employeePayload);
				oModel.refresh(true);
				this.getView().byId("eNameId").setValue("");
				this.getView().byId("eId").setValue("");
				this.getView().byId("eAgeId").setSelectedKey("");
				this.getView().byId("eMobileId").setValue("");
				this.getView().byId("eEmailId").setValue("");
				this.getView().byId("eAddressId").setValue("");
				this.getView().byId("eCompanyId").setSelectedKey("");
				this.getView().byId("eLocationId").setSelectedKey("");
				this.getOwnerComponent().getRouter().navTo("employeeformdata");
				// this.getView().byId("gPlaceId").setValue("");
			}
		
		}
	});
});