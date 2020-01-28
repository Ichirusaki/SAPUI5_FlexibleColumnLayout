sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("tech.sothis.formacion.FlexibleColumnLayout.controller.Detail", {
		onInit: function () {
			var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});
			this.getView().setModel(oViewModel, "detailDetailView");
			this.getOwnerComponent().getRouter().getRoute("detailDetail").attachPatternMatched(this._onDetailDetailMatched, this);
		},

		_onDetailDetailMatched: function (oEvent) {
			var sOrderID = oEvent.getParameter("arguments").OrderID;
			this.getView().getModel().metadataLoaded().then(function () {
				var sObjectPath = this.getView().getModel().createKey("Orders", {
					OrderID: sOrderID
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));
		},

		_bindView: function (sObjectPath) {
			// Set busy indicator during view binding
			var oViewModel = this.getView().getModel("detailDetailView");

			// If the view was not bound yet its not busy, only if the binding requests data it is set to busy again
			oViewModel.setProperty("/busy", false);

			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function () {
						oViewModel.setProperty("/busy", true);
					},
					dataReceived: function () {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},

		_onBindingChange: function () {
			var oView = this.getView(),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("detailObjectNotFound");
				return;
			}

			var sPath = oElementBinding.getPath(),
				oCustomer = oView.getModel().getObject(sPath);
			this.getView().getModel("detailDetailView").setProperty("/Customer", oCustomer);
		}
	});
});