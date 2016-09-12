"use strict";
var SidebarMenuModel = (function () {
    function SidebarMenuModel(route, title, icon) {
        this.route = route;
        this.title = title;
        this.icon = icon;
    }
    return SidebarMenuModel;
}());
exports.SidebarMenuModel = SidebarMenuModel;
var SidebarParentMenuModel = (function () {
    function SidebarParentMenuModel(menuItem, headerTitle, route, icon) {
        this.headerTitle = headerTitle;
        this.route = route;
        this.menuItem = menuItem;
        this.icon = icon;
    }
    return SidebarParentMenuModel;
}());
exports.SidebarParentMenuModel = SidebarParentMenuModel;
//# sourceMappingURL=sidebar.model.js.map