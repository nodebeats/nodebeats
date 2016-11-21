export class RoleModel {
    constructor() {
        this.active = false;
        this.read = true;
    }

    _id:string;
    roleName:string;
    read:boolean;
    write:boolean;
    create:boolean;
    delete:boolean;
    change:boolean;
    active:boolean;
    addedBy:string;
    addedOn:string;
    updatedBy:string;
    updatedOn:string;
    deleted:boolean;
    deletedBy:string;
    deletedOn:string;
}
