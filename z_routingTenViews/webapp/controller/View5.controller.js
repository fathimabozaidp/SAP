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

	return Controller.extend("com.dpz_routingTenViews.controller.View5", {
		onInit: function(){
			debugger;
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("View5").attachMatched(this.enableDisableDeleteButton, this);
		},
		enableDisableDeleteButton: function(){
			debugger;
			var employeeDetailsTable = this.getView().byId("form1DataTableInView5Id");
			var employeeAddressDetailsTable = this.getView().byId("form2DataTableInView5Id");
			var employeeHealthDetailsTable = this.getView().byId("form3DataTableInView5Id");
			var employeeNomineeDetailsTable = this.getView().byId("form4DataTableInView5Id");
			var employeeExperienceDetailsTable = this.getView().byId("form5DataTableInView5Id");
			var employeeKnowledgeDetailsTable = this.getView().byId("form6DataTableInView5Id");
			
			if(employeeDetailsTable.getItems().length > 0){
				//enable delete button of Employee Details Table
				this.getView().byId("deleteEmployeeDetailsButtonId").setEnabled(true);
			}else{
				this.getView().byId("deleteEmployeeDetailsButtonId").setEnabled(false);
			}
			if(employeeAddressDetailsTable.getItems().length > 0){
				//enable delete button of Employee Address Details Table
				this.getView().byId("deleteEmployeeAddressDetailsButtonId").setEnabled(true);
			}else{
				this.getView().byId("deleteEmployeeAddressDetailsButtonId").setEnabled(false);
			}
			if(employeeHealthDetailsTable.getItems().length > 0){
				//enable delete button of Employee Health Details Table
				this.getView().byId("deleteEmployeeHealthDetailsButtonId").setEnabled(true);
			}else{
				this.getView().byId("deleteEmployeeHealthDetailsButtonId").setEnabled(false);
			}
			if(employeeNomineeDetailsTable.getItems().length > 0){
				//enable delete button of Employee Nominee Details Table
				this.getView().byId("deleteEmployeeNomineeDetailsButtonId").setEnabled(true);
			}else{
				this.getView().byId("deleteEmployeeNomineeDetailsButtonId").setEnabled(false);
			}
			if(employeeExperienceDetailsTable.getItems().length > 0){
				//enable delete button of Employee Experience Details Table
				this.getView().byId("deleteEmployeeExperienceDetailsButtonId").setEnabled(true);
			}else{
				this.getView().byId("deleteEmployeeExperienceDetailsButtonId").setEnabled(false);
			}
			if(employeeKnowledgeDetailsTable.getItems().length > 0){
				//enable delete button of Employee Knowledge Details Table
				this.getView().byId("deleteEmployeeKnowledgeDetailsButtonId").setEnabled(true);
			}else{
				this.getView().byId("deleteEmployeeKnowledgeDetailsButtonId").setEnabled(false);
			}
		},
		_OnPressBackGoToView4: function() {
			this.getOwnerComponent().getRouter().navTo("View4");
		},
		_OnPressRowOpenEditEmployeeFragment: function(oEvent) {
			var oModel = this.getOwnerComponent().getModel("dataModel");
			var object = oEvent.getSource().getBindingContext("dataModel").getObject();
			var multiComboEmployeeLocationKeys = object.EmployeeLocationKeys;
			oModel.setProperty("/SelectedRow", object);
			if (!this.employeeDetailsFragment) {
				this.employeeDetailsFragment = sap.ui.xmlfragment("com.dpz_routingTenViews.view.fragments.employeeUpdateFragment", this);
				this.getView().addDependent(this.employeeDetailsFragment);
			}
			//for gender radio auto selection
			if (object.EmployeeGender === "Male") {
				sap.ui.getCore().byId("employeeEditGenderMaleId").setSelected(true);
			} else if (object.EmployeeGender === "Female") {
				sap.ui.getCore().byId("employeeEditGenderFemaleId").setSelected(true);
			}
			//for multi-combo-box Employee Location keys selection
			sap.ui.getCore().byId("employeeEditLocationId").setSelectedKeys(multiComboEmployeeLocationKeys);
			oModel.refresh(true);
			this.employeeDetailsFragment.open();
		},
		_OnPressRowOpenEmployeeAddressFragment: function(oEvent) {
			var oModel = this.getOwnerComponent().getModel("dataModel");
			var object = oEvent.getSource().getBindingContext("dataModel").getObject();
			oModel.setProperty("/SelectedRow", object);

			if (!this.addressFragment) {
				this.addressFragment = sap.ui.xmlfragment("com.dpz_routingTenViews.view.fragments.employeeAddressFragment", this);
				this.getView().addDependent(this.addressFragment);
			}
			oModel.refresh(true);
			this.addressFragment.open();
		},
		_OnPressRowOpenEmployeeHealthFragment: function(oEvent) {
			var oModel = this.getOwnerComponent().getModel("dataModel");
			var object = oEvent.getSource().getBindingContext("dataModel").getObject();
			oModel.setProperty("/SelectedRow", object);
			if (!this.healthFragment) {
				this.healthFragment = sap.ui.xmlfragment("com.dpz_routingTenViews.view.fragments.employeeHealthFragment", this);
				this.getView().addDependent(this.healthFragment);
			}
			//for gender radio auto selection
			if (object.MedicalInsurance === "Yes") {
				sap.ui.getCore().byId("employeeEditMedicalInsuranceYesId").setSelected(true);
			} else if (object.MedicalInsurance === "No") {
				sap.ui.getCore().byId("employeeEditMedicalInsuranceNoId").setSelected(true);
			}
			oModel.refresh(true);
			this.healthFragment.open();
		},
		_OnPressRowOpenEmployeeNomineeFragment: function(oEvent) {
			var oModel = this.getOwnerComponent().getModel("dataModel");
			var object = oEvent.getSource().getBindingContext("dataModel").getObject();
			oModel.setProperty("/SelectedRow", object);
			oModel.refresh(true);
			if (!this.nomineeFragment) {
				this.nomineeFragment = sap.ui.xmlfragment("com.dpz_routingTenViews.view.fragments.employeeNomineeFragment", this);
				this.getView().addDependent(this.nomineeFragment);
			}
			this.nomineeFragment.open();
		},
		_OnPressRowOpenEmployeeExperienceFragment: function(oEvent) {
			var oModel = this.getOwnerComponent().getModel("dataModel");
			var object = oEvent.getSource().getBindingContext("dataModel").getObject();
			var multiComboEmployeeSkillsKeys = object.EmployeeSkillsKeys;
			oModel.setProperty("/SelectedRow", object);
			oModel.refresh(true);
			if (!this.experienceFragment) {
				this.experienceFragment = sap.ui.xmlfragment("com.dpz_routingTenViews.view.fragments.employeeExperienceFragment", this);
				this.getView().addDependent(this.experienceFragment);
			}
			//for multi-combo-box Employee Location keys selection
			sap.ui.getCore().byId("employeeEditSkillsId").setSelectedKeys(multiComboEmployeeSkillsKeys);
			oModel.refresh(true);
			this.experienceFragment.open();
		},
		_OnPressRowOpenEmployeeKnowledgeFragment: function(oEvent) {
			debugger;
			var oModel = this.getOwnerComponent().getModel("dataModel");
			var object = oEvent.getSource().getBindingContext("dataModel").getObject();
			oModel.setProperty("/SelectedRow", object);
			oModel.refresh(true);
			if (!this.knowledgeFragment) {
				this.knowledgeFragment = sap.ui.xmlfragment("com.dpz_routingTenViews.view.fragments.employeeKnowledgeFragment", this);
				this.getView().addDependent(this.knowledgeFragment);
			}
			this.knowledgeFragment.open();
			// 	//creates dynamic from 
			var knowledgeEditForm = new SimpleForm({
				editable: true,
				layout: "ResponsiveGridLayout",
				labelSpanXL: 5,
				labelSpanL: 4,
				labelSpanM: 5,
				labelSpanS: 3,
				emptySpanXL: 4,
				emptySpanL: 4,
				emptySpanM: 4,
				emptySpanS: 4,
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
						id: "employeeEditKnowledgeId",
						editable: false,
						value:"{dataModel>/SelectedRow/EmployeeId}"
					}),

					//employee date of birth
					new Label({
						text: "Date of Joining",
						required: true
					}),
					new DatePicker({
						id: "employeeEditDateOfJoiningId",
						displayFormat: "dd.MM.YYYY",
						valueFormat : "dd.MM.YYYY",
						value : "{dataModel>/SelectedRow/EmployeeDateOfJoining}"
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
						id: "employeeEditLanguagesId",
						forceSelection: false,
						selectedKeys : "{dataModel>/SelectedRow/EmployeeLanguages}"
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
						id: "employeeEditExperienceId",
						forceSelection: false,
						selectedKey : "{dataModel>/SelectedRow/EmployeeExperience}"
					}),

					//invoice value
					new Label({
						text: "Previous CTC(Annual)",
						required: true
					}),
					new Input({
						id: "employeeEditCTCId",
						placeholder: "Enter CTC(Annual) in LPA",
						value : "{dataModel>/SelectedRow/EmployeeCTC}"
					})
				]
			});

			//get vbox in form id
			var oForm = sap.ui.getCore().byId("dynamicFormInKnowledgeFragmentVBoxId");
			oForm.addItem(knowledgeEditForm);

			var oButton = sap.ui.getCore().byId("dynamicFormInKnowledgeFragmentSubmitButtonVBoxInFlexBoxId");
			var getButton = sap.ui.getCore().byId("submitDynamicFormInKnowledgeButtonId");
			oButton.addItem(getButton);

			//select STATE code
			sap.ui.getCore().byId("employeeEditLanguagesId").bindAggregation("items", {
				path: "dataModel>/EmployeeLanguages",
				template: new sap.ui.core.Item({
					key: "{dataModel>key}",
					text: "{dataModel>text}"
				})
			});
			sap.ui.getCore().byId("employeeEditExperienceId").bindAggregation("items", {
				path: "dataModel>/ExperienceDetails",
				template: new sap.ui.core.Item({
					key: "{dataModel>key}",
					text: "{dataModel>text}"
				})
			});
			var oToday = new Date();
			var oEmployeeEditDateOfJoiningDatePicker = sap.ui.getCore().byId("employeeEditDateOfJoiningId");
			oEmployeeEditDateOfJoiningDatePicker.setMinDate(oToday);
		},
		_OnClickCloseEditEmployeeFragment: function() {
			this.employeeDetailsFragment.close();
		},
		_OnClickCloseEditEmployeeAddressFragment: function() {
			this.addressFragment.close();
		},
		_OnClickCloseEditEmployeeHealthFragment: function() {
			this.healthFragment.close();
		},
		_OnClickCloseEditEmployeeNomineeFragment: function() {
			this.nomineeFragment.close();
		},
		_OnClickCloseEditEmployeeKnowledgeFragment: function() {
			this.knowledgeFragment.close();
		},
		_OnClickCloseEditEmployeeExperienceFragment: function() {
			this.experienceFragment.close();
		},

		_OnPressSaveEdittedEmployeeDetails: function() {
			var regExpName = /^[A-Za-z\s]+$/;
			var regExpId = /^EMP[0-9]{2}[A-Z]{1}$/;
			var regExpEmail = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.com$/;

			var employeeEditName = sap.ui.getCore().byId("employeeEditNameId").getValue().trim();
			var employeeEditId = sap.ui.getCore().byId("employeeEditId").getValue();
			var employeeEditAge = sap.ui.getCore().byId("employeeEditAgeId").getSelectedKey();
			// var employeeEditAgeEnteredValue = sap.ui.getCore().byId("employeeEditAgeId").getValue();
			var employeeEditGenderMaleText = sap.ui.getCore().byId("employeeEditGenderMaleId").getSelected();
			var employeeEditGenderFemaleText = sap.ui.getCore().byId("employeeEditGenderFemaleId").getSelected();
			var employeeEditGenderText;
			var employeeEditEmail = sap.ui.getCore().byId("employeeEditEmailId").getValue();
			// var employeeEditLocationKeys = sap.ui.getCore().byId("employeeEditLocationId").getSelectedKeys();
			var employeeEditLocationItems = sap.ui.getCore().byId("employeeEditLocationId").getSelectedItems();
			var employeeEditLocationItemsValues = employeeEditLocationItems.map(function(item) {
				return item.getText();
			});
			var employeeEditLocationItemsLength = employeeEditLocationItems.length;

			if (employeeEditName.match(regExpName)) {
				sap.ui.getCore().byId("employeeEditNameId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditNameId").setValueState("Error");
				sap.ui.getCore().byId("employeeEditNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			if (employeeEditId.match(regExpId)) {
				sap.ui.getCore().byId("employeeEditId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditId").setValueState("Error");
				sap.ui.getCore().byId("employeeEditId").setValueStateText("Id format EMP12A");
			}
			if (employeeEditAge) {
				sap.ui.getCore().byId("employeeEditAgeId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditAgeId").setValueState("Error");
				sap.ui.getCore().byId("employeeEditAgeId").setValueStateText("Age cannot be empty");
			}
			if (employeeEditGenderFemaleText || employeeEditGenderMaleText) {
				if (employeeEditGenderFemaleText) {
					employeeEditGenderText = sap.ui.getCore().byId("employeeEditGenderFemaleId").getText();
				} else if (employeeEditGenderMaleText) {
					employeeEditGenderText = sap.ui.getCore().byId("employeeEditGenderMaleId").getText();
				}
				sap.ui.getCore().byId("employeeEditGenderFemaleId").setValueState("None");
				sap.ui.getCore().byId("employeeEditGenderMaleId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditGenderFemaleId").setValueState("Error");
				sap.ui.getCore().byId("employeeEditGenderMaleId").setValueState("Error");
			}
			if (employeeEditEmail.match(regExpEmail)) {
				sap.ui.getCore().byId("employeeEditEmailId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditEmailId").setValueState("Error");
				sap.ui.getCore().byId("employeeEditEmailId").setValueStateText("Enter proper Email eg: userid@domain.com");
			}
			if (employeeEditLocationItemsLength > 0) {
				sap.ui.getCore().byId("employeeEditLocationId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditLocationId").setValueState("Error");
				sap.ui.getCore().byId("employeeEditLocationId").setValueStateText("Location cannot be empty");
			}
			if (employeeEditName.match(regExpName) && employeeEditId.match(regExpId) && employeeEditAge && (employeeEditGenderFemaleText ||
					employeeEditGenderMaleText) && employeeEditEmail.match(regExpEmail) && employeeEditLocationItemsLength > 0) {
				MessageBox.success("Success");
				var employeeEditIconTabFilterPayload = {
					"EmployeeId": employeeEditId,
					"EmployeeName": employeeEditName,
					"EmployeeAge": employeeEditAge,
					"EmployeeGender": employeeEditGenderText,
					"EmployeeEmail": employeeEditEmail,
					"EmployeeLocation": employeeEditLocationItemsValues
				};
				//get data from model to replace old object with new object
				var oModel = this.getOwnerComponent().getModel("dataModel");
				var employeeEdittedDetailsArray = oModel.getData().EmployeeIconTabFilterEntity;
				employeeEdittedDetailsArray.map(function(item) {
					if (item.EmployeeId === employeeEditId) {
						var previousObject = item;
						Object.assign(previousObject, employeeEditIconTabFilterPayload);
					}
				});
				oModel.refresh(true);
				this.employeeDetailsFragment.close();
				sap.ui.getCore().byId("employeeEditNameId").setValue("");
				sap.ui.getCore().byId("employeeEditId").setValue("");
				sap.ui.getCore().byId("employeeEditAgeId").setSelectedKey("");
				sap.ui.getCore().byId("employeeEditGenderMaleId").setSelected(false);
				sap.ui.getCore().byId("employeeEditGenderFemaleId").setSelected(false);
				sap.ui.getCore().byId("employeeEditEmailId").setValue("");
				sap.ui.getCore().byId("employeeEditLocationId").setSelectedKeys("");
			} else if (!employeeEditName.match(regExpName) && !employeeEditId.match(regExpId) && !employeeEditAge && (!employeeEditGenderFemaleText ||
					!employeeEditGenderMaleText) && !employeeEditEmail.match(regExpEmail) && !employeeEditLocationItemsLength > 0)  {
				MessageBox.error("Fill all mandatory fields");
			}
		},
		_OnPressSaveEdittedEmployeeAddressDetails: function() {
			var regExpId = /^EMP[0-9]{2}[A-Z]{1}$/;
			var regExpAddress = /^[A-Za-z0-9,\s]+$/;
			var regExpPostalCode = /^[0-9]{6}$/;

			var employeeEditIdInAddressForm = sap.ui.getCore().byId("eEditId").getValue();
			var employeeEditAddressLine1 = sap.ui.getCore().byId("employeeEditAddress1TextId").getValue().trim();
			var employeeEditAddressLine2 = sap.ui.getCore().byId("employeeEditAddress2TextId").getValue().trim();
			var employeeEditCityInForm2 = sap.ui.getCore().byId("employeeEditCityInForm2Id").getSelectedKey();
			// var employeeEditCityInForm2EnteredValue = sap.ui.getCore().byId("employeeEditCityInForm2Id").getValue();
			var employeeEditStateInForm2 = sap.ui.getCore().byId("employeeEditStateInForm2Id").getSelectedKey();
			// var employeeEditStateInForm2EnteredValue = sap.ui.getCore().byId("employeeEditStateInForm2Id").getValue();
			var employeeEditPostalCode = sap.ui.getCore().byId("employeeEditPostalCodeId").getValue().trim();
			var employeeEditAddressType = sap.ui.getCore().byId("employeeEditAddressTypeId").getSelectedKey();
			// var employeeEditAddressTypeEneteredValue = sap.ui.getCore().byId("employeeEditAddressTypeId").getValue();

			if (employeeEditIdInAddressForm.match(regExpId)) {
				sap.ui.getCore().byId("eEditId").setValueState("None");
			} else {
				sap.ui.getCore().byId("eEditId").setValueState("Error");
				sap.ui.getCore().byId("eEditId").setValueStateText("Id format EMP12A");
			}
			if (employeeEditAddressLine1.match(regExpAddress)) {
				sap.ui.getCore().byId("employeeEditAddress1TextId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditAddress1TextId").setValueState("Error");
				sap.ui.getCore().byId("employeeEditAddress1TextId").setValueStateText("Address cannot be empty");
			}
			if (employeeEditAddressLine2.match(regExpAddress)) {
				sap.ui.getCore().byId("employeeEditAddress2TextId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditAddress2TextId").setValueState("Error");
				sap.ui.getCore().byId("employeeEditAddress2TextId").setValueStateText("Address cannot be empty");
			}
			if (employeeEditCityInForm2) {
				sap.ui.getCore().byId("employeeEditCityInForm2Id").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditCityInForm2Id").setValueState("Error");
				sap.ui.getCore().byId("employeeEditCityInForm2Id").setValueStateText("City cannot be empty");
			}
			if (employeeEditStateInForm2) {
				sap.ui.getCore().byId("employeeEditStateInForm2Id").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditStateInForm2Id").setValueState("Error");
				sap.ui.getCore().byId("employeeEditStateInForm2Id").setValueStateText("State cannot be empty");
			}
			if (employeeEditPostalCode.match(regExpPostalCode)) {
				sap.ui.getCore().byId("employeeEditPostalCodeId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditPostalCodeId").setValueState("Error");
				sap.ui.getCore().byId("employeeEditPostalCodeId").setValueStateText("Postal code must contain only 6 digits");
			}
			if (employeeEditAddressType) {
				sap.ui.getCore().byId("employeeEditAddressTypeId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditAddressTypeId").setValueState("Error");
				sap.ui.getCore().byId("employeeEditAddressTypeId").setValueStateText("Address Type cannot be empty");
			}
			if (employeeEditIdInAddressForm.match(regExpId) && employeeEditAddressLine1.match(regExpAddress) && employeeEditAddressLine2.match(
					regExpAddress) && employeeEditCityInForm2 && employeeEditStateInForm2 && employeeEditPostalCode.match(regExpPostalCode) &&
				employeeEditAddressType) {
				MessageBox.success("Success");
				var addressEditIconTabFilterPayload = {
					"EmployeeId": employeeEditIdInAddressForm,
					"EmployeeAddress1": employeeEditAddressLine1,
					"EmployeeAddress2": employeeEditAddressLine2,
					"EmployeeCity": employeeEditCityInForm2,
					"EmployeeState": employeeEditStateInForm2,
					"EmployeePostalCode": employeeEditPostalCode,
					"EmployeeAddressType": employeeEditAddressType
				};
				//get data from model to replace old object with new object
				var oModel = this.getOwnerComponent().getModel("dataModel");
				var addressEdittedDetailsArray = oModel.getData().AddressIconTabFilterEntity;
				addressEdittedDetailsArray.map(function(item) {
					if (item.EmployeeId === employeeEditIdInAddressForm) {
						var previousObject = item;
						Object.assign(previousObject, addressEditIconTabFilterPayload);
					}
				});
				oModel.refresh(true);
				sap.ui.getCore().byId("eEditId").setValue("");
				sap.ui.getCore().byId("employeeEditAddress1TextId").setValue("");
				sap.ui.getCore().byId("employeeEditAddress2TextId").setValue("");
				sap.ui.getCore().byId("employeeEditCityInForm2Id").setSelectedKey("");
				sap.ui.getCore().byId("employeeEditStateInForm2Id").setSelectedKey("");
				sap.ui.getCore().byId("employeeEditPostalCodeId").setValue("");
				sap.ui.getCore().byId("employeeEditAddressTypeId").setSelectedKey("");
				this.addressFragment.close();
			} else if (!employeeEditIdInAddressForm.match(regExpId) && !employeeEditAddressLine1.match(regExpAddress) && 
					!employeeEditAddressLine2.match(regExpAddress) && !employeeEditCityInForm2 && !employeeEditStateInForm2 && 
					!employeeEditPostalCode.match(regExpPostalCode) && !employeeEditAddressType) {
				MessageBox.error("Fill all mandatory fields");
			}
		},
		_OnPressSaveEdittedEmployeeHealthDetails: function() {
			var regExpId = /^EMP[0-9]{2}[A-Z]{1}$/;
			var regExpList = /^[A-Za-z,\s]+$/;
			var employeeEditIdInHealthForm = sap.ui.getCore().byId("employeeEditIdInHealthForm").getValue();
			var employeeEditMedicalInsuranceYes = sap.ui.getCore().byId("employeeEditMedicalInsuranceYesId").getSelected();
			var employeeEditMedicalInsuranceNo = sap.ui.getCore().byId("employeeEditMedicalInsuranceNoId").getSelected();
			var employeeEditMedicalInsuranceText;
			var allergiesEditList = sap.ui.getCore().byId("employeeEditAllergiesListId").getValue();
			var medicationsEditList = sap.ui.getCore().byId("employeeEditMedicationsListId").getValue();
			var cityInHealthForm = sap.ui.getCore().byId("employeeEditCityInForm3Id").getSelectedKey();

			if (employeeEditIdInHealthForm.match(regExpId)) {
				sap.ui.getCore().byId("employeeEditIdInHealthForm").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditIdInHealthForm").setValueState("Error");
				sap.ui.getCore().byId("employeeEditIdInHealthForm").setValueStateText("Id format EMP12A");
			}
			if (employeeEditMedicalInsuranceYes || employeeEditMedicalInsuranceNo) {
				if (employeeEditMedicalInsuranceYes) {
					employeeEditMedicalInsuranceText = sap.ui.getCore().byId("employeeEditMedicalInsuranceYesId").getText();

				} else if (employeeEditMedicalInsuranceNo) {
					employeeEditMedicalInsuranceText = sap.ui.getCore().byId("employeeEditMedicalInsuranceNoId").getText();
				}
				sap.ui.getCore().byId("employeeEditMedicalInsuranceYesId").setValueState("None");
				sap.ui.getCore().byId("employeeEditMedicalInsuranceNoId").setValueState("None");

			} else {
				sap.ui.getCore().byId("employeeEditMedicalInsuranceYesId").setValueState("Error");
				sap.ui.getCore().byId("employeeEditMedicalInsuranceNoId").setValueState("Error");
			}
			if (allergiesEditList.match(regExpList)) {
				sap.ui.getCore().byId("employeeEditAllergiesListId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditAllergiesListId").setValueState("Error");
				sap.ui.getCore().byId("employeeEditAllergiesListId").setValueStateText("Allergies List cannot be empty");
			}
			if (medicationsEditList.match(regExpList)) {
				sap.ui.getCore().byId("employeeEditMedicationsListId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditMedicationsListId").setValueState("Error");
				sap.ui.getCore().byId("employeeEditMedicationsListId").setValueStateText("Medicines List cannot be empty");
			}
			if (cityInHealthForm) {
				sap.ui.getCore().byId("employeeEditCityInForm3Id").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditCityInForm3Id").setValueState("Error");
				sap.ui.getCore().byId("employeeEditCityInForm3Id").setValueStateText("City cannot be empty");
			}
			if(employeeEditIdInHealthForm.match(regExpId) && (employeeEditMedicalInsuranceYes || employeeEditMedicalInsuranceNo) 
				&& allergiesEditList.match(regExpList) && medicationsEditList.match(regExpList) && cityInHealthForm){
				MessageBox.success("Success");
				var healthIconTabFilterPayload = {
					"EmployeeId": employeeEditIdInHealthForm,
					"MedicalInsurance": employeeEditMedicalInsuranceText,
					"AllergiesList": allergiesEditList,
					"MedicationsList": medicationsEditList,
					"EmployeeCity": cityInHealthForm
				};
				//get data from model to replace old object with new object
				var oModel = this.getOwnerComponent().getModel("dataModel");
				var healthEdittedDetailsArray = oModel.getData().HealthIconTabFilterEntity;
				healthEdittedDetailsArray.map(function(item) {
					if (item.EmployeeId === employeeEditIdInHealthForm) {
						var previousObject = item;
						Object.assign(previousObject, healthIconTabFilterPayload);
					}
				});
				oModel.refresh(true);
				sap.ui.getCore().byId("employeeEditIdInHealthForm").setValue("");
				sap.ui.getCore().byId("employeeEditMedicalInsuranceYesId").setSelected(false);
				sap.ui.getCore().byId("employeeEditMedicalInsuranceNoId").setSelected(false);
				sap.ui.getCore().byId("employeeEditAllergiesListId").setValue("");
				sap.ui.getCore().byId("employeeEditMedicationsListId").setValue("");
				sap.ui.getCore().byId("employeeEditCityInForm3Id").setSelectedKey("");
				this.healthFragment.close();
			}else if (!employeeEditIdInHealthForm.match(regExpId) && (!employeeEditMedicalInsuranceYes || !employeeEditMedicalInsuranceNo) 
				&& !allergiesEditList.match(regExpList) && !medicationsEditList.match(regExpList) && !cityInHealthForm){
				MessageBox.error("Fill all mandatory fields");
			}

		},
		_OnPressSaveEdittedEmployeeNomineeDetails: function() {
			var regExpName = /^[A-Za-z\s]+$/;
			var regExpId = /^EMP[0-9]{2}[A-Z]{1}$/;
			var regExpRelationship = /^[A-Za-z\s]+$/;
			var employeeEditIdInNomineeEditForm = sap.ui.getCore().byId("employeeEditIdInForm4").getValue();
			var nomineeEditName = sap.ui.getCore().byId("nomineeEditNameId").getValue();
			var nomineeEditAge = sap.ui.getCore().byId("nomineeEditAgeId").getSelectedKey();
			var nomineeEditRelationship = sap.ui.getCore().byId("nomineeEditRelationshipId").getValue();
			var nomineeEditCity = sap.ui.getCore().byId("nomineeEditCityId").getSelectedKey();
			var nomineeEditState = sap.ui.getCore().byId("nomineeEditStateId").getSelectedKey();

			if(employeeEditIdInNomineeEditForm.match(regExpId)){
				sap.ui.getCore().byId("employeeEditIdInForm4").setValueState("None");
			}else{
				sap.ui.getCore().byId("employeeEditIdInForm4").setValueState("Error");
				sap.ui.getCore().byId("employeeEditIdInForm4").setValueStateText("Id format EMP12A");
			}
			if (nomineeEditName.match(regExpName)) {
				sap.ui.getCore().byId("nomineeEditNameId").getValue();
			} else {
				sap.ui.getCore().byId("nomineeEditNameId").setValueState("Error");
				sap.ui.getCore().byId("nomineeEditNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			if (nomineeEditAge) {
				sap.ui.getCore().byId("nomineeEditAgeId").setValueState("None");
			} else {
				sap.ui.getCore().byId("nomineeEditAgeId").setValueState("Error");
				sap.ui.getCore().byId("nomineeEditAgeId").setValueStateText("Age cannot be empty");
			}
			if (nomineeEditRelationship.match(regExpRelationship)) {
				sap.ui.getCore().byId("nomineeEditRelationshipId").setValueState("None");
			} else {
				sap.ui.getCore().byId("nomineeEditRelationshipId").setValueState("Error");
				sap.ui.getCore().byId("nomineeEditRelationshipId").setValueStateText("Relationship cannot contain numbers and special characters");
			}
			if (nomineeEditCity) {
				sap.ui.getCore().byId("nomineeEditCityId").setValueState("None");
			} else {
				sap.ui.getCore().byId("nomineeEditCityId").setValueState("Error");
				sap.ui.getCore().byId("nomineeEditCityId").setValueStateText("City cannot be empty");
			}
			if (nomineeEditState) {
				sap.ui.getCore().byId("nomineeEditStateId").setValueState("None");
			} else {
				sap.ui.getCore().byId("nomineeEditStateId").setValueState("Error");
				sap.ui.getCore().byId("nomineeEditStateId").setValueStateText("State cannot be empty");
			}
			if(employeeEditIdInNomineeEditForm.match(regExpId) && nomineeEditName.match(regExpName) && nomineeEditAge 
				&& nomineeEditRelationship.match(regExpRelationship) && nomineeEditCity && nomineeEditState ){
					MessageBox.success("Success");
				var nomineeEdittedIconTabFilterPayload = {
					"EmployeeId": employeeEditIdInNomineeEditForm,
					"NomineeName": nomineeEditName,
					"NomineeAge": nomineeEditAge,
					"NomineeRelationship": nomineeEditRelationship,
					"NomineeCity": nomineeEditCity,
					"NomineeState": nomineeEditState
				};
				//get data from model to replace old object with new object
				var oModel = this.getOwnerComponent().getModel("dataModel");
				var nomineeEdittedDetailsArray = oModel.getData().NomineeIconTabFilterEntity;
				nomineeEdittedDetailsArray.map(function(item) {
					if (item.EmployeeId === employeeEditIdInNomineeEditForm) {
						var previousObject = item;
						Object.assign(previousObject, nomineeEdittedIconTabFilterPayload);
					}
				});
				oModel.refresh(true);
				sap.ui.getCore().byId("employeeEditIdInForm4").setValue("");
				sap.ui.getCore().byId("nomineeEditNameId").setValue("");
				sap.ui.getCore().byId("nomineeEditAgeId").setSelectedKey("");
				sap.ui.getCore().byId("nomineeEditRelationshipId").setValue("");
				sap.ui.getCore().byId("nomineeEditCityId").setSelectedKey("");
				sap.ui.getCore().byId("nomineeEditStateId").setSelectedKey("");
				this.nomineeFragment.close();
			}else if (!employeeEditIdInNomineeEditForm.match(regExpId) && !nomineeEditName.match(regExpName) && !nomineeEditAge 
				&& !nomineeEditRelationship.match(regExpRelationship) && !nomineeEditCity && !nomineeEditState ){
				MessageBox.error("Fill all mandatory fields");
			}
		},
		_OnPressSaveEdittedEmployeeExperienceDetails: function() {
			var regExpName = /^[A-Za-z\s]+$/;
			var regExpId = /^EMP[0-9]{2}[A-Z]{1}$/;
			//form5 values
			var employeeEditIdInExperienceForm = sap.ui.getCore().byId("employeeEditInForm5Id").getValue();
			var employeeEditNameInExperienceForm = sap.ui.getCore().byId("employeeEditNameInForm5Id").getValue();
			var employeeEditDepartment = sap.ui.getCore().byId("employeeEditDepartmentInForm5Id").getSelectedKey();
			var employeeEditCompany = sap.ui.getCore().byId("employeeEditCompanyId").getSelectedKey();
			var employeeEditExperience = sap.ui.getCore().byId("employeeEditExperienceInForm5Id").getSelectedKey();
			// var employeeEditSkillsKeys = sap.ui.getCore().byId("employeeEditSkillsId").getSelectedKeys();
			var employeeEditSkillsItems = sap.ui.getCore().byId("employeeEditSkillsId").getSelectedItems();
			var employeeEditSkillsItemsLength = employeeEditSkillsItems.length;
			var employeeEditSkillsItemsValue = employeeEditSkillsItems.map(function(item) {
				return item.getText();
			});
			
			if(employeeEditIdInExperienceForm.match(regExpId)){
				sap.ui.getCore().byId("employeeEditInForm5Id").setValueState("None");
			}else{
				sap.ui.getCore().byId("employeeEditInForm5Id").setValueState("Error");
				sap.ui.getCore().byId("employeeEditInForm5Id").setValueStateText("Id format EMP12A");
			}
			if(employeeEditNameInExperienceForm.match(regExpName)){
				sap.ui.getCore().byId("employeeEditNameInForm5Id").getValue();
			}else{
				sap.ui.getCore().byId("employeeEditNameInForm5Id").setValueState("Error");
				sap.ui.getCore().byId("employeeEditNameInForm5Id").setValueStateText("Name cannot contain numbers and special characters");
			}
			if (employeeEditDepartment) {
				sap.ui.getCore().byId("employeeEditDepartmentInForm5Id").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditDepartmentInForm5Id").setValueState("Error");
				sap.ui.getCore().byId("employeeEditDepartmentInForm5Id").setValueStateText("State cannot be empty");
			}
			if (employeeEditCompany) {
				sap.ui.getCore().byId("employeeEditCompanyId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditCompanyId").setValueState("Error");
				sap.ui.getCore().byId("employeeEditCompanyId").setValueStateText("State cannot be empty");
			}
			if (employeeEditExperience) {
				sap.ui.getCore().byId("employeeEditExperienceInForm5Id").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditExperienceInForm5Id").setValueState("Error");
				sap.ui.getCore().byId("employeeEditExperienceInForm5Id").setValueStateText("State cannot be empty");
			}
			if (employeeEditSkillsItemsLength > 0) {
				sap.ui.getCore().byId("employeeEditSkillsId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditSkillsId").setValueState("Error");
				sap.ui.getCore().byId("employeeEditSkillsId").setValueStateText("State cannot be empty");
			}
			if(employeeEditIdInExperienceForm.match(regExpId) && employeeEditNameInExperienceForm.match(regExpName) 
				&& employeeEditDepartment && employeeEditCompany && employeeEditExperience && employeeEditSkillsItemsLength > 0 ){
				var experienceEdittedIconTabFilterPayload = {
					"EmployeeId": employeeEditIdInExperienceForm,
					"EmployeeName": employeeEditNameInExperienceForm,
					"EmployeeDepartment": employeeEditDepartment,
					"EmployeeCompany": employeeEditCompany,
					"EmployeeExperience": employeeEditExperience,
					"EmployeeSkills": employeeEditSkillsItemsValue
				};
				//get data from model to replace old object with new object
				var oModel = this.getOwnerComponent().getModel("dataModel");
				var experienceEdittedDetailsArray = oModel.getData().ExperienceIconTabFilterEntity;
				experienceEdittedDetailsArray.map(function(item) {
					if (item.EmployeeId === employeeEditIdInExperienceForm) {
						var previousObject = item;
						Object.assign(previousObject, experienceEdittedIconTabFilterPayload);
					}
				});
				oModel.refresh(true);
				sap.ui.getCore().byId("employeeEditInForm5Id").setValue("");
				sap.ui.getCore().byId("employeeEditNameInForm5Id").setValue("");
				sap.ui.getCore().byId("employeeEditDepartmentInForm5Id").setSelectedKey("");
				sap.ui.getCore().byId("employeeEditCompanyId").setSelectedKey("");
				sap.ui.getCore().byId("employeeEditExperienceInForm5Id").setSelectedKey("");
				sap.ui.getCore().byId("employeeEditSkillsId").setSelectedKeys("");
				this.experienceFragment.close();
			}else if(!employeeEditIdInExperienceForm.match(regExpId) && !employeeEditNameInExperienceForm.match(regExpName) 
				&& !employeeEditDepartment && !employeeEditCompany && !employeeEditExperience && !employeeEditSkillsItemsLength > 0 ){
				MessageBox.error("Fill all mandatory fields");
			}
		},
		_OnPressSaveEdittedEmployeeKnowledgeDetails: function() {
			debugger;
			var regExpId = /^EMP[0-9]{2}[A-Z]{1}$/;
			var regExpCTC = /^(?:10|\d+) LPA/;
			//form6 values
			var employeeEditIdInKnowledgeForm = sap.ui.getCore().byId("employeeEditKnowledgeId").getValue();
			var employeeEditDateOfJoining = sap.ui.getCore().byId("employeeEditDateOfJoiningId").getValue();
			// var employeeEditLanguagesKeys = sap.ui.getCore().byId("employeeEditLanguagesId").getSelectedKeys();
			var employeeEditLanguagesItems = sap.ui.getCore().byId("employeeEditLanguagesId").getSelectedItems();
			var employeeEditExperienceInKnowledgeForm = sap.ui.getCore().byId("employeeEditExperienceId").getSelectedKey();
			var employeeEditLanguagesItemsValues = employeeEditLanguagesItems.map(function(item) {
				return item.getText();
			});
			var employeeEditLanguagesItemsLength = sap.ui.getCore().byId("employeeEditLanguagesId").getSelectedItems().length;
			var employeeEditPreviousCTC = sap.ui.getCore().byId("employeeEditCTCId").getValue();
			
			if(employeeEditIdInKnowledgeForm.match(regExpId)){
				sap.ui.getCore().byId("employeeEditKnowledgeId").setValueState("None");
			}else{
				sap.ui.getCore().byId("employeeEditKnowledgeId").setValueState("Error");
				sap.ui.getCore().byId("employeeEditKnowledgeId").setValueStateText("Id format EMP12A");
			}
			if (employeeEditDateOfJoining) {
				sap.ui.getCore().byId("employeeEditDateOfJoiningId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditDateOfJoiningId").setValueState("Error");
				sap.ui.getCore().byId("employeeEditDateOfJoiningId").setValueStateText("Date cannot be empty");
			}
			if (employeeEditLanguagesItemsLength > 0) {
				sap.ui.getCore().byId("employeeEditLanguagesId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditLanguagesId").setValueState("Error");
				sap.ui.getCore().byId("employeeEditLanguagesId").setValueStateText("Id format EMP12A");
			}
			if (employeeEditExperienceInKnowledgeForm) {
				sap.ui.getCore().byId("employeeEditExperienceId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditExperienceId").setValueState("Error");
				sap.ui.getCore().byId("employeeEditExperienceId").setValueStateText("Id format EMP12A");
			}
			if (employeeEditPreviousCTC.match(regExpCTC)) {
				sap.ui.getCore().byId("employeeEditCTCId").setValueState("None");
			} else {
				sap.ui.getCore().byId("employeeEditCTCId").setValueState("Error");
				sap.ui.getCore().byId("employeeEditCTCId").setValueStateText("Id format EMP12A");
			}
			if(employeeEditIdInKnowledgeForm.match(regExpId) && employeeEditDateOfJoining && employeeEditLanguagesItemsLength > 0 
				&& employeeEditExperienceInKnowledgeForm && employeeEditPreviousCTC.match(regExpCTC)){
				var knowledgeEdittedIconTabFilterPayload = {
					"EmployeeId": employeeEditIdInKnowledgeForm,
					"EmployeeDateOfJoining": employeeEditDateOfJoining,
					"EmployeeLanguages": employeeEditLanguagesItemsValues,
					"EmployeeExperience": employeeEditExperienceInKnowledgeForm,
					"EmployeeCTC": employeeEditPreviousCTC
				};
				//get data from model to replace old object with new object
				var oModel = this.getOwnerComponent().getModel("dataModel");
				var knowledgeEdittedDetailsArray = oModel.getData().KnowledgeIconTabFilterEntity;
				knowledgeEdittedDetailsArray.map(function(item) {
					if (item.EmployeeId === employeeEditIdInKnowledgeForm) {
						var previousObject = item;
						Object.assign(previousObject, knowledgeEdittedIconTabFilterPayload);
					}
				});
				oModel.refresh(true);
				// sap.ui.getCore().byId("").setValue("");
				// sap.ui.getCore().byId("").setValue("");
				// sap.ui.getCore().byId("").setSelectedKey("");
				// sap.ui.getCore().byId("").setSelectedKey("");
				// sap.ui.getCore().byId("").setSelectedKey("");
				// sap.ui.getCore().byId("").setSelectedKeys("");
				this.knowledgeFragment.close();
			}else if(!employeeEditIdInKnowledgeForm.match(regExpId) && !employeeEditDateOfJoining && !employeeEditLanguagesItemsLength > 0 
				&& !employeeEditExperienceInKnowledgeForm && !employeeEditPreviousCTC.match(regExpCTC)){
				MessageBox.error("Fill all mandatory fields");
			}
		},
		
		_OnDeleteRemoveEmployeeFromEmployeeDetailsTable: function (){
			debugger;
			//get model
			var oModel = this.getOwnerComponent().getModel("dataModel");
			//get table
			var oTable = this.getView().byId("form1DataTableInView5Id");
			var totalRowsSelected = 0;
			var selectedRow;
			var selectedRowsArray = [];
			var employeeDetailsArray=[];
			var rowIndexOfItemToBeDeleted;
			var that = this;
			//gets multiple rows 
			var selectedRows = oTable.getSelectedItems();
			selectedRows.forEach((item)=>{
				selectedRow = item.getBindingContext("dataModel").getObject();
				selectedRowsArray.push(selectedRow);
				totalRowsSelected++;
			});
			if(totalRowsSelected > 1){
				MessageBox.confirm("Are you sure you want to delete all records permanently?",{
					onClose: function(oAction){
						if(oAction === "OK"){
							debugger;
							employeeDetailsArray = oModel.getData().EmployeeIconTabFilterEntity;
							selectedRowsArray.forEach((item, index)=>{
									rowIndexOfItemToBeDeleted = employeeDetailsArray.indexOf(item);
									employeeDetailsArray.splice(rowIndexOfItemToBeDeleted, 1);
							});
							debugger;
							//deletes same records as that of employee table from hr table
							oModel.refresh(true);
								if(oModel.getData().EmployeeIconTabFilterEntity.length > 1){
									oTable.removeSelections(false);
								}else if(oModel.getData().EmployeeIconTabFilterEntity.length === 1){
									oTable.removeSelections(false);
								}else{
									that.getView().byId("deleteEmployeeDetailsButtonId").setEnabled(false);
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
							if(oModel.getData().EmployeeIconTabFilterEntity){
								var selectedItemAtIndex = oModel.getData().EmployeeIconTabFilterEntity.indexOf(selectedRow);
								oModel.getData().EmployeeIconTabFilterEntity.splice(selectedItemAtIndex, 1);
								debugger;
								oModel.refresh(true);
								if(oModel.getData().EmployeeIconTabFilterEntity.length > 1){
									oTable.removeSelections(true);
								}else if(oModel.getData().EmployeeIconTabFilterEntity.length === 1){
									oTable.removeSelections(true);
								}else{
									that.getView().byId("deleteEmployeeDetailsButtonId").setEnabled(false);
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
		_OnDeleteRemoveEmployeeFromEmployeeAddressDetailsTable: function (){
				debugger;
			//get model
			var oModel = this.getOwnerComponent().getModel("dataModel");
			//get table
			var oTable = this.getView().byId("form2DataTableInView5Id");
			var totalRowsSelected = 0;
			var selectedRow;
			var selectedRowsArray = [];
			var employeeAddressDetailsArray=[];
			var rowIndexOfItemToBeDeleted;
			var that = this;
			//gets multiple rows 
			var selectedRows = oTable.getSelectedItems();
			selectedRows.forEach((item)=>{
				selectedRow = item.getBindingContext("dataModel").getObject();
				selectedRowsArray.push(selectedRow);
				totalRowsSelected++;
			});
			if(totalRowsSelected > 1){
				MessageBox.confirm("Are you sure you want to delete all records permanently?",{
					onClose: function(oAction){
						if(oAction === "OK"){
							debugger;
							employeeAddressDetailsArray = oModel.getData().AddressIconTabFilterEntity;
							selectedRowsArray.forEach((item, index)=>{
									rowIndexOfItemToBeDeleted = employeeAddressDetailsArray.indexOf(item);
									employeeAddressDetailsArray.splice(rowIndexOfItemToBeDeleted, 1);
							});
							debugger;
							//deletes same records as that of employee table from hr table
							oModel.refresh(true);
								if(oModel.getData().AddressIconTabFilterEntity.length > 1){
									oTable.removeSelections(false);
								}else if(oModel.getData().AddressIconTabFilterEntity.length === 1){
									oTable.removeSelections(false);
								}else{
									that.getView().byId("deleteEmployeeAddressDetailsButtonId").setEnabled(false);
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
							if(oModel.getData().AddressIconTabFilterEntity){
								var selectedItemAtIndex = oModel.getData().AddressIconTabFilterEntity.indexOf(selectedRow);
								oModel.getData().AddressIconTabFilterEntity.splice(selectedItemAtIndex, 1);
								debugger;
								oModel.refresh(true);
								if(oModel.getData().AddressIconTabFilterEntity.length > 1){
									oTable.removeSelections(true);
								}else if(oModel.getData().AddressIconTabFilterEntity.length === 1){
									oTable.removeSelections(true);
								}else{
									that.getView().byId("deleteEmployeeAddressDetailsButtonId").setEnabled(false);
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
		_OnDeleteRemoveEmployeeFromEmployeeHealthDetailsTable: function (){
			debugger;
			//get model
			var oModel = this.getOwnerComponent().getModel("dataModel");
			//get table
			var oTable = this.getView().byId("form3DataTableInView5Id");
			var totalRowsSelected = 0;
			var selectedRow;
			var selectedRowsArray = [];
			var employeeHealthDetailsArray=[];
			var rowIndexOfItemToBeDeleted;
			var that = this;
			//gets multiple rows 
			var selectedRows = oTable.getSelectedItems();
			selectedRows.forEach((item)=>{
				selectedRow = item.getBindingContext("dataModel").getObject();
				selectedRowsArray.push(selectedRow);
				totalRowsSelected++;
			});
			if(totalRowsSelected > 1){
				MessageBox.confirm("Are you sure you want to delete all records permanently?",{
					onClose: function(oAction){
						if(oAction === "OK"){
							debugger;
							employeeHealthDetailsArray = oModel.getData().HealthIconTabFilterEntity;
							selectedRowsArray.forEach((item, index)=>{
									rowIndexOfItemToBeDeleted = employeeHealthDetailsArray.indexOf(item);
									employeeHealthDetailsArray.splice(rowIndexOfItemToBeDeleted, 1);
							});
							debugger;
							//deletes same records as that of employee table from hr table
							oModel.refresh(true);
								if(oModel.getData().HealthIconTabFilterEntity.length > 1){
									oTable.removeSelections(false);
								}else if(oModel.getData().HealthIconTabFilterEntity.length === 1){
									oTable.removeSelections(false);
								}else{
									that.getView().byId("deleteEmployeeHealthDetailsButtonId").setEnabled(false);
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
							if(oModel.getData().HealthIconTabFilterEntity){
								var selectedItemAtIndex = oModel.getData().HealthIconTabFilterEntity.indexOf(selectedRow);
								oModel.getData().HealthIconTabFilterEntity.splice(selectedItemAtIndex, 1);
								debugger;
								oModel.refresh(true);
								if(oModel.getData().HealthIconTabFilterEntity.length > 1){
									oTable.removeSelections(true);
								}else if(oModel.getData().HealthIconTabFilterEntity.length === 1){
									oTable.removeSelections(true);
								}else{
									that.getView().byId("deleteEmployeeHealthDetailsButtonId").setEnabled(false);
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
		_OnDeleteRemoveEmployeeFromEmployeeNomineeDetailsTable: function (){
				debugger;
			//get model
			var oModel = this.getOwnerComponent().getModel("dataModel");
			//get table
			var oTable = this.getView().byId("form4DataTableInView5Id");
			var totalRowsSelected = 0;
			var selectedRow;
			var selectedRowsArray = [];
			var employeeNomineeArray=[];
			var rowIndexOfItemToBeDeleted;
			var that = this;
			//gets multiple rows 
			var selectedRows = oTable.getSelectedItems();
			selectedRows.forEach((item)=>{
				selectedRow = item.getBindingContext("dataModel").getObject();
				selectedRowsArray.push(selectedRow);
				totalRowsSelected++;
			});
			if(totalRowsSelected > 1){
				MessageBox.confirm("Are you sure you want to delete all records permanently?",{
					onClose: function(oAction){
						if(oAction === "OK"){
							debugger;
							employeeNomineeArray = oModel.getData().NomineeIconTabFilterEntity;
							selectedRowsArray.forEach((item, index)=>{
									rowIndexOfItemToBeDeleted = employeeNomineeArray.indexOf(item);
									employeeNomineeArray.splice(rowIndexOfItemToBeDeleted, 1);
							});
							debugger;
							//deletes same records as that of employee table from hr table
							oModel.refresh(true);
								if(oModel.getData().NomineeIconTabFilterEntity.length > 1){
									oTable.removeSelections(false);
								}else if(oModel.getData().NomineeIconTabFilterEntity.length === 1){
									oTable.removeSelections(false);
								}else{
									that.getView().byId("deleteEmployeeNomineeDetailsButtonId").setEnabled(false);
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
							if(oModel.getData().NomineeIconTabFilterEntity){
								var selectedItemAtIndex = oModel.getData().NomineeIconTabFilterEntity.indexOf(selectedRow);
								oModel.getData().NomineeIconTabFilterEntity.splice(selectedItemAtIndex, 1);
								debugger;
								oModel.refresh(true);
								if(oModel.getData().NomineeIconTabFilterEntity.length > 1){
									oTable.removeSelections(true);
								}else if(oModel.getData().NomineeIconTabFilterEntity.length === 1){
									oTable.removeSelections(true);
								}else{
									that.getView().byId("deleteEmployeeNomineeDetailsButtonId").setEnabled(false);
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
		_OnDeleteRemoveEmployeeFromEmployeeExperienceDetailsTable: function (){
				debugger;
			//get model
			var oModel = this.getOwnerComponent().getModel("dataModel");
			//get table
			var oTable = this.getView().byId("form5DataTableInView5Id");
			var totalRowsSelected = 0;
			var selectedRow;
			var selectedRowsArray = [];
			var employeeExperienceArray=[];
			var rowIndexOfItemToBeDeleted;
			var that = this;
			//gets multiple rows 
			var selectedRows = oTable.getSelectedItems();
			selectedRows.forEach((item)=>{
				selectedRow = item.getBindingContext("dataModel").getObject();
				selectedRowsArray.push(selectedRow);
				totalRowsSelected++;
			});
			if(totalRowsSelected > 1){
				MessageBox.confirm("Are you sure you want to delete all records permanently?",{
					onClose: function(oAction){
						if(oAction === "OK"){
							debugger;
							employeeExperienceArray = oModel.getData().ExperienceIconTabFilterEntity;
							selectedRowsArray.forEach((item, index)=>{
									rowIndexOfItemToBeDeleted = employeeExperienceArray.indexOf(item);
									employeeExperienceArray.splice(rowIndexOfItemToBeDeleted, 1);
							});
							debugger;
							//deletes same records as that of employee table from hr table
							oModel.refresh(true);
								if(oModel.getData().ExperienceIconTabFilterEntity.length > 1){
									oTable.removeSelections(false);
								}else if(oModel.getData().ExperienceIconTabFilterEntity.length === 1){
									oTable.removeSelections(false);
								}else{
									that.getView().byId("deleteEmployeeExperienceDetailsButtonId").setEnabled(false);
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
							if(oModel.getData().ExperienceIconTabFilterEntity){
								var selectedItemAtIndex = oModel.getData().ExperienceIconTabFilterEntity.indexOf(selectedRow);
								oModel.getData().ExperienceIconTabFilterEntity.splice(selectedItemAtIndex, 1);
								debugger;
								oModel.refresh(true);
								if(oModel.getData().ExperienceIconTabFilterEntity.length > 1){
									oTable.removeSelections(true);
								}else if(oModel.getData().ExperienceIconTabFilterEntity.length === 1){
									oTable.removeSelections(true);
								}else{
									that.getView().byId("deleteEmployeeExperienceDetailsButtonId").setEnabled(false);
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
		_OnDeleteRemoveEmployeeFromEmployeeKnowledgeDetailsTable: function (){
				debugger;
			//get model
			var oModel = this.getOwnerComponent().getModel("dataModel");
			//get table
			var oTable = this.getView().byId("form6DataTableInView5Id");
			var totalRowsSelected = 0;
			var selectedRow;
			var selectedRowsArray = [];
			var employeeKnowledgeArray=[];
			var rowIndexOfItemToBeDeleted;
			var that = this;
			//gets multiple rows 
			var selectedRows = oTable.getSelectedItems();
			selectedRows.forEach((item)=>{
				selectedRow = item.getBindingContext("dataModel").getObject();
				selectedRowsArray.push(selectedRow);
				totalRowsSelected++;
			});
			if(totalRowsSelected > 1){
				MessageBox.confirm("Are you sure you want to delete all records permanently?",{
					onClose: function(oAction){
						if(oAction === "OK"){
							debugger;
							employeeKnowledgeArray = oModel.getData().KnowledgeIconTabFilterEntity;
							selectedRowsArray.forEach((item, index)=>{
									rowIndexOfItemToBeDeleted = employeeKnowledgeArray.indexOf(item);
									employeeKnowledgeArray.splice(rowIndexOfItemToBeDeleted, 1);
							});
							debugger;
							//deletes same records as that of employee table from hr table
							oModel.refresh(true);
								if(oModel.getData().KnowledgeIconTabFilterEntity.length > 1){
									oTable.removeSelections(false);
								}else if(oModel.getData().KnowledgeIconTabFilterEntity.length === 1){
									oTable.removeSelections(false);
								}else{
									that.getView().byId("deleteEmployeeKnowledgeDetailsButtonId").setEnabled(false);
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
							if(oModel.getData().KnowledgeIconTabFilterEntity){
								var selectedItemAtIndex = oModel.getData().KnowledgeIconTabFilterEntity.indexOf(selectedRow);
								oModel.getData().KnowledgeIconTabFilterEntity.splice(selectedItemAtIndex, 1);
								debugger;
								oModel.refresh(true);
								if(oModel.getData().KnowledgeIconTabFilterEntity.length > 1){
									oTable.removeSelections(true);
								}else if(oModel.getData().KnowledgeIconTabFilterEntity.length === 1){
									oTable.removeSelections(true);
								}else{
									that.getView().byId("deleteEmployeeKnowledgeDetailsButtonId").setEnabled(false);
								}
							}
						}
					}
				});
				oTable.removeSelections(true);
			}else{
				MessageBox.error("Please select atleast one record to perform the operation");
			}
		}
	});
});