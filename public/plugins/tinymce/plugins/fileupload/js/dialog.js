/**
 * FileUpload - a TinyMCE image upload plugin base on jQuery File Upload plugin
 * fileupload/js/dialog.js
 *
 * Author: Marius Gebhardt
 *
 * Version: 0.1
 */
 
 $(function () {
	'use strict';

	$('#fileupload').fileupload({
		url: $('#uploadForm').attr('action'),
		dataType: 'json',
		done: function (e, data) {
			$.each(data.result.files, function (index, file) {
				top.tinymce.EditorManager.activeEditor.insertContent('<img src="' + file.url +'">');
			});

			top.tinymce.EditorManager.activeEditor.windowManager.close(window);
		},
		progressall: function (e, data) {
			var progress = parseInt(data.loaded / data.total * 100, 10);
			$('#progress .progress-bar').css(
				'width',
				progress + '%'
			);
		}
	}).prop('disabled', !$.support.fileInput)
	.parent().addClass($.support.fileInput ? undefined : 'disabled');
});
