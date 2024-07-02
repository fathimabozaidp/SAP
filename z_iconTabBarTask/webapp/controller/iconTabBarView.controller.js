sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType"
], function(Controller, MessageBox, Fragment, Filter, FilterOperator, FilterType) {
	"use strict";

	return Controller.extend("com.dpz_iconTabBarTask.controller.iconTabBarView", {
		onInit: function() {
			debugger;
			var oTodayDate = new Date();
			var oDepartureDatePicker = this.getView().byId("passengerDepartureDateId");
			oDepartureDatePicker.setMinDate(oTodayDate);
			var oIconTabBar = this.getView().byId("iconTabBarId");
			oIconTabBar.attachSelect(this.onTabSelect, this);

			// Bind the latest object to the ObjectHeader

			// setTimeout(()=>{
			// 	var oModel = this.getView().getModel("iconTabBarModel");
			//     var aCustomerData = oModel.getProperty("/CustomerData");

			//     	var sLatestObjectPath = "/CustomerData/" + (aCustomerData.length - 1);
			// 	    var oObjectHeader = this.byId("CustomerDetailsObjectHeaderId");
			// 	    oObjectHeader.bindElement({
			// 	        path: sLatestObjectPath,
			// 	        model: "iconTabBarModel"
			// 			});		

			// }, 0);

		},
		onAfterRendering: function() {
			setTimeout(() => {
				this.calculateCustomListItemCount();
				this.calculateHistoryTableItemCount();
				//this.calculateObjectHeaderItemCount();
			}, 0);
		},
		calculateCustomListItemCount: function() {
			var oCustomList = this.getView().byId("customListItemId");
			if (oCustomList) {
				var oCustomListItems = oCustomList.getItems();
				var oCustomListTotalItems = oCustomListItems.length;
				this.getView().byId("flightTravelListIconTabFilterId").setCount(oCustomListTotalItems);
				if (oCustomListTotalItems > 0) {
					this.getView().byId("customListItemId").setVisible(true);
				}
				// // Ensure UI update
				// this.getView().byId("flightTravelListIconTabFilterId").updateBindings();
			}
		},
		calculateObjectHeaderItemCount: function() {
			var oObjectHeader = this.getView().byId("CustomerDetailsObjectHeaderId");
			if (oObjectHeader) {
				debugger;
				var oObjectHeaderItems = oObjectHeader.getAttributes();
				var oObjectHeaderTotalItems = oObjectHeaderItems.length / 7;
				this.getView().byId("customerObjectHeaderIconTabFilterId").setCount(oObjectHeaderTotalItems);
			}
		},
		calculateHistoryTableItemCount: function() {
			debugger;
			var oCustomerHistoryTable = this.getView().byId("allCustomerDetailsTableId");
			var oPassengerHistoryTable = this.getView().byId("allPassengerDetailsTableId");
			if (oCustomerHistoryTable || oPassengerHistoryTable) {
				var oCustomerHistoryTableItems = oCustomerHistoryTable.getItems();
				var oPassengerHistoryTableItems = oPassengerHistoryTable.getItems();
				var oHistoryTableTotalItems = oCustomerHistoryTableItems.length + oPassengerHistoryTableItems.length;
				this.getView().byId("allCustomersHistoryTableIconTabFilterId").setCount(oHistoryTableTotalItems);
			}
		},
		onTabSelect: function(oEvent) {
			debugger;
			var iconTabBar = this.getView().byId("iconTabBarId");
			var selectedIconTabFilter = oEvent.getParameter("key");
			if (selectedIconTabFilter == "tab1") {
				// var randomId = "C_" + Math.round(Math.random(1, 30) * 100000);
				// this.getView().byId("customerId").setValue(randomId);	
			} else if (selectedIconTabFilter == "tab2") {
				var randomId = "P_" + Math.round(Math.random(1, 30) * 100000);
				this.getView().byId("passengerId").setValue(randomId);
			} else if (selectedIconTabFilter == "tab3") {
				var oCustomListItemsLength = this.getView().byId("customListItemId").getItems().length;
				if (oCustomListItemsLength <= 0) {
					MessageBox.information("No Passenger Data Available");
				} else {
					this.getView().byId("customListItemId").setVisible(true);
				}
			} else if (selectedIconTabFilter == "tab4") {
				var oObjectHeaderItemsLength = this.getView().byId("CustomerDetailsObjectHeaderId").getItems().length;
				if (oObjectHeaderItemsLength <= 0) {
					MessageBox.information("No Customer Data Available");
				} else {
					this.getView().byId("").setVisible(true);
				}
			} else if (selectedIconTabFilter == "tab5") {
				var oCustomerHistoryTableItemsLength = this.getView().byId("allCustomerDetailsTableId").getItems().length;
				var oPassengerHistoryTableItemsLength = this.getView().byId("allPassengerDetailsTableId").getItems().length;
				if (oCustomerHistoryTableItemsLength > 0 || oPassengerHistoryTableItemsLength > 0) {
					if (oCustomerHistoryTableItemsLength > 0) {
						this.getView().byId("allCustomerDetailsTableId").setVisible(true);
						this.getView().byId("deleteButtonId").setVisible(true);
					}
					if (oPassengerHistoryTableItemsLength > 0) {
						this.getView().byId("allPassengerDetailsTableId").setVisible(true);
						this.getView().byId("deleteButtonId").setVisible(true);
					}
				} else {
					MessageBox.information("No History Available");
				}

			}
			// var iconTabBarItems = iconTabBar.getItems();
			// if(iconTabBarItems){
			// 	var passengerDetailsIconTabFilter = iconTabBar.getItems()[2];
			// 	var customerDetailsIconTabFilter = iconTabBar.getItems()[3];
			// 	var HistoryDetailsIconTabFilter = iconTabBar.getItems()[4];
			// 	var passengerIconTabFilterOpened = passengerDetailsIconTabFilter.getSelected();
			// 	var customerIconTabFilterOpened = customerDetailsIconTabFilter.getSelected();
			// 	var HistoryIconTabFilterOpened = HistoryDetailsIconTabFilter.getSelected();
			// 	if(passengerIconTabFilterOpened){

			// 	}
			// }
		},
		_OnValueHelpRequestCustomerId: function() {
			if (!this.customerIdFragment) {
				this.customerIdFragment = sap.ui.xmlfragment("com.dpz_iconTabBarTask.view.fragments.customerIdFragment", this);
				this.getView().addDependent(this.customerIdFragment);
			}
			this.customerIdFragment.open();
		},
		_OnValueHelpRequestCustomerName: function() {
			if (!this.customerNameFragment) {
				this.customerNameFragment = sap.ui.xmlfragment("com.dpz_iconTabBarTask.view.fragments.customerNameFragment", this);
				this.getView().addDependent(this.customerNameFragment);
			}
			this.customerNameFragment.open();
		},
		_OnValueHelpRequestCustomerEmail: function() {
			if (!this.customerEmailFragment) {
				this.customerEmailFragment = sap.ui.xmlfragment("com.dpz_iconTabBarTask.view.fragments.customerEmailFragment", this);
				this.getView().addDependent(this.customerEmailFragment);
			}
			this.customerEmailFragment.open();
		},
		_OnValueHelpRequestCustomerPan: function() {
			if (!this.customerPanFragment) {
				this.customerPanFragment = sap.ui.xmlfragment("com.dpz_iconTabBarTask.view.fragments.customerPanFragment", this);
				this.getView().addDependent(this.customerPanFragment);
			}
			this.customerPanFragment.open();
		},
		_OnValueHelpRequestCustomerPassport: function() {
			if (!this.customerPassportFragment) {
				this.customerPassportFragment = sap.ui.xmlfragment("com.dpz_iconTabBarTask.view.fragments.customerPassportFragment", this);
				this.getView().addDependent(this.customerPassportFragment);
			}
			this.customerPassportFragment.open();
		},
		_OnValueHelpRequestCustomerMobile: function() {
			if (!this.customerMobileFragment) {
				this.customerMobileFragment = sap.ui.xmlfragment("com.dpz_iconTabBarTask.view.fragments.customerMobileFragment", this);
				this.getView().addDependent(this.customerMobileFragment);
			}
			this.customerMobileFragment.open();
		},
		_OnValueHelpRequestCustomerCity: function() {
			if (!this.customerCityFragment) {
				this.customerCityFragment = sap.ui.xmlfragment("com.dpz_iconTabBarTask.view.fragments.customerCityFragment", this);
				this.getView().addDependent(this.customerCityFragment);
			}
			this.customerCityFragment.open();
		},
		_OnValueHelpRequestCustomerState: function() {
			if (!this.customerStateFragment) {
				this.customerStateFragment = sap.ui.xmlfragment("com.dpz_iconTabBarTask.view.fragments.customerStateFragment", this);
				this.getView().addDependent(this.customerStateFragment);
			}
			this.customerStateFragment.open();
		},
		onPressCloseFragment: function(oEvent) {
			var closeButtonId = oEvent.getSource().getId();
			if (closeButtonId === "closeCustomerIdFragmentId") {
				this.customerIdFragment.close();
				this.customerIdFragment.destroy();
				this.customerIdFragment = null;
				// this.getView().byId("customerIdFragmentTableId").removeSelections(true);
			} else if (closeButtonId === "closeCustomerNameFragmentId") {
				this.customerNameFragment.close();
				this.customerNameFragment.destroy();
				this.customerNameFragment = null;
			} else if (closeButtonId === "closeCustomerEmailFragmentId") {
				this.customerEmailFragment.close();
				this.customerEmailFragment.destroy();
				this.customerEmailFragment = null;
			} else if (closeButtonId === "closeCustomerPanFragmentId") {
				this.customerPanFragment.close();
				this.customerPanFragment.destroy();
				this.customerPanFragment = null;
			} else if (closeButtonId === "closeCustomerPassportFragmentId") {
				this.customerPassportFragment.close();
				this.customerPassportFragment.destroy();
				this.customerPassportFragment = null;
			} else if (closeButtonId === "closeCustomerMobileFragmentId") {
				this.customerMobileFragment.close();
				this.customerMobileFragment.destroy();
				this.customerMobileFragment = null;
			} else if (closeButtonId === "closeCustomerCityFragmentId") {
				this.customerCityFragment.close();
				this.customerCityFragment.destroy();
				this.customerCityFragment = null;
			} else if (closeButtonId === "closeCustomerStateFragmentId") {
				this.customerStateFragment.close();
				this.customerStateFragment.destroy();
				this.customerStateFragment = null;
			}
		},
		//form1 SUBMIT
		selectTableRowInIdFragment: function(oEvent) {
			debugger;

			//gives row
			this.selectedRowInIdFragment = oEvent.getSource().getSelectedItem().getBindingContext("iconTabBarModel").getObject();
			//gives id of row
			this.idOfSelectedRowInIdFragment = this.selectedRowInIdFragment.Id;
			this.getView().byId("customerId").setValue(this.idOfSelectedRowInIdFragment);
			this.customerIdFragment.close();
			this.getView().byId("customerId").setValueState("None");
			this.customerName = this.getView().byId("customerNameId");
			this.customerEmail = this.getView().byId("customerEmailId");
			this.customerPan = this.getView().byId("customerPanId");
			this.customerPassport = this.getView().byId("customerPassportId");
			this.customerMobile = this.getView().byId("customerMobileId");
			this.customerCity = this.getView().byId("customerCityId");
			this.customerState = this.getView().byId("customerStateId");
			// use or condition to match with all
			//not empty
			if (this.customerName.getValue() !== "") {
				debugger;
				if (this.selectedRowInIdFragment.Id === this.selectedRowInNameFragment.Id) {
					this.customerName.setValueState("None");
					this.nameValueState = "none";
				} else {
					this.customerName.setValueState("Error");
					this.nameValueState = "error";
				}
			} //is empty
			else {
				this.customerName.setValueState("None");
				this.nameValueState = "none";
			}
			//email
			if (this.customerEmail.getValue() !== "") {
				if (this.selectedRowInIdFragment.Id === this.selectedRowInEmailFragment.Id) {
					this.customerEmail.setValueState("None");
					this.emailValueState = "none";
				} else {
					this.customerEmail.setValueState("Error");
					this.emailValueState = "error";
				}
			} else {
				this.customerEmail.setValueState("None");
				this.emailValueState = "none";
			}
			if (this.customerPan.getValue() !== "") {
				if (this.selectedRowInIdFragment.Id == this.selectedRowInPanFragment.Id) {
					this.customerPan.setValueState("None");
					this.panValueState = "none";
				} else {
					this.customerPan.setValueState("Error");
					this.panValueState = "error";
				}
			} else {
				this.customerPan.setValueState("None");
				this.panValueState = "none";
			}
			if (this.customerPassport.getValue() !== "") {
				if (this.selectedRowInIdFragment.Id == this.selectedRowInPassportFragment.Id) {
					this.customerPassport.setValueState("None");
					this.passportValueState = "none";
				} else {
					this.customerPassport.setValueState("Error");
					this.passportValueState = "error";
				}
			} else {
				this.customerPassport.setValueState("None");
				this.passportValueState = "none";
			}
			if (this.customerMobile.getValue() !== "") {
				if (this.selectedRowInIdFragment.Id == this.selectedRowInMobileFragment.Id) {
					this.customerMobile.setValueState("None");
					this.mobileValueState = "none";
				} else {
					this.customerMobile.setValueState("Error");
					this.mobileValueState = "error";
				}
			} else {
				this.customerMobile.setValueState("None");
				this.mobileValueState = "none";
			}
			if (this.customerCity.getValue() !== "") {
				if (this.selectedRowInIdFragment.Id == this.selectedRowInCityFragment.Id) {
					this.customerCity.setValueState("None");
					this.cityValueState = "none";
				} else {
					this.customerCity.setValueState("Error");
					this.cityValueState = "error";
				}
			} else {
				this.customerCity.setValueState("None");
				this.cityValueState = "none";
			}
			if (this.customerState.getValue() !== "") {
				if (this.selectedRowInIdFragment.Id == this.selectedRowInStateFragment.Id) {
					this.customerState.setValueState("None");
					this.stateValueState = "none";
				} else {
					this.customerState.setValueState("Error");
					this.stateValueState = "error";
				}
			} else {
				this.customerState.setValueState("None");
				this.stateValueState = "none";
			}
		},
		selectTableRowInNameFragment: function(oEvent) {
			debugger;
			//gives row
			// this.selectedRowInIdFragment = "";
			this.customerId = this.getView().byId("customerId").getValue();
			this.selectedRowInNameFragment = oEvent.getSource().getSelectedItem().getBindingContext("iconTabBarModel").getObject();
			//gives name of row
			this.nameOfSelectedRowInNameFragment = this.selectedRowInNameFragment.Name;
			//name matches with row selected in id
			if (this.selectedRowInNameFragment.Id == this.customerId) {
				this.getView().byId("customerNameId").setValue(this.nameOfSelectedRowInNameFragment);
				this.customerNameFragment.close();
				this.getView().byId("customerNameId").setValueState("None");
				this.nameValueState = "none";
			} else if (this.selectedRowInIdFragment) {
				if (this.nameOfSelectedRowInNameFragment == this.selectedRowInIdFragment.Name) {
					this.getView().byId("customerNameId").setValue(this.nameOfSelectedRowInNameFragment);
					this.customerNameFragment.close();
					this.getView().byId("customerNameId").setValueState("None");
					this.nameValueState = "none";
				} else {
					this.getView().byId("customerNameId").setValue("");
					this.customerNameFragment.close();
					this.getView().byId("customerNameId").setValueState("Error");
					this.getView().byId("customerNameId").setValueStateText("Data selected doesn't corresponds with the Id");
					this.nameValueState = "error";
				}
			} else {
				this.getView().byId("customerNameId").setValue("");
				this.customerNameFragment.close();
				this.getView().byId("customerNameId").setValueState("Error");
				this.getView().byId("customerNameId").setValueStateText("Data selected doesn't corresponds with the Id");
				this.nameValueState = "error";
			}
		},
		selectTableRowInEmailFragment: function(oEvent) {
			this.customerId = this.getView().byId("customerId").getValue();
			this.selectedRowInEmailFragment = oEvent.getSource().getSelectedItem().getBindingContext("iconTabBarModel").getObject();
			this.emailOfSelectedRowInEmailFragment = this.selectedRowInEmailFragment.Email;
			if (this.selectedRowInEmailFragment.Id == this.customerId) {
				this.getView().byId("customerEmailId").setValue(this.emailOfSelectedRowInEmailFragment);
				this.customerEmailFragment.close();
				this.getView().byId("customerEmailId").setValueState("None");
				this.emailValueState = "none";
			} else if (this.selectedRowInIdFragment) {
				if (this.emailOfSelectedRowInEmailFragment == this.selectedRowInIdFragment.Email) {
					this.getView().byId("customerEmailId").setValue(this.emailOfSelectedRowInEmailFragment);
					this.customerEmailFragment.close();
					this.getView().byId("customerEmailId").setValueState("None");
					this.emailValueState = "none";
				} else {
					this.getView().byId("customerEmailId").setValue("");
					this.customerEmailFragment.close();
					this.getView().byId("customerEmailId").setValueState("Error");
					this.getView().byId("customerEmailId").setValueStateText("Data selected doesn't corresponds with the Id");
					this.emailValueState = "error";
				}
			} else {
				this.getView().byId("customerEmailId").setValue("");
				this.customerEmailFragment.close();
				this.getView().byId("customerEmailId").setValueState("Error");
				this.getView().byId("customerEmailId").setValueStateText("Data selected doesn't corresponds with the Id");
				this.emailValueState = "error";
			}
		},
		selectTableRowInPanFragment: function(oEvent) {
			this.customerId = this.getView().byId("customerId").getValue();
			this.selectedRowInPanFragment = oEvent.getSource().getSelectedItem().getBindingContext("iconTabBarModel").getObject();
			this.panOfSelectedRowInPanFragment = this.selectedRowInPanFragment.PanNo;
			if (this.selectedRowInPanFragment.Id == this.customerId) {
				this.getView().byId("customerPanId").setValue(this.panOfSelectedRowInPanFragment);
				this.customerPanFragment.close();
				this.getView().byId("customerPanId").setValueState("None");
				this.panValueState = "none";
			} else if (this.selectedRowInIdFragment) {
				if (this.panOfSelectedRowInPanFragment == this.selectedRowInIdFragment.PanNo) {
					this.getView().byId("customerPanId").setValue(this.panOfSelectedRowInPanFragment);
					this.customerPanFragment.close();
					this.getView().byId("customerPanId").setValueState("None");
					this.panValueState = "none";
				} else {
					this.getView().byId("customerPanId").setValue("");
					this.customerPanFragment.close();
					this.getView().byId("customerPanId").setValueState("Error");
					this.getView().byId("customerPanId").setValueStateText("Data selected doesn't corresponds with the Id");
					this.panValueState = "error";
				}
			} else {
				this.getView().byId("customerPanId").setValue("");
				this.customerPanFragment.close();
				this.getView().byId("customerPanId").setValueState("Error");
				this.getView().byId("customerPanId").setValueStateText("Data selected doesn't corresponds with the Id");
				this.panValueState = "error";
			}
		},
		selectTableRowInPassportFragment: function(oEvent) {
			this.customerId = this.getView().byId("customerId").getValue();
			this.selectedRowInPassportFragment = oEvent.getSource().getSelectedItem().getBindingContext("iconTabBarModel").getObject();
			this.passportOfSelectedRowInPassportFragment = this.selectedRowInPassportFragment.PassportNo;
			if (this.selectedRowInPassportFragment.Id == this.customerId) {
				this.getView().byId("customerPassportId").setValue(this.passportOfSelectedRowInPassportFragment);
				this.customerPassportFragment.close();
				this.getView().byId("customerPassportId").setValueState("None");
				this.passportValueState = "none";
			} else if (this.selectedRowInIdFragment) {
				if (this.passportOfSelectedRowInPassportFragment == this.selectedRowInIdFragment.PassportNo) {
					this.getView().byId("customerPassportId").setValue(this.passportOfSelectedRowInPassportFragment);
					this.customerPassportFragment.close();
					this.getView().byId("customerPassportId").setValueState("None");
					this.passportValueState = "none";
				} else {
					this.getView().byId("customerPassportId").setValue("");
					this.customerPassportFragment.close();
					this.getView().byId("customerPassportId").setValueState("Error");
					this.getView().byId("customerPassportId").setValueStateText("Data selected doesn't corresponds with the Id");
					this.passportValueState = "error";
				}
			} else {
				this.getView().byId("customerPassportId").setValue("");
				this.customerPassportFragment.close();
				this.getView().byId("customerPassportId").setValueState("Error");
				this.getView().byId("customerPassportId").setValueStateText("Data selected doesn't corresponds with the Id");
				this.passportValueState = "error";
			}
		},
		selectTableRowInMobileFragment: function(oEvent) {
			this.customerId = this.getView().byId("customerId").getValue();
			this.selectedRowInMobileFragment = oEvent.getSource().getSelectedItem().getBindingContext("iconTabBarModel").getObject();
			this.mobileOfSelectedRowInMobileFragment = this.selectedRowInMobileFragment.Mobile;
			if (this.selectedRowInMobileFragment.Id == this.customerId) {
				this.getView().byId("customerMobileId").setValue(this.mobileOfSelectedRowInMobileFragment);
				this.customerMobileFragment.close();
				this.getView().byId("customerMobileId").setValueState("None");
				this.mobileValueState = "none";
			} else if (this.selectedRowInIdFragment) {
				if (this.mobileOfSelectedRowInMobileFragment == this.selectedRowInIdFragment.Mobile) {
					this.getView().byId("customerMobileId").setValue(this.mobileOfSelectedRowInMobileFragment);
					this.customerMobileFragment.close();
					this.getView().byId("customerMobileId").setValueState("None");
					this.mobileValueState = "none";
				} else {
					this.getView().byId("customerMobileId").setValue("");
					this.customerMobileFragment.close();
					this.getView().byId("customerMobileId").setValueState("Error");
					this.getView().byId("customerMobileId").setValueStateText("Data selected doesn't corresponds with the Id");
					this.mobileValueState = "error";
				}
			} else {
				this.getView().byId("customerMobileId").setValue("");
				this.customerMobileFragment.close();
				this.getView().byId("customerMobileId").setValueState("Error");
				this.getView().byId("customerMobileId").setValueStateText("Data selected doesn't corresponds with the Id");
				this.mobileValueState = "error";
			}
		},
		selectTableRowInStateFragment: function(oEvent) {
			debugger;
			this.customerId = this.getView().byId("customerId").getValue();
			this.selectedRowInStateFragment = oEvent.getSource().getSelectedItem().getBindingContext("iconTabBarModel").getObject();
			this.stateOfSelectedRowInStateFragment = this.selectedRowInStateFragment.State;
			if (this.selectedRowInStateFragment.Id == this.customerId) {
				this.getView().byId("customerStateId").setValue(this.stateOfSelectedRowInStateFragment);
				this.customerStateFragment.close();
				this.getView().byId("customerStateId").setValueState("None");
				this.stateValueState = "none";
			} else if (this.selectedRowInIdFragment) {
				if (this.stateOfSelectedRowInStateFragment == this.selectedRowInIdFragment.State) {
					this.getView().byId("customerStateId").setValue(this.stateOfSelectedRowInStateFragment);
					this.customerStateFragment.close();
					this.getView().byId("customerStateId").setValueState("None");
					this.stateValueState = "none";
				} else {
					this.getView().byId("customerStateId").setValue("");
					this.customerStateFragment.close();
					this.getView().byId("customerStateId").setValueState("Error");
					this.getView().byId("customerStateId").setValueStateText("Data selected doesn't corresponds with the Id");
					this.stateValueState = "error";
				}
			} else {
				this.getView().byId("customerStateId").setValue("");
				this.customerStateFragment.close();
				this.getView().byId("customerStateId").setValueState("Error");
				this.getView().byId("customerStateId").setValueStateText("Data selected doesn't corresponds with the Id");
				this.stateValueState = "error";
			}
		},
		selectTableRowInCityFragment: function(oEvent) {
			this.customerId = this.getView().byId("customerId").getValue();
			this.selectedRowInCityFragment = oEvent.getSource().getSelectedItem().getBindingContext("iconTabBarModel").getObject();
			this.cityOfSelectedRowInCityFragment = this.selectedRowInCityFragment.City;
			if (this.selectedRowInCityFragment.Id == this.customerId) {
				this.getView().byId("customerCityId").setValue(this.cityOfSelectedRowInCityFragment);
				this.customerCityFragment.close();
				this.getView().byId("customerCityId").setValueState("None");
				this.cityValueState = "none";
			} else if (this.selectedRowInIdFragment) {
				if (this.cityOfSelectedRowInCityFragment == this.selectedRowInIdFragment.City) {
					this.getView().byId("customerCityId").setValue(this.cityOfSelectedRowInCityFragment);
					this.customerCityFragment.close();
					this.getView().byId("customerCityId").setValueState("None");
					this.cityValueState = "none";
				} else {
					this.getView().byId("customerCityId").setValue("");
					this.customerCityFragment.close();
					this.getView().byId("customerCityId").setValueState("Error");
					this.getView().byId("customerCityId").setValueStateText("Data selected doesn't corresponds with the Id");
					this.cityValueState = "error";
				}
			} else {
				this.getView().byId("customerCityId").setValue("");
				this.customerCityFragment.close();
				this.getView().byId("customerCityId").setValueState("Error");
				this.getView().byId("customerCityId").setValueStateText("Data selected doesn't corresponds with the Id");
				this.cityValueState = "error";
			}
		},
		_OnChangeValidateCustomerId: function() {
			debugger;
			var oModel = this.getOwnerComponent().getModel("iconTabBarModel");
			var fragmentTableArray = oModel.getData().FragmentTableData;
			this.customerId = this.getView().byId("customerId").getValue().toUpperCase();
			this.customerName = this.getView().byId("customerNameId").getValue();
			this.customerEmail = this.getView().byId("customerEmailId").getValue();
			this.customerPan = this.getView().byId("customerPanId").getValue();
			this.customerPassport = this.getView().byId("customerPassportId").getValue();
			this.customerCity = this.getView().byId("customerCityId").getValue();
			this.customerState = this.getView().byId("customerStateId").getValue();
			this.customerMobile = this.getView().byId("customerMobileId").getValue();

			if (this.customerId == "") {
				//removes selection from table when input field is cleared
				this.customerIdFragmentTable = sap.ui.getCore().byId("customerIdFragmentTableId");
				this.customerIdFragmentTable.removeSelections(true);
			} else {
				//compare id with rest of data
				for (var i = 0; i < fragmentTableArray.length; i++) {
					if (this.customerId == fragmentTableArray[i].Id) {
						this.idPresentInArray = true;
						this.nameOfEnteredId = fragmentTableArray[i].Name;
						this.emailOfEnteredId = fragmentTableArray[i].Email;
						this.panOfEnteredId = fragmentTableArray[i].PanNo;
						this.passportOfEnteredId = fragmentTableArray[i].PassportNo;
						this.mobileOfEnteredId = fragmentTableArray[i].Mobile;
						this.cityOfEnteredId = fragmentTableArray[i].City;
						this.stateOfEnteredId = fragmentTableArray[i].State;
						break;
					} else {
						this.idPresentInArray = false;
					}
				}
				if (this.idPresentInArray == true) {
					this.getView().byId("customerId").setValue(fragmentTableArray[i].Id);
					this.getView().byId("customerId").setValueState("None");
					this.idValueState = "none";
					//name
					if (this.customerName == "") {
						this.getView().byId("customerNameId").setValueState("None");
						this.nameValueState = "none";
					} else if (this.customerName !== "" && this.nameOfEnteredId.toLowerCase() == this.customerName.toLowerCase()) {
						this.getView().byId("customerNameId").setValue(fragmentTableArray[i].Name);
						this.getView().byId("customerNameId").setValueState("None");
						this.nameValueState = "none";
					} else {
						this.getView().byId("customerNameId").setValueState("Error");
						this.nameValueState = "error";
					}
					//email
					if (this.customerEmail == "") {
						this.getView().byId("customerEmailId").setValueState("None");
						this.emailValueState = "none";
					} else if (this.customerEmail !== "" && this.emailOfEnteredId.toLowerCase() == this.customerEmail) {
						this.getView().byId("customerEmailId").setValue(fragmentTableArray[i].Email);
						this.getView().byId("customerEmailId").setValueState("None");
						this.emailValueState = "none";
					} else {
						this.getView().byId("customerEmailId").setValueState("Error");
						this.emailValueState = "error";
					}
					//pan
					if (this.customerPan == "") {
						this.getView().byId("customerPanId").setValueState("None");
						this.panValueState = "none";
					} else if (this.customerPan !== "" && this.panOfEnteredId.toLowerCase() == this.customerPan.toLowerCase()) {
						this.getView().byId("customerPanId").setValue(fragmentTableArray[i].PanNo);
						this.getView().byId("customerPanId").setValueState("None");
						this.panValueState = "none";
					} else {
						this.getView().byId("customerPanId").setValueState("Error");
						this.panValueState = "error";
					}
					//passport
					if (this.customerPassport == "") {
						this.getView().byId("customerPassportId").setValueState("None");
						this.passportValueState = "none";
					} else if (this.customerPassport !== "" && this.passportOfEnteredId.toLowerCase() == this.customerPassport.toLowerCase()) {
						this.getView().byId("customerPassportId").setValue(fragmentTableArray[i].PassportNo);
						this.getView().byId("customerPassportId").setValueState("None");
						this.passportValueState = "none";
					} else {
						this.getView().byId("customerPassportId").setValueState("Error");
						this.passportValueState = "error";
					}
					//mobile
					if (this.customerMobile == "") {
						this.getView().byId("customerMobileId").setValueState("None");
						this.mobileValueState = "none";
					} else if (this.customerMobile !== "" && this.mobileOfEnteredId == this.customerMobile) {
						this.getView().byId("customerMobileId").setValue(fragmentTableArray[i].Mobile);
						this.getView().byId("customerMobileId").setValueState("None");
						this.mobileValueState = "none";
					} else {
						this.getView().byId("customerMobileId").setValueState("Error");
						this.mobileValueState = "error";
					}
					//city
					if (this.customerCity == "") {
						this.getView().byId("customerCityId").setValueState("None");
						this.cityValueState = "none";
					} else if (this.customerCity !== "" && this.cityOfEnteredId.toLowerCase() == this.customerCity.toLowerCase()) {
						this.getView().byId("customerCityId").setValue(fragmentTableArray[i].City);
						this.getView().byId("customerCityId").setValueState("None");
						this.cityValueState = "none";
					} else {
						this.getView().byId("customerCityId").setValueState("Error");
						this.cityValueState = "error";
					}
					//state
					if (this.customerState == "") {
						this.getView().byId("customerStateId").setValueState("None");
						this.stateValueState = "none";
					} else if (this.customerState !== "" && this.stateOfEnteredId.toLowerCase() == this.customerState.toLowerCase()) {
						this.getView().byId("customerStateId").setValue(fragmentTableArray[i].State);
						this.getView().byId("customerStateId").setValueState("None");
						this.stateValueState = "none";
					} else {
						this.getView().byId("customerStateId").setValueState("Error");
						this.stateValueState = "error";
					}
				} else {
					this.getView().byId("customerId").setValueState("Error");
					this.getView().byId("customerId").setValueStateText("Id entered doesnot match with valid data");
					this.idValueState = "error";
				}
			}
		},
		_OnChangeValidateCustomerName: function() {
			debugger;
			var oModel = this.getOwnerComponent().getModel("iconTabBarModel");
			var fragmentTableArray = oModel.getData().FragmentTableData;
			this.customerName = this.getView().byId("customerNameId").getValue();
			this.customerId = this.getView().byId("customerId").getValue();
			if (this.customerName == "") {
				//removes selection from table when input field is cleared
				this.customerNameFragmentTable = sap.ui.getCore().byId("customerNameFragmentTableId");
				this.customerNameFragmentTable.removeSelections(true);
			} else {
				//compare id with rest of data
				for (var i = 0; i < fragmentTableArray.length; i++) {
					if (this.customerName.toLowerCase() == fragmentTableArray[i].Name.toLowerCase()) {
						this.namePresentInArray = true;
						this.idOfEnteredName = fragmentTableArray[i].Id;
						break;
					} else {
						this.namePresentInArray = false;
					}
				}
				if (this.namePresentInArray == true && this.idOfEnteredName.toLowerCase() == this.customerId.toLowerCase()) {
					this.getView().byId("customerNameId").setValue(fragmentTableArray[i].Name);
					this.getView().byId("customerNameId").setValueState("None");
					this.nameValueState = "none";
				} else {
					this.getView().byId("customerNameId").setValueState("Error");
					this.nameValueState = "error";
					this.getView().byId("customerNameId").setValueStateText("Name entered doesnot match with valid data");
				}
			}
		},
		_OnChangeValidateCustomerEmail: function() {
			debugger;
			var oModel = this.getOwnerComponent().getModel("iconTabBarModel");
			var fragmentTableArray = oModel.getData().FragmentTableData;
			this.customerEmail = this.getView().byId("customerEmailId").getValue();
			if (this.customerEmail == "") {
				//removes selection from table when input field is cleared
				this.customerEmailFragmentTable = sap.ui.getCore().byId("customerEmailFragmentTableId");
				this.customerEmailFragmentTable.removeSelections(true);
			} else {
				//compare id with rest of data
				for (var i = 0; i < fragmentTableArray.length; i++) {
					if (this.customerEmail.toLowerCase() == fragmentTableArray[i].Email.toLowerCase()) {
						this.emailPresentInArray = true;
						this.idOfEnteredEmail = fragmentTableArray[i].Id;
						break;
					} else {
						this.emailPresentInArray = false;
					}
				}
				if (this.emailPresentInArray == true && (this.idOfEnteredName == this.customerId)) {
					this.getView().byId("customerEmailId").setValue(fragmentTableArray[i].Email);
					this.getView().byId("customerEmailId").setValueState("None");
					this.emailValueState = "none";
				} else {
					this.getView().byId("customerEmailId").setValueState("Error");
					this.getView().byId("customerEmailId").setValueStateText("Email entered doesnot match with valid data");
					this.emailValueState = "error";
				}
			}
		},
		_OnChangeValidateCustomerPan: function() {
			debugger;
			var oModel = this.getOwnerComponent().getModel("iconTabBarModel");
			var fragmentTableArray = oModel.getData().FragmentTableData;
			this.customerPan = this.getView().byId("customerPanId").getValue();
			if (this.customerPan == "") {
				//removes selection from table when input field is cleared
				this.customerPanFragmentTable = sap.ui.getCore().byId("customerPanFragmentTableId");
				this.customerPanFragmentTable.removeSelections(true);
			} else {
				//compare id with rest of data
				for (var i = 0; i < fragmentTableArray.length; i++) {
					if (this.customerPan.toUpperCase() == fragmentTableArray[i].PanNo) {
						this.idOfEnteredPan = fragmentTableArray[i].Id;
						this.panPresentInArray = true;
						break;
					} else {
						this.panPresentInArray = false;
					}
				}
				if (this.panPresentInArray == true && (this.idOfEnteredName == this.customerId)) {
					this.getView().byId("customerPanId").setValue(fragmentTableArray[i].PanNo);
					this.getView().byId("customerPanId").setValueState("None");
					this.panValueState = "none";
				} else {
					this.getView().byId("customerPanId").setValueState("Error");
					this.getView().byId("customerPanId").setValueStateText("PAN Number entered doesnot match with valid data");
					this.panValueState = "error";
				}
			}
		},
		_OnChangeValidateCustomerPassport: function() {
			debugger;
			var oModel = this.getOwnerComponent().getModel("iconTabBarModel");
			var fragmentTableArray = oModel.getData().FragmentTableData;
			this.customerPassport = this.getView().byId("customerPassportId").getValue();
			if (this.customerPassport == "") {
				//removes selection from table when input field is cleared
				this.customerPassportFragmentTable = sap.ui.getCore().byId("customerPassportFragmentTableId");
				this.customerPassportFragmentTable.removeSelections(true);
			} else {
				//compare id with rest of data
				for (var i = 0; i < fragmentTableArray.length; i++) {
					if (this.customerPassport.toUpperCase() == fragmentTableArray[i].PassportNo) {
						this.passportPresentInArray = true;
						this.idOfEnteredPassport = fragmentTableArray[i].Id;
						break;
					} else {
						this.passportPresentInArray = false;
					}
				}
				if (this.passportPresentInArray == true) {
					this.getView().byId("customerPassportId").setValue(fragmentTableArray[i].PassportNo);
					this.getView().byId("customerPassportId").setValueState("None");
					this.passportValueState = "none";
				} else {
					this.getView().byId("customerPassportId").setValueState("Error");
					this.getView().byId("customerPassportId").setValueStateText("Passport Number entered doesnot match with valid data");
					this.passportValueState = "error";
				}
			}
		},
		_OnChangeValidateCustomerMobile: function() {
			debugger;
			var oModel = this.getOwnerComponent().getModel("iconTabBarModel");
			var fragmentTableArray = oModel.getData().FragmentTableData;
			this.customerMobile = this.getView().byId("customerMobileId").getValue();
			if (this.customerMobile == "") {
				//removes selection from table when input field is cleared
				this.customerMobileFragmentTable = sap.ui.getCore().byId("customerMobileFragmentTableId");
				this.customerMobileFragmentTable.removeSelections(true);
			} else {
				//compare id with rest of data
				for (var i = 0; i < fragmentTableArray.length; i++) {
					if (this.customerMobile == fragmentTableArray[i].Mobile) {
						this.mobilePresentInArray = true;
						this.idOfEnteredMobile = fragmentTableArray[i].Id;
						break;
					} else {
						this.mobilePresentInArray = false;
					}
				}
				if (this.mobilePresentInArray == true) {
					this.getView().byId("customerMobileId").setValue(fragmentTableArray[i].Mobile);
					this.getView().byId("customerMobileId").setValueState("None");
					this.mobileValueState = "none";
				} else {
					this.getView().byId("customerMobileId").setValueState("Error");
					this.getView().byId("customerMobileId").setValueStateText("Mobile Number entered doesnot match with valid data");
					this.mobileValueState = "error";
				}
			}
		},
		_OnChangeValidateCustomerCity: function() {
			debugger;
			var oModel = this.getOwnerComponent().getModel("iconTabBarModel");
			var fragmentTableArray = oModel.getData().FragmentTableData;
			this.customerCity = this.getView().byId("customerCityId").getValue();
			if (this.customerCity == "") {
				//removes selection from table when input field is cleared
				this.customerCityFragmentTable = sap.ui.getCore().byId("customerCityFragmentTableId");
				this.customerCityFragmentTable.removeSelections(true);
			} else {
				//compare id with rest of data
				for (var i = 0; i < fragmentTableArray.length; i++) {
					if (this.customerCity.toLowerCase() == fragmentTableArray[i].City.toLowerCase()) {
						this.cityPresentInArray = true;
						this.idOfEnteredCity = fragmentTableArray[i].Id;
						break;
					} else {
						this.cityPresentInArray = false;
					}
				}
				if (this.cityPresentInArray == true) {
					this.getView().byId("customerCityId").setValue(fragmentTableArray[i].City);
					this.getView().byId("customerCityId").setValueState("None");
					this.cityValueState = "none";
				} else {
					this.getView().byId("customerCityId").setValueState("Error");
					this.getView().byId("customerCityId").setValueStateText("City value entered doesnot match with valid data");
					this.cityValueState = "error";
				}
			}
		},
		_OnChangeValidateCustomerState: function() {
			debugger;
			var oModel = this.getOwnerComponent().getModel("iconTabBarModel");
			var fragmentTableArray = oModel.getData().FragmentTableData;
			this.customerState = this.getView().byId("customerStateId").getValue();
			if (this.customerState == "") {
				//removes selection from table when input field is cleared
				this.customerStateFragmentTable = sap.ui.getCore().byId("customerStateFragmentTableId");
				this.customerStateFragmentTable.removeSelections(true);
			} else {
				//compare id with rest of data
				for (var i = 0; i < fragmentTableArray.length; i++) {
					if (this.customerState.toLowerCase() == fragmentTableArray[i].State.toLowerCase()) {
						this.statePresentInArray = true;
						this.idOfEnteredState = fragmentTableArray[i].Id;
						break;
					} else {
						this.statePresentInArray = false;
					}
				}
				if (this.statePresentInArray == true) {
					this.getView().byId("customerStateId").setValue(fragmentTableArray[i].State);
					this.getView().byId("customerStateId").setValueState("None");
					this.stateValueState = "none";
				} else {
					this.getView().byId("customerStateId").setValueState("Error");
					this.getView().byId("customerStateId").setValueStateText("State entered doesnot match with valid data");
					this.stateValueState = "error";
				}
			}
		},

		_OnPressSubmitCustomerDetailsInObjectHeader: function() {
			this.customerIdValue = this.getView().byId("customerId").getValue();
			this.customerNameValue = this.getView().byId("customerNameId").getValue();
			this.customerEmailValue = this.getView().byId("customerEmailId").getValue();
			this.customerPanValue = this.getView().byId("customerPanId").getValue();
			this.customerPassportValue = this.getView().byId("customerPassportId").getValue();
			this.customerMobileValue = this.getView().byId("customerMobileId").getValue();
			this.customerCityValue = this.getView().byId("customerCityId").getValue();
			this.customerStateValue = this.getView().byId("customerStateId").getValue();
			if (this.customerIdValue == "") {
				this.getView().byId("customerId").setValueState("Error");
				this.getView().byId("customerId").setValueStateText("Id cannot be empty");
				// this.idValueState = "none";
			} else {
				this.getView().byId("customerId").setValueState("None");
				// this.idValueState = "error";
			}
			if (this.customerNameValue == "") {
				this.getView().byId("customerNameId").setValueState("Error");
				this.getView().byId("customerNameId").setValueStateText("Name cannot be empty");
				// this.nameValueState = "none";
			}
			// else {
			// 	this.getView().byId("customerNameId").setValueState("None");
			// 	// this.nameValueState = "error";
			// }
			if (this.customerEmailValue == "") {
				this.getView().byId("customerEmailId").setValueState("Error");
				this.getView().byId("customerEmailId").setValueStateText("Email cannot be empty");
				// this.emailValueState = "none";
			}
			// else {
			// 	this.getView().byId("customerEmailId").setValueState("None");

			// 	// this.emailValueState = "error";
			// }
			if (this.customerPanValue == "") {
				this.getView().byId("customerPanId").setValueState("Error");
				this.getView().byId("customerPanId").setValueStateText("Pan cannot be empty");
				// this.panValueState = "none";
			}
			// else {
			// 	this.getView().byId("customerPanId").setValueState("None");

			// 	// this.panValueState = "error";
			// }
			if (this.customerPassportValue == "") {
				this.getView().byId("customerPassportId").setValueState("Error");
				this.getView().byId("customerPassportId").setValueStateText("Passport cannot be empty");

				// this.passportValueState = "none";
			}
			// else {
			// 	this.getView().byId("customerPassportId").setValueState("None");
			// 	// this.passportValueState = "error";
			// }
			if (this.customerMobileValue == "") {
				this.getView().byId("customerMobileId").setValueState("Error");
				this.getView().byId("customerMobileId").setValueStateText("Mobile cannot be empty");
				// this.mobileValueState = "none";
			}
			// else {
			// 	this.getView().byId("customerMobileId").setValueState("None");
			// 	// this.mobileValueState = "error";
			// }
			if (this.customerCityValue == "") {
				this.getView().byId("customerCityId").setValueState("Error");
				this.getView().byId("customerCityId").setValueStateText("City cannot be empty");
				// this.cityValueState = "none";
			}
			// else {
			// 	this.getView().byId("customerCityId").setValueState("None");

			// 	// this.cityValueState = "error";
			// }
			if (this.customerStateValue == "") {
				this.getView().byId("customerStateId").setValueState("Error");
				this.getView().byId("customerStateId").setValueStateText("State cannot be empty");
				// this.stateValueState = "none";
			}
			// else {
			// 	this.getView().byId("customerStateId").setValueState("None");
			// 	// this.stateValueState = "error";
			// }
			if (this.customerIdValue == "" || this.customerNameValue == "" || this.customerEmailValue == "" || this.customerPanValue == "" ||
				this.customerPassportValue == "" || this.customerMobileValue == "" || this.customerCityValue == "" || this.customerStateValue ==
				"") {
				MessageBox.error("Fill All Mandatory fields");
			} else if (this.nameValueState == "none" && this.emailValueState == "none" && this.panValueState == "none" && this.passportValueState ==
				"none" &&
				this.mobileValueState == "none" && this.cityValueState == "none" && this.stateValueState == "none") {
				debugger;
				var oModel = this.getOwnerComponent().getModel("iconTabBarModel");
				var customerDataArray = oModel.getData().CustomerData;
				var duplicateCustomer;
				//submitting not 1st time
				if (customerDataArray.length >= 1) {
					for (var i = 0; i < customerDataArray.length; i++) {
						if (customerDataArray[i].Id == this.customerIdValue) {
							duplicateCustomer = true;
							break;
						} else {
							duplicateCustomer = false;
						}
					}
					if (duplicateCustomer == true) {
						MessageBox.information("Customer Data already exists");
						this.getView().byId("customerId").setValueState("Error");
						this.getView().byId("customerId").setValueStateText("Id already exists");
					} else {
						var CustomerPayload = {
							"Id": this.customerIdValue,
							"Name": this.customerNameValue,
							"Email": this.customerEmailValue,
							"PanNo": this.customerPanValue,
							"PassportNo": this.customerPassportValue,
							"Mobile": this.customerMobileValue,
							"City": this.customerCityValue,
							"State": this.customerStateValue,
						};
						var oModel = this.getOwnerComponent().getModel("iconTabBarModel");
						oModel.getData().CustomerData.push(CustomerPayload);
						oModel.refresh(true);
						MessageBox.success("Customer Details added successfully");
						this.getView().byId("customerId").setValue("");
						this.getView().byId("customerNameId").setValue("");
						this.getView().byId("customerEmailId").setValue("");
						this.getView().byId("customerPanId").setValue("");
						this.getView().byId("customerPassportId").setValue("");
						this.getView().byId("customerMobileId").setValue("");
						this.getView().byId("customerCityId").setValue("");
						this.getView().byId("customerStateId").setValue("");

						// opens IconTabFilter4
						var objectHeaderICF = this.getView().byId("iconTabBarId");
						objectHeaderICF.setSelectedKey("tab4");

						debugger;
						sap.ui.getCore().byId("customerIdFragmentTableId").removeSelections(true);
						sap.ui.getCore().byId("customerNameFragmentTableId").removeSelections(true);
						sap.ui.getCore().byId("customerEmailFragmentTableId").removeSelections(true);
						sap.ui.getCore().byId("customerPanFragmentTableId").removeSelections(true);
						sap.ui.getCore().byId("customerPassportFragmentTableId").removeSelections(true);
						sap.ui.getCore().byId("customerMobileFragmentTableId").removeSelections(true);
						sap.ui.getCore().byId("customerCityFragmentTableId").removeSelections(true);
						sap.ui.getCore().byId("customerStateFragmentTableId").removeSelections(true);
						//counts total items by calling function
						this.calculateCustomListItemCount();
						this.calculateHistoryTableItemCount();
					}
				} else {
					var CustomerPayload = {
						"Id": this.customerIdValue,
						"Name": this.customerNameValue,
						"Email": this.customerEmailValue,
						"PanNo": this.customerPanValue,
						"PassportNo": this.customerPassportValue,
						"Mobile": this.customerMobileValue,
						"City": this.customerCityValue,
						"State": this.customerStateValue,
					};
					var oModel = this.getOwnerComponent().getModel("iconTabBarModel");
					oModel.getData().CustomerData.push(CustomerPayload);
					oModel.refresh(true);
					MessageBox.success("Customer Details added successfully");
					this.getView().byId("customerId").setValue("");
					this.getView().byId("customerNameId").setValue("");
					this.getView().byId("customerEmailId").setValue("");
					this.getView().byId("customerPanId").setValue("");
					this.getView().byId("customerPassportId").setValue("");
					this.getView().byId("customerMobileId").setValue("");
					this.getView().byId("customerCityId").setValue("");
					this.getView().byId("customerStateId").setValue("");

					sap.ui.getCore().byId("customerIdFragmentTableId").removeSelections(true);
					sap.ui.getCore().byId("customerNameFragmentTableId").removeSelections(true);
					sap.ui.getCore().byId("customerEmailFragmentTableId").removeSelections(true);
					sap.ui.getCore().byId("customerPanFragmentTableId").removeSelections(true);
					sap.ui.getCore().byId("customerPassportFragmentTableId").removeSelections(true);
					sap.ui.getCore().byId("customerMobileFragmentTableId").removeSelections(true);
					sap.ui.getCore().byId("customerCityFragmentTableId").removeSelections(true);
					sap.ui.getCore().byId("customerStateFragmentTableId").removeSelections(true);

					// opens IconTabFilter4
					var objectHeaderICF = this.getView().byId("iconTabBarId");
					objectHeaderICF.setSelectedKey("tab4");

					//counts total items by calling function
					this.calculateCustomListItemCount();
					this.calculateHistoryTableItemCount();
				}

			} else {
				MessageBox.information("Recheck your Data");

			}

		},
		//form2 SUBMIT
		_OnInputValidateName: function() {
			var regExpName = /^[A-Za-z\s]+$/;
			var passengerName = this.getView().byId("passengerNameId").getValue().trim();

			if (passengerName.match(regExpName)) {
				this.getView().byId("passengerNameId").setValueState("None");
			} else {
				this.getView().byId("passengerNameId").setValueState("Error");
				this.getView().byId("passengerNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
		},
		_OnInputValidateFrom: function() {
			var regExpFrom = /^[A-Za-z\s]+$/;
			var passengerFrom = this.getView().byId("passengerFlyingFromId").getValue().trim();

			if (passengerFrom.match(regExpFrom)) {
				this.getView().byId("passengerFlyingFromId").setValueState("None");
			} else {
				this.getView().byId("passengerFlyingFromId").setValueState("Error");
				this.getView().byId("passengerFlyingFromId").setValueStateText("From place cannot contain numbers and special characters");
			}
		},
		_OnInputValidateTo: function() {
			var regExpTo = /^[A-Za-z\s]+$/;
			var passengerTo = this.getView().byId("passengerFlyingToId").getValue();

			if (passengerTo.match(regExpTo)) {
				this.getView().byId("passengerFlyingToId").setValueState("None");
			} else {
				this.getView().byId("passengerFlyingToId").setValueState("Error");
				this.getView().byId("passengerFlyingToId").setValueStateText("To place cannot contain numbers and special characters");
			}
		},
		_OnInputValidateDepartureDate: function() {
			debugger;
			var passengerDepartureDate = this.getView().byId("passengerDepartureDateId").getValue();
			var passengerArrivalDate = this.getView().byId("passengerArrivalDateId").getValue();
			this.setMinArrivalDateInCalendar();

			if (passengerArrivalDate !== "") {
				if (passengerDepartureDate !== "" && passengerDepartureDate <= passengerArrivalDate) {
					this.getView().byId("passengerDepartureDateId").setValueState("None");
				} else {
					this.getView().byId("passengerDepartureDateId").setValueState("Error");
					this.getView().byId("passengerDepartureDateId").setValueStateText("Departure Date cannot be in future of arrival date");
				}
			}

		},
		setMinArrivalDateInCalendar: function() {
			var passengerDepartureDate = this.getView().byId("passengerDepartureDateId").getValue();
			var oArrivalDatePicker = this.getView().byId("passengerArrivalDateId");
			var departureDateArray = passengerDepartureDate.split(".");
			var departureDay = passengerDepartureDate.split(".").splice(0, 1);
			var departureMonth = passengerDepartureDate.split(".").splice(1, 1);
			var departureYear = passengerDepartureDate.split(".").splice(2, 1);
			var passengerDepartureDateObject = new Date(departureYear, departureMonth - 1, departureDay);
			oArrivalDatePicker.setMinDate(passengerDepartureDateObject);

		},
		setMaxDepartureDateInCalendar: function() {
			var passengerArrivalDate = this.getView().byId("passengerArrivalDateId").getValue();
			var oDepartureDatePicker = this.getView().byId("passengerDepartureDateId");
			var arrivalDateArray = passengerArrivalDate.split(".");
			var arrivalDay = passengerArrivalDate.split(".").splice(0, 1);
			var arrivalMonth = passengerArrivalDate.split(".").splice(1, 1);
			var arrivalYear = passengerArrivalDate.split(".").splice(2, 1);
			var passengerArrivalDateObject = new Date(arrivalYear, arrivalMonth - 1, arrivalDay);
			oDepartureDatePicker.setMaxDate(passengerArrivalDateObject);
		},
		_OnInputValidateArrivalDate: function() {
			var passengerDepartureDate = this.getView().byId("passengerDepartureDateId").getValue();
			var passengerArrivalDate = this.getView().byId("passengerArrivalDateId").getValue();
			this.setMaxDepartureDateInCalendar();
			if (passengerDepartureDate !== "") {
				if (passengerArrivalDate !== "" && passengerDepartureDate <= passengerArrivalDate) {
					this.getView().byId("passengerArrivalDateId").setValueState("None");
				} else {
					this.getView().byId("passengerArrivalDateId").setValueState("Error");
					this.getView().byId("passengerArrivalDateId").setValueStateText("Departure Date cannot be in future of arrival date");
				}
			}

		},
		_OnInputValidatePassportNumber: function() {
			var regExpPassport = "^[A-PR-WY-Z][1-9]\\d\\s?\\d{4}[1-9]$";
			var passengerPassportNumber = this.getView().byId("passengerPassportNumberId").getValue();

			if (passengerPassportNumber.match(regExpPassport)) {
				this.getView().byId("passengerPassportNumberId").setValueState("None");
			} else {
				this.getView().byId("passengerPassportNumberId").setValueState("Error");
				this.getView().byId("passengerPassportNumberId").setValueStateText("");
			}
		},
		_OnInputValidateSeatNumber: function() {
			var regExpSeat = /^[0-9]{2}$/;
			var passengerSeatNumber = this.getView().byId("passengerSeatNumberId").getValue();

			if (passengerSeatNumber.match(regExpSeat)) {
				this.getView().byId("passengerSeatNumberId").setValueState("None");
			} else {
				this.getView().byId("passengerSeatNumberId").setValueState("Error");
				this.getView().byId("passengerSeatNumberId").setValueStateText("");
			}
		},
		_OnInputValidateAirline: function() {
			var regExpAirline = /^[A-Za-z\s]+$/;
			var passengerAirline = this.getView().byId("passengerAirlineId").getValue();
			if (passengerAirline.match(regExpAirline)) {
				this.getView().byId("passengerAirlineId").setValueState("None");
			} else {
				this.getView().byId("passengerAirlineId").setValueState("Error");
				this.getView().byId("passengerAirlineId").setValueStateText("");
			}
		},
		_OnPressSubmitDisplayDetailsAsCustomList: function() {
			this.setMinArrivalDateInCalendar();

			var regExpName = /^[A-Za-z\s]+$/;
			var regExpPassport = "^[A-PR-WY-Z][1-9]\\d\\s?\\d{4}[1-9]$";
			var regExpSeat = /^[0-9]{2}$/;

			var passengerId = this.getView().byId("passengerId").getValue();
			var passengerName = this.getView().byId("passengerNameId").getValue();
			var passengerFrom = this.getView().byId("passengerFlyingFromId").getValue();
			var passengerTo = this.getView().byId("passengerFlyingToId").getValue();
			var passengerDepartureDate = this.getView().byId("passengerDepartureDateId").getValue();
			var passengerArrivalDate = this.getView().byId("passengerArrivalDateId").getValue();
			var passengerPassportNumber = this.getView().byId("passengerPassportNumberId").getValue();
			var passengerSeatNumber = this.getView().byId("passengerSeatNumberId").getValue();
			var passengerAirline = this.getView().byId("passengerAirlineId").getValue();

			if (passengerName.match(regExpName)) {
				this.getView().byId("passengerNameId").setValueState("None");
			} else {
				this.getView().byId("passengerNameId").setValueState("Error");
				this.getView().byId("passengerNameId").setValueStateText("Name cannot contain numbers and special characters");
			}
			if (passengerFrom.match(regExpName)) {
				this.getView().byId("passengerFlyingFromId").setValueState("None");
			} else {
				this.getView().byId("passengerFlyingFromId").setValueState("Error");
				this.getView().byId("passengerFlyingFromId").setValueStateText("From place cannot contain numbers and special characters");
			}
			if (passengerTo.match(regExpName)) {
				this.getView().byId("passengerFlyingToId").setValueState("None");
			} else {
				this.getView().byId("passengerFlyingToId").setValueState("Error");
				this.getView().byId("passengerFlyingToId").setValueStateText("To place cannot contain numbers and special characters");
			}
			if (passengerDepartureDate !== "") {
				this.getView().byId("passengerDepartureDateId").setValueState("None");
			} else {
				this.getView().byId("passengerDepartureDateId").setValueState("Error");
				this.getView().byId("passengerDepartureDateId").setValueStateText("");
			}
			if (passengerArrivalDate !== "") {
				this.getView().byId("passengerArrivalDateId").setValueState("None");
			} else {
				this.getView().byId("passengerArrivalDateId").setValueState("Error");
				this.getView().byId("passengerArrivalDateId").setValueStateText("");
			}
			if (passengerPassportNumber.match(regExpPassport)) {
				this.getView().byId("passengerPassportNumberId").setValueState("None");
			} else {
				this.getView().byId("passengerPassportNumberId").setValueState("Error");
				this.getView().byId("passengerPassportNumberId").setValueStateText("");
			}
			if (passengerSeatNumber.match(regExpSeat)) {
				this.getView().byId("passengerSeatNumberId").setValueState("None");
			} else {
				this.getView().byId("passengerSeatNumberId").setValueState("Error");
				this.getView().byId("passengerSeatNumberId").setValueStateText("");
			}
			if (passengerAirline.match(regExpName)) {
				this.getView().byId("passengerAirlineId").setValueState("None");
			} else {
				this.getView().byId("passengerAirlineId").setValueState("Error");
				this.getView().byId("passengerAirlineId").setValueStateText("");
			}
			if (passengerName === "" || passengerFrom === "" || passengerTo === "" || passengerDepartureDate === "" || passengerArrivalDate ===
				"" ||
				passengerPassportNumber === "" || passengerSeatNumber === "" || passengerAirline === "") {
				MessageBox.error("Fill All mandatory fields");
			} else if (passengerId !== "" && passengerName.match(regExpName) && passengerFrom.match(regExpName) && passengerTo.match(regExpName) &&
				passengerPassportNumber.match(regExpPassport) && passengerSeatNumber.match(regExpSeat) && passengerAirline.match(regExpName)) {
				//finding duplicate
				var oModel = this.getOwnerComponent().getModel("iconTabBarModel");
				var PassengerDataArray = oModel.getData().PassengerData;
				var duplicate;
				//if EDA has data(Submitting not for first time)
				if (PassengerDataArray.length >= 1) {
					for (var i = 0; i < PassengerDataArray.length; i++) {
						if (PassengerDataArray[i].Id == passengerId || PassengerDataArray[i].PassportNumber == passengerPassportNumber ||
							PassengerDataArray[i].SeatNumber == passengerSeatNumber) {
							duplicate = true;
							break;
						} else {
							duplicate = false;
						}
					}
					if (duplicate == true) {
						MessageBox.information("Passenger Data already exists!");
						this.getView().byId("passengerId").setValueState("Error");
						this.getView().byId("passengerId").setValueStateText("ReVerify Id");
						this.getView().byId("passengerPassportNumberId").setValueState("Error");
						this.getView().byId("passengerPassportNumberId").setValueStateText("ReVerify Passport");
						this.getView().byId("passengerSeatNumberId").setValueState("Error");
						this.getView().byId("passengerSeatNumberId").setValueStateText("ReVerify Seat No");
						// break;
					} else {
						var PassengerPayload = {
							"Id": passengerId,
							"Name": passengerName,
							"From": passengerFrom,
							"To": passengerTo,
							"DepartureDate": passengerDepartureDate,
							"ArrivalDate": passengerArrivalDate,
							"PassportNumber": passengerPassportNumber,
							"SeatNumber": passengerSeatNumber,
							"Airlines": passengerAirline
						};
						var oModel = this.getOwnerComponent().getModel("iconTabBarModel");
						oModel.getData().PassengerData.push(PassengerPayload);
						oModel.refresh(true);
						MessageBox.success("Passenger Details added successfully");
						this.getView().byId("passengerId").setValue("");
						this.getView().byId("passengerNameId").setValue("");
						this.getView().byId("passengerFlyingFromId").setValue("");
						this.getView().byId("passengerFlyingToId").setValue("");
						this.getView().byId("passengerDepartureDateId").setValue("");
						this.getView().byId("passengerArrivalDateId").setValue("");
						this.getView().byId("passengerPassportNumberId").setValue("");
						this.getView().byId("passengerSeatNumberId").setValue("");
						this.getView().byId("passengerAirlineId").setValue("");

						var iconTabFilterCustomListItem = this.getView().byId("iconTabBarId");
						iconTabFilterCustomListItem.setSelectedKey("tab3");
						debugger;
						//counts total items by calling function
						this.calculateCustomListItemCount();
						this.calculateHistoryTableItemCount();
						// this.count = oModel.getData().PassengerData.length;
						// this.getView().byId("flightTravelListIconTabFilterId").setCount(this.count);
					}
				} else {
					var PassengerPayload = {
						"Id": passengerId,
						"Name": passengerName,
						"From": passengerFrom,
						"To": passengerTo,
						"DepartureDate": passengerDepartureDate,
						"ArrivalDate": passengerArrivalDate,
						"PassportNumber": passengerPassportNumber,
						"SeatNumber": passengerSeatNumber,
						"Airlines": passengerAirline
					};
					var oModel = this.getOwnerComponent().getModel("iconTabBarModel");
					oModel.getData().PassengerData.push(PassengerPayload);
					oModel.refresh(true);
					MessageBox.success("Passenger Details added successfully");
					var iconTabFilterCustomListItem = this.getView().byId("iconTabBarId");
					iconTabFilterCustomListItem.setSelectedKey("tab3");

					//counts total items by calling function
					this.calculateCustomListItemCount();
					this.calculateHistoryTableItemCount();
					// this.count = oModel.getData().PassengerData.length;
					// this.getView().byId("flightTravelListIconTabFilterId").setCount(this.count);

					this.getView().byId("passengerId").setValue("");
					this.getView().byId("passengerNameId").setValue("");
					this.getView().byId("passengerFlyingFromId").setValue("");
					this.getView().byId("passengerFlyingToId").setValue("");
					this.getView().byId("passengerDepartureDateId").setValue("");
					this.getView().byId("passengerArrivalDateId").setValue("");
					this.getView().byId("passengerPassportNumberId").setValue("");
					this.getView().byId("passengerSeatNumberId").setValue("");
					this.getView().byId("passengerAirlineId").setValue("");
				}
			}
		},
		displayDetailedListInPopOver: function(oEvent) {
			debugger;
			var oRow = oEvent.getSource();
			var oRowSelected = oEvent.getSource().getSelectedItem().getBindingContext("iconTabBarModel").getObject();
			var oModel = this.getOwnerComponent().getModel("iconTabBarModel");
			var passengerArray = oModel.getData().PassengerData;
			passengerArray.forEach((item, index) => {
				if (item.Id === oRowSelected.Id) {
					oModel.setProperty("/PopOverData", oRowSelected);
				}
			});
			oModel.refresh(true);

			if (!this.popOverFragment) {
				this.popOverFragment = sap.ui.xmlfragment("com.dpz_iconTabBarTask.view.fragments.customListPopOver", this);
				this.getView().addDependent(this.popOverFragment);
			}
			this.popOverFragment.openBy(oRow);
		},
		_OnPressClosePopOver: function() {
			this.popOverFragment.close();
		},
		onSearchInFragment: function(oEvent) {
			debugger;
			var searchValue = oEvent.getParameter("query").trim();
			var oFilter = new Filter([
				new Filter("Id", FilterOperator.Contains, searchValue),
				new Filter("Name", FilterOperator.Contains, searchValue),
				new Filter("Email", FilterOperator.Contains, searchValue),
				new Filter("PanNo", FilterOperator.Contains, searchValue),
				new Filter("PassportNo", FilterOperator.Contains, searchValue),
				new Filter("Mobile", FilterOperator.Contains, searchValue),
				new Filter("City", FilterOperator.Contains, searchValue),
				new Filter("State", FilterOperator.Contains, searchValue)
			]);
			var oTable = oEvent.getSource().getParent().getParent();
			oTable.getBinding("items").filter(oFilter, FilterType.Application);
		},
		_OnPressdeleteTableData: function() {
			//get model
			var oModel = this.getOwnerComponent().getModel("iconTabBarModel");
			//get table
			var oCustomerTable = this.getView().byId("allCustomerDetailsTableId");
			var oPassengerTable = this.getView().byId("allPassengerDetailsTableId");
			// var oHrTable = this.getView().byId("hrActionOnEmployeeTableId");
			var totalRowsSelectedInCustomerTable = 0;
			var totalRowsSelectedInPassengerTable = 0;
			var selectedRowInCustomerTable;
			var selectedRowInPassengerTable;
			var arrayOfselectedRowsInCustomerTable = [];
			var arrayOfselectedRowsInPassengerTable = [];
			var customerDataArray = [];
			var passengerDataArray = [];
			var indexInCustomerDataArray;
			var indexInPassengerDataArray;
			// var rowIndexOfItemToBeDeleted;
			var that = this;
			//gets single row
			// var selectedRow = oTable.getSelectedItem().getBindingContext("employeeHrModel").getObject();
			//gets multiple rows 
			var selectedRowsInCustomerTable = oCustomerTable.getSelectedItems();
			selectedRowsInCustomerTable.forEach((item) => {
				selectedRowInCustomerTable = item.getBindingContext("iconTabBarModel").getObject();
				arrayOfselectedRowsInCustomerTable.push(selectedRowInCustomerTable);
				totalRowsSelectedInCustomerTable++;
			});
			var selectedRowsInPassengerTable = oPassengerTable.getSelectedItems();
			selectedRowsInPassengerTable.forEach((item) => {
				selectedRowInPassengerTable = item.getBindingContext("iconTabBarModel").getObject();
				arrayOfselectedRowsInPassengerTable.push(selectedRowInPassengerTable);
				totalRowsSelectedInPassengerTable++;
			});
			if (totalRowsSelectedInCustomerTable >= 1 || totalRowsSelectedInPassengerTable >= 1) {
				MessageBox.confirm("Are you sure you want to delete selected records permanently?", {
					onClose: function(oAction) {
						if (oAction === "OK") {
							if (totalRowsSelectedInCustomerTable >= 1) {
								// if(oModel.getData().EmployeeData){
								debugger;
								customerDataArray = oModel.getData().CustomerData;
								arrayOfselectedRowsInCustomerTable.forEach((item, index) => {
									if (customerDataArray.includes(item)) {
										indexInCustomerDataArray = customerDataArray.indexOf(item);
										customerDataArray.splice(indexInCustomerDataArray, 1);
									}
								});
								debugger;
								oModel.refresh(true);
								oCustomerTable.removeSelections(true);
								that.calculateCustomListItemCount();
								that.calculateHistoryTableItemCount();
							}
								//table2
							if (totalRowsSelectedInPassengerTable >= 1) {
								// if(oModel.getData().EmployeeData){
								debugger;
								passengerDataArray = oModel.getData().PassengerData;
								arrayOfselectedRowsInPassengerTable.forEach((item, index) => {
									if (passengerDataArray.includes(item)) {
										indexInPassengerDataArray = passengerDataArray.indexOf(item);
										passengerDataArray.splice(indexInPassengerDataArray, 1);
									}
								});
								debugger;
								oModel.refresh(true);
								oPassengerTable.removeSelections(true);
								that.calculateCustomListItemCount();
								that.calculateHistoryTableItemCount();
							}
						}
					}
				});
			} else {
				MessageBox.error("Please select atleast one record to perform the operation");
			}
		}
	});
});