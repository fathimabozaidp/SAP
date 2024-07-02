sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("com.dpz_routingTenViews.controller.View9", {
		onInit: function() {
			debugger;
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("View9").attachPatternMatched(this.onRouteMatchedForm1NavWithParameters, this);
			oRouter.getRoute("View9").attachPatternMatched(this.onRouteMatchedForm1GoToRespectiveITF, this);
			oRouter.getRoute("View9").attachPatternMatched(this.enableDisableDeleteButtonInStudentTable, this);
		
		},
		onRouteMatchedForm1NavWithParameters: function(oEvent) {
			debugger;
			var studentPayload = oEvent.getParameter("arguments").testPayload;
			var form1EntityData = this.getOwnerComponent().getModel("dataModel").getData().StudentDetailsEntity;
			var oTable = this.byId("allStudentDetailsTableId");
			if (studentPayload && form1EntityData.FormSubmitted === "Form1" ) {
				var studentPayloadParsed = JSON.parse(studentPayload);
				var oModel = this.getOwnerComponent().getModel("dataModel");
				oModel.getData().StudentDetailsEntity.push(studentPayloadParsed);
				oModel.refresh(true);
			 }
			// else{
			// 	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// oRouter.navTo("View9", {}, true);
			//oModel.refresh(true);
			// }
		},
		onRouteMatchedForm1GoToRespectiveITF: function() {
			var iconTabHeaderInView9 = this.getView().byId("iconTabBarInView9Id");
			debugger;
			var form1EntityData = this.getOwnerComponent().getModel("dataModel").getData().StudentDetailsEntity;
			var form2EntityData = this.getOwnerComponent().getModel("dataModel").getData().EmployeeDetailsEntity;
			var form3EntityData = this.getOwnerComponent().getModel("dataModel").getData().InterStudentDetailsEntity;
			if (form1EntityData.FormSubmitted === "Form1") {
				//open icontabfilter1
				iconTabHeaderInView9.setSelectedKey("form1tab1");
				this.getView().byId("form1IconTabFilterId").setEnabled(true);
			} else {
				this.getView().byId("form1IconTabFilterId").setEnabled(false);
			}
			if (form2EntityData.FormSubmitted === "Form2") {
				//open icontabfilter2
				iconTabHeaderInView9.setSelectedKey("form2tab2");
				this.getView().byId("form2IconTabFilterId").setEnabled(true);
			} else {
				this.getView().byId("form2IconTabFilterId").setEnabled(false);
			}
			if (form3EntityData.FormSubmitted === "Form3") {
				//open icontabfilter3
				iconTabHeaderInView9.setSelectedKey("form3tab3");
				this.getView().byId("form3IconTabFilterId").setEnabled(true);
			} else {
				this.getView().byId("form3IconTabFilterId").setEnabled(false);
			}
		},
		enableDisableDeleteButtonInStudentTable: function() {
			var studentDetailsTable = this.getView().byId("allStudentDetailsTableId");
			if (studentDetailsTable.getItems().length > 0) {
				//enable delete button of Employee Details Table
				this.getView().byId("deleteStudentDetailsButtonId").setEnabled(true);
			} else {
				this.getView().byId("deleteStudentDetailsButtonId").setEnabled(false);
			}
		},
		_OnPressBackGoToView1: function() {
			this.getOwnerComponent().getRouter().navTo("View1");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        	oRouter.navTo("yourRouteName", {}, true);
		},
		_OnPressRowOpenForm1Fragment: function(oEvent) {
			var oModel = this.getOwnerComponent().getModel("dataModel");
			var object = oEvent.getSource().getBindingContext("dataModel").getObject();
			var multiComboStreamKeys = object.PreferredStreamKeys;
			oModel.setProperty("/SelectedRow", object);
			if (!this.form1Fragment) {
				this.form1Fragment = sap.ui.xmlfragment("com.dpz_routingTenViews.view.fragments.form1StudentFragment", this);
				this.getView().addDependent(this.form1Fragment);
			}
			//for radio auto selection
			if (object.Gender === "Male") {
				sap.ui.getCore().byId("studentEditGenderMaleId").setSelected(true);
			} else if (object.Gender === "Female") {
				sap.ui.getCore().byId("studentEditGenderFemaleId").setSelected(true);
			}
			//for multicombobox STREAM keys selection
			sap.ui.getCore().byId("studentEditPreferredStreamId").setSelectedKeys(multiComboStreamKeys);
			oModel.refresh(true);
			this.form1Fragment.open();
		},
		_OnClickStandardListOpenForm2Fragment: function(oEvent) {
			var oModel = this.getOwnerComponent().getModel("dataModel");
			var object = oEvent.getSource().getBindingContext("dataModel").getObject();
			oModel.setProperty("/SelectedItemFromList", object);
			if (!this.form2Fragment) {
				this.form2Fragment = sap.ui.xmlfragment("com.dpz_routingTenViews.view.fragments.form2IntermediateForm", this);
				this.getView().addDependent(this.form2Fragment);
			}
			oModel.refresh(true);
			this.form2Fragment.open();
		},
		_OnClickCloseForm1StudentFragment: function() {
			this.form1Fragment.close();
		},
		_OnClickCloseForm2IntermediateFragment: function() {
			this.form2Fragment.close();
		},
		_OnSelectGenderInFragment: function(oEvent) {
			this._gInFragmentSelectedText = oEvent.getSource().getText();
		},
		_OnSelectPreferredStreamInFragment: function(oEvent) {
			this._editStreamSelectedItems = oEvent.getSource().getSelectedItems();
			this._editStreamSelectedItemsValues = this._editStreamSelectedItems.map(function(item) {
				return item.getText();
			});
		},
		_OnPressSaveEditStudentDetails: function() {
			debugger;
			var regExpName = /^[A-Za-z\s]+$/;
			var regExpMobile = /^[6-9]{1}[0-9]{9}$/;
			var studentEditName = sap.ui.getCore().byId("studentEditNameId").getValue().trim();
			var studentEditAge = sap.ui.getCore().byId("studentEditAgeId").getSelectedKey() || sap.ui.getCore().byId("studentEditAgeId").getValue();
			var studentEditGender;
			var studentEditFatherName = sap.ui.getCore().byId("studentEditFatherNameId").getValue().trim();
			var studentEditFatherMobile = sap.ui.getCore().byId("studentEditFatherMobileId").getValue();
			var studentEditPreferredStreamItemsLength = sap.ui.getCore().byId("studentEditPreferredStreamId").getSelectedItems().length;
			var studentEditPreferredStreamItems = sap.ui.getCore().byId("studentEditPreferredStreamId").getSelectedItems();
			var studentEditPreferredStreamItemsValue = studentEditPreferredStreamItems.map(function(item){
				return item.getText(); 
			});
			var studentEditPreferredStream;

			// student name
			if (studentEditName.match(regExpName)) {
				sap.ui.getCore().byId("studentEditNameId").setValueState("None");
			} else {
				sap.ui.getCore().byId("studentEditNameId").setValueState("Error");
				sap.ui.getCore().byId("studentEditNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			// student age
			if (studentEditAge || studentEditAge == "") {
				sap.ui.getCore().byId("studentEditAgeId").setValueState("None");
			} else {
				sap.ui.getCore().byId("studentEditAgeId").setValueState("Error");
				sap.ui.getCore().byId("studentEditAgeId").setValueStateText("Age cannot be empty");
			}
			// student gender
			if (this._gInFragmentSelectedText) {
				studentEditGender = this._gInFragmentSelectedText;
			}
			// father name
			if (studentEditFatherName.match(regExpName) || studentEditFatherName === "") {
				sap.ui.getCore().byId("studentEditFatherNameId").setValueState("None");
			} else {
				sap.ui.getCore().byId("studentEditFatherNameId").setValueState("Error");
				sap.ui.getCore().byId("studentEditFatherNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			// father mobile
			if (studentEditFatherMobile.match(regExpMobile)) {
				sap.ui.getCore().byId("studentEditFatherMobileId").setValueState("None");
			} else {
				sap.ui.getCore().byId("studentEditFatherMobileId").setValueState("Error");
				sap.ui.getCore().byId("studentEditFatherMobileId").setValueStateText("Starting Digit >=6 and only 10 digits long");
			}
			// stream
			if (studentEditPreferredStreamItemsLength > 0) {
				studentEditPreferredStream = this._editStreamSelectedItemsValues;
				sap.ui.getCore().byId("studentEditPreferredStreamId").setValueState("None");
			} else {
				sap.ui.getCore().byId("studentEditPreferredStreamId").setValueState("Error");
				sap.ui.getCore().byId("studentEditPreferredStreamId").setValueStateText("Stream cannot be empty");
			}

			if (studentEditName === "" && studentEditFatherMobile === "" && studentEditPreferredStreamItemsLength <= 0) {
				MessageBox.error("Fill all mandatory fields");
			} else if (studentEditName.match(regExpName) && (studentEditAge !== "" || studentEditAge === "") && (studentEditGender === "Male" ||
					studentEditGender === "Female" || studentEditGender === undefined) && (studentEditFatherName.match(regExpName) ||
					studentEditFatherName === "") && studentEditFatherMobile.match(regExpMobile) && studentEditPreferredStreamItemsLength > 0) {
				MessageBox.success("Success");
				var studentEditDetailsPayload = {
					"Name": studentEditName,
					"Age": studentEditAge,
					"Gender": studentEditGender,
					"FatherName": studentEditFatherName,
					"FatherMobile": studentEditFatherMobile,
					"PreferredStream": studentEditPreferredStreamItemsValue
				};

				//get data from model to replace old object with new object
				var oModel = this.getOwnerComponent().getModel("dataModel");
				var studentDetailsArray = oModel.getData().StudentDetailsEntity;
				studentDetailsArray.map(function(item) {
					if (item.FatherMobile === studentEditFatherMobile) {
						var previousObject = item;
						Object.assign(previousObject, studentEditDetailsPayload);
					}
				});
				oModel.refresh(true);
				this.form1Fragment.close();
				sap.ui.getCore().byId("studentEditNameId").setValue("");
				sap.ui.getCore().byId("studentEditAgeId").setSelectedKey("");
				sap.ui.getCore().byId("studentEditGenderMaleId").setSelected(false);
				sap.ui.getCore().byId("studentEditGenderFemaleId").setSelected(false);
				sap.ui.getCore().byId("studentEditFatherNameId").setValue("");
				sap.ui.getCore().byId("studentEditFatherMobileId").setValue("");
				sap.ui.getCore().byId("studentEditPreferredStreamId").setSelectedKeys("");

			}
		},
		_OnDeleteRemoveStudentFromStudentDetailsTable: function() {
			debugger;
			//get model
			var oModel = this.getOwnerComponent().getModel("dataModel");
			//get table
			var oTable = this.getView().byId("allStudentDetailsTableId");
			var totalRowsSelected = 0;
			var selectedRow;
			var selectedRowsArray = [];
			var studentDetailsArray = [];
			var rowIndexOfItemToBeDeleted;
			var that = this;
			//gets multiple rows 
			var selectedRows = oTable.getSelectedItems();
			selectedRows.forEach((item) => {
				selectedRow = item.getBindingContext("dataModel").getObject();
				selectedRowsArray.push(selectedRow);
				totalRowsSelected++;
			});
			if (totalRowsSelected > 1) {
				MessageBox.confirm("Are you sure you want to delete all records permanently?", {
					onClose: function(oAction) {
						if (oAction === "OK") {
							debugger;
							studentDetailsArray = oModel.getData().StudentDetailsEntity;
							selectedRowsArray.forEach((item, index) => {
								rowIndexOfItemToBeDeleted = studentDetailsArray.indexOf(item);
								studentDetailsArray.splice(rowIndexOfItemToBeDeleted, 1);
							});
							debugger;
							//deletes same records as that of employee table from hr table
							oModel.refresh(true);
							if (oModel.getData().StudentDetailsEntity.length > 1) {
								oTable.removeSelections(false);
							} else if (oModel.getData().StudentDetailsEntity.length === 1) {
								oTable.removeSelections(false);
							} else {
								that.getView().byId("deleteStudentDetailsButtonId").setEnabled(false);
							}
						}
					}
				});
				// oTable.removeSelections(true);
			} else if (totalRowsSelected === 1) {
				MessageBox.confirm("Are you sure you want to delete selected record permanently?", {
					onClose: function(oAction) {
						if (oAction === "OK") {
							debugger;
							if (oModel.getData().StudentDetailsEntity) {
								var selectedItemAtIndex = oModel.getData().StudentDetailsEntity.indexOf(selectedRow);
								oModel.getData().StudentDetailsEntity.splice(selectedItemAtIndex, 1);
								debugger;
								oModel.refresh(true);
								if (oModel.getData().StudentDetailsEntity.length > 1) {
									oTable.removeSelections(true);
									this.getView().byId("form1IconTabFilterId").setEnabled(true);
								} else if (oModel.getData().StudentDetailsEntity.length === 1) {
									oTable.removeSelections(true);
									this.getView().byId("form1IconTabFilterId").setEnabled(true);
								} else {
									that.getView().byId("deleteStudentDetailsButtonId").setEnabled(false);
									that.getView().byId("form1IconTabFilterId").setEnabled(false);
								}
							}
						}
					}
				});
				oTable.removeSelections(true);
				// this.getOwnerComponent().getModel("dataModel").getData().StudentDetailsEntity.setProperty("/FormSubmitted", "");
			} else {
				MessageBox.error("Please select atleast one record to perform the operation");
			}
		}

	});
});