sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("com.dpz_jsonmodelwithsimpleformandtable.controller.zstudentdetailsformandtableview", {
		onPressSubmitButtonDisplayTable : function()
	{
		var regExpName = /^[A-Za-z]+$/;
		var regExpGrade = /^[0-9]{2}$/;
		var regExpRollNo = /^[A-Z]{3}[0-9]{2}[A-Z]{1}$/;
		var regExpContact = /[6-9]{1}[0-9]{9}$/;
		var regExpCity = /^[A-za-z]+$/;
		 
		var sName = this.getView().byId("sNameInputId").getValue();
		var sDateOfBirth = this.getView().byId("sDateOfBirthId").getValue();
		var sGrade = this.getView().byId("sGradeId").getValue();
		var sRollNo = this.getView().byId("sRollNoId").getValue();
		var sGender = this.getView().byId("sGenderId").getValue();
		var sContact = this.getView().byId("sContactId").getValue();
		var sEmail = this.getView().byId("sEmailId").getValue();
		var sCity = this.getView().byId("sCityId").getValue();
		
		if(sName.match(regExpName)){
			this.getView().byId("sNameInputId").setValueState("Success");	
		}else{
			this.getView().byId("sNameInputId").setValueState("Error");
			this.getView().byId("sNameInputId").setValueStateText("Enter proper name");
		}
		if(sDateOfBirth !== ""){
			this.getView().byId("sDateOfBirthId").setValueState("Success");	
		}else{
			this.getView().byId("sDateOfBirthId").setValueState("Error");
			this.getView().byId("sDateOfBirthId").setValueStateText("Enter proper date");
		}
		if(sGrade.match(regExpGrade)){
			this.getView().byId("sGradeId").setValueState("Success");
		}else{
			this.getView().byId("sGradeId").setValueState("Error");
			this.getView().byId("sGradeId").setValueStateText("Enter grade in 2-digit format");
		}
		if(sRollNo.match(regExpRollNo)){
			this.getView().byId("sRollNoId").setValueState("Success");
		}else{
			this.getView().byId("sRollNoId").setValueState("Error");
			this.getView().byId("sRollNoId").setValueStateText("Enter proper rollno");
		}
		if(sGender !== ""){
			this.getView().byId("sGenderId").setValueState("Success");
		}else{
			this.getView().byId("sGenderId").setValueState("Error");
			this.getView().byId("sGenderId").setValueStateText("Enter proper rollno");
		}
		if(sContact.match(regExpContact)){
			this.getView().byId("sContactId").setValueState("Success");
		}else{
			this.getView().byId("sContactId").setValueState("Error");
			this.getView().byId("sContactId").setValueStateText("Enter proper contact");
		}
		if(sCity.match(regExpCity)){
			this.getView().byId("sCityId").setValueState("Success");
		}else{
			this.getView().byId("sCityId").setValueState("Error");
			this.getView().byId("sCityId").setValueStateText("Enter proper city");
		}
		
		//match all
		if(sName.match(regExpName) && sDateOfBirth !== "" && sGrade.match(regExpGrade) 
			&& sRollNo.match(regExpRollNo) && sGender !== "" && sContact.match(regExpContact) && sCity.match(regExpCity))
		{
			var payload = {
				"Name" : sName,
				"D-O-B" : sDateOfBirth,
				"Grade" : sGrade,
				"Roll No" : sRollNo,
				"Gender" : sGender,
				"Contact" : sContact,
				"Email" : sEmail,
				"City" : sCity 
			};
				
			//get model
			var oModel = this.getOwnerComponent().getModel("StudentModel");
			oModel.getData().StudentDetails.push(payload);
			oModel.refresh(true);
			this.getOwnerComponent().getRouter().navTo("zstudentstatictableview");
			// oModel.setProperty("/FormData", payload);
			// var table = this.getView().byId("table2Id");
			// table.setVisible(true);
				
			//clear input fields
			this.getView().byId("sNameInputId").setValue("");
			this.getView().byId("sDateOfBirthId").setValue("");
			this.getView().byId("sGradeId").setValue("");
			this.getView().byId("sRollNoId").setValue("");
			this.getView().byId("sGenderId").setValue("");
			this.getView().byId("sContactId").setValue("");
			this.getView().byId("sEmailId").setValue("");
			this.getView().byId("sCityId").setValue("");
			this.getView().byId("sNameInputId").setValueState("None");
			this.getView().byId("sDateOfBirthId").setValueState("None");
			this.getView().byId("sGradeId").setValueState("None");
			this.getView().byId("sRollNoId").setValueState("None");
			this.getView().byId("sGenderId").setValueState("None");
			this.getView().byId("sContactId").setValueState("None");
			this.getView().byId("sEmailId").setValueState("None");
			this.getView().byId("sCityId").setValueState("None");
			// this.getView().byId("table2Id").refresh(true);
		}
		else{
				MessageBox.error("Error");
		}
	},
	navigateToDefaultView : function (){
		this.getOwnerComponent().getRouter().navTo("zstudentstatictableview");
	}
});
});