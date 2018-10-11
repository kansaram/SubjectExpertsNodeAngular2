"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var customers_component_1 = require("./customers/customers.component");
var customers_grid_component_1 = require("./customers/customers-grid.component");
var customer_edit_component_1 = require("./customers/customer-edit.component");
var customer_edit_reactive_component_1 = require("./customers/customer-edit-reactive.component");
var experts_component_1 = require("./Experts/experts.component");
var experts_edit_component_1 = require("./Experts/experts-edit.component");
var routes = [
    { path: 'customers', component: customers_component_1.CustomersComponent },
    { path: 'customers/:id', component: customer_edit_component_1.CustomerEditComponent },
    { path: 'experts', component: experts_component_1.ExpertsComponent },
    { path: 'experts/:id', component: experts_edit_component_1.ExpertsEditComponent },
    //{ path: 'customers/:id', component: CustomerEditReactiveComponent },
    { path: '**', pathMatch: 'full', redirectTo: '/experts' } //catch any unfound routes and redirect to home page
];
exports.appRouting = {
    routes: router_1.RouterModule.forRoot(routes),
    components: [experts_component_1.ExpertsComponent, experts_edit_component_1.ExpertsEditComponent, customers_component_1.CustomersComponent, customer_edit_component_1.CustomerEditComponent, customer_edit_reactive_component_1.CustomerEditReactiveComponent, customers_grid_component_1.CustomersGridComponent]
};
//# sourceMappingURL=app.routing.js.map