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
var Schedule = (function () {
    function Schedule(el, differs) {
        this.el = el;
        this.aspectRatio = 1.35;
        this.defaultView = 'month';
        this.allDaySlot = true;
        this.slotDuration = '00:30:00';
        this.scrollTime = '06:00:00';
        this.minTime = '00:00:00';
        this.maxTime = '24:00:00';
        this.slotEventOverlap = true;
        this.dragRevertDuration = 500;
        this.dragOpacity = .75;
        this.dragScroll = true;
        this.onDayClick = new core_1.EventEmitter();
        this.onEventClick = new core_1.EventEmitter();
        this.onEventMouseover = new core_1.EventEmitter();
        this.onEventMouseout = new core_1.EventEmitter();
        this.onEventDragStart = new core_1.EventEmitter();
        this.onEventDragStop = new core_1.EventEmitter();
        this.onEventDrop = new core_1.EventEmitter();
        this.onEventResizeStart = new core_1.EventEmitter();
        this.onEventResizeStop = new core_1.EventEmitter();
        this.onEventResize = new core_1.EventEmitter();
        this.viewRender = new core_1.EventEmitter();
        this.differ = differs.find([]).create(null);
        this.initialized = false;
    }
    Schedule.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.schedule = jQuery(this.el.nativeElement.children[0]);
        var options = {
            theme: true,
            header: this.header,
            isRTL: this.rtl,
            weekends: this.weekends,
            hiddenDays: this.hiddenDays,
            fixedWeekCount: this.fixedWeekCount,
            weekNumbers: this.weekNumbers,
            businessHours: this.businessHours,
            height: this.height,
            contentHeight: this.contentHeight,
            aspectRatio: this.aspectRatio,
            eventLimit: this.eventLimit,
            defaultDate: this.defaultDate,
            editable: this.editable,
            eventStartEditable: this.eventStartEditable,
            eventDurationEditable: this.eventDurationEditable,
            defaultView: this.defaultView,
            allDayslot: this.allDaySlot,
            slotDuration: this.slotDuration,
            slotLabelInterval: this.slotLabelInterval,
            snapDuration: this.snapDuration,
            scrollTime: this.scrollTime,
            minTime: this.minTime,
            maxTime: this.maxTime,
            slotEventOverlap: this.slotEventOverlap,
            nowIndicator: this.nowIndicator,
            dragRevertDuration: this.dragRevertDuration,
            dragOpacity: this.dragOpacity,
            dragScroll: this.dragScroll,
            eventOverlap: this.eventOverlap,
            eventConstraint: this.eventConstraint,
            events: function (start, end, timezone, callback) {
                callback(_this.events);
            },
            dayClick: function (date, jsEvent, view) {
                _this.onDayClick.emit({
                    'date': date,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventClick: function (calEvent, jsEvent, view) {
                _this.onEventClick.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventMouseover: function (calEvent, jsEvent, view) {
                _this.onEventMouseover.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventMouseout: function (calEvent, jsEvent, view) {
                _this.onEventMouseout.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDragStart: function (event, jsEvent, ui, view) {
                _this.onEventDragStart.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDragStop: function (event, jsEvent, ui, view) {
                _this.onEventDragStop.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
                _this.onEventDrop.emit({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResizeStart: function (event, jsEvent, ui, view) {
                _this.onEventResizeStart.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResizeStop: function (event, jsEvent, ui, view) {
                _this.onEventResizeStop.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResize: function (event, delta, revertFunc, jsEvent, ui, view) {
                _this.onEventResize.emit({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            viewRender: function (view, element) {
                _this.viewRender.emit({
                    'view': view,
                    'element': element
                });
            }
        };
        if (this.locale) {
            for (var prop in this.locale) {
                options[prop] = this.locale[prop];
            }
        }
        this.schedule.fullCalendar(options);
        this.initialized = true;
    };
    Schedule.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.events);
        if (this.schedule && changes) {
            this.schedule.fullCalendar('refetchEvents');
        }
    };
    Schedule.prototype.ngOnDestroy = function () {
        jQuery(this.el.nativeElement.children[0]).fullCalendar('destroy');
        this.initialized = false;
        this.schedule = null;
    };
    Schedule.prototype.gotoDate = function (date) {
        this.schedule.fullCalendar('gotoDate', date);
    };
    Schedule.prototype.prev = function () {
        this.schedule.fullCalendar('prev');
    };
    Schedule.prototype.next = function () {
        this.schedule.fullCalendar('next');
    };
    Schedule.prototype.prevYear = function () {
        this.schedule.fullCalendar('prevYear');
    };
    Schedule.prototype.nextYear = function () {
        this.schedule.fullCalendar('nextYear');
    };
    Schedule.prototype.today = function () {
        this.schedule.fullCalendar('today');
    };
    Schedule.prototype.incrementDate = function (duration) {
        this.schedule.fullCalendar('incrementDate', duration);
    };
    Schedule.prototype.getDate = function () {
        return this.schedule.fullCalendar('getDate');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Schedule.prototype, "events", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "header", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Schedule.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "rtl", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "weekends", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Schedule.prototype, "hiddenDays", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "fixedWeekCount", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "weekNumbers", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "businessHours", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "contentHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Schedule.prototype, "aspectRatio", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "eventLimit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "defaultDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "editable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "eventStartEditable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "eventDurationEditable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Schedule.prototype, "defaultView", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "allDaySlot", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "slotDuration", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "slotLabelInterval", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "snapDuration", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "scrollTime", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "minTime", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "maxTime", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "slotEventOverlap", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "nowIndicator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Schedule.prototype, "dragRevertDuration", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Schedule.prototype, "dragOpacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "dragScroll", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "eventOverlap", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "eventConstraint", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "locale", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "onDayClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "onEventClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "onEventMouseover", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "onEventMouseout", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "onEventDragStart", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "onEventDragStop", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "onEventDrop", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "onEventResizeStart", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "onEventResizeStop", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "onEventResize", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "viewRender", void 0);
    Schedule = __decorate([
        core_1.Component({
            selector: 'p-schedule',
            template: "\n        <div [ngStyle]=\"style\" [class]=\"styleClass\"></div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.IterableDiffers])
    ], Schedule);
    return Schedule;
}());
exports.Schedule = Schedule;
//# sourceMappingURL=schedule.js.map