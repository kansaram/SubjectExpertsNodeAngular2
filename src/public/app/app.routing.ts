import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { CustomersGridComponent } from './customers/customers-grid.component';
import { CustomerEditComponent } from './customers/customer-edit.component';
import { CustomerEditReactiveComponent } from './customers/customer-edit-reactive.component';
import { IRouting } from './shared/interfaces';
import { ExpertsComponent } from './Experts/experts.component';
import { ExpertsEditComponent } from './Experts/experts-edit.component';

const routes: Routes = [
  { path: 'customers', component: CustomersComponent},
  { path: 'customers/:id', component: CustomerEditComponent},
  { path: 'experts', component: ExpertsComponent},
  { path: 'experts/:id', component: ExpertsEditComponent},
  //{ path: 'customers/:id', component: CustomerEditReactiveComponent },
  { path: '**', pathMatch:'full', redirectTo: '/experts' } //catch any unfound routes and redirect to home page
];

export const appRouting: IRouting = { 
    routes: RouterModule.forRoot(routes),
    components: [ ExpertsComponent,ExpertsEditComponent, CustomersComponent, CustomerEditComponent, CustomerEditReactiveComponent, CustomersGridComponent]
};
