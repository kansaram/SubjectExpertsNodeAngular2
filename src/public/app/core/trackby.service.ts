import { Injectable } from '@angular/core';

import { ICustomer, IExperts } from '../shared/interfaces';

@Injectable()
export class TrackByService {
  
  customer(index: number, customer: ICustomer) {
    return customer._id;
  }

  expert(index: number, expert: IExperts) {
    return expert._id;
  }
  
}