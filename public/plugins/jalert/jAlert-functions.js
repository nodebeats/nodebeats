/* Optional: Overwrites javascript's built-in alert function */
function alert(title, msg){
	if( typeof msg == 'undefined' )
	{
		msg = title;
		title = '';
	}
	$.jAlert({
		'title': title,
		'content': msg
	});
}

/* Optional: Overwrites javascript's built-in confirm function (DANGER: operates differently - returns true every time and doesn't stop execution!) - You must provide a callback */
function confirm(confirmCallback, denyCallback)
{
	$.jAlert({'type': 'confirm', 'onConfirm': confirmCallback, 'onDeny': denyCallback });
}

/* Optional Alert shortcuts based on color */
function showAlert(title, msg, theme)
{
	$.jAlert({
		'title': title,
		'content': msg,
		'theme': theme
	});		
}

function successAlert(title, msg)
{
	if( typeof msg == 'undefined' )
	{
		msg = title;
		title = 'Success';
	}

	showAlert(title, msg, 'green');
}

function errorAlert(title, msg)
{
	if( typeof msg == 'undefined' )
	{
		msg = title;
		title = 'Error';
	}

	showAlert(title, msg, 'red');
}

function infoAlert(title, msg)
{
	if( typeof msg == 'undefined' )
	{
		msg = title;
		title = 'Info';
	}

	showAlert(title, msg, 'blue');
}

function warningAlert(title, msg)
{
	if( typeof msg == 'undefined' )
	{
		msg = title;
		title = 'Warning';
	}

	showAlert(title, msg, 'yellow');
}

function blackAlert(title, msg)
{
	if( typeof msg == 'undefined' )
	{
		msg = title;
		title = 'Warning';
	}

	showAlert(title, msg, 'black');
}

function imageAlert(img, imgWidth)
{
	if( typeof imgWidth == 'auto' )
	{
		iframeHeight = false;
	}

	$.jAlert({
		'image': img,
		'imageWidth': imgWidth
	});
}

function videoAlert(video)
{
	$.jAlert({
		'video': video
	});
}

function iframeAlert(iframe, iframeHeight)
{
	if( typeof iframeHeight == 'undefined' )
	{
		iframeHeight = false;
	}

	$.jAlert({
		'iframe': iframe,
		'iframeHeight': iframeHeight
	});
}

function ajaxAlert(url, onOpen)
{
	if( typeof onOpen == 'undefined' )
	{
		onOpen = function(alert){ //on open call back. Fires just after the alert has finished rendering
				return false;
			};
	}

	$.jAlert({
		'ajax': url,
		'onOpen': onOpen
	});
}