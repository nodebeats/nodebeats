// Typings reference file, you can add your own global typings here
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;
declare var cloudinary:any;
declare var jQuery:any;
declare var tinymce:any;
declare var moment:any;
declare var swal:any;


interface FileReaderEventTarget extends EventTarget {
  result:string;
}

interface FileReaderEvent extends Event {
  target:FileReaderEventTarget;
  getMessage():string;
}
