export class ContactModel {
  _id: string;
  fullName: string;
  email: string;
  contactNumber: string;
  organizationName: string;
  informationSource: string;
  message: string;
  addedOn: String;
  deleted: boolean;
  deletedBy: string;
  deletedOn: string;
}

export class ContactResponse {
  dataList: ContactModel[];
  currentPage: number = 1;
  totalItems: number = 0;
}
