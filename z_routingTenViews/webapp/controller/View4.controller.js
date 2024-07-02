sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/layout/form/SimpleForm",
	"sap/m/Label",
	"sap/m/Input",
	"sap/m/MultiComboBox",
	"sap/m/Select",
	"sap/m/DatePicker",
	"sap/m/TimePicker",
	"sap/m/CheckBox",
	"sap/m/Button"
], function(Controller, MessageBox, MessageToast, SimpleForm, Label, Input, MultiComboBox, Select, DatePicker, TimePicker, CheckBox, Button) {
	"use strict";

	return Controller.extend("com.dpz_routingTenViews.controller.View4", {
		onInit: function() {
			// var oToday = new Date();
			// var oJoiningDatePicker = this.getView().byId("employeeJoiningDateId");
			// oJoiningDatePicker.setMinDate(oToday);
			this.getView().byId("employeeGenderMaleId").setSelected(false);
			this.getView().byId("employeeGenderFemaleId").setSelected(false);
			this.getView().byId("employeeMedicalInsuranceYesId").setSelected(false);
			this.getView().byId("employeeMedicalInsuranceNoId").setSelected(false);
			//creates dynamic from 
			var knowledgeForm = new SimpleForm({
				editable: true,
				layout: "ResponsiveGridLayout",
				labelSpanXL: 5,
				labelSpanL: 4,
				labelSpanM: 5,
				labelSpanS: 3,
				emptySpanXL: 4,
				emptySpanL: 4,
				emptySpanM: 6,
				emptySpanS: 3,
				columnsXL: 6,
				columnsL: 3,
				columnsM: 3,
				content: [
					//employee id
					new Label({
						text: "ID",
						required: true
					}),
					new Input({
						id: "employeeKnowledgeId",
						editable: false,
						value : "{dataModel>/EmptyForm/EmptyValue}"
					}),

					//employee date of birth
					new Label({
						text: "Date of Joining",
						required: true
					}),
					new DatePicker({
						id: "employeeDateOfJoiningId",
						displayFormat: "dd.MM.YYYY",
						valueFormat : "dd.MM.YYYY",
						value : "{dataModel>/EmptyForm/EmptyValue}"
					}),

					//employee skills
					// new Label({
					// 	text: "Skills",
					// 	required: true
					// }),
					// new Input({
					// 	id: "employeeSkillsId",
					// 	placeholder: "Enter Skills"
					// }),

					//employee languages
					new Label({
						text: "Languages",
						required: true
					}),
					new MultiComboBox({
						id: "employeeLanguagesId",
						forceSelection: false,
						selectedKeys : "{dataModel>/EmptyForm/EmptyKeys}"
					}),

					// //place of supply
					// new Label({
					// 	text: "Certified",
					// 	required: true
					// }),
					// // new CheckBox({
					// 	id: "certifiedYesId",
					// 	text: "Yes",
					// 	press : this.deactivateOtherCheckbox
					// }),
					// new CheckBox({
					// 	id: "certifiedNoId",
					// 	text: "No",
					// 	press : this.deactivateOtherCheckbox
					// }),

					//state code
					new Label({
						text: "Experience",
						required: true
					}),
					new Select({
						id: "employeeExperienceId",
						forceSelection: false,
						selectedKey : "{dataModel>/EmptyForm/EmptyKey}"
					}),

					//invoice value
					new Label({
						text: "Previous CTC(Annual)",
						required: true
					}),
					new Input({
						id: "employeeCTCId",
						placeholder: "Enter CTC(Annual) in LPA",
						value : "{dataModel>/EmptyForm/EmptyValue}"
					}),

					new Button({
						text: "Submit",
						id: "submitDynamicFormInView4Id",
						type: "Emphasized",
						press: this.onPressSubmitValidateAllSixForms.bind(this)
					})
				]
			});

			//get vbox in form id
			var oForm = this.getView().byId("dynamicForm6InView4VBoxId");
			oForm.addItem(knowledgeForm);

			var oButton = this.getView().byId("dynamicFormSubmitButtonInView4FlexBoxId");
			var getButton = sap.ui.getCore().byId("submitDynamicFormInView4Id");
			oButton.addItem(getButton);

			//select STATE code
			sap.ui.getCore().byId("employeeLanguagesId").bindAggregation("items", {
				path: "dataModel>/EmployeeLanguages",
				template: new sap.ui.core.Item({
					key: "{dataModel>key}",
					text: "{dataModel>text}"
				})
			});
			sap.ui.getCore().byId("employeeExperienceId").bindAggregation("items", {
				path: "dataModel>/ExperienceDetails",
				template: new sap.ui.core.Item({
					key: "{dataModel>key}",
					text: "{dataModel>text}"
				})
			});
			// var oRouter = this.getOwnerComponent().getRouter();
			// oRouter.getRoute("View4").attachMatched(this._OnLeaveFocusIdPopulateInOtherForms, this);
			var oToday = new Date();
			var oEmployeeDateOfJoiningDatePicker = sap.ui.getCore().byId("employeeDateOfJoiningId");
			oEmployeeDateOfJoiningDatePicker.setMinDate(oToday);
		},
		_OnPressBackGoToView1: function() {
			this.getOwnerComponent().getRouter().navTo("View1");
		},
		_OnLeaveFocusIdPopulateInOtherForms: function() {
			var employeeId = this.getView().byId("employeeId").getValue();
			this.getView().byId("eId").setValue(employeeId);
			this.getView().byId("employeeIdInHealthForm").setValue(employeeId);
			this.getView().byId("employeeIdInForm4").setValue(employeeId);
			this.getView().byId("employeeInForm5Id").setValue(employeeId);
			sap.ui.getCore().byId("employeeKnowledgeId").setValue(employeeId);
		},
		_OnLeaveFocusNamePopulateInOtherForms: function() {
			var employeeName = this.getView().byId("employeeNameId").getValue();
			this.getView().byId("employeeNameInForm5Id").setValue(employeeName);
		},
		_OnLeaveFocusCityPopulateInOtherForms: function() {
			var employeeCity = this.getView().byId("employeeCityInForm2Id").getSelectedKey();
			this.getView().byId("employeeCityInForm3Id").setSelectedKey(employeeCity);
		},
		// _OnLeaveFocusGenderPopulateInOtherForms : function(oEvent){
		// 	debugger;
		// 	this.employeeGender = oEvent.getSource().getText();
		// 	if(this.employeeGender === "Male"){
		// 		this.getView().byId("customerGenderMaleId").setSelected(true);
		// 		return;
		// 	}else if(this.employeeGender === "Female"){
		// 		this.getView().byId("customerGenderFemaleId").setSelected(true);
		// 		return;
		// 	}
		// 	// this.getView().byId("eId").setValue(employeeAge);
		// 	// this.getView().byId("employeeIdForm3Id").setValue(employeeAge);
		// 	// this.getView().byId("employeeIdInForm4").setValue(employeeAge);
		// 	// this.getView().byId("employeeInForm5Id").setValue(employeeAge);
		// },
		_OnSelectGenderInForm1InView4: function(oEvent) {
			this.form1InView4SelectedGenderText = oEvent.getSource().getText();
		},
		_OnSelectLocationInForm1InView4: function(oEvent) {
			this.locationSelectedItems = oEvent.getSource().getSelectedItems();
			this.locationSelectedItemsValues = this.locationSelectedItems.map(function(item) {
				return item.getText();
			});
		},
		_OnSelectAllergies: function(oEvent) {
			this.form3InView4SelectedAllergiesText = oEvent.getSource().getText();
		},
		_OnLeaveFocusAllFieldsOfEmployeeForm: function() 
		{
			debugger;
			this._OnLeaveFocusIdPopulateInOtherForms();
			this._OnLeaveFocusNamePopulateInOtherForms();
			var oModel = this.getOwnerComponent().getModel("dataModel");
			var ageEntity = oModel.getData().AgeDetails;

			var regExpName = /^[A-Za-z\s]+$/;
			var regExpId = /^EMP[0-9]{2}[A-Z]{1}$/;
			var regExpEmail = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.com$/;
			
			var employeeName = this.getView().byId("employeeNameId").getValue().trim();
			var employeeId = this.getView().byId("employeeId").getValue();
			var employeeAge = this.getView().byId("employeeAgeId").getSelectedKey();
			var employeeAgeEnteredValue = this.getView().byId("employeeAgeId").getValue();
			var employeeGenderMaleText = this.getView().byId("employeeGenderMaleId").getSelected();
			var employeeGenderFemaleText = this.getView().byId("employeeGenderFemaleId").getSelected();
			var employeeGenderText;
			var employeeEmail = this.getView().byId("employeeEmailId").getValue();
			// var employeeLocationKeys = this.getView().byId("employeeLocationId").getSelectedKeys();
			var employeeLocationItems = this.getView().byId("employeeLocationId").getSelectedItems();
			// var employeeLocationItemsValues = employeeLocationItems.map(function(item) {
				// return item.getText();
			// });
			var employeeLocationItemsLength = employeeLocationItems.length;
			var iconTabBar = this.getView().byId("iconTabBarId");

			//check if all fields are non-empty fields
			//if yes, show ITF-2 
			if (employeeName !== "" && employeeName.match(regExpName)) {
				this.getView().byId("employeeNameId").setValueState("None");
			} else {
				this.getView().byId("employeeNameId").setValueState("Error");
				this.getView().byId("employeeNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			if(employeeId === ""){
				this.getView().byId("employeeId").setValueState("None");
			}else if (employeeId.match(regExpId)) {
				this.getView().byId("employeeId").setValueState("None");
			} else {
				this.getView().byId("employeeId").setValueState("Error");
				this.getView().byId("employeeId").setValueStateText("Id format EMP12A");
			}
			if(employeeAge === ""){
				this.getView().byId("employeeAgeId").setValueState("None");
			}
			else if(ageEntity.includes(employeeAgeEnteredValue) || employeeAge) {
				this.getView().byId("employeeAgeId").setValueState("None");
			} else {
				this.getView().byId("employeeAgeId").setValueState("Error");
				this.getView().byId("employeeAgeId").setValueStateText("Age cannot be empty");
			}
			if (!employeeGenderFemaleText && !employeeGenderMaleText) {
				this.getView().byId("employeeGenderFemaleId").setValueState("None");
				this.getView().byId("employeeGenderMaleId").setValueState("None");
			}else if (employeeGenderFemaleText || employeeGenderMaleText) {
				if (employeeGenderFemaleText) {
					employeeGenderText = this.getView().byId("employeeGenderFemaleId").getText();
				} else if (employeeGenderMaleText) {
					employeeGenderText = this.getView().byId("employeeGenderMaleId").getText();
				}
				this.getView().byId("employeeGenderFemaleId").setValueState("None");
				this.getView().byId("employeeGenderMaleId").setValueState("None");
			} else {
				this.getView().byId("employeeGenderFemaleId").setValueState("Error");
				this.getView().byId("employeeGenderMaleId").setValueState("Error");
			}
			if(employeeEmail === "" ){
				this.getView().byId("employeeEmailId").setValueState("None");
			}else if (employeeEmail.match(regExpEmail)) {
				this.getView().byId("employeeEmailId").setValueState("None");
			} else {
				this.getView().byId("employeeEmailId").setValueState("Error");
				this.getView().byId("employeeEmailId").setValueStateText("Enter proper Email eg: userid@domain.com");
			}
			if(employeeLocationItemsLength <= 0 ){
				this.getView().byId("employeeLocationId").setValueState("None");
			}else if (employeeLocationItemsLength > 0) {
				this.getView().byId("employeeLocationId").setValueState("None");
			} else {
				this.getView().byId("employeeLocationId").setValueState("Error");
				this.getView().byId("employeeLocationId").setValueStateText("Location cannot be empty");
			}
			if (employeeName.match(regExpName) && employeeId.match(regExpId) && (ageEntity.includes(employeeAgeEnteredValue) || employeeAge) &&
				(employeeGenderFemaleText || employeeGenderMaleText) && employeeEmail.match(regExpEmail) && employeeLocationItemsLength > 0)
			{
				//ITF2 should be visible
				this.getView().byId("addressFormITFId").setEnabled(true);
				// Navigate automatically
				iconTabBar.setSelectedKey("tabAddressForm");
				this.OnLeaveFocusAllFieldsOfAddressForm();
				this.OnLeaveFocusAllFieldsOfHealthForm();
				this.OnLeaveFocusAllFieldsOfNomineeForm();
				this.OnLeaveFocusAllFieldsOfExperienceForm();
			}else{
				this.getView().byId("addressFormITFId").setEnabled(false);
				this.getView().byId("healthFormITFId").setEnabled(false);
				this.getView().byId("nomineeFormITFId").setEnabled(false);
				this.getView().byId("experienceFormITFId").setEnabled(false);
				this.getView().byId("knowledgeFormITFId").setEnabled(false);
			}
		},
		OnLeaveFocusAllFieldsOfAddressForm: function() 
		{
			this._OnLeaveFocusCityPopulateInOtherForms();
			var oModel = this.getOwnerComponent().getModel("dataModel");
			var cityEntity = oModel.getData().LocationDetails;
			var stateEntity = oModel.getData().StateCode;
			var addressTypeEntity = oModel.getData().AddressType;
			
			var regExpId = /^EMP[0-9]{2}[A-Z]{1}$/;
			var regExpAddress = /^[A-Za-z0-9,\s]+$/;
			var regExpPostalCode = /^[0-9]{6}$/;
			
			//form2 values
			var employeeIdInAddressForm = this.getView().byId("eId").getValue();
			var employeeAddressLine1 = this.getView().byId("employeeAddress1TextId").getValue().trim();
			var employeeAddressLine2 = this.getView().byId("employeeAddress2TextId").getValue().trim();
			var employeeCityInForm2 = this.getView().byId("employeeCityInForm2Id").getSelectedKey();
			var employeeCityInForm2EnteredValue = this.getView().byId("employeeCityInForm2Id").getValue();
			var employeeStateInForm2 = this.getView().byId("employeeStateInForm2Id").getSelectedKey();
			var employeeStateInForm2EnteredValue = this.getView().byId("employeeStateInForm2Id").getValue();
			var employeePostalCode = this.getView().byId("employeePostalCodeId").getValue().trim();
			var employeeAddressType = this.getView().byId("employeeAddressTypeId").getSelectedKey();
			var employeeAddressTypeEneteredValue = this.getView().byId("employeeAddressTypeId").getValue();
			
			var iconTabBar = this.getView().byId("iconTabBarId");
			if(employeeIdInAddressForm.match(regExpId)){
				this.getView().byId("eId").setValueState("None");
			}else{
				this.getView().byId("eId").setValueState("Error");
				this.getView().byId("eId").setValueStateText("Id format EMP12A");
			}
			
			if(employeeAddressLine1 === ""){
				this.getView().byId("employeeAddress1TextId").setValueState("None");	
			}else if (employeeAddressLine1.match(regExpAddress)) {
				this.getView().byId("employeeAddress1TextId").setValueState("None");
			} else {
				this.getView().byId("employeeAddress1TextId").setValueState("Error");
				this.getView().byId("employeeAddress1TextId").setValueStateText("Address cannot be empty");
			}
			
			if(employeeAddressLine2 === ""){
				this.getView().byId("employeeAddress2TextId").setValueState("None");	
			}else if (employeeAddressLine2.match(regExpAddress)) {
				this.getView().byId("employeeAddress2TextId").setValueState("None");
			} else {
				this.getView().byId("employeeAddress2TextId").setValueState("Error");
				this.getView().byId("employeeAddress2TextId").setValueStateText("Address cannot be empty");
			}
			
			if(employeeCityInForm2 === ""){
				this.getView().byId("employeeCityInForm2Id").setValueState("None");
			}else if (employeeCityInForm2 || cityEntity.includes(employeeCityInForm2EnteredValue)) {
				this.getView().byId("employeeCityInForm2Id").setValueState("None");
			} else {
				this.getView().byId("employeeCityInForm2Id").setValueState("Error");
				this.getView().byId("employeeCityInForm2Id").setValueStateText("City cannot be empty");
			}
			
			if(employeeStateInForm2 === ""){
				this.getView().byId("employeeStateInForm2Id").setValueState("None");
			}else if (employeeStateInForm2 || stateEntity.includes(employeeStateInForm2EnteredValue)) {
				this.getView().byId("employeeStateInForm2Id").setValueState("None");
			} else {
				this.getView().byId("employeeStateInForm2Id").setValueState("Error");
				this.getView().byId("employeeStateInForm2Id").setValueStateText("State cannot be empty");
			}
			
			if(employeePostalCode === ""){
				this.getView().byId("employeePostalCodeId").setValueState("None");
			}else if (employeePostalCode.match(regExpPostalCode)) {
				this.getView().byId("employeePostalCodeId").setValueState("None");
			} else {
				this.getView().byId("employeePostalCodeId").setValueState("Error");
				this.getView().byId("employeePostalCodeId").setValueStateText("Postal code must contain only 6 digits");
			}
			
			if(employeeAddressType === ""){
				this.getView().byId("employeeAddressTypeId").setValueState("None");
			}else if (employeeAddressType || addressTypeEntity.includes(employeeAddressTypeEneteredValue)) {
				this.getView().byId("employeeAddressTypeId").setValueState("None");
			} else {
				this.getView().byId("employeeAddressTypeId").setValueState("Error");
				this.getView().byId("employeeAddressTypeId").setValueStateText("Address Type cannot be empty");
			}
			//check if all fields are non-empty fields
			//if yes, show ITF-3 and navigate automatically
			if (employeeIdInAddressForm.match(regExpId) && employeeAddressLine1.match(regExpAddress) && employeeAddressLine2.match(regExpAddress) 
				&& (employeeCityInForm2 || cityEntity.includes(employeeCityInForm2EnteredValue))
				&& (employeeStateInForm2 || stateEntity.includes(employeeStateInForm2EnteredValue))
				&& employeePostalCode.match(regExpPostalCode) && (employeeAddressType || addressTypeEntity.includes(employeeAddressTypeEneteredValue))) 
			{
				//ITF2 should be visible
				this.getView().byId("healthFormITFId").setEnabled(true);
				iconTabBar.setSelectedKey("tabHealthForm");
				this.OnLeaveFocusAllFieldsOfHealthForm();
				this.OnLeaveFocusAllFieldsOfNomineeForm();
				this.OnLeaveFocusAllFieldsOfExperienceForm();
			}else{
				this.getView().byId("healthFormITFId").setEnabled(false);
				this.getView().byId("nomineeFormITFId").setEnabled(false);
				this.getView().byId("experienceFormITFId").setEnabled(false);
				this.getView().byId("knowledgeFormITFId").setEnabled(false);
			}
		},
		OnLeaveFocusAllFieldsOfHealthForm: function() 
		{
			var regExpId = /^EMP[0-9]{2}[A-Z]{1}$/;
			var regExpList = /^[A-Za-z,\s]+$/;
			
			//from3 values
			var employeeIdInHealthForm = this.getView().byId("employeeIdInHealthForm").getValue();
			var employeeMedicalInsuranceYes = this.getView().byId("employeeMedicalInsuranceYesId").getSelected();
			var employeeMedicalInsuranceNo = this.getView().byId("employeeMedicalInsuranceNoId").getSelected();
			var employeeMedicalInsuranceText;
			var allergiesList = this.getView().byId("employeeAllergiesListId").getValue();
			var medicationsList = this.getView().byId("employeeMedicationsListId").getValue();
			var cityInHealthForm = this.getView().byId("employeeCityInForm3Id").getSelectedKey();
			
			var iconTabBar = this.getView().byId("iconTabBarId");
			if(employeeIdInHealthForm === ""){
				this.getView().byId("employeeIdInHealthForm").setValueState("None");
			}else if(employeeIdInHealthForm.match(regExpId)){
				this.getView().byId("employeeIdInHealthForm").setValueState("None");
			}else{
				this.getView().byId("employeeIdInHealthForm").setValueState("Error");
				this.getView().byId("employeeIdInHealthForm").setValueStateText("Id format EMP12A");
			}
			
			if(!employeeMedicalInsuranceYes && !employeeMedicalInsuranceNo){
				this.getView().byId("employeeMedicalInsuranceYesId").setValueState("None");
				this.getView().byId("employeeMedicalInsuranceNoId").setValueState("None");
			}else if (employeeMedicalInsuranceYes || employeeMedicalInsuranceNo) {
				if (employeeMedicalInsuranceYes) {
					employeeMedicalInsuranceText = this.getView().byId("employeeMedicalInsuranceYesId").getText();
				} else if (employeeMedicalInsuranceNo) {
					employeeMedicalInsuranceText = this.getView().byId("employeeMedicalInsuranceNoId").getText();
				}
				this.getView().byId("employeeMedicalInsuranceYesId").setValueState("None");
				this.getView().byId("employeeMedicalInsuranceNoId").setValueState("None");
			} else {
				this.getView().byId("employeeMedicalInsuranceYesId").setValueState("Error");
				this.getView().byId("employeeMedicalInsuranceNoId").setValueState("Error");
			}
			
			if(allergiesList === ""){
				this.getView().byId("employeeAllergiesListId").setValueState("None");
			}else if (allergiesList.match(regExpList)) {
				this.getView().byId("employeeAllergiesListId").setValueState("None");
			} else {
				this.getView().byId("employeeAllergiesListId").setValueState("Error");
				this.getView().byId("employeeAllergiesListId").setValueStateText("Allergies List cannot be empty");
			}
			
			if(medicationsList === ""){
				this.getView().byId("employeeMedicationsListId").setValueState("None");
			}else if (medicationsList.match(regExpList)) {
				this.getView().byId("employeeMedicationsListId").setValueState("None");
			} else {
				this.getView().byId("employeeMedicationsListId").setValueState("Error");
				this.getView().byId("employeeMedicationsListId").setValueStateText("Medicines List cannot be empty");
			}
			
			if(cityInHealthForm === ""){
				this.getView().byId("employeeCityInForm3Id").setValueState("None");
			}else if(cityInHealthForm){
				this.getView().byId("employeeCityInForm3Id").setValueState("None");
			}else{
				this.getView().byId("employeeCityInForm3Id").setValueState("Error");
				this.getView().byId("employeeCityInForm3Id").setValueStateText("City cannot be empty");
			}
			
			//check if all fields are non-empty fields
			//if yes, show ITF-3 and navigate automatically
			if (employeeIdInHealthForm.match(regExpId) && (employeeMedicalInsuranceYes || employeeMedicalInsuranceNo) && allergiesList.match(regExpList) 
				&& medicationsList.match(regExpList) && cityInHealthForm !== "") {
				//ITF4 should be visible
				this.getView().byId("nomineeFormITFId").setEnabled(true);
				iconTabBar.setSelectedKey("tabNomineeForm");
				this.OnLeaveFocusAllFieldsOfNomineeForm();
				this.OnLeaveFocusAllFieldsOfExperienceForm();
			}else{
				this.getView().byId("nomineeFormITFId").setEnabled(false);
				this.getView().byId("experienceFormITFId").setEnabled(false);
				this.getView().byId("knowledgeFormITFId").setEnabled(false);
			}
		},
		OnLeaveFocusAllFieldsOfNomineeForm: function() 
		{
			var regExpName = /^[A-Za-z\s]+$/;
			var regExpId = /^EMP[0-9]{2}[A-Z]{1}$/;
			var regExpRelationship = /^[A-Za-z\s]+$/;
			
			//from4 values
			var employeeIdInNomineeForm = this.getView().byId("employeeIdInForm4").getValue();
			var nomineeName = this.getView().byId("nomineeNameId").getValue();
			var nomineeAge = this.getView().byId("nomineeAgeId").getSelectedKey();
			var nomineeRelationship = this.getView().byId("nomineeRelationshipId").getValue();
			var nomineeCity = this.getView().byId("nomineeCityId").getSelectedKey();
			var nomineeState = this.getView().byId("nomineeStateId").getSelectedKey();
			
			var iconTabBar = this.getView().byId("iconTabBarId");
			if(employeeIdInNomineeForm === ""){
				this.getView().byId("employeeIdInForm4").setValueState("None");
			}else if(employeeIdInNomineeForm.match(regExpId)){
				this.getView().byId("employeeIdInForm4").setValueState("None");
			}else{
				this.getView().byId("employeeIdInForm4").setValueState("Error");
				this.getView().byId("employeeIdInForm4").setValueStateText("Id format EMP12A");
			}
			
			if(nomineeName === ""){
				this.getView().byId("nomineeNameId").getValue();
			}else if (nomineeName.match(regExpName)) {
				this.getView().byId("nomineeNameId").getValue();
			} else {
				this.getView().byId("nomineeNameId").setValueState("Error");
				this.getView().byId("nomineeNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			
			if(nomineeAge === ""){
				this.getView().byId("nomineeAgeId").setValueState("None");
			}else if (nomineeAge) {
				this.getView().byId("nomineeAgeId").setValueState("None");
			} else {
				this.getView().byId("nomineeAgeId").setValueState("Error");
				this.getView().byId("nomineeAgeId").setValueStateText("Age cannot be empty");
			}
			
			if(nomineeRelationship === ""){
				this.getView().byId("nomineeRelationshipId").setValueState("None");
			}else if (nomineeRelationship.match(regExpRelationship)) {
				this.getView().byId("nomineeRelationshipId").setValueState("None");
			} else {
				this.getView().byId("nomineeRelationshipId").setValueState("Error");
				this.getView().byId("nomineeRelationshipId").setValueStateText("Relationship cannot contain numbers and special characters");
			}
			
			if(nomineeCity === ""){
				this.getView().byId("nomineeCityId").setValueState("None");
			}else if (nomineeCity) {
				this.getView().byId("nomineeCityId").setValueState("None");
			} else {
				this.getView().byId("nomineeCityId").setValueState("Error");
				this.getView().byId("nomineeCityId").setValueStateText("City cannot be empty");
			}
			
			if(nomineeState === ""){
				this.getView().byId("nomineeStateId").setValueState("None");	
			}else if (nomineeState) {
				this.getView().byId("nomineeStateId").setValueState("None");
			} else {
				this.getView().byId("nomineeStateId").setValueState("Error");
				this.getView().byId("nomineeStateId").setValueStateText("State cannot be empty");
			}
			
			if (employeeIdInNomineeForm.match(regExpId) && nomineeName !== "" && nomineeAge !== "" && nomineeRelationship !== "" && nomineeCity !== "" &&
				nomineeState !== "") {
				//ITF5 should be visible
				this.getView().byId("experienceFormITFId").setEnabled(true);
				iconTabBar.setSelectedKey("tabExperienceForm");
				this.OnLeaveFocusAllFieldsOfExperienceForm();
			}else{
				this.getView().byId("experienceFormITFId").setEnabled(false);
				this.getView().byId("knowledgeFormITFId").setEnabled(false);
			}
		},
		OnLeaveFocusAllFieldsOfExperienceForm: function() 
		{
			var regExpName = /^[A-Za-z\s]+$/;
			var regExpId = /^EMP[0-9]{2}[A-Z]{1}$/;
			
			//form5 values
			var employeeIdInExperienceForm = this.getView().byId("employeeInForm5Id").getValue();
			var employeeNameInExperienceForm = this.getView().byId("employeeNameInForm5Id").getValue();
			var employeeDepartment = this.getView().byId("employeeDepartmentInForm5Id").getSelectedKey();
			var employeeCompany = this.getView().byId("employeeCompanyId").getSelectedKey();
			var employeeExperience = this.getView().byId("employeeExperienceInForm5Id").getSelectedKey();
			// var employeeSkillsKeys = this.getView().byId("employeeSkillsId").getSelectedKeys();
			var employeeSkillsItems = this.getView().byId("employeeSkillsId").getSelectedItems();
			var employeeSkillsItemsLength = employeeSkillsItems.length;
			// var employeeSkillsItemsValue = employeeSkillsItems.map(function(item) {
			// 	return item.getText();
			// });
			
			var iconTabBar = this.getView().byId("iconTabBarId");
			if(employeeIdInExperienceForm === ""){
				this.getView().byId("employeeInForm5Id").setValueState("None");	
			}else if(employeeIdInExperienceForm.match(regExpId)){
				this.getView().byId("employeeInForm5Id").setValueState("None");
			}else{
				this.getView().byId("employeeInForm5Id").setValueState("Error");
				this.getView().byId("employeeInForm5Id").setValueStateText("Id format EMP12A");
			}
			
			if(employeeNameInExperienceForm === ""){
				this.getView().byId("employeeNameInForm5Id").getValue();
			}else if(employeeNameInExperienceForm.match(regExpName)){
				this.getView().byId("employeeNameInForm5Id").getValue();
			}else{
				this.getView().byId("employeeNameInForm5Id").setValueState("Error");
				this.getView().byId("employeeNameInForm5Id").setValueStateText("Name cannot contain numbers and special characters");
			}
			
			if(employeeDepartment === ""){
				this.getView().byId("employeeDepartmentInForm5Id").setValueState("None");
			}else if (employeeDepartment) {
				this.getView().byId("employeeDepartmentInForm5Id").setValueState("None");
			} else {
				this.getView().byId("employeeDepartmentInForm5Id").setValueState("Error");
				this.getView().byId("employeeDepartmentInForm5Id").setValueStateText("State cannot be empty");
			}
			
			if(employeeCompany === ""){
				this.getView().byId("employeeCompanyId").setValueState("None");
			}else if (employeeCompany) {
				this.getView().byId("employeeCompanyId").setValueState("None");
			} else {
				this.getView().byId("employeeCompanyId").setValueState("Error");
				this.getView().byId("employeeCompanyId").setValueStateText("State cannot be empty");
			}
			
			if(employeeExperience === ""){
				this.getView().byId("employeeExperienceInForm5Id").setValueState("None");
			}else if (employeeExperience) {
				this.getView().byId("employeeExperienceInForm5Id").setValueState("None");
			} else {
				this.getView().byId("employeeExperienceInForm5Id").setValueState("Error");
				this.getView().byId("employeeExperienceInForm5Id").setValueStateText("State cannot be empty");
			}
			
			if(employeeSkillsItemsLength <= 0){
				this.getView().byId("employeeSkillsId").setValueState("None");
			}else if (employeeSkillsItemsLength > 0) {
				this.getView().byId("employeeSkillsId").setValueState("None");
			} else {
				this.getView().byId("employeeSkillsId").setValueState("Error");
				this.getView().byId("employeeSkillsId").setValueStateText("State cannot be empty");
			}
			
			if (employeeIdInExperienceForm.match(regExpId) && employeeNameInExperienceForm.match(regExpName)
				&& employeeDepartment !== "" && employeeCompany !== "" && employeeExperience !== "" && employeeSkillsItemsLength > 0) {
				//ITF6 should be visible
				this.getView().byId("knowledgeFormITFId").setEnabled(true);
				iconTabBar.setSelectedKey("tabKnowledgeForm");
			}else{
				this.getView().byId("knowledgeFormITFId").setEnabled(false);
			}
		},
		// deactivateOtherCheckbox: function(){
		// 	var certifiedYesText = sap.ui.getCore().byId("certifiedYesId").getSelected();
		// 	var certifiedNoText = sap.ui.getCore().byId("certifiedNoId").getSelected();
		// 	var certifiedText;
		// 	debugger;
		// 		if(certifiedYesText || certifiedNoText){
		// 		if(certifiedYesText){
		// 			certifiedText = this.getView().byId("certifiedYesId").getText();
		// 			this.getView().byId("certifiedNoId").setSelected(false);
		// 		}else if(certifiedNoText){
		// 			certifiedText = this.getView().byId("certifiedNoId").getText();
		// 			this.getView().byId("certifiedYesId").setSelected(false);
		// 		}
		// 		this.getView().byId("certifiedYesId").setValueState("None");
		// 		this.getView().byId("certifiedNoId").setValueState("None");
		// 	}else{
		// 		this.getView().byId("certifiedYesId").setValueState("Error");
		// 		this.getView().byId("certifiedNoId").setValueState("Error");
		// 		this.getView().byId("certifiedYesId").setSelected(false);
		// 		this.getView().byId("certifiedNoId").setSelected(false);
		// 	}
		// },
		onPressSubmitValidateAllSixForms: function(oEvent) {
			var oModel = this.getOwnerComponent().getModel("dataModel");
			var ageEntity = oModel.getData().AgeDetails;
			var cityEntity = oModel.getData().LocationDetails;
			var stateEntity = oModel.getData().StateCode;
			var addressTypeEntity = oModel.getData().AddressType;
			var regExpName = /^[A-Za-z\s]+$/;
			var regExpId = /^EMP[0-9]{2}[A-Z]{1}$/;
			var regExpEmail = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.com$/;
			var regExpAddress = /^[A-Za-z0-9,\s]+$/;
			var regExpPostalCode = /^[0-9]{6}$/;
			var regExpList = /^[A-Za-z,\s]+$/;
			var regExpRelationship = /^[A-Za-z\s]+$/;
			var regExpCTC = /^(?:10|\d+) LPA/;

			//form1 values
			var employeeName = this.getView().byId("employeeNameId").getValue().trim();
			var employeeId = this.getView().byId("employeeId").getValue();
			var employeeAge = this.getView().byId("employeeAgeId").getSelectedKey();
			var employeeAgeEnteredValue = this.getView().byId("employeeAgeId").getValue();
			var employeeGenderMaleText = this.getView().byId("employeeGenderMaleId").getSelected();
			var employeeGenderFemaleText = this.getView().byId("employeeGenderFemaleId").getSelected();
			var employeeGenderText;
			var employeeEmail = this.getView().byId("employeeEmailId").getValue();
			var employeeLocationKeys = this.getView().byId("employeeLocationId").getSelectedKeys();
			var employeeLocationItems = this.getView().byId("employeeLocationId").getSelectedItems();
			var employeeLocationItemsValues = employeeLocationItems.map(function(item) {
				return item.getText();
			});
			var employeeLocationItemsLength = employeeLocationItems.length;

			//form2 values
			var employeeIdInAddressForm = this.getView().byId("eId").getValue();
			var employeeAddressLine1 = this.getView().byId("employeeAddress1TextId").getValue().trim();
			var employeeAddressLine2 = this.getView().byId("employeeAddress2TextId").getValue().trim();
			var employeeCityInForm2 = this.getView().byId("employeeCityInForm2Id").getSelectedKey();
			var employeeCityInForm2EnteredValue = this.getView().byId("employeeCityInForm2Id").getValue();
			var employeeStateInForm2 = this.getView().byId("employeeStateInForm2Id").getSelectedKey();
			var employeeStateInForm2EnteredValue = this.getView().byId("employeeStateInForm2Id").getValue();
			var employeePostalCode = this.getView().byId("employeePostalCodeId").getValue().trim();
			var employeeAddressType = this.getView().byId("employeeAddressTypeId").getSelectedKey();
			var employeeAddressTypeEneteredValue = this.getView().byId("employeeAddressTypeId").getValue();

			//from3 values
			var employeeIdInHealthForm = this.getView().byId("employeeIdInHealthForm").getValue();
			var employeeMedicalInsuranceYes = this.getView().byId("employeeMedicalInsuranceYesId").getSelected();
			var employeeMedicalInsuranceNo = this.getView().byId("employeeMedicalInsuranceNoId").getSelected();
			// var employeeMedicalInsuranceYesText = this.getView().byId("employeeMedicalInsuranceYesId").getText();
			// var employeeMedicalInsuranceNoText = this.getView().byId("employeeMedicalInsuranceNoId").getText();
			var employeeMedicalInsuranceText;
			var allergiesList = this.getView().byId("employeeAllergiesListId").getValue();
			var medicationsList = this.getView().byId("employeeMedicationsListId").getValue();
			var cityInHealthForm = this.getView().byId("employeeCityInForm3Id").getSelectedKey();

			//from4 values
			var employeeIdInNomineeForm = this.getView().byId("employeeIdInForm4").getValue();

			var nomineeName = this.getView().byId("nomineeNameId").getValue();
			var nomineeAge = this.getView().byId("nomineeAgeId").getSelectedKey();
			var nomineeRelationship = this.getView().byId("nomineeRelationshipId").getValue();
			var nomineeCity = this.getView().byId("nomineeCityId").getSelectedKey();
			var nomineeState = this.getView().byId("nomineeStateId").getSelectedKey();

			//form5 values
			var employeeIdInExperienceForm = this.getView().byId("employeeInForm5Id").getValue();
			var employeeNameInExperienceForm = this.getView().byId("employeeInForm5Id").getValue();
			var employeeDepartment = this.getView().byId("employeeDepartmentInForm5Id").getSelectedKey();
			var employeeCompany = this.getView().byId("employeeCompanyId").getSelectedKey();
			var employeeExperience = this.getView().byId("employeeExperienceInForm5Id").getSelectedKey();
			var employeeSkillsKeys = this.getView().byId("employeeSkillsId").getSelectedKeys();
			var employeeSkillsItems = this.getView().byId("employeeSkillsId").getSelectedItems();
			var employeeSkillsItemsLength = employeeSkillsItems.length;
			var employeeSkillsItemsValue = employeeSkillsItems.map(function(item) {
				return item.getText();
			});

			//form6 values
			var employeeIdInKnowledgeForm = sap.ui.getCore().byId("employeeKnowledgeId").getValue();
			var employeeDateOfJoining = sap.ui.getCore().byId("employeeDateOfJoiningId").getValue();
			var employeeLanguagesKeys = sap.ui.getCore().byId("employeeLanguagesId").getSelectedKeys();
			var employeeLanguagesItems = sap.ui.getCore().byId("employeeLanguagesId").getSelectedItems();
			var employeeExperienceInKnowledgeForm = sap.ui.getCore().byId("employeeExperienceId").getSelectedKey();
			var employeeLanguagesItemsValues = employeeLanguagesItems.map(function(item) {
				return item.getText();
			});
			var employeeLanguagesItemsLength = sap.ui.getCore().byId("employeeLanguagesId").getSelectedItems().length;
			// var employeeCertifiedText;
			// var certifiedYesText = sap.ui.getCore().byId("certifiedYesId").getSelected();
			// var certifiedNoText = sap.ui.getCore().byId("certifiedNoId").getSelected();
			// var certifiedText;
			var employeePreviousCTC = sap.ui.getCore().byId("employeeCTCId").getValue();

			if (employeeName.match(regExpName)) {
				this.getView().byId("employeeNameId").setValueState("None");
			} else {
				this.getView().byId("employeeNameId").setValueState("Error");
				this.getView().byId("employeeNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			if (employeeId.match(regExpId)) {
				this.getView().byId("employeeId").setValueState("None");
			} else {
				this.getView().byId("employeeId").setValueState("Error");
				this.getView().byId("employeeId").setValueStateText("Id format EMP12A");
			}
			if (ageEntity.includes(employeeAgeEnteredValue) || employeeAge) {
				this.getView().byId("employeeAgeId").setValueState("None");
			} else {
				this.getView().byId("employeeAgeId").setValueState("Error");
				this.getView().byId("employeeAgeId").setValueStateText("Age cannot be empty");
			}
			if (employeeGenderFemaleText || employeeGenderMaleText) {
				if (employeeGenderFemaleText) {
					employeeGenderText = this.getView().byId("employeeGenderFemaleId").getText();
				} else if (employeeGenderMaleText) {
					employeeGenderText = this.getView().byId("employeeGenderMaleId").getText();
				}
				this.getView().byId("employeeGenderFemaleId").setValueState("None");
				this.getView().byId("employeeGenderMaleId").setValueState("None");
			} else {
				this.getView().byId("employeeGenderFemaleId").setValueState("Error");
				this.getView().byId("employeeGenderMaleId").setValueState("Error");
			}
			if (employeeEmail.match(regExpEmail)) {
				this.getView().byId("employeeEmailId").setValueState("None");
			} else {
				this.getView().byId("employeeEmailId").setValueState("Error");
				this.getView().byId("employeeEmailId").setValueStateText("Enter proper Email eg: userid@domain.com");
			}
			if (employeeLocationItemsLength > 0) {
				this.getView().byId("employeeLocationId").setValueState("None");
			} else {
				this.getView().byId("employeeLocationId").setValueState("Error");
				this.getView().byId("employeeLocationId").setValueStateText("Location cannot be empty");
			}

			//2nd form
			// if(employeeIdInAddressForm.match(regExpId)){
			// 	this.getView().byId("eId").setValueState("None");
			// }else{
			// 	this.getView().byId("eId").setValueState("Error");
			// 	this.getView().byId("eId").setValueStateText("Id format EMP12A");
			// }
			if (employeeAddressLine1.match(regExpAddress)) {
				this.getView().byId("employeeAddress1TextId").setValueState("None");
			} else {
				this.getView().byId("employeeAddress1TextId").setValueState("Error");
				this.getView().byId("employeeAddress1TextId").setValueStateText("Address cannot be empty");
			}
			if (employeeAddressLine2.match(regExpAddress)) {
				this.getView().byId("employeeAddress2TextId").setValueState("None");
			} else {
				this.getView().byId("employeeAddress2TextId").setValueState("Error");
				this.getView().byId("employeeAddress2TextId").setValueStateText("Address cannot be empty");
			}
			if (employeeCityInForm2 || cityEntity.includes(employeeCityInForm2EnteredValue)) {
				this.getView().byId("employeeCityInForm2Id").setValueState("None");
			} else {
				this.getView().byId("employeeCityInForm2Id").setValueState("Error");
				this.getView().byId("employeeCityInForm2Id").setValueStateText("City cannot be empty");
			}
			if (employeeStateInForm2 || stateEntity.includes(employeeStateInForm2EnteredValue)) {
				this.getView().byId("employeeStateInForm2Id").setValueState("None");
			} else {
				this.getView().byId("employeeStateInForm2Id").setValueState("Error");
				this.getView().byId("employeeStateInForm2Id").setValueStateText("State cannot be empty");
			}
			if (employeePostalCode.match(regExpPostalCode)) {
				this.getView().byId("employeePostalCodeId").setValueState("None");
			} else {
				this.getView().byId("employeePostalCodeId").setValueState("Error");
				this.getView().byId("employeePostalCodeId").setValueStateText("Postal code must contain only 6 digits");
			}
			if (employeeAddressType || addressTypeEntity.includes(employeeAddressTypeEneteredValue)) {
				this.getView().byId("employeeAddressTypeId").setValueState("None");
			} else {
				this.getView().byId("employeeAddressTypeId").setValueState("Error");
				this.getView().byId("employeeAddressTypeId").setValueStateText("Address Type cannot be empty");
			}

			//3rd form
			// if(employeeIdInHealthForm.match(regExpId)){
			// 	this.getView().byId("employeeIdInHealthForm").setValueState("None");
			// }else{
			// 	this.getView().byId("employeeIdInHealthForm").setValueState("Error");
			// 	this.getView().byId("employeeIdInHealthForm").setValueStateText("Id format EMP12A");
			// }
			if (employeeMedicalInsuranceYes || employeeMedicalInsuranceNo) {
				if (employeeMedicalInsuranceYes) {
					employeeMedicalInsuranceText = this.getView().byId("employeeMedicalInsuranceYesId").getText();

				} else if (employeeMedicalInsuranceNo) {
					employeeMedicalInsuranceText = this.getView().byId("employeeMedicalInsuranceNoId").getText();
				}
				this.getView().byId("employeeMedicalInsuranceYesId").setValueState("None");
				this.getView().byId("employeeMedicalInsuranceNoId").setValueState("None");

			} else {
				this.getView().byId("employeeMedicalInsuranceYesId").setValueState("Error");
				this.getView().byId("employeeMedicalInsuranceNoId").setValueState("Error");
			}
			if (allergiesList.match(regExpList)) {
				this.getView().byId("employeeAllergiesListId").setValueState("None");
			} else {
				this.getView().byId("employeeAllergiesListId").setValueState("Error");
				this.getView().byId("employeeAllergiesListId").setValueStateText("Allergies List cannot be empty");
			}
			if (medicationsList.match(regExpList)) {
				this.getView().byId("employeeMedicationsListId").setValueState("None");
			} else {
				this.getView().byId("employeeMedicationsListId").setValueState("Error");
				this.getView().byId("employeeMedicationsListId").setValueStateText("Medicines List cannot be empty");
			}
			// if(cityInHealthForm){
			// 	this.getView().byId("employeeCityInForm3Id").setValueState("None");
			// }else{
			// 	this.getView().byId("employeeCityInForm3Id").setValueState("Error");
			// 	this.getView().byId("employeeCityInForm3Id").setValueStateText("City cannot be empty");
			// }

			//4th form
			// if(employeeIdInNomineeForm.match(regExpId)){
			// 	this.getView().byId("employeeIdInForm4").setValueState("None");
			// }else{
			// 	this.getView().byId("employeeIdInForm4").setValueState("Error");
			// 	this.getView().byId("employeeIdInForm4").setValueStateText("Id format EMP12A");
			// }
			if (nomineeName.match(regExpName)) {
				this.getView().byId("nomineeNameId").getValue();
			} else {
				this.getView().byId("nomineeNameId").setValueState("Error");
				this.getView().byId("nomineeNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			if (nomineeAge) {
				this.getView().byId("nomineeAgeId").setValueState("None");
			} else {
				this.getView().byId("nomineeAgeId").setValueState("Error");
				this.getView().byId("nomineeAgeId").setValueStateText("Age cannot be empty");
			}
			if (nomineeRelationship.match(regExpRelationship)) {
				this.getView().byId("nomineeRelationshipId").setValueState("None");
			} else {
				this.getView().byId("nomineeRelationshipId").setValueState("Error");
				this.getView().byId("nomineeRelationshipId").setValueStateText("Relationship cannot contain numbers and special characters");
			}
			if (nomineeCity) {
				this.getView().byId("nomineeCityId").setValueState("None");
			} else {
				this.getView().byId("nomineeCityId").setValueState("Error");
				this.getView().byId("nomineeCityId").setValueStateText("City cannot be empty");
			}
			if (nomineeState) {
				this.getView().byId("nomineeStateId").setValueState("None");
			} else {
				this.getView().byId("nomineeStateId").setValueState("Error");
				this.getView().byId("nomineeStateId").setValueStateText("State cannot be empty");
			}

			//5th form
			// if(employeeIdInExperienceForm.match(regExpId)){
			// 	this.getView().byId("employeeInForm5Id").setValueState("None");
			// }else{
			// 	this.getView().byId("employeeInForm5Id").setValueState("Error");
			// 	this.getView().byId("employeeInForm5Id").setValueStateText("Id format EMP12A");
			// }
			// if(employeeNameInExperienceForm.match(regExpName)){
			// 	this.getView().byId("employeeNameInForm5Id").getValue();
			// }else{
			// 	this.getView().byId("employeeNameInForm5Id").setValueState("Error");
			// 	this.getView().byId("employeeNameInForm5Id").setValueStateText("Name cannot contain numbers and special characters");
			// }
			if (employeeDepartment) {
				this.getView().byId("employeeDepartmentInForm5Id").setValueState("None");
			} else {
				this.getView().byId("employeeDepartmentInForm5Id").setValueState("Error");
				this.getView().byId("employeeDepartmentInForm5Id").setValueStateText("State cannot be empty");
			}
			if (employeeCompany) {
				this.getView().byId("employeeCompanyId").setValueState("None");
			} else {
				this.getView().byId("employeeCompanyId").setValueState("Error");
				this.getView().byId("employeeCompanyId").setValueStateText("State cannot be empty");
			}
			if (employeeExperience) {
				this.getView().byId("employeeExperienceInForm5Id").setValueState("None");
			} else {
				this.getView().byId("employeeExperienceInForm5Id").setValueState("Error");
				this.getView().byId("employeeExperienceInForm5Id").setValueStateText("State cannot be empty");
			}
			if (employeeSkillsItemsLength > 0) {
				this.getView().byId("employeeSkillsId").setValueState("None");
			} else {
				this.getView().byId("employeeSkillsId").setValueState("Error");
				this.getView().byId("employeeSkillsId").setValueStateText("State cannot be empty");
			}

			//6th form
			// if(employeeIdInKnowledgeForm.match(regExpId)){
			// 	this.getView().byId("employeeKnowledgeId").setValueState("None");
			// }else{
			// 	this.getView().byId("employeeKnowledgeId").setValueState("Error");
			// 	this.getView().byId("employeeKnowledgeId").setValueStateText("Id format EMP12A");
			// }
			if (employeeDateOfJoining) {
				sap.ui.getCore().byId("employeeDateOfJoiningId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeDateOfJoiningId").setValueState("Error");
				sap.ui.getCore().byId("employeeDateOfJoiningId").setValueStateText("Date cannot be empty");
			}
			if (employeeLanguagesItemsLength > 0) {
				sap.ui.getCore().byId("employeeLanguagesId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeLanguagesId").setValueState("Error");
				sap.ui.getCore().byId("employeeLanguagesId").setValueStateText("Id format EMP12A");
			}
			// if(certifiedYesText || certifiedNoText){
			// 	if(certifiedYesText){
			// 		certifiedText = this.getView().byId("certifiedYesId").getText();
			// 	}else if(certifiedNoText){
			// 		certifiedText = this.getView().byId("certifiedNoId").getText();
			// 	}
			// 	this.getView().byId("certifiedYesId").setValueState("None");
			// 	this.getView().byId("certifiedNoId").setValueState("None");
			// }else{
			// 	this.getView().byId("certifiedYesId").setValueState("Error");
			// 	this.getView().byId("certifiedNoId").setValueState("Error");
			// }
			if (employeeExperienceInKnowledgeForm) {
				sap.ui.getCore().byId("employeeExperienceId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeExperienceId").setValueState("Error");
				sap.ui.getCore().byId("employeeExperienceId").setValueStateText("Id format EMP12A");
			}
			if (employeePreviousCTC.match(regExpCTC)) {
				sap.ui.getCore().byId("employeeCTCId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeCTCId").setValueState("Error");
				sap.ui.getCore().byId("employeeCTCId").setValueStateText("Id format EMP12A");
			}
			//all fields validation
			if (employeeName.match(regExpName) && employeeId.match(regExpId) && (ageEntity.includes(employeeAgeEnteredValue) || employeeAge) &&
				(employeeGenderFemaleText || employeeGenderMaleText) && employeeEmail.match(regExpEmail) && employeeLocationItemsLength > 0 &&
				employeeAddressLine1.match(regExpAddress) && employeeAddressLine2.match(regExpAddress) && (employeeCityInForm2 || cityEntity.includes(
					employeeCityInForm2EnteredValue)) && (employeeStateInForm2 || stateEntity.includes(employeeStateInForm2EnteredValue)) &&
				employeePostalCode.match(regExpPostalCode) && (employeeAddressType || addressTypeEntity.includes(employeeAddressTypeEneteredValue)) &&
				(employeeMedicalInsuranceYes || employeeMedicalInsuranceNo) && allergiesList.match(regExpList) && medicationsList.match(regExpList) &&
				nomineeName.match(regExpName) && nomineeAge && nomineeRelationship.match(regExpRelationship) && nomineeCity && nomineeState &&
				employeeDepartment && employeeCompany && employeeExperience && employeeSkillsItemsLength > 0 && employeeDateOfJoining &&
				employeeLanguagesItemsLength > 0 && employeeExperienceInKnowledgeForm && employeePreviousCTC.match(regExpCTC)
			) {
				var employeeIconTabFilterPayload = {
					"EmployeeId": employeeId,
					"EmployeeName": employeeName,
					"EmployeeAge": employeeAge || employeeAgeEnteredValue,
					"EmployeeGender": employeeGenderText,
					"EmployeeEmail": employeeEmail,
					"EmployeeLocation": employeeLocationItemsValues,
					"EmployeeLocationKeys": employeeLocationKeys
				};
				var addressIconTabFilterPayload = {
					"EmployeeId": employeeId,
					"EmployeeAddress1": employeeAddressLine1,
					"EmployeeAddress2": employeeAddressLine2,
					"EmployeeCity": employeeCityInForm2,
					"EmployeeState": employeeStateInForm2,
					"EmployeePostalCode": employeePostalCode,
					"EmployeeAddressType": employeeAddressType
				};
				var healthIconTabFilterPayload = {
					"EmployeeId": employeeId,
					"MedicalInsurance": employeeMedicalInsuranceText,
					"AllergiesList": allergiesList,
					"MedicationsList": medicationsList,
					"EmployeeCity": employeeCityInForm2
				};
				var nomineeIconTabFilterPayload = {
					"EmployeeId": employeeId,
					"NomineeName": nomineeName,
					"NomineeAge": nomineeAge,
					"NomineeRelationship": nomineeRelationship,
					"NomineeCity": nomineeCity,
					"NomineeState": nomineeState
				};
				var experienceIconTabFilterPayload = {
					"EmployeeId": employeeId,
					"EmployeeName": employeeName,
					"EmployeeDepartment": employeeDepartment,
					"EmployeeCompany": employeeCompany,
					"EmployeeExperience": employeeExperience,
					"EmployeeSkills": employeeSkillsItemsValue,
					"EmployeeSkillsKeys": employeeSkillsKeys
				};
				var knowledgeIconTabFilterPayload = {
					"EmployeeId": employeeId,
					"EmployeeDateOfJoining": employeeDateOfJoining,
					"EmployeeLanguages": employeeLanguagesItemsValues,
					"EmployeeExperience": employeeExperience,
					"EmployeeCTC": employeePreviousCTC,
					"EmployeeLanguagesKeys": employeeLanguagesKeys
				};

				oModel.getData().EmployeeIconTabFilterEntity.push(employeeIconTabFilterPayload);
				oModel.getData().AddressIconTabFilterEntity.push(addressIconTabFilterPayload);
				oModel.getData().HealthIconTabFilterEntity.push(healthIconTabFilterPayload);
				oModel.getData().NomineeIconTabFilterEntity.push(nomineeIconTabFilterPayload);
				oModel.getData().ExperienceIconTabFilterEntity.push(experienceIconTabFilterPayload);
				oModel.getData().KnowledgeIconTabFilterEntity.push(knowledgeIconTabFilterPayload);
				oModel.refresh(true);
				
				// this.getView().setBindingContext(null);
				// Clear form data using the entire entity
				this.clearFormData();
				this.getOwnerComponent().getRouter().navTo("View5");
			}else{
				MessageBox.error("Please re-check the data entered in all forms");
			}
		},
		clearFormData: function(){
			 var oModel = this.getView().getModel("dataModel");
			 oModel.setProperty("/EmptyForm", {
        		EmptyValue: "",
        		EmptyKey: "",
    			EmptyKeys: ""
			});
			oModel.refresh(true);
			var iconTabBar = this.getView().byId("iconTabBarId");
			iconTabBar.setSelectedKey("tabEmployeeForm");
			this.getView().byId("addressFormITFId").setEnabled(false);
			this.getView().byId("healthFormITFId").setEnabled(false);
			this.getView().byId("nomineeFormITFId").setEnabled(false);
			this.getView().byId("experienceFormITFId").setEnabled(false);
			this.getView().byId("knowledgeFormITFId").setEnabled(false);
		}
	});
});