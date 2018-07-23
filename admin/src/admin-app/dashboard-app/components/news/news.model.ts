export class NewsCategoryModel {
  constructor() {
    this.active = false;
  }

  _id: string;
  categoryName: string;
  categoryDescription: string;
  active: boolean;
  addedBy: string;
  addedOn: string;
  updatedBy: string;
  updatedOn: string;
  deleted: boolean;
  deletedBy: string;
  deletedOn: string;
}
export class NewsCategoryResponse {
  dataList: NewsCategoryModel[];
  totalItems: number;
  currentPage: number;
}
export class NewsModel {
  constructor() {
    this.active = false;
    this.categoryID = "";
    this.newsDescription = "";
    this.newsDate = new Date();
  }

  _id: string;
  newsTitle: string;
  urlSlog: string;
  categoryID: string;
  newsSummary: string;
  newsDescription: string;
  newsAuthor: string;
  newsDate: Date;
  image: NewsImageModel [];
  pageViews: number;
  active: boolean;
  addedBy: string;
  addedOn: string;
  updatedBy: string;
  updatedOn: string;
  deleted: boolean;
  deletedBy: string;
  deletedOn: string;
}

export class NewsResponse {
  dataList: NewsModel[];
  totalItems: number;
  currentPage: number;
}

export class NewsImageModel {
  constructor() {
    this.active = false;
  }

  _id: string;
  imageName: string;
  imageTitle: string;
  imageAltText: string;
  coverImage: boolean;
  imageProperties: ImageProperties;
  active: boolean;
  addedBy: string;
  addedOn: string;
  updatedBy: string;
  updatedOn: string;
  deleted: boolean;
  deletedBy: string;
  deletedOn: string;
}

class ImageProperties {
  imageExtension: string;
  imageMimeType: string;
  imageSize: string;
  imageOriginalName: string;
  imagePath: string;
}

export class NewsImageResponse {
  image: NewsImageModel[];
}
