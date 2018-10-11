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
var router_1 = require("@angular/router");
var data_service_1 = require("../core/data.service");
var ExpertsEditComponent = /** @class */ (function () {
    function ExpertsEditComponent(router, route, dataService) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.expert = {
            firstName: '',
            lastName: '',
            subject: '',
            country: ''
        };
        this.operationText = 'Insert';
    }
    ExpertsEditComponent.prototype.ngOnInit = function () {
        var id = this.route.snapshot.params['id'];
        if (id !== '0') {
            this.operationText = 'Update';
            this.getExpert(id);
        }
    };
    ExpertsEditComponent.prototype.getExpert = function (id) {
        var _this = this;
        this.dataService.getExpert(id)
            .subscribe(function (expert) {
            _this.expert = expert;
        }, function (err) { return console.log(err); });
    };
    ExpertsEditComponent.prototype.submit = function () {
        var _this = this;
        if (this.expert._id) {
            this.dataService.updateExpert(this.expert)
                .subscribe(function (expert) {
                if (expert) {
                    _this.router.navigate(['/experts']);
                }
                else {
                    _this.errorMessage = 'Unable to save expert';
                }
            }, function (err) { return console.log(err); });
        }
        else {
            this.dataService.insertExpert(this.expert)
                .subscribe(function (expert) {
                if (expert) {
                    _this.router.navigate(['/experts']);
                }
                else {
                    _this.errorMessage = 'Unable to add expert';
                }
            }, function (err) { return console.log(err); });
        }
    };
    ExpertsEditComponent.prototype.cancel = function (event) {
        event.preventDefault();
        this.router.navigate(['/experts']);
    };
    ExpertsEditComponent.prototype.delete = function (event) {
        var _this = this;
        event.preventDefault();
        this.dataService.deleteExpert(this.expert._id)
            .subscribe(function (status) {
            if (status) {
                _this.router.navigate(['/experts']);
            }
            else {
                _this.errorMessage = 'Unable to delete expert';
            }
        }, function (err) { return console.log(err); });
    };
    ExpertsEditComponent = __decorate([
        core_1.Component({
            selector: 'experts-edit',
            templateUrl: './experts-edit.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            data_service_1.DataService])
    ], ExpertsEditComponent);
    return ExpertsEditComponent;
}());
exports.ExpertsEditComponent = ExpertsEditComponent;
//# sourceMappingURL=experts-edit.component.js.map