sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/layout/form/SimpleForm",
	"sap/m/Label",
	"sap/m/Input",
	"sap/m/Select",
	"sap/m/DatePicker",
	"sap/m/TimePicker",
	"sap/m/CheckBox",
	"sap/m/Button"
], function(Controller, MessageBox, MessageToast, SimpleForm, Label, Input, Select, DatePicker, TimePicker, CheckBox, Button) {
	"use strict";

	return Controller.extend("com.dpz_routingTenViews.controller.View1", {

		onInit: function() {
			debugger;
			//clears all forms in view1
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("View1").attachMatched(this._ClearAllFormDataOnLoad, this);
			this._gSelectedText = null; // Variable to hold the selected text
			this.getView().byId("customerGenderMaleText").setSelected(false);
			this.getView().byId("customerGenderFemaleText").setSelected(false);
			this.getView().byId("customerAccountTypeCurrent").setSelected(false);
			this.getView().byId("customerAccountTypeSavings").setSelected(false);

			// var todayDate = new Date();
			// var oModel = this.getOwnerComponent().getModel("dataModel");
			// oModel.setProperty("/minDate", todayDate);

			//creates dynamic from 
			var invoiceForm = new SimpleForm({
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
					//invoice id
					new Label({
						text: "Invoice Id",
						required: true
					}),
					new Input({
						id: "invoiceId",
						placeholder: "Invoice Id"
					}),

					//invoice date
					new Label({
						text: "Invoice Date",
						required: true
					}),
					new DatePicker({
						id: "invoiceDateId",
						displayFormat: "dd.MM.YYYY"
					}),

					//invoice time
					new Label({
						text: "Invoice Time",
						required: true
					}),
					new TimePicker({
						id: "invoiceTimeId"
					}),

					//pan
					new Label({
						text: "PAN Number",
						required: true
					}),
					new Input({
						id: "invoicePanId",
						placeholder: "PAN Number"
					}),

					//place of supply
					new Label({
						text: "Mode of Payment",
						required: true
					}),
					new CheckBox({
						id: "invoiceModeOfPaymentCardId",
						text: "Card"
					}),
					new CheckBox({
						id: "invoiceModeOfPaymentCashId",
						text: "Cash"
					}),

					//time of delivery
					new Label({
						text: "Time of Delivery",
						required: true
					}),
					new TimePicker({
						id: "invoiceDeliveryTimeId"
					}),

					//state code
					new Label({// TODO: 
						text: "State Code",
						required: true
					}),
					new Select({
						id: "invoiceStateCodeId",
						forceSelection: false
					}),

					//invoice value
					new Label({
						text: "Invoice Value",
						required: true
					}),
					new Input({
						id: "invoiceValueId",
						placeholder: "Invoice Value",
						value:"₹"
						
					}),

					//payment transaction id
					new Label({
						text: "Payment Transaction Id",
						required: true
					}),
					new Input({
						id: "invoicePaymentId",
						placeholder: "Payment Transaction Id"
					}),

					new Button({
						text: "Submit",
						id: "submitDynamicFormId",
						type: "Emphasized",
						press: this._OnSubmitDynamicForm6GoToView6.bind(this)
					})
				]
			});

			//get vbox in form id
			var oForm = this.getView().byId("dynamicForm6VBoxId");
			oForm.addItem(invoiceForm);

			var oButton = this.getView().byId("dynamicFormSubmitButtonInFlexBoxInViewId");
			var getButton = sap.ui.getCore().byId("submitDynamicFormId");
			oButton.addItem(getButton);

			//select STATE code
			sap.ui.getCore().byId("invoiceStateCodeId").bindAggregation("items", {
				path: "dataModel>/StateCode",
				template: new sap.ui.core.Item({
					key: "{dataModel>key}",
					text: "{dataModel>text}"
				})
			});

			var oToday = new Date();
			var oInvoiceDatePicker = sap.ui.getCore().byId("invoiceDateId");
			oInvoiceDatePicker.setMinDate(oToday);

			var sCurrentTime = oToday.toTimeString().split(' ')[0].substring(0, 5); // current time in HH:mm format
			var oInvoiceTimePicker = sap.ui.getCore().byId("invoiceTimeId");
			oInvoiceTimePicker.setValue(sCurrentTime);
			oInvoiceTimePicker.setDisplayFormat("HH:mm:ss");
			oInvoiceTimePicker.setValueFormat("HH:mm:ss");
			oInvoiceTimePicker.attachChange(function(oEvent) {
				oInvoiceTimePicker = oEvent.getSource();
				var sSelectedTime = oInvoiceTimePicker.getDateValue();
				var oCurrentDate = new Date();
				oCurrentDate.setSeconds(0, 0); // Ignore seconds and milliseconds
				// Compare the selected time with the current time
				if (sSelectedTime.getHours() !== oCurrentDate.getHours() ||
					sSelectedTime.getMinutes() !== oCurrentDate.getMinutes()) {
					// If the time is not the current time, display an error message
					oInvoiceTimePicker.setValueState(sap.ui.core.ValueState.Error);
					oInvoiceTimePicker.setValueStateText("Only the current time is accepted.");
				} else {
					// If the time is valid, clear any error message
					oInvoiceTimePicker.setValueState(sap.ui.core.ValueState.None);
					oInvoiceTimePicker.setValueStateText("");
				}
			});
			var oDeliveryTimePicker = sap.ui.getCore().byId("invoiceDeliveryTimeId");
			//delivery time
			oDeliveryTimePicker.attachChange(function(oEvent) {
				var oTimePicker = oEvent.getSource();
				var sSelectedTime = oTimePicker.getDateValue();

				var sInvoiceTime = oInvoiceTimePicker.getDateValue();

				// Add 2 hours to the invoice time
				var oMinDeliveryTime = new Date(sInvoiceTime);
				oMinDeliveryTime.setHours(oMinDeliveryTime.getHours() + 2);

				debugger;
				// Compare the selected delivery time with the invoice delivery time
				// if (sSelectedTime <= sInvoiceTime) {
				// 	// If the selected time is less than or equal to invoice time
				// 	oTimePicker.setValueState(sap.ui.core.ValueState.Error);
				// 	TimePicker.setValueStateText("Delivery time cannot be past invoice time.");
				// } else
				if (sSelectedTime  > sInvoiceTime && sSelectedTime > oMinDeliveryTime) {
					// If the delivery time is not after 2 hours of invoice time, display an error message
					oTimePicker.setValueState(sap.ui.core.ValueState.None);
					oTimePicker.setValueStateText("");
				} else {
					// If the time is valid, clear any error message
					oTimePicker.setValueState(sap.ui.core.ValueState.Error);
					oTimePicker.setValueStateText("Delivery time must be at least 2 hours after invoice time.");
				}
			});
		},
		_ClearAllFormDataOnLoad: function() {
			this.getView().byId("studentNameId").setValue("");
			this.getView().byId("studentNameId").setValueState("None");
			this.getView().byId("studentAgeId").setSelectedKey("");
			this.getView().byId("studentAgeId").setValueState("None");
			this.getView().byId("studentGenderMaleId").setSelected(false);
			this.getView().byId("studentGenderMaleId").setValueState("None");
			this.getView().byId("studentGenderFemaleId").setSelected(false);
			this.getView().byId("studentGenderFemaleId").setValueState("None");
			this.getView().byId("studentFatherNameId").setValue("");
			this.getView().byId("studentFatherNameId").setValueState("None");
			this.getView().byId("studentFatherMobileId").setValue("");
			this.getView().byId("studentFatherMobileId").setValueState("None");
			this.getView().byId("studentPreferredStreamId").setSelectedKeys("");
			this.getView().byId("studentPreferredStreamId").setValueState("None");

			this.getView().byId("eNameId").setValue("");
			this.getView().byId("eNameId").setValueState("None");
			this.getView().byId("eId").setValue("");
			this.getView().byId("eId").setValueState("None");
			this.getView().byId("eAgeId").setSelectedKey("");
			this.getView().byId("eAgeId").setValueState("None");
			this.getView().byId("eMobileId").setValue("");
			this.getView().byId("eMobileId").setValueState("None");
			this.getView().byId("eEmailId").setValue("");
			this.getView().byId("eEmailId").setValueState("None");
			this.getView().byId("eCompanyId").setSelectedKeys("");
			this.getView().byId("eCompanyId").setValueState("None");
			this.getView().byId("eLocationId").setSelectedKeys("");
			this.getView().byId("eLocationId").setValueState("None");

			this.getView().byId("iStudentNameId").setValue("");
			this.getView().byId("iStudentNameId").setValueState("None");
			this.getView().byId("iStudentRollNoId").setValue("");
			this.getView().byId("iStudentRollNoId").setValueState("None");
			this.getView().byId("iStudentMobileId").setValue("");
			this.getView().byId("iStudentMobileId").setValueState("None");
			this.getView().byId("iStudentAgeId").setSelectedKey("");
			this.getView().byId("iStudentAgeId").setValueState("None");
			this.getView().byId("iStudentGenderMale").setSelected(false);
			this.getView().byId("iStudentGenderMale").setValueState("None");
			this.getView().byId("iStudentGenderFemale").setSelected(false);
			this.getView().byId("iStudentGenderFemale").setValueState("None");
			this.getView().byId("iStudentGenderOthers").setSelected(false);
			this.getView().byId("iStudentGenderOthers").setValueState("None");
			this.getView().byId("iStudentCityId").setSelectedKey("");
			this.getView().byId("iStudentCityId").setValueState("None");

			this.getView().byId("gNameId").setValue("");
			this.getView().byId("gNameId").setValueState("None");
			this.getView().byId("gRollNoId").setValue("");
			this.getView().byId("gRollNoId").setValueState("None");
			this.getView().byId("gAgeId").setSelectedKey("");
			this.getView().byId("gAgeId").setValueState("None");
			this.getView().byId("gEmailId").setValue("");
			this.getView().byId("gEmailId").setValueState("None");
			this.getView().byId("gBranchId").setSelectedKeys("");
			this.getView().byId("gBranchId").setValueState("None");
			this.getView().byId("gPlaceId").setSelectedKey("");
			this.getView().byId("gPlaceId").setValueState("None");

			this.getView().byId("customerNameId").setValue("");
			this.getView().byId("customerNameId").setValueState("None");
			this.getView().byId("customerId").setValue("");
			this.getView().byId("customerId").setValueState("None");
			this.getView().byId("customerAgeId").setSelectedKey("");
			this.getView().byId("customerAgeId").setValueState("None");
			this.getView().byId("customerPancardId").setValue("");
			this.getView().byId("customerPancardId").setValueState("None");
			this.getView().byId("customerGenderMaleText").setSelected(false);
			this.getView().byId("customerGenderMaleText").setValueState("None");
			this.getView().byId("customerGenderFemaleText").setSelected(false);
			this.getView().byId("customerGenderFemaleText").setValueState("None");
			this.getView().byId("customerAccountTypeCurrent").setSelected(false);
			this.getView().byId("customerAccountTypeCurrent").setValueState("None");
			this.getView().byId("customerAccountTypeSavings").setSelected(false);
			this.getView().byId("customerAccountTypeSavings").setValueState("None");
			this.getView().byId("customerAddOnId").setSelectedKeys("");
			this.getView().byId("customerAddOnId").setValueState("None");
			this.getView().byId("customerBranchId").setValue("");
			this.getView().byId("customerBranchId").setValueState("None");

			sap.ui.getCore().byId("invoiceId").setValue("");
			sap.ui.getCore().byId("invoiceId").setValueState("None");
			sap.ui.getCore().byId("invoiceDateId").setValue("");
			sap.ui.getCore().byId("invoiceDateId").setValueState("None");
			sap.ui.getCore().byId("invoiceTimeId").setValue("");
			sap.ui.getCore().byId("invoiceTimeId").setValueState("None");
			sap.ui.getCore().byId("invoicePanId").setValue("");
			sap.ui.getCore().byId("invoicePanId").setValueState("None");
			sap.ui.getCore().byId("invoiceModeOfPaymentCardId").setSelected(false);
			sap.ui.getCore().byId("invoiceModeOfPaymentCardId").setValueState("None");
			sap.ui.getCore().byId("invoiceModeOfPaymentCashId").setSelected(false);
			sap.ui.getCore().byId("invoiceModeOfPaymentCashId").setValueState("None");
			sap.ui.getCore().byId("invoiceDeliveryTimeId").setValue("");
			sap.ui.getCore().byId("invoiceDeliveryTimeId").setValueState("None");
			sap.ui.getCore().byId("invoiceStateCodeId").setSelectedKey("");
			sap.ui.getCore().byId("invoiceStateCodeId").setValueState("None");
			sap.ui.getCore().byId("invoiceValueId").setValue("");
			sap.ui.getCore().byId("invoiceValueId").setValueState("None");
			sap.ui.getCore().byId("invoicePaymentId").setValue("");
			sap.ui.getCore().byId("invoicePaymentId").setValueState("None");

		},
		
		//form1
		_OnInputName: function() {
			var regExpName = /^[A-Za-z\s]+$/;
			var studentName = this.getView().byId("studentNameId").getValue().trim();
			if (studentName.match(regExpName) || studentName === "") {
				this.getView().byId("studentNameId").setValueState("None");
			} else {
				this.getView().byId("studentNameId").setValueState("Error");
				this.getView().byId("studentNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
		},
		_OnInputAge: function() {
			var studentAge = this.getView().byId("studentAgeId").getSelectedKey();
			if (studentAge) {
				this.getView().byId("studentAgeId").setValueState("None");
			} else {
				this.getView().byId("studentAgeId").setValueState("Error");
				this.getView().byId("studentAgeId").setValueStateText("Age cannot be empty");
			}
		},
		_OnSelectGender: function(oEvent) {
			this._gSelectedText = oEvent.getSource().getText();
		},
		_OnInputFatherName: function() {
			var regExpName = /^[A-Za-z\s]+$/;
			var studentFatherName = this.getView().byId("studentFatherNameId").getValue().trim();
			if (studentFatherName.match(regExpName) || studentFatherName === "") {
				this.getView().byId("studentFatherNameId").setValueState("None");
			} else {
				this.getView().byId("studentFatherNameId").setValueState("Error");
				this.getView().byId("studentFatherNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
		},
		_OnInputFatherMobile: function() {
			var regExpMobile = /^[6-9]{1}[0-9]{9}$/;
			var studentFatherMobile = this.getView().byId("studentFatherMobileId").getValue();
			if (studentFatherMobile.match(regExpMobile) || studentFatherMobile === "") {
				this.getView().byId("studentFatherMobileId").setValueState("None");
			} else {
				this.getView().byId("studentFatherMobileId").setValueState("Error");
				this.getView().byId("studentFatherMobileId").setValueStateText("Starting Digit >=6 and only 10 digits long");
			}
		},
		_OnSelectPreferredStream: function(oEvent) {
			this._streamSelectedItems = oEvent.getSource().getSelectedItems();
			this._streamSelectedItemsValues = this._streamSelectedItems.map(function(item) {
				return item.getText();
			});
			if (this._streamSelectedItems) {
				this.getView().byId("studentPreferredStreamId").setValueState("None");
			} else {
				this.getView().byId("studentPreferredStreamId").setValueState("Error");
				this.getView().byId("studentPreferredStreamId").setValueStateText("Stream cannot be empty");
			}
		},
		_OnPressForm1SubmitButton: function(oEvent) {
			var regExpName = /^[A-Za-z\s]+$/;
			var regExpMobile = /^[6-9]{1}[0-9]{9}$/;
			var studentName = this.getView().byId("studentNameId").getValue().trim();
			var studentAge = this.getView().byId("studentAgeId").getSelectedKey();
			var studentGender;
			var studentFatherName = this.getView().byId("studentFatherNameId").getValue().trim();
			var studentFatherMobile = this.getView().byId("studentFatherMobileId").getValue();
			var studentPreferredStreamItemsLength = this.getView().byId("studentPreferredStreamId").getSelectedItems().length;
			var studentPreferredStream;
			var studentPreferredKeys = this.getView().byId("studentPreferredStreamId").getSelectedKeys();
			// student name
			if (studentName.match(regExpName)) {
				this.getView().byId("studentNameId").setValueState("None");
			} else {
				this.getView().byId("studentNameId").setValueState("Error");
				this.getView().byId("studentNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			// student age
			if (studentAge || studentAge === "") {
				this.getView().byId("studentAgeId").setValueState("None");
			} else {
				this.getView().byId("studentAgeId").setValueState("Error");
				this.getView().byId("studentAgeId").setValueStateText("Age cannot be empty");
			}
			// student gender
			if (this._gSelectedText) {
				studentGender = this._gSelectedText;
			}
			// father name
			if (studentFatherName.match(regExpName) || studentFatherName === "") {
				this.getView().byId("studentFatherNameId").setValueState("None");
			} else {
				this.getView().byId("studentFatherNameId").setValueState("Error");
				this.getView().byId("studentFatherNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			// father mobile
			if (studentFatherMobile.match(regExpMobile)) {
				this.getView().byId("studentFatherMobileId").setValueState("None");
			} else {
				this.getView().byId("studentFatherMobileId").setValueState("Error");
				this.getView().byId("studentFatherMobileId").setValueStateText("Starting Digit >=6 and only 10 digits long");
			}
			// stream
			if (studentPreferredStreamItemsLength > 0) {
				studentPreferredStream = this._streamSelectedItemsValues;
				this.getView().byId("studentPreferredStreamId").setValueState("None");
			} else {
				this.getView().byId("studentPreferredStreamId").setValueState("Error");
				this.getView().byId("studentPreferredStreamId").setValueStateText("Stream cannot be empty");
			}
			if (studentName === "" && studentFatherMobile === "" && studentPreferredStreamItemsLength <= 0) {
				MessageBox.error("Fill all mandatory fields");
			} else if (studentName.match(regExpName) && (studentAge || studentAge === "") && (studentGender === "Male" || studentGender ===
					"Female" || studentGender === undefined) && (studentFatherName.match(regExpName) || studentFatherName === "") &&
				studentFatherMobile.match(regExpMobile) && studentPreferredStreamItemsLength > 0) {
				MessageBox.success("Success");
				var studentDetailsPayload = {
					"Name": studentName,
					"Age": studentAge,
					"Gender": studentGender,
					"FatherName": studentFatherName,
					"FatherMobile": studentFatherMobile,
					"PreferredStream": studentPreferredStream,
					"PreferredStreamKeys": studentPreferredKeys
				};
				this.getView().byId("studentNameId").setValue("");
				this.getView().byId("studentAgeId").setSelectedKey("");
				this.getView().byId("studentGenderMaleId").setSelected(false);
				this.getView().byId("studentGenderFemaleId").setSelected(false);
				this.getView().byId("studentFatherNameId").setValue("");
				this.getView().byId("studentFatherMobileId").setValue("");
				this.getView().byId("studentPreferredStreamId").setSelectedKeys("");

				//Navigates to View9
				this.getOwnerComponent().getRouter().navTo("View9", {
					testPayload: JSON.stringify(studentDetailsPayload)
				});

				var oModel = this.getOwnerComponent().getModel("dataModel");
				oModel.getData().StudentDetailsEntity.FormSubmitted = "Form1";

				//make form2 visible
				this.getView().byId("view1Form2Id").setVisible(true);
				this.getView().byId("employeeDetailsFormId").setVisible(true);
			}
		},

		//form 2
		_OnInputEmployeeName: function() {
			var regExpName = /^[A-Za-z\s]+$/;
			var employeeName = this.getView().byId("eNameId").getValue().trim();
			if (employeeName.match(regExpName) || employeeName === "") {
				this.getView().byId("eNameId").setValueState("None");
			} else {
				this.getView().byId("eNameId").setValueState("Error");
				this.getView().byId("eNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
		},
		_OnInputEmployeeId: function() {
			var regExpId = /^EMP[0-9]{2}[A-Z]{1}$/;
			var employeeId = this.getView().byId("eId").getValue();
			if (employeeId.match(regExpId) || employeeId === "") {
				this.getView().byId("eId").setValueState("None");
			} else {
				this.getView().byId("eId").setValueState("Error");
				this.getView().byId("eId").setValueStateText("Id format EMP12A");
			}
		},
		_OnSelectEmployeeAge: function() {
			var employeeAge = this.getView().byId("eAgeId").getSelectedKey();
			if (employeeAge) {
				this.getView().byId("eAgeId").setValueState("None");
			} else {
				this.getView().byId("eAgeId").setValueState("Error");
				this.getView().byId("eAgeId").setValueStateText("Age cannot be empty");
			}
		},
		_OnInputEmployeeMobileNumber: function() {
			var regExpMobile = /[6-9]{1}[0-9]{9}$/;
			var employeeMobile = this.getView().byId("eMobileId").getValue();
			if (employeeMobile.match(regExpMobile) || employeeMobile === "") {
				this.getView().byId("eMobileId").setValueState("None");
			} else {
				this.getView().byId("eMobileId").setValueState("Error");
				this.getView().byId("eMobileId").setValueStateText("Starting Digit >=6 and only 10 digits long");
			}
		},
		_OnInputEmail: function() {
			var regExpEmail = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.com$/;
			var employeeEmail = this.getView().byId("eEmailId").getValue();
			if (employeeEmail.match(regExpEmail) || employeeEmail === "") {
				this.getView().byId("eEmailId").setValueState("None");
			} else {
				this.getView().byId("eEmailId").setValueState("Error");
				this.getView().byId("eEmailId").setValueStateText("Enter proper Email eg: userid@domain.com");
			}
		},
		_OnSelectCompanyName: function(oEvent) {
			var companyItemsLength = this.getView().byId("eCompanyId").getSelectedItems().length;
			var companySelected;
			this.companySelectedItems = oEvent.getSource().getSelectedItems();
			this.companySelectedItemsValues = this.companySelectedItems.map(function(item) {
				return item.getText();
			});
			if (companyItemsLength > 0) {
				companySelected = this.companySelectedItemsValues;
				this.getView().byId("eCompanyId").setValueState("None");
			} else {
				this.getView().byId("eCompanyId").setValueState("Error");
				this.getView().byId("eCompanyId").setValueStateText("Company cannot be empty");
			}

		},
		_OnSelectLocation: function(oEvent) {
			var locationItemsLength = this.getView().byId("eLocationId").getSelectedItems().length;
			var locationSelected;
			this.locationSelectedItems = oEvent.getSource().getSelectedItems();
			this.locationSelectedItemsValues = this.locationSelectedItems.map(function(item) {
				return item.getText();
			});
			//location
			if (locationItemsLength > 0) {
				locationSelected = this.locationSelectedItemsValues;
				this.getView().byId("eLocationId").setValueState("None");
			} else {
				this.getView().byId("eLocationId").setValueState("Error");
				this.getView().byId("eLocationId").setValueStateText("Location cannot be empty");
			}
		},
		_OnSwitchForm2: function(oEvent) {

			var regExpName = /^[A-Za-z\s]+$/;
			var regExpId = /^EMP[0-9]{2}[A-Z]{1}$/;
			var regExpMobile = /[6-9]{1}[0-9]{9}$/;
			var regExpEmail = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.com$/;

			var employeeName = this.getView().byId("eNameId").getValue().trim();
			var employeeId = this.getView().byId("eId").getValue();
			var employeeAge = this.getView().byId("eAgeId").getSelectedKey();
			var employeeMobile = this.getView().byId("eMobileId").getValue();
			var employeeEmail = this.getView().byId("eEmailId").getValue();
			var companyItemsLength = this.getView().byId("eCompanyId").getSelectedItems().length;
			var locationItemsLength = this.getView().byId("eLocationId").getSelectedItems().length;
			var companySelected, locationSelected;
			var switchKeyInForm2 = this.getView().byId("from2SwitchButtonId");
			//name
			if (employeeName.match(regExpName)) {
				this.getView().byId("eNameId").setValueState("None");
			} else {
				this.getView().byId("eNameId").setValueState("Error");
				this.getView().byId("eNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			//id
			if (employeeId.match(regExpId)) {
				this.getView().byId("eId").setValueState("None");
			} else {
				this.getView().byId("eId").setValueState("Error");
				this.getView().byId("eId").setValueStateText("Id format EMP12A");
			}
			//age

			if (employeeAge !== "") {
				this.getView().byId("eAgeId").setValueState("None");
			} else {
				this.getView().byId("eAgeId").setValueState("Error");
				this.getView().byId("eAgeId").setValueStateText("Age cannot be empty");
			}
			//mobile
			if (employeeMobile.match(regExpMobile)) {
				this.getView().byId("eMobileId").setValueState("None");
			} else {
				this.getView().byId("eMobileId").setValueState("Error");
				this.getView().byId("eMobileId").setValueStateText("Starting Digit >=6 and only 10 digits long");
			}
			//email
			if (employeeEmail.match(regExpEmail)) {
				this.getView().byId("eEmailId").setValueState("None");
			} else {
				this.getView().byId("eEmailId").setValueState("Error");
				this.getView().byId("eEmailId").setValueStateText("Enter proper Email eg: userid@domain.com");
			}
			//company
			if (companyItemsLength > 0) {
				companySelected = this.companySelectedItemsValues;
				this.getView().byId("eCompanyId").setValueState("None");
			} else {
				this.getView().byId("eCompanyId").setValueState("Error");
				this.getView().byId("eCompanyId").setValueStateText("Company cannot be empty");
			}
			//location
			if (locationItemsLength > 0) {
				locationSelected = this.locationSelectedItemsValues;
				this.getView().byId("eLocationId").setValueState("None");
			} else {
				this.getView().byId("eLocationId").setValueState("Error");
				this.getView().byId("eLocationId").setValueStateText("Location cannot be empty");
			}

			if (employeeName === "" && employeeId === "" && employeeAge === "" && employeeMobile === "" && employeeEmail === "" &&
				companyItemsLength <= 0 && locationItemsLength <= 0) {
				MessageBox.error("Fill all mandatory fields");

				switchKeyInForm2.setState(false);
			} else if (employeeName.match(regExpName) && employeeId.match(regExpId) && employeeAge && employeeMobile.match(regExpMobile) &&
				employeeEmail.match(regExpEmail) && companyItemsLength > 0 && locationItemsLength > 0) {
				MessageBox.success("Success");

				var employeeDetailsPayload = {
					"Name": employeeName,
					"Id": employeeId,
					"Age": employeeAge,
					"Mobile": employeeMobile,
					"Email": employeeEmail,
					"Company": companySelected,
					"Location": locationSelected
				};
				this.getView().byId("eNameId").setValue("");
				this.getView().byId("eId").setValue("");
				this.getView().byId("eAgeId").setSelectedKey("");
				this.getView().byId("eMobileId").setValue("");
				this.getView().byId("eEmailId").setValue("");
				this.getView().byId("eCompanyId").setSelectedKeys("");
				this.getView().byId("eLocationId").setSelectedKeys("");

				var oModel = this.getOwnerComponent().getModel("dataModel");
				debugger;
				oModel.getData().EmployeeDetailsEntity.push(employeeDetailsPayload);
				oModel.getData().EmployeeDetailsEntity.FormSubmitted = "Form2";
				oModel.refresh(true);
				//make form3 visible
				this.getView().byId("view1Form3Id").setVisible(true);
				this.getView().byId("form3InPanelId").setVisible(true);
				switchKeyInForm2.setState(false);

				//Navigates to View9 ITF2
				this.getOwnerComponent().getRouter().navTo("View9");
				// var iconTabBar = this.getView().byId("iconTabBarId");
				// iconTabBar.setSelectedKey("form2tab2");
			} else {
				switchKeyInForm2.setState(false);
			}
		},

		//form3
		_OnInputInterStudentName: function() {
			var regExpName = /^[A-Za-z\s]+$/;
			var iStudentName = this.getView().byId("iStudentNameId").getValue().trim();
			if (iStudentName.match(regExpName) || iStudentName === "") {
				this.getView().byId("iStudentNameId").setValueState("None");
			} else {
				this.getView().byId("iStudentNameId").setValueState("Error");
				this.getView().byId("iStudentNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
		},
		_OnInputInterStudentId: function() {
			var regExpId = /^IP[0-9]{2}[A-Z]{1}$/;
			var iStudentId = this.getView().byId("iStudentRollNoId").getValue();
			if (iStudentId.match(regExpId) || iStudentId === "") {
				this.getView().byId("iStudentRollNoId").setValueState("None");
			} else {
				this.getView().byId("iStudentRollNoId").setValueState("Error");
				this.getView().byId("iStudentRollNoId").setValueStateText("Id format IP12A");
			}
		},
		_OnSelectInterStudentAge: function() {
			debugger
			var iStudentAge = this.getView().byId("iStudentAgeId").getSelectedKey();
			if (iStudentAge) {
				this.getView().byId("iStudentAgeId").setValueState("None");
			} else {
				this.getView().byId("iStudentAgeId").setValueState("Error");
				this.getView().byId("iStudentAgeId").setValueStateText("Age cannot be empty");
			}
		},
		_OnInputInterStudentMobile: function() {
			debugger;
			var regExpMobile = /[6-9]{1}[0-9]{9}$/;
			var iStudentMobile = this.getView().byId("iStudentMobileId").getValue();
			if (iStudentMobile.match(regExpMobile) || iStudentMobile === "") {
				this.getView().byId("iStudentMobileId").setValueState("None");
			} else {
				this.getView().byId("iStudentMobileId").setValueState("Error");
				this.getView().byId("iStudentMobileId").setValueStateText("Starting Digit >=6 and only 10 digits long");
			}
		},
		_OnSelectInterStudentGender: function(oEvent) {
			this._interStudentSelectedGenderText = oEvent.getSource().getText();
			this.getView().byId("iStudentGenderMale").setValueState("None");
			this.getView().byId("iStudentGenderFemale").setValueState("None");
			this.getView().byId("iStudentGenderOthers").setValueState("None");
		},
		_OnSelectInterStudentCity: function() {
			debugger;
			var hasCityItem = this.getView().byId("iStudentCityId").getSelectedItem();
			var citySelectedValue = hasCityItem.getText();
			if (hasCityItem) {
				this.getView().byId("iStudentCityId").setValueState("None");
			} else {
				this.getView().byId("iStudentCityId").setValueState("Error");
				this.getView().byId("iStudentCityId").setValueStateText("City cannot be empty");
			}

			//validate rest of the above fields as well
			var regExpName = /^[A-Za-z\s]+$/;
			var regExpId = /^IP[0-9]{2}[A-Z]{1}$/;
			var regExpMobile = /[6-9]{1}[0-9]{9}$/;

			var iStudentId = this.getView().byId("iStudentRollNoId").getValue();
			var iStudentName = this.getView().byId("iStudentNameId").getValue().trim();
			var iStudentAge = this.getView().byId("iStudentAgeId").getSelectedKey();
			var iStudentMobile = this.getView().byId("iStudentMobileId").getValue();
			var iStudentGender;
			//name
			if (iStudentName.match(regExpName)) {
				this.getView().byId("iStudentNameId").setValueState("None");
			} else {
				//clear city field
				this.getView().byId("iStudentCityId").setSelectedKey("");
				this.getView().byId("iStudentNameId").setValueState("Error");
				this.getView().byId("iStudentNameId").setValueStateText("Name cannot contain numbers and special characters");
			}

			//id
			if (iStudentId.match(regExpId)) {
				this.getView().byId("iStudentRollNoId").setValueState("None");
			} else {
				this.getView().byId("iStudentCityId").setSelectedKey("");
				this.getView().byId("iStudentRollNoId").setValueState("Error");
				this.getView().byId("iStudentRollNoId").setValueStateText("Id format IP12A");
			}

			//age
			if (iStudentAge) {
				this.getView().byId("iStudentAgeId").setValueState("None");
			} else {
				this.getView().byId("iStudentCityId").setSelectedKey("");
				this.getView().byId("iStudentAgeId").setValueState("Error");
				this.getView().byId("iStudentAgeId").setValueStateText("Age cannot be empty");
			}

			//mobile
			if (iStudentMobile.match(regExpMobile)) {
				this.getView().byId("iStudentMobileId").setValueState("None");
			} else {
				this.getView().byId("iStudentCityId").setSelectedKey("");
				this.getView().byId("iStudentMobileId").setValueState("Error");
				this.getView().byId("iStudentMobileId").setValueStateText("Starting Digit >=6 and only 10 digits long");
			}

			//gender
			if (this._interStudentSelectedGenderText) {
				iStudentGender = this._interStudentSelectedGenderText;
				this.getView().byId("iStudentGenderMale").setValueState("None");
				this.getView().byId("iStudentGenderFemale").setValueState("None");
				this.getView().byId("iStudentGenderOthers").setValueState("None");
			} else {
				this.getView().byId("iStudentCityId").setSelectedKey("");
				this.getView().byId("iStudentGenderMale").setValueState("Error");
				this.getView().byId("iStudentGenderFemale").setValueState("Error");
				this.getView().byId("iStudentGenderOthers").setValueState("Error");
			}

			//all fields empty
			if (iStudentId === "" && iStudentName === "" && iStudentAge === "" && iStudentMobile === "" && !this._interStudentSelectedGenderText) {
				MessageBox.error("Fill All Mandatory Fields");
			}
			//all fields filled
			else if (iStudentName.match(regExpName) && iStudentAge && iStudentId.match(regExpId) && iStudentMobile.match(regExpMobile) && this._interStudentSelectedGenderText) {
				MessageBox.success("Details added to CustomList Successfully");
				var interStudentPayload = {
					"Name": iStudentName,
					"Id": iStudentId,
					"Age": iStudentAge,
					"Mobile": iStudentMobile,
					"Gender": iStudentGender,
					"City": citySelectedValue
				};
				var oModel = this.getOwnerComponent().getModel("dataModel");
				oModel.getData().InterStudentDetailsEntity.push(interStudentPayload);
				oModel.getData().InterStudentDetailsEntity.FormSubmitted = "Form3";
				oModel.refresh(true);

				//make form4 visible
				this.getView().byId("view1Form4Id").setVisible(true);
				this.getView().byId("form4BoxId").setVisible(true);

				//clear all fields
				this.getView().byId("iStudentNameId").setValue("");
				this.getView().byId("iStudentRollNoId").setValue("");
				this.getView().byId("iStudentMobileId").setValue("");
				this.getView().byId("iStudentAgeId").setSelectedKey("");
				this.getView().byId("iStudentGenderMale").setSelected(false);
				this.getView().byId("iStudentGenderFemale").setSelected(false);
				this.getView().byId("iStudentGenderOthers").setSelected(false);
				this.getView().byId("iStudentCityId").setSelectedKey("");
				this.getOwnerComponent().getRouter().navTo("View9");
			}
		},

		//form4
		_OnInputGraduateStudentName: function() {
			var regExpName = /^[A-Za-z\s]+$/;
			var gStudentName = this.getView().byId("gNameId").getValue().trim();
			if (gStudentName.match(regExpName) || gStudentName === "") {
				this.getView().byId("gNameId").setValueState("None");
			} else {
				this.getView().byId("gNameId").setValueState("Error");
				this.getView().byId("gNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
		},
		_OnInputGraduateStudentId: function() {
			var regExpId = /^GRAD[0-9]{2}[A-Z]{1}$/;
			var gStudentId = this.getView().byId("gRollNoId").getValue();
			if (gStudentId.match(regExpId) || gStudentId === "") {
				this.getView().byId("gRollNoId").setValueState("None");
			} else {
				this.getView().byId("gRollNoId").setValueState("Error");
				this.getView().byId("gRollNoId").setValueStateText("Id format GRAD12A");
			}
		},
		_OnSelectGraduateStudentAge: function() {
			debugger;
			var gStudentAge = this.getView().byId("gAgeId").getSelectedKey();
			if (gStudentAge) {
				this.getView().byId("gAgeId").setValueState("None");
			} else {
				this.getView().byId("gAgeId").setValueState("Error");
				this.getView().byId("gAgeId").setValueStateText("Age cannot be empty");
			}
		},
		_OnInputGraduateStudentEmail: function() {
			debugger;
			var regExpEmail = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.com$/;
			var gStudentEmail = this.getView().byId("gEmailId").getValue();
			if (gStudentEmail.match(regExpEmail) || gStudentEmail === "") {
				this.getView().byId("gEmailId").setValueState("None");
			} else {
				this.getView().byId("gEmailId").setValueState("Error");
				this.getView().byId("gEmailId").setValueStateText("Enter proper Email eg: userid@domain.com");
			}
		},
		_OnSelectGraduateStudentBranch: function(oEvent) {
			debugger;
			this.branchSelectedItems = oEvent.getSource().getSelectedItems();
			this.branchSelectedItemsValues = this.branchSelectedItems.map(function(item) {
				return item.getText();
			});
			if (this.branchSelectedItems) {
				this.getView().byId("gBranchId").setValueState("None");
			} else {
				this.getView().byId("gBranchId").setValueState("Error");
				this.getView().byId("gBranchId").setValueStateText("Branch cannot be empty");
			}
		},
		_OnSelectGraduateStudentPlace: function() {
			debugger;
			var hasPlaceItem = this.getView().byId("gPlaceId").getSelectedItem();
			var placeSelectedValue = hasPlaceItem.getText();
			if (hasPlaceItem) {
				this.getView().byId("gPlaceId").setValueState("None");
			} else {
				this.getView().byId("gPlaceId").setValueState("Error");
				this.getView().byId("gPlaceId").setValueStateText("City cannot be empty");
			}
			var regExpName = /^[A-Za-z\s]+$/;
			var regExpId = /^GRAD[0-9]{2}[A-Z]{1}$/;
			var regExpEmail = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.com$/;

			var gStudentName = this.getView().byId("gNameId").getValue().trim();
			var gStudentId = this.getView().byId("gRollNoId").getValue();
			var gStudentAge = this.getView().byId("gAgeId").getSelectedKey();
			var gStudentEmail = this.getView().byId("gEmailId").getValue();
			var gStudentBranch;
			//name
			if (gStudentName.match(regExpName)) {
				this.getView().byId("gNameId").setValueState("None");
			} else {
				//clears place value
				this.getView().byId("gPlaceId").setSelectedKey("");
				this.getView().byId("gNameId").setValueState("Error");
				this.getView().byId("gNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			//id
			if (gStudentId.match(regExpId)) {
				this.getView().byId("gRollNoId").setValueState("None");
			} else {
				//clears place value
				this.getView().byId("gPlaceId").setSelectedKey("");
				this.getView().byId("gRollNoId").setValueState("Error");
				this.getView().byId("gRollNoId").setValueStateText("Id format GRAD12A");
			}
			//age
			if (gStudentAge) {
				this.getView().byId("gAgeId").setValueState("None");
			} else {
				//clears place value
				this.getView().byId("gPlaceId").setSelectedKey("");
				this.getView().byId("gAgeId").setValueState("Error");
				this.getView().byId("gAgeId").setValueStateText("Age cannot be empty");
			}
			//email
			if (gStudentEmail.match(regExpEmail)) {
				this.getView().byId("gEmailId").setValueState("None");
			} else {
				//clears place value
				this.getView().byId("gPlaceId").setSelectedKey("");
				this.getView().byId("gEmailId").setValueState("Error");
				this.getView().byId("gEmailId").setValueStateText("Enter proper Email eg: userid@domain.com");
			}
			//branch
			if (this.branchSelectedItems) {
				gStudentBranch = this.branchSelectedItemsValues;
				this.getView().byId("gBranchId").setValueState("None");
			} else {
				//cears place value
				this.getView().byId("gPlaceId").setSelectedKey("");
				this.getView().byId("gBranchId").setValueState("Error");
				this.getView().byId("gBranchId").setValueStateText("Branch cannot be empty");
			}
			//all fields empty
			if (gStudentName === "" && gStudentId === "" && gStudentAge === "" && gStudentEmail === "" && !this.branchSelectedItems) {
				MessageBox.error("Fill All mandatory fields");
			} else if (gStudentName.match(regExpName) && gStudentId.match(regExpId) && gStudentAge && gStudentEmail.match(regExpEmail) && this.branchSelectedItems) {
				MessageBox.success("Graduate Student Details added successfully");
				var graduateStudentPayload = {
					"Name": gStudentName,
					"Id": gStudentId,
					"Age": gStudentAge,
					"Email": gStudentEmail,
					"Branch": gStudentBranch,
					"Place": placeSelectedValue
				};
				var oModel = this.getOwnerComponent().getModel("dataModel");
				oModel.setProperty("/GraduateStudentDetailsEntity", graduateStudentPayload);
				// oModel.getData().GraduateStudentDetailsEntity.push(graduateStudentPayload);
				oModel.refresh(true);

				//clear all fields
				this.getView().byId("gNameId").setValue("");
				this.getView().byId("gRollNoId").setValue("");
				this.getView().byId("gAgeId").setSelectedKey("");
				this.getView().byId("gEmailId").setValue("");
				this.getView().byId("gBranchId").setSelectedKeys("");
				this.getView().byId("gPlaceId").setSelectedKey("");

				//make form5 visible
				this.getView().byId("view1Form5Id").setVisible(true);
				this.getView().byId("form5BankGridFormId").setVisible(true);

				this.getOwnerComponent().getRouter().navTo("View8");
			}

		},

		//form5
		_OnInputCustomerName: function() {
			var regExpName = /^[A-Za-z\s]+$/;
			var customerName = this.getView().byId("customerNameId").getValue().trim();
			if (customerName.match(regExpName) || customerName === "") {
				this.getView().byId("customerNameId").setValueState("None");
			} else {
				this.getView().byId("customerNameId").setValueState("Error");
				this.getView().byId("customerNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
		},
		_OnInputCustomerId: function() {
			var regExpId = /^C[0-9]{2}[A-Z]{1}$/;
			var customerId = this.getView().byId("customerId").getValue();
			if (customerId.match(regExpId) || customerId === "") {
				this.getView().byId("customerId").setValueState("None");
			} else {
				this.getView().byId("customerId").setValueState("Error");
				this.getView().byId("customerId").setValueStateText("Id format C12A");
			}
		},
		_OnSelectCustomerAge: function() {
			var customerAge = this.getView().byId("customerAgeId").getSelectedKey();
			if (customerAge) {
				this.getView().byId("customerAgeId").setValueState("None");
			} else {
				this.getView().byId("customerAgeId").setValueState("Error");
				this.getView().byId("customerAgeId").setValueStateText("Age cannot be empty");
			}
		},
		_OnInputCustomerPanNumber: function() {
			var regExpPan = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
			var customerPan = this.getView().byId("customerPancardId").getValue().trim();
			if (customerPan.match(regExpPan) || customerPan === "") {
				this.getView().byId("customerPancardId").setValueState("None");
			} else {
				this.getView().byId("customerPancardId").setValueState("Error");
				this.getView().byId("customerPancardId").setValueStateText("Pancard Format 5-Alphabets 4-Numbers 1-Alphabet");
			}
		},
		_OnSelectCustomerGender: function(oEvent) {
			this.customerSelectedGenderText = oEvent.getSource().getText();
			this.getView().byId("customerGenderMaleText").setValueState("None");
			this.getView().byId("customerGenderFemaleText").setValueState("None");
		},
		_OnSelectCustomerAccount: function(oEvent) {
			this.customerSelectedAccountText = oEvent.getSource().getText();
			this.getView().byId("customerAccountTypeCurrent").setValueState("None");
			this.getView().byId("customerAccountTypeSavings").setValueState("None");
		},
		_OnSelectCustomerBenefits: function(oEvent) {
			debugger;
			this.addOnSelectedItems = oEvent.getSource().getSelectedItems();
			this.addOnSelectedItemsValues = this.addOnSelectedItems.map(function(item) {
				return item.getText();
			});
			if (this.addOnSelectedItems) {
				this.getView().byId("customerAddOnId").setValueState("None");
			} else {
				this.getView().byId("customerAddOnId").setValueState("Error");
				this.getView().byId("customerAddOnId").setValueStateText("Benefits cannot be empty");
			}
		},
		_OnInputCustomerBranch: function() {
			var regExpName = /^[A-Za-z\s]+$/;
			var regExpId = /^C[0-9]{2}[A-Z]{1}$/;
			var regExpPan = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

			var customerBranch = this.getView().byId("customerBranchId").getValue().trim();
			var customerName = this.getView().byId("customerNameId").getValue().trim();
			var customerId = this.getView().byId("customerId").getValue();
			var customerAge = this.getView().byId("customerAgeId").getSelectedKey();
			var customerPan = this.getView().byId("customerPancardId").getValue().trim();
			var customerGender;
			var customerAccountType;

			//name
			if (customerName.match(regExpName)) {
				this.getView().byId("customerNameId").setValueState("None");
			} else {
				//clears branch value
				this.getView().byId("customerBranchId").setValue("");
				this.getView().byId("customerNameId").setValueState("Error");
				this.getView().byId("customerNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			//id
			if (customerId.match(regExpId)) {
				this.getView().byId("customerId").setValueState("None");
			} else {
				//clears branch value
				this.getView().byId("customerBranchId").setValue("");
				this.getView().byId("customerId").setValueState("Error");
				this.getView().byId("customerId").setValueStateText("Id format C12A");
			}
			//age
			if (customerAge) {
				this.getView().byId("customerAgeId").setValueState("None");
			} else {
				//clears branch value
				this.getView().byId("customerBranchId").setValue("");
				this.getView().byId("customerAgeId").setValueState("Error");
				this.getView().byId("customerAgeId").setValueStateText("Age cannot be empty");
			}
			//pan
			if (customerPan.match(regExpPan)) {
				this.getView().byId("customerPancardId").setValueState("None");
			} else {
				//clears branch value
				this.getView().byId("customerBranchId").setValue("");
				this.getView().byId("customerPancardId").setValueState("Error");
				this.getView().byId("customerPancardId").setValueStateText("Pancard Format 5-Alphabets 4-Numbers 1-Alphabet");
			}
			//gender
			if (this.customerSelectedGenderText) {
				customerGender = this.customerSelectedGenderText;
				this.getView().byId("customerGenderMaleText").setValueState("None");
				this.getView().byId("customerGenderFemaleText").setValueState("None");
			} else {
				//clears branch value
				this.getView().byId("customerBranchId").setValue("");
				this.getView().byId("customerGenderMaleText").setValueState("Error");
				this.getView().byId("customerGenderFemaleText").setValueState("Error");
			}
			//accounttype
			if (this.customerSelectedAccountText) {
				customerAccountType = this.customerSelectedAccountText;
				this.getView().byId("customerAccountTypeCurrent").setValueState("None");
				this.getView().byId("customerAccountTypeSavings").setValueState("None");
			} else {
				//clears branch value
				this.getView().byId("customerBranchId").setValue("");
				this.getView().byId("customerAccountTypeCurrent").setValueState("Error");
				this.getView().byId("customerAccountTypeSavings").setValueState("Error");
			}
			//benefits
			if (this.addOnSelectedItems) {
				this.getView().byId("customerAddOnId").setValueState("None");
			} else {
				//clears branch value
				this.getView().byId("customerBranchId").setValue("");
				this.getView().byId("customerAddOnId").setValueState("Error");
				this.getView().byId("customerAddOnId").setValueStateText("Branch cannot be empty");
			}
			//branch
			if (customerBranch.match(regExpName) || customerBranch === "") {
				this.getView().byId("customerBranchId").setValueState("None");
			} else {
				this.getView().byId("customerBranchId").setValueState("Error");
				this.getView().byId("customerBranchId").setValueStateText("Branch cannot contain numbers and special characters");
			}
			// all mandatory fields validation-all empty
			if (customerName === "" && customerId === "" && customerAge === "" && customerPan === "" && customerGender === "" &&
				customerAccountType === "" && !this.addOnSelectedItems) {
				MessageBox.error("Fill All Mandatory Fields");
			} else if (customerName.match(regExpName) && customerId.match(regExpId) && customerAge && customerPan.match(regExpPan) && this.customerSelectedGenderText &&
				this.customerSelectedAccountText && this.addOnSelectedItems) {
				MessageBox.success("Bank Customer details added successfully");
				var bankCustomerPayload = {
					"Name": customerName,
					"Id": customerId,
					"Age": customerAge,
					"Pancard": customerPan,
					"Gender": customerGender,
					"AccountType": customerAccountType,
					"Benefits": this.addOnSelectedItemsValues,
					"Branch": customerBranch

				};
				var oModel = this.getOwnerComponent().getModel("dataModel");
				oModel.setProperty("/BankDetailsEntity", bankCustomerPayload);
				//oModel.getData().BankDetailsEntity.push(bankCustomerPayload);
				oModel.refresh(true);

				//clear all fields
				this.getView().byId("customerNameId").setValue("");
				this.getView().byId("customerId").setValue("");
				this.getView().byId("customerAgeId").setSelectedKey("");
				this.getView().byId("customerPancardId").setValue("");
				this.getView().byId("customerGenderMaleText").setSelected(false);
				this.getView().byId("customerGenderFemaleText").setSelected(false);
				this.getView().byId("customerAccountTypeCurrent").setSelected(false);
				this.getView().byId("customerAccountTypeSavings").setSelected(false);
				this.getView().byId("customerAddOnId").setSelectedKeys("");
				this.getView().byId("customerBranchId").setValue("");

				//make form6 visible
				this.getView().byId("view1Form6Id").setVisible(true);
				this.getView().byId("dynamicForm6VBoxId").setVisible(true);
				//makes form6 submit button visible
				this.getView().byId("dynamicFormSubmitButtonInFlexBoxInViewId").setVisible(true);
				this.getOwnerComponent().getRouter().navTo("View7");
			}
		},

		//form6

		_OnSubmitDynamicForm6GoToView6: function() {
			debugger;
			var regExpInvoiceId = /^INV[0-9]{2}[A-Z]{1}$/;
			var regExpPan = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
			var regExpInvoiceValue = /^₹[0-9]+(\.[0-9]{1,2})?$/;
			var regExpTransactionId = /^T_[0-9]{8}$/;

			var invoiceId = sap.ui.getCore().byId("invoiceId").getValue();
			var invoiceDate = sap.ui.getCore().byId("invoiceDateId").getValue();
			var invoiceTime = sap.ui.getCore().byId("invoiceTimeId").getValue();
			var invoicePanNumber = sap.ui.getCore().byId("invoicePanId").getValue();
			var invoiceModeOfPaymentText;
			var invoiceModeOfPaymentCash = sap.ui.getCore().byId("invoiceModeOfPaymentCashId").getSelected();
			var invoiceModeOfPaymentCard = sap.ui.getCore().byId("invoiceModeOfPaymentCardId").getSelected();
			var invoiceTimeOfDelivery = sap.ui.getCore().byId("invoiceDeliveryTimeId").getValue();
			var invoiceStateCode = sap.ui.getCore().byId("invoiceStateCodeId")._getSelectedItemText();
			var invoiceInvoiceValue = sap.ui.getCore().byId("invoiceValueId").getValue();
			var invoicePaymentTransactionId = sap.ui.getCore().byId("invoicePaymentId").getValue();
			//invoiceid
			if (invoiceId.match(regExpInvoiceId)) {
				sap.ui.getCore().byId("invoiceId").setValueState("None");
			} else {
				sap.ui.getCore().byId("invoiceId").setValueState("Error");
			}
			//invoiceDate
			if (invoiceDate !== "") {
				sap.ui.getCore().byId("invoiceDateId").setValueState("None");
			} else {
				sap.ui.getCore().byId("invoiceDateId").setValueState("Error");
			}
			//invoiceTime
			if (invoiceTime !== "") {
				sap.ui.getCore().byId("invoiceTimeId").setValueState("None");
			} else {
				sap.ui.getCore().byId("invoiceTimeId").setValueState("Error");
			}
			//invoice pan
			if (invoicePanNumber.match(regExpPan)) {
				sap.ui.getCore().byId("invoicePanId").setValueState("None");
			} else {
				sap.ui.getCore().byId("invoicePanId").setValueState("Error");
			}
			//invoiceModeOfPayment
			if (invoiceModeOfPaymentCash === true || invoiceModeOfPaymentCard === true) {

				if (invoiceModeOfPaymentCash === true) {
					invoiceModeOfPaymentText = sap.ui.getCore().byId("invoiceModeOfPaymentCashId").getText();
					sap.ui.getCore().byId("invoiceModeOfPaymentCardId").setValueState("None");
					sap.ui.getCore().byId("invoiceModeOfPaymentCashId").setValueState("None");
				}
				if (invoiceModeOfPaymentCard === true) {
					invoiceModeOfPaymentText = sap.ui.getCore().byId("invoiceModeOfPaymentCardId").getText();
					sap.ui.getCore().byId("invoiceModeOfPaymentCardId").setValueState("None");
					sap.ui.getCore().byId("invoiceModeOfPaymentCashId").setValueState("None");
				}
				if (invoiceModeOfPaymentCash === true && invoiceModeOfPaymentCard === true) {
					invoiceModeOfPaymentText = sap.ui.getCore().byId("invoiceModeOfPaymentCashId").getText() + ", " + sap.ui.getCore().byId(
						"invoiceModeOfPaymentCardId").getText();
					sap.ui.getCore().byId("invoiceModeOfPaymentCardId").setValueState("None");
					sap.ui.getCore().byId("invoiceModeOfPaymentCashId").setValueState("None");
				}
			} else {
				sap.ui.getCore().byId("invoiceModeOfPaymentCardId").setValueState("Error");
				sap.ui.getCore().byId("invoiceModeOfPaymentCashId").setValueState("Error");
			}
			//invoiceTimeOfDelivery
			if (invoiceTimeOfDelivery !== "") {
				sap.ui.getCore().byId("invoiceDeliveryTimeId").setValueState("None");
			} else {
				sap.ui.getCore().byId("invoiceDeliveryTimeId").setValueState("Error");
			}
			//invoiceStateCode
			if (invoiceStateCode !== "") {
				sap.ui.getCore().byId("invoiceStateCodeId").setValueState("None");
			} else {
				sap.ui.getCore().byId("invoiceStateCodeId").setValueState("Error");
			}
			//invoiceInvoiceValue
			if (invoiceInvoiceValue.match(regExpInvoiceValue)) {
				sap.ui.getCore().byId("invoiceValueId").setValueState("None");
			} else {
				sap.ui.getCore().byId("invoiceValueId").setValueState("Error");
			}
			//invoicePaymentTransactionId
			if (invoicePaymentTransactionId.match(regExpTransactionId)) {
				sap.ui.getCore().byId("invoicePaymentId").setValueState("None");
			} else {
				sap.ui.getCore().byId("invoicePaymentId").setValueState("Error");
			}
			if (invoiceId.match(regExpInvoiceId) && invoiceDate !== "" && invoiceTime !== "" && invoicePanNumber.match(regExpPan) && (
					invoiceModeOfPaymentCash === true || invoiceModeOfPaymentCard === true) && invoiceTimeOfDelivery !== "" && invoiceStateCode !==
				"" && invoiceInvoiceValue.match(regExpInvoiceValue) && invoicePaymentTransactionId.match(regExpTransactionId)) {
				MessageBox.success("Data Submitted successfully");
				var invoicePayload = {
					"InvoiceId": invoiceId,
					"InvoiceDate": invoiceDate,
					"InvoiceTime": invoiceTime,
					"InvoicePanNumber": invoicePanNumber,
					"InvoicePaymentMode": invoiceModeOfPaymentText,
					"InvoiceDeliveryTime": invoiceTimeOfDelivery,
					"InvoiceStateCode": invoiceStateCode,
					"InvoiceValue": invoiceInvoiceValue,
					"InvoicePaymentId": invoicePaymentTransactionId
				};

				var oModel = this.getOwnerComponent().getModel("dataModel");
				// oModel.getData().InvoiceDetailsEntity = invoicePayload;
				// oModel.setProperty("/InvoiceDetailsEntity", invoicePayload);

				oModel.getData().InvoiceDetailsEntity.push(invoicePayload);
				oModel.refresh(true);
				this.getOwnerComponent().getRouter().navTo("View6");
				sap.ui.getCore().byId("invoiceId").setValue("");
				sap.ui.getCore().byId("invoiceDateId").setValue("");
				sap.ui.getCore().byId("invoiceTimeId").setValue("");
				sap.ui.getCore().byId("invoicePanId").setValue("");
				sap.ui.getCore().byId("invoiceModeOfPaymentCardId").setSelected(false);
				sap.ui.getCore().byId("invoiceModeOfPaymentCashId").setSelected(false);
				sap.ui.getCore().byId("invoiceDeliveryTimeId").setValue("");
				sap.ui.getCore().byId("invoiceStateCodeId").setSelectedKey("");
				sap.ui.getCore().byId("invoiceValueId").setValue("");
				sap.ui.getCore().byId("invoicePaymentId").setValue("");

			} else if (invoiceId === "" && invoiceDate === "" && invoiceTime === "" && invoicePanNumber === "" && (invoiceModeOfPaymentCash ===
					false && invoiceModeOfPaymentCard === false) && invoiceTimeOfDelivery === "" && invoiceStateCode === "" && invoiceInvoiceValue ===
				"" && invoicePaymentTransactionId === "") {
				// MessageBox.error("Fill all Mandatory details");

			}
		}
	});
});