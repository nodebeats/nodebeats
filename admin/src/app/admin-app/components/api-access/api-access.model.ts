export class ApiAccessModel {
    constructor() {
        this.active = false;
        this.roleName = "";
    }

    _id:string;
    roleName:string;
    routeApi:string;
    active:boolean;
    addedBy:string;
    addedOn:string;
    updatedBy:string;
    updatedOn:string;
    deleted:boolean;
    deletedBy:string;
    deletedOn:string;
}