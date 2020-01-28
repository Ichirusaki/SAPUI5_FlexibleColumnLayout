sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox',
	'sap/f/library'
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary) {
	"use strict";

	return Controller.extend("tech.sothis.formacion.FlexibleColumnLayout.controller.Master", {
		onInit: function () {

		},

		onSelectionChange: function (oEvent) {
			var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
			this.getOwnerComponent().getRouter().navTo("detail", {
				CustomerID: oItem.getBindingContext().getProperty("CustomerID")
				
			});
		}
	});
});
