import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../core/data.service';
import { ICustomer, IState, IExperts } from '../shared/interfaces';

@Component({
    selector: 'experts-edit',
    templateUrl: './experts-edit.component.html'
  })

  export class ExpertsEditComponent implements OnInit {
    expert: IExperts = {
        firstName: '',
        lastName: '',
        subject: '',
        country: ''
    };
    errorMessage: string;
    deleteMessageEnabled: boolean;
    operationText: string = 'Insert';

    constructor(private router: Router, 
        private route: ActivatedRoute, 
        private dataService: DataService) { }

    ngOnInit() {
        let id = this.route.snapshot.params['id'];
        if (id !== '0') {
        this.operationText = 'Update';
        this.getExpert(id);
        }
    }

    getExpert(id: string) {
        this.dataService.getExpert(id)
          .subscribe((expert: IExperts) => {
            this.expert = expert;
          },
          (err: any) => console.log(err));
    }

    submit() {

        if (this.expert._id) {
  
          this.dataService.updateExpert(this.expert)
            .subscribe((expert: IExperts) => {
              if (expert) {
                this.router.navigate(['/experts']);
              } else {
                this.errorMessage = 'Unable to save expert';
              }
            },
            (err: any) => console.log(err));
  
        } else {
  
          this.dataService.insertExpert(this.expert)
            .subscribe((expert: IExperts) => {
              if (expert) {
                this.router.navigate(['/experts']);
              }
              else {
                this.errorMessage = 'Unable to add expert';
              }
            },
            (err: any) => console.log(err));
            
        }
    }
    
    cancel(event: Event) {
      event.preventDefault();
      this.router.navigate(['/experts']);
    }
  
    delete(event: Event) {
      event.preventDefault();
      this.dataService.deleteExpert(this.expert._id)
          .subscribe((status: boolean) => {
            if (status) {
              this.router.navigate(['/experts']);
            }
            else {
              this.errorMessage = 'Unable to delete expert';
            }
          },
          (err) => console.log(err));
    }
  }