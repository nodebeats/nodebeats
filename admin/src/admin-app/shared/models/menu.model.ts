export class SidebarMenuModel {
  constructor(route:string, title:string, icon:string) {
    this.route = route;
    this.title = title;
    this.icon = icon;

  }

  route:string;
  title:string;
  icon:string;
}

export class SidebarParentMenuModel {
  constructor(menuItem:SidebarMenuModel[], headerTitle?:string, route?:string, icon?:string) {
    this.headerTitle = headerTitle;
    this.route = route;
    this.menuItem = menuItem;
    this.icon = icon;
  }

  icon:string;
  headerTitle:string;
  route:string;
  menuItem:SidebarMenuModel[];
}
