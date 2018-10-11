import { Injectable } from '@angular/core';

//Using the new HttpClientModule now. If you're still on < Angular 4.3 see the 
//data.service.ts file instead (simplify rename it to the name 
//of this file to use it instead)
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

import { ICustomer, IOrder, IState, IPagedResults, ICustomerResponse, IExperts, IExpertResponse } from '../shared/interfaces';

@Injectable()
export class DataService {
  
    baseUrl: string = '/api/customers';
    baseStatesUrl: string = '/api/states';
    baseExpertsUrl: string = '/api/experts'

    constructor(private http: HttpClient) { 

    }

    getExperts() : Observable<IExperts[]> {
        return this.http.get<IExperts[]>(this.baseExpertsUrl)
                    .map((experts: IExperts[]) => {
                        return experts;
                    })
                    .catch(this.handleError);
    }

    getExpert(id: string) : Observable<IExperts> {
        return this.http.get<IExperts>(this.baseExpertsUrl + '/' + id)
                   .catch(this.handleError);
    }

    getExpertsPage(page: number, pageSize: number) : Observable<IPagedResults<IExperts[]>> {
        return this.http.get<IExperts[]>(`${this.baseExpertsUrl}/page/${page}/${pageSize}`, {observe: 'response'})
        .map((res) => {
            //Need to observe response in order to get to this header (see {observe: 'response'} above)
            const totalRecords = +res.headers.get('x-inlinecount');
            let experts = res.body as IExperts[];
            return {
                results: experts,
                totalRecords: totalRecords
            };
        })
        .catch(this.handleError);
    }

    insertExpert(expert: IExperts) : Observable<IExperts> {
        return this.http.post<IExpertResponse>(this.baseExpertsUrl, expert)
                   .map((data) => {
                       console.log('insertExpert status: ' + data.status);
                       return data.expert;
                   })
                   .catch(this.handleError);
    }

    updateExpert(expert: IExperts) : Observable<IExperts> {
        return this.http.put<IExpertResponse>(this.baseExpertsUrl + '/' + expert._id, expert) 
                   .map((data) => {
                       console.log('updateCustomer status: ' + data.status);
                       return data.expert;
                   })
                   .catch(this.handleError);
    }

    deleteExpert(id: string) : Observable<boolean> {
        return this.http.delete<boolean>(this.baseExpertsUrl + '/' + id)
                   .catch(this.handleError);
    }

    getCustomers() : Observable<ICustomer[]> {
        return this.http.get<ICustomer[]>(this.baseUrl)
                   .map((customers: ICustomer[]) => {
                       this.calculateCustomersOrderTotal(customers);
                       return customers;
                   })
                   .catch(this.handleError);
    }

    getCustomersPage(page: number, pageSize: number) : Observable<IPagedResults<ICustomer[]>> {
        return this.http.get<ICustomer[]>(`${this.baseUrl}/page/${page}/${pageSize}`, {observe: 'response'})
                    .map((res) => {
                        //Need to observe response in order to get to this header (see {observe: 'response'} above)
                        const totalRecords = +res.headers.get('x-inlinecount');
                        let customers = res.body as ICustomer[];
                        this.calculateCustomersOrderTotal(customers);
                        return {
                            results: customers,
                            totalRecords: totalRecords
                        };
                    })
                    .catch(this.handleError);
    }
    
    getCustomer(id: string) : Observable<ICustomer> {
        return this.http.get<ICustomer>(this.baseUrl + '/' + id)
                   .catch(this.handleError);
    }

    insertCustomer(customer: ICustomer) : Observable<ICustomer> {
        return this.http.post<ICustomerResponse>(this.baseUrl, customer)
                   .map((data) => {
                       console.log('insertCustomer status: ' + data.status);
                       return data.customer;
                   })
                   .catch(this.handleError);
    }
   
    updateCustomer(customer: ICustomer) : Observable<ICustomer> {
        return this.http.put<ICustomerResponse>(this.baseUrl + '/' + customer._id, customer) 
                   .map((data) => {
                       console.log('updateCustomer status: ' + data.status);
                       return data.customer;
                   })
                   .catch(this.handleError);
    }

    deleteCustomer(id: string) : Observable<boolean> {
        return this.http.delete<boolean>(this.baseUrl + '/' + id)
                   .catch(this.handleError);
    }
   
    getStates(): Observable<IState[]> {
        return this.http.get<IState[]>(this.baseStatesUrl)
                   .catch(this.handleError);
    }

    calculateCustomersOrderTotal(customers: ICustomer[]) {
        for (let customer of customers) {
            if (customer && customer.orders) {
                let total = 0;
                for (let order of customer.orders) {
                    total += (order.price * order.quantity);
                }
                customer.orderTotal = total;
            }
        }
    }
    
    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error); 
        if (error.error instanceof Error) {
          let errMessage = error.error.message;
          return Observable.throw(errMessage);
          // Use the following instead if using lite-server
          //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Node.js server error');
    }

}
