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
var core_1 = require('@angular/core');
var testimonial_service_1 = require("./testimonial.service");
var testimonial_model_1 = require("./testimonial.model");
var testimonial_editor_component_1 = require("./testimonial-editor.component");
var primeng_1 = require('primeng/primeng');
var fadeInDirective_1 = require('../../../shared/directives/fadeInDirective');
var TestimonialComponent = (function () {
    function TestimonialComponent(_objService) {
        this._objService = _objService;
        this.showForm = false;
        /* Pagination */
        this.perPage = 10;
        this.currentPage = 1;
        this.totalPage = 1;
        this.nextPage = 1;
        this.preIndex = 0;
    }
    /* End Pagination */
    TestimonialComponent.prototype.ngOnInit = function () {
        this.getTestimonialList();
    };
    TestimonialComponent.prototype.getTestimonialList = function () {
        var _this = this;
        this._objService.getTestimonialList()
            .subscribe(function (objRes) { return _this.bindList(objRes); }, function (error) { return _this.errorMessage(error); });
    };
    TestimonialComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    TestimonialComponent.prototype.bindList = function (objRes) {
        this.objListResponse = objRes;
        this.preIndex = (this.perPage * (this.currentPage - 1));
        if (objRes.dataList.length > 0) {
            var totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;
            setTimeout(function () {
                jQuery('.tablesorter').tablesorter({
                    headers: {
                        3: { sorter: false },
                        4: { sorter: false }
                    }
                });
            }, 50);
        }
    };
    TestimonialComponent.prototype.edit = function (id) {
        this.showForm = true;
        this.testimonialId = id;
    };
    TestimonialComponent.prototype.addTestimonial = function () {
        this.showForm = true;
        this.testimonialId = null;
    };
    TestimonialComponent.prototype.delete = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Testimonial ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                var objSlider = new testimonial_model_1.TestimonialModel();
                objSlider._id = id;
                objSlider.deleted = true;
                _this._objService.deleteTestimonial(objSlider)
                    .subscribe(function (res) {
                    _this.getTestimonialList();
                    jQuery.jAlert({
                        'title': 'Success',
                        'content': res.message,
                        'theme': 'green'
                    });
                }, function (error) {
                    jQuery.jAlert({
                        'title': 'Alert',
                        'content': error.message,
                        'theme': 'red'
                    });
                });
            }
        });
    };
    TestimonialComponent.prototype.showList = function (arg) {
        if (!arg)
            this.getTestimonialList();
        this.showForm = false;
    };
    TestimonialComponent.prototype.pageChanged = function (event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.getTestimonialList();
        jQuery(".tablesorter").trigger("update");
    };
    TestimonialComponent = __decorate([
        core_1.Component({
            selector: 'testimonial-list',
            templateUrl: 'admin-templates/testimonial/testimonial-list.html',
            providers: [testimonial_service_1.TestimonialService],
            directives: [fadeInDirective_1.FadeInDirective, primeng_1.Paginator, testimonial_editor_component_1.TestimonialEditorComponent]
        }), 
        __metadata('design:paramtypes', [testimonial_service_1.TestimonialService])
    ], TestimonialComponent);
    return TestimonialComponent;
}());
exports.TestimonialComponent = TestimonialComponent;
//# sourceMappingURL=testimonial-list.component.js.map