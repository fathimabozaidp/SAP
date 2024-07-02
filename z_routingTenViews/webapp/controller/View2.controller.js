sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/table/Table",
	"sap/ui/table/Row",
	"sap/ui/table/Column",
	"sap/m/Label",
	"sap/m/Input",
	"sap/m/Text",
	"sap/m/HBox",
	"sap/m/Button",
	"sap/m/MessageBox"
], function(Controller, Table, Row, Column, Label, Input, Text, HBox, Button, MessageBox) {
	"use strict";

	return Controller.extend("com.dpz_routingTenViews.controller.View2", {
		onInit: function() {

			//initializes count to 0 and an empty array	
			this.count = 0;
			this.array = [];

			//sets rowcount to oldmodel
			var oModel = this.getOwnerComponent().getModel("dataModel");
			oModel.setProperty("/rowCount", this.count);

			//creates input row
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("View2").attachMatched(this.createsInputRow(), this);

			// gridTable.bindRows("dataModel>/gridTableData");

			//  var oModel = this.getOwnerComponent().getModel("jsonModel");
			// var gridTable = sap.ui.getCore().byId("gridTableInView2Id");

			// // Define column templates using sap.m.Input initially
			// var columns = [
			//     new sap.ui.table.Column({
			//         label: new sap.m.Label({ text: "Name" }),
			//         template: new sap.m.Input({ value: "{jsonModel>Name}" })
			//     }),
			//     new sap.ui.table.Column({
			//         label: new sap.m.Label({ text: "ID" }),
			//         template: new sap.m.Input({ value: "{jsonModel>ID}" })
			//     }),
			//     new sap.ui.table.Column({
			//         label: new sap.m.Label({ text: "Year" }),
			//         template: new sap.m.Input({ value: "{jsonModel>Year}" })
			//     }),
			//     new sap.ui.table.Column({
			//         label: new sap.m.Label({ text: "Branch" }),
			//         template: new sap.m.Input({ value: "{jsonModel>Branch}" })
			//     }),
			//     new sap.ui.table.Column({
			//         label: new sap.m.Label({ text: "Email" }),
			//         template: new sap.m.Input({ value: "{jsonModel>Email}" })
			//     })
			// ];

			// // Add columns to the table
			// columns.forEach(function(column) {
			//     gridTable.addColumn(column);
			// });

			// // Bind rows to the table
			// gridTable.bindRows("jsonModel>/gridTableData");
		},
		_OnPressBackGoToView1: function(){
			this.getOwnerComponent().getRouter().navTo("View1");
		},
		createsInputRow: function() {
			//creates 6 columns of input type
			this.column1 = new Column({
				label: new Label({
					text: "Name"
				}),
				template: new Input({
					value: "{jsonModel>Name}"
				})
			});
			this.column2 = new Column({
				label: new Label({
					text: "Id"
				}),
				template: new Input({
					value: "{jsonModel>Id}"
				})
			});
			this.column3 = new Column({
				label: new Label({
					text: "Pass-Out Year"
				}),
				template: new Input({
					value: "{jsonModel>Year}"
				})
			});
			this.column4 = new Column({
				label: new Label({
					text: "Branch"
				}),
				template: new Input({
					value: "{jsonModel>Branch}"
				})
			});
			this.column5 = new Column({
				label: new Label({
					text: "Email"
				}),
				template: new Input({
					value: "{jsonModel>Email}"
				})
			});
			var saveButton = new Button({
				icon: "sap-icon://save",
				type: "Emphasized",
				press: this._OnPressSaveButton.bind(this)
			});
			var editButton = new Button({
				icon: "sap-icon://edit",
				type: "Emphasized",
				press: this._OnEdit.bind(this)
			});
			editButton.addStyleClass("sapUiSmallMarginBegin");
			saveButton.addStyleClass("sapUiSmallMarginBegin");

			this.column6 = new Column({
				label: new Label({
					text: "Actions"
				}),
				template: new HBox({
					items: [saveButton, editButton]
				})
			});

			var gridTable = new Table({
				id: "gridTableInView2Id",
				selectionMode: "MultiToggle",
				title: "Dynamic Table",
				visibleRowCount: "{dataModel>/rowCount}",
				columns: [this.column1, this.column2, this.column3, this.column4, this.column5, this.column6]
			});
			this.getView().getContent()[0].getPages()[0].addContent(gridTable);
		},
		_OnPressAddRowButton: function(oEvent) {
			debugger;
			var oModelTenViews = this.getOwnerComponent().getModel("dataModel");
			this.count = oModelTenViews.getProperty("/rowCount") || 0;
			var addRow; // Flag to determine if a row should be added
			var isEnabled;
			var gridTable = sap.ui.getCore().byId("gridTableInView2Id");
			var newModel = new sap.ui.model.json.JSONModel();
			//first time entry
			if (this.count < 1) {
				this.count++;
				oModelTenViews.setProperty("/rowCount", this.count);
				var emptyRowPayload = {
					"Name": "",
					"Id": "",
					"Year": "",
					"Branch": "",
					"Email": ""
				};
				this.array.push(emptyRowPayload);

				newModel.setProperty("/gridTableData", this.array);
				this.getView().setModel(newModel, "jsonModel");
				gridTable.bindRows("jsonModel>/gridTableData");
				newModel.refresh(true);

			} else if (this.count > 0) {
				// Check if the last row has input fields
				var rows = gridTable.getRows();
				var lastRow = rows[rows.length - 1];
				var cells = lastRow.getCells();
				for (var j = 0; j < cells.length; j++) {
					if (cells[j].getMetadata().getName() === "sap.m.Input") {
						//previous row is unsaved
						// var value = cells[j].getValue();
						// if (value === "") {
						isEnabled = cells[j].getEnabled();
						if (isEnabled) {
							addRow = false;
							sap.m.MessageBox.warning("Please fill in all the required fields before adding a new row.");
							break;
						}

					} else {
						this.count++;
						// gridTable.insertRow();
						oModelTenViews.setProperty("/rowCount", this.count);
						emptyRowPayload = {
							"Name": "",
							"Id": "",
							"Year": "",
							"Branch": "",
							"Email": ""
						};
						this.array.push(emptyRowPayload);

						newModel.setProperty("/gridTableData", this.array);

						this.getView().setModel(newModel, "jsonModel");
						gridTable.bindRows("jsonModel>/gridTableData");

						newModel.refresh(true);
					}
				}
			}
			// if (addRow) {
			// 	this.count++;
			// 	oModelTenViews.setProperty("/rowCount", this.count);
			// 	emptyRowPayload = {
			// 		"Name": "",
			// 		"Id": "",
			// 		"Year": "",
			// 		"Branch": "",
			// 		"Email": ""
			// 	};
			// 	this.array.push(emptyRowPayload);

			// 	newModel.setProperty("/gridTableData", this.array);

			// 	this.getView().setModel(newModel, "jsonModel");
			// 	gridTable.bindRows("jsonModel>/gridTableData");

			// 	newModel.refresh(true);

			// 	gridTable.removeAllColumns();
			// 	var saveButton = new Button({
			// 		icon: "sap-icon://save",
			// 		type: "Emphasized",
			// 		press: this._OnPressSaveButton.bind(this)
			// 	});
			// 	var editButton = new Button({
			// 		icon: "sap-icon://edit",
			// 		type: "Emphasized",
			// 		press: this._OnEdit.bind(this)
			// 	});
			// 	editButton.addStyleClass("sapUiSmallMarginBegin");
			// 	saveButton.addStyleClass("sapUiSmallMarginBegin");
			// 	var columns = [
			// 		new sap.ui.table.Column({
			// 			label: new sap.m.Label({
			// 				text: "Name"
			// 			}),
			// 			template: new sap.m.Input({
			// 				text: "{jsonModel>Name}"
			// 			})
			// 		}),
			// 		new sap.ui.table.Column({
			// 			label: new sap.m.Label({
			// 				text: "ID"
			// 			}),
			// 			template: new sap.m.Input({
			// 				text: "{jsonModel>Id}"
			// 			})
			// 		}),
			// 		new sap.ui.table.Column({
			// 			label: new sap.m.Label({
			// 				text: "Year"
			// 			}),
			// 			template: new sap.m.Input({
			// 				text: "{jsonModel>Year}"
			// 			})
			// 		}),
			// 		new sap.ui.table.Column({
			// 			label: new sap.m.Label({
			// 				text: "Branch"
			// 			}),
			// 			template: new sap.m.Input({
			// 				text: "{jsonModel>Branch}"
			// 			})
			// 		}),
			// 		new sap.ui.table.Column({
			// 			label: new sap.m.Label({
			// 				text: "Email"
			// 			}),
			// 			template: new sap.m.Input({
			// 				text: "{jsonModel>Email}"
			// 			})
			// 		}),

			// 		new sap.ui.table.Column({
			// 			label: new sap.m.Label({
			// 				text: "Actions"
			// 			}),
			// 			template: new HBox({
			// 				items: [saveButton, editButton]
			// 			})
			// 		})

			// 	];

			// 	// Add columns to the table
			// 	columns.forEach(function(column) {
			// 		gridTable.addColumn(column);
			// 	});

			// 	// Bind rows to the table
			// 	gridTable.bindRows("jsonModel>/gridTableData");
			// }
		},
		_OnPressSaveButton: function(oEvent) {
			debugger;
			var oModel = this.getView().getModel("jsonModel");
			if (!oModel) {
				sap.m.MessageToast.show("Data model not found.");
				return;
			}
			var gridTableData = oModel.getProperty("/gridTableData");

			// Check if the data path is defined
			if (!gridTableData) {
				sap.m.MessageToast.show("Grid table data not found.");
				return;
			}
			var isValid = true;

			// Define the regular expressions for validation
			var nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
			var idRegex = /^I[0-9]{2}[A-Z]{1}$/; // Alphanumeric characters only
			var yearRegex = /^\d{4}$/; // Four-digit year
			var branchRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
			var emailRegex = /^[A-za-z0-9._-]+@[a-zA-Z0-9.-]+\.com$/; // Basic email format

			debugger;
			var gridTable = sap.ui.getCore().byId("gridTableInView2Id");
			var rows = gridTable.getRows();
			var lastRow = rows.length - 1;
			var gridPayload = this.getView().getModel("jsonModel").getData().gridTableData;

			for (var i = lastRow; i <= lastRow; i++) {
				if (!gridPayload[i].Name.match(nameRegex)) {
					isValid = false;
					oEvent.getSource().getParent().getParent().getCells()[0].setValueState("Error");
					// sap.m.MessageToast.show("Invalid Name at row " + (i + 1) + ". Only letters and spaces are allowed.");
					// break;
				} else {
					isValid = true;
					oEvent.getSource().getParent().getParent().getCells()[0].setValueState("None");
				}
				if (!gridPayload[i].Id.match(idRegex)) {
					isValid = false;
					oEvent.getSource().getParent().getParent().getCells()[1].setValueState("Error");
					// sap.m.MessageToast.show("Invalid ID at row " + (i + 1) + ". Only alphanumeric characters are allowed.");
					// break;
				} else {
					isValid = true;
					oEvent.getSource().getParent().getParent().getCells()[1].setValueState("None");
				}
				if (!gridPayload[i].Year.match(yearRegex)) {
					isValid = false;
					oEvent.getSource().getParent().getParent().getCells()[2].setValueState("Error");
					// sap.m.MessageToast.show("Invalid Year at row " + (i + 1) + ". Please enter a four-digit year.");
					// break;
				} else {
					isValid = true;
					oEvent.getSource().getParent().getParent().getCells()[2].setValueState("None");
				}
				if (!gridPayload[i].Branch.match(branchRegex)) {
					isValid = false;
					oEvent.getSource().getParent().getParent().getCells()[3].setValueState("Error");
					// sap.m.MessageToast.show("Invalid Branch at row " + (i + 1) + ". Only letters and spaces are allowed.");
					// break;
				} else {
					isValid = true;
					oEvent.getSource().getParent().getParent().getCells()[3].setValueState("None");
				}
				if (!gridPayload[i].Email.match(emailRegex)) {
					isValid = false;
					oEvent.getSource().getParent().getParent().getCells()[4].setValueState("Error");
					// sap.m.MessageToast.show("Invalid Email at row " + (i + 1) + ". Please enter a valid email address.");
					// break;
				} else {
					isValid = true;
					oEvent.getSource().getParent().getParent().getCells()[4].setValueState("None");
				}
				if (gridPayload[i].Name.match(nameRegex) && gridPayload[i].Id.match(idRegex) && gridPayload[i].Year.match(yearRegex) &&
					gridPayload[i].Branch.match(branchRegex) && gridPayload[i].Email.match(emailRegex)) {
					sap.m.MessageBox.success("Validation successfull");
					this.array.push(gridPayload);

					this.getView().getModel("jsonModel").getData().gridTableData.splice((gridPayload.length) - 1, 1);
					this.getView().getModel("jsonModel").refresh(true);

					for (var j = 0; j < 5; j++) {
						oEvent.getSource().getParent().getParent().getCells()[j].setEnabled(false);
					}
				} else {
					sap.m.MessageBox.warning("Please check the details again");
				}
			}

			// var name = oEvent.getSource().getParent().getParent().getCells()[0].getValue();
			// var id = oEvent.getSource().getParent().getParent().getCells()[1].getValue();
			// var year = oEvent.getSource().getParent().getParent().getCells()[2].getValue();
			// var branch = oEvent.getSource().getParent().getParent().getCells()[3].getValue();
			// var email = oEvent.getSource().getParent().getParent().getCells()[4].getValue();

			// Validate row data
			// for (var i = 0; i < gridTableData.length; i++) {
			// 	var row = gridTableData[i];
			// 	if (!nameRegex.test(name)) {
			// 		isValid = false;
			// 		oEvent.getSource().getParent().getParent().getCells()[0].setValueState("Error");
			// 		// sap.m.MessageToast.show("Invalid Name at row " + (i + 1) + ". Only letters and spaces are allowed.");
			// 		// break;
			// 	} else {
			// 		isValid = true;
			// 		oEvent.getSource().getParent().getParent().getCells()[0].setValueState("None");
			// 	}
			// 	if (!idRegex.test(id)) {
			// 		isValid = false;
			// 		oEvent.getSource().getParent().getParent().getCells()[1].setValueState("Error");
			// 		// sap.m.MessageToast.show("Invalid ID at row " + (i + 1) + ". Only alphanumeric characters are allowed.");
			// 		// break;
			// 	} else {
			// 		isValid = true;
			// 		oEvent.getSource().getParent().getParent().getCells()[1].setValueState("None");
			// 	}
			// 	if (!yearRegex.test(year)) {
			// 		isValid = false;
			// 		oEvent.getSource().getParent().getParent().getCells()[2].setValueState("Error");
			// 		// sap.m.MessageToast.show("Invalid Year at row " + (i + 1) + ". Please enter a four-digit year.");
			// 		// break;
			// 	} else {
			// 		isValid = true;
			// 		oEvent.getSource().getParent().getParent().getCells()[2].setValueState("None");
			// 	}
			// 	if (!branchRegex.test(branch)) {
			// 		isValid = false;
			// 		oEvent.getSource().getParent().getParent().getCells()[3].setValueState("Error");
			// 		// sap.m.MessageToast.show("Invalid Branch at row " + (i + 1) + ". Only letters and spaces are allowed.");
			// 		// break;
			// 	} else {
			// 		isValid = true;
			// 		oEvent.getSource().getParent().getParent().getCells()[3].setValueState("None");
			// 	}
			// 	if (!emailRegex.test(email)) {
			// 		isValid = false;
			// 		oEvent.getSource().getParent().getParent().getCells()[4].setValueState("Error");
			// 		// sap.m.MessageToast.show("Invalid Email at row " + (i + 1) + ". Please enter a valid email address.");
			// 		// break;
			// 	} else {
			// 		isValid = true;
			// 		oEvent.getSource().getParent().getParent().getCells()[4].setValueState("None");
			// 	}
			// }
			// if (isValid && nameRegex.test(name) && idRegex.test(id) && yearRegex.test(year) && branchRegex.test(branch) && emailRegex.test(
			// 		email)) {
			// 	// If all validations pass, save the data
			// 	oModel.setProperty("/gridTableData", gridTableData);
			// 	sap.m.MessageToast.show("Data saved successfully!");

			// 	// Convert input fields to text fields in the data model
			// 	// for (var i = 0; i < gridTableData.length; i++) {
			// 	// 	var row = gridTableData[i];
			// 	// 	row.Name = name || ""; // Ensure non-null values
			// 	// 	row.Id = id || "";
			// 	// 	row.Year = year || "";
			// 	// 	row.Branch = branch || "";
			// 	// 	row.Email = email || "";

			// 	// }

			// 	// // Update the model with the converted data
			// 	// oModel.setProperty("/gridTableData", gridTableData);
			// 	// oModel.refresh(true);

			// 	// for(var i = 0; i<5; i++){
			// 	// 	oEvent.getSource().getParent().getParent().getCells()[i].setEnabled(false);
			// 	// }

			// 	// Remove selectedRow from table
			// 	var gridTable = sap.ui.getCore().byId("gridTableInView2Id");
			// 	gridTable.removeAllColumns();

			// 	// var selectedRow = oEvent.getSource().getParent().getParent();
			// 	// var removeCellsOfSelectedRow = selectedRow.removeAllCells();

			// 	var saveButton = new Button({
			// 		icon: "sap-icon://save",
			// 		type: "Emphasized",
			// 		press: this._OnPressSaveButton.bind(this)
			// 	});
			// 	var editButton = new Button({
			// 		icon: "sap-icon://edit",
			// 		type: "Emphasized",
			// 		press: this._OnEdit.bind(this)
			// 	});
			// 	editButton.addStyleClass("sapUiSmallMarginBegin");
			// 	saveButton.addStyleClass("sapUiSmallMarginBegin");
			// 	var columns = [
			// 		new sap.ui.table.Column({
			// 			label: new sap.m.Label({
			// 				text: "Name"
			// 			}),
			// 			template: new sap.m.Text({
			// 				text: "{jsonModel>Name}"
			// 			})
			// 		}),
			// 		new sap.ui.table.Column({
			// 			label: new sap.m.Label({
			// 				text: "ID"
			// 			}),
			// 			template: new sap.m.Text({
			// 				text: "{jsonModel>Id}"
			// 			})
			// 		}),
			// 		new sap.ui.table.Column({
			// 			label: new sap.m.Label({
			// 				text: "Year"
			// 			}),
			// 			template: new sap.m.Text({
			// 				text: "{jsonModel>Year}"
			// 			})
			// 		}),
			// 		new sap.ui.table.Column({
			// 			label: new sap.m.Label({
			// 				text: "Branch"
			// 			}),
			// 			template: new sap.m.Text({
			// 				text: "{jsonModel>Branch}"
			// 			})
			// 		}),
			// 		new sap.ui.table.Column({
			// 			label: new sap.m.Label({
			// 				text: "Email"
			// 			}),
			// 			template: new sap.m.Text({
			// 				text: "{jsonModel>Email}"
			// 			})
			// 		}),

			// 		new sap.ui.table.Column({
			// 			label: new sap.m.Label({
			// 				text: "Actions"
			// 			}),
			// 			template: new HBox({
			// 				items: [saveButton, editButton]
			// 			})
			// 		})

			// 	];

			// 	// Add columns to the table
			// 	columns.forEach(function(column) {
			// 		gridTable.addColumn(column);
			// 	});

			// 	// Bind rows to the table
			// 	gridTable.bindRows("jsonModel>/gridTableData");
			// }

		},
		// _OnSave: function(oEvent) {
		// 	debugger;
		// 	var gridTablePayload = this.getView().getModel("jsonModel").getData().gridTableData;
		// 	var validStudentName = /^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/;
		// 	var table = sap.ui.getCore().byId("gridTable_Id");
		// 	for (var p = 0; p <= 0; p++) {
		// 		if (gridTablePayload[p].Name.match(validStudentName)) {
		// 			// sap.m.MessageBox.error("Fill All Mandatory Details");
		// 			// sap.m.MessageToast("ALLcorrect");
		// 			// sap.m.MessageToast.show("allcorrect");
		// 		} else {
		// 			sap.m.MessageToast("ALL  not correct");
		// 		}
		// 	}
		// 	this.array.push(gridTablePayload);
		// 	this.getView().getModel("jsonModel").getData().gridTableData.splice((gridTablePayload.length) - 1, 1);
		// 	this.getView().getModel("jsonModel").refresh(true);
		// 	for (var i = 0; i < 5; i++) {
		// 		oEvent.getSource().getParent().getParent().getCells()[i].setEnabled(false);
		// 	}
		// },
		_OnEdit: function(oEvent) {
			debugger;
			for (var i = 0; i < 5; i++) {
				oEvent.getSource().getParent().getParent().getCells()[i].setEnabled(true);
			}
		},
		_OnPressDeleteRowButton: function() {
			debugger;
			var table = sap.ui.getCore().byId("gridTableInView2Id");
			var selectedIndices = table.getSelectedIndices();
			var jsonModel = this.getView().getModel("jsonModel");
			var oModel = this.getOwnerComponent().getModel("dataModel");
			var gridTableData = jsonModel.getProperty("/gridTableData");

			var gridTable = sap.ui.getCore().byId("gridTableInView2Id");
			var isEnabled;
			var rows = gridTable.getRows();
			var lastRow = rows[rows.length - 1];
			var cells = lastRow.getCells();
			for (var j = 0; j < cells.length; j++) {
				if (cells[j].getMetadata().getName() === "sap.m.Input") {
					//previous row is unsaved
					// var value = cells[j].getValue();
					// if (value === "") {
					isEnabled = cells[j].getEnabled();
					if (isEnabled) {
						sap.m.MessageBox.warning("Please fill in all the required fields before deleting an existing row.");
						break;
					}
				} else {
					// Sorting selected indices in descending order to prevent index shift issues
					selectedIndices.sort(function(a, b) {
						return b - a;
					});

					// Deleting selected rows from the array
					selectedIndices.forEach(function(index) {
						gridTableData.splice(index, 1);
					});

					// Update the count after deletion
					this.count = gridTableData.length;

					// Update the model with the new array and count
					jsonModel.setProperty("/gridTableData", gridTableData);
					jsonModel.setProperty("/rowCount", this.count);
					oModel.setProperty("/rowCount", this.count);
					jsonModel.refresh(true);

					// Clear table selection
					table.clearSelection();
				}
			}

		}
	});
});