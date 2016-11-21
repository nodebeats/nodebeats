import {
  Component,
  ElementRef,
  OnInit,
  Input,
  AfterViewInit,
  Output,
  EventEmitter
} from "@angular/core";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'tiny-editor',
  template: `<textarea class="tinyMCE" [formControl]="editorFormControl" #editor="ngForm" style="height:300px"></textarea>
                <div class="error-msg" *ngIf="editor.control.hasError('required') && (isChanged ||isSubmitted)">Required</div>`

})
export class TinyEditor implements AfterViewInit {
  @Input() editorFormControl:FormControl;
  @Input() isSubmitted:boolean;
  @Input() value:string = "";
  @Output() valueChange = new EventEmitter();
  @Input() module:string;
  elementRef:ElementRef;
  isChanged:boolean = false;

  constructor(elementRef:ElementRef) {
    this.elementRef = elementRef;
  }

  ngAfterViewInit() {
    var that = this;
    tinymce.remove();
    tinymce.init(
      {
        selector: ".tinyMCE",
        forced_root_block: "p",
        verify_html: false,
        skin_url: '/assets/plugins/tinymce/skins/lightgray',
        plugins: ["code", 'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table contextmenu paste code'
        ],
        toolbar1: 'code insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        toolbar2: 'print preview  | forecolor backcolor',
        setup: (editor) => {
          editor.on('init', (e, l)=> {
            editor.getBody().style.fontSize = '15px';
            if (typeof that.value != "undefined") {
              editor.setContent(that.value);
              that.editorFormControl.patchValue(that.value);
            }
          });
          editor.on('keyup', (e, l) => {
            var content = editor.getContent();
            //  that.editorFormControl.updateValue(content);
            that.isChanged = true;
            that.valueChange.emit(content);
          });
          editor.on('blur', (e, l)=> {
            var content = editor.getContent();
            //  that.editorFormControl.updateValue(content);
            that.isChanged = true;
            that.valueChange.emit(content);
          });

        },
        file_browser_callback: RoxyFileBrowser

      });
    function RoxyFileBrowser(field_name, url, type, win) {
      win.getSelection().removeAllRanges();
      var roxyFileman = url + '/assets/plugins/tinymce/plugins/fileman/index.html';
      //var roxyFileman = '/fileman/index.html';
      if (roxyFileman.indexOf("?") < 0) {
        roxyFileman += "?type=" + type;
      }
      else {
        roxyFileman += "&type=" + type;
      }
      roxyFileman += '&input=' + field_name + '&value=' + win.document.getElementById(field_name).value;
      if (that.module)
        roxyFileman += "&module=" + that.module;
      if (tinymce.activeEditor.settings.language) {
        roxyFileman += '&langCode=' + tinymce.activeEditor.settings.language;

      }
      tinymce.activeEditor.windowManager.open({
        file: roxyFileman,
        title: 'Fileman',
        width: 850,
        height: 500,
        resizable: "yes",
        plugins: "media",
        inline: "yes",
        close_previous: "no"
      }, {window: win, input: field_name});
      return false;
    }

  }


  ngOnChanges(changes) {
    if (tinymce.activeEditor && typeof this.value != "undefined") {
      tinymce.activeEditor.setContent(this.value);
      this.editorFormControl.patchValue(this.value);
    }
  }

}
