"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sorter_1 = require("../core/sorter");
var trackby_service_1 = require("../core/trackby.service");
var router_1 = require("@angular/router");
var data_service_1 = require("../core/data.service");
var data_filter_service_1 = require("../core/data-filter.service");
var ExpertsComponent = /** @class */ (function () {
    function ExpertsComponent(router, dataService, dataFilter, sorter, trackby) {
        this.router = router;
        this.dataService = dataService;
        this.dataFilter = dataFilter;
        this.sorter = sorter;
        this.trackby = trackby;
        this.experts = [];
        this.filteredExperts = [];
        this.totalRecords = 0;
        this.pageSize = 10;
    }
    ExpertsComponent.prototype.ngOnInit = function () {
        this.title = 'Subject Experts';
        this.getExpertsPage(1);
    };
    ExpertsComponent.prototype.getExperts = function () {
        var _this = this;
        this.dataService.getExperts().subscribe(function (experts) {
            _this.experts = _this.filteredExperts = experts;
        }, function (err) { return console.log(err); }, function () { return console.log('getExpertsPage() retrieved experts'); });
    };
    ExpertsComponent.prototype.filterChanged = function (filterText) {
        if (filterText && this.experts) {
            var props = ['firstName', 'lastName', 'subject', 'country'];
            this.filteredExperts = this.dataFilter.filter(this.experts, props, filterText);
        }
        else {
            this.filteredExperts = this.experts;
        }
    };
    ExpertsComponent.prototype.pageChanged = function (page) {
        this.getExpertsPage(page);
    };
    ExpertsComponent.prototype.getExpertsPage = function (page) {
        var _this = this;
        this.dataService.getExpertsPage((page - 1) * this.pageSize, this.pageSize)
            .subscribe(function (response) {
            _this.experts = _this.filteredExperts = response.results;
            _this.totalRecords = response.totalRecords;
        }, function (err) { return console.log(err); }, function () { return console.log('getExpertsPage() retrieved experts'); });
    };
    ExpertsComponent.prototype.sort = function (prop) {
        this.sorter.sort(this.experts, prop);
    };
    ExpertsComponent = __decorate([
        core_1.Component({
            selector: 'experts',
            templateUrl: './experts.component.html'
            //When using OnPush detectors, then the framework will check an OnPush 
            //component when any of its input properties changes, when it fires 
            //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
            //  changeDetection: ChangeDetectionStrategy.OnPush 
        }),
        __metadata("design:paramtypes", [router_1.Router,
            data_service_1.DataService,
            data_filter_service_1.DataFilterService,
            sorter_1.Sorter,
            trackby_service_1.TrackByService])
    ], ExpertsComponent);
    return ExpertsComponent;
}());
exports.ExpertsComponent = ExpertsComponent;
//# sourceMappingURL=experts.component.js.map