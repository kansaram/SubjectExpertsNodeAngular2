import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { IExperts, IPagedResults } from '../shared/interfaces';
import { Sorter } from '../core/sorter';
import { TrackByService } from '../core/trackby.service';
import { Router } from '@angular/router';
import { DataService } from '../core/data.service';
import { DataFilterService } from '../core/data-filter.service';


@Component({ 
    selector: 'experts', 
    templateUrl: './experts.component.html'
    //When using OnPush detectors, then the framework will check an OnPush 
    //component when any of its input properties changes, when it fires 
    //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  //  changeDetection: ChangeDetectionStrategy.OnPush 
  })
  export class ExpertsComponent implements OnInit {

    title: string;
    experts: IExperts[] = [];
    filteredExperts: IExperts[] = [];

    totalRecords: number = 0;
    pageSize: number = 10;

    constructor(private router: Router, 
        private dataService: DataService,
        private dataFilter: DataFilterService,
        private sorter: Sorter,
        public trackby: TrackByService) { }
   
    ngOnInit() {
        this.title = 'Subject Experts';
        this.getExpertsPage(1);
    }

    getExperts() {
        this.dataService.getExperts().subscribe((experts: IExperts[]) =>{
             this.experts = this.filteredExperts = experts;
        },
        (err: any) => console.log(err),
        () => console.log('getExpertsPage() retrieved experts'));
 
    }

    filterChanged(filterText: string) {
       
        if (filterText && this.experts) {
            let props = ['firstName', 'lastName', 'subject', 'country'];
            this.filteredExperts = this.dataFilter.filter(this.experts, props, filterText);
        }
        else {
          this.filteredExperts = this.experts;
        }
    }
    
    pageChanged(page: number) {
        this.getExpertsPage(page);
    }

    getExpertsPage(page: number){
        this.dataService.getExpertsPage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response: IPagedResults<IExperts[]>) => {
          this.experts = this.filteredExperts = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => console.log(err),
        () => console.log('getExpertsPage() retrieved experts'));
    }
    
    sort(prop: string) {
        this.sorter.sort(this.experts, prop);
    }
  }