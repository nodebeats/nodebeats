export class CloudinaryModel {
    _id:string;
    cloudinaryCloudName:string;
    cloudinaryApiKey:string;
    cloudinaryApiSecret:string;
    addedBy:string;
    addedOn:string;
    updatedBy:string;
    updatedOn:string;
    deleted:boolean;
    deletedBy:string;
    deletedOn:string;
}
export class CloudinaryResponse {
    message:string;
    data:string;
}