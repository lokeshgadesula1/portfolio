//update this with your js_form selector
var form_id_js = 'contact-form';

var data_js = {
  access_token: 'djsq8rcv6qqvg32xgn7njc7r',
};

function reset() {
  document.querySelector('#' + form_id_js + " [name='contact-message']").value =
    '';
  document.querySelector('#' + form_id_js + " [name='subject']").value = '';
  document.querySelector('#' + form_id_js + " [name='contact-name']").value =
    '';
  document.querySelector('#' + form_id_js + " [name='contact-phone']").value =
    '';
  document.querySelector('#' + form_id_js + " [name='contact-email']").value =
    '';
}

function js_onSuccess() {
  // redirecting
  //   window.location =
  //     window.location.pathname + '?message=Email+Successfully+Sent%21&isError=0';
  document.getElementById('mail-response-success').style.display = 'block';
  reset();
}

function js_onError(error) {
  // Redirecting
  document.getElementById('mail-response-error').style.display = 'block';
}

var sendButton = document.getElementById('submit');

function js_send() {
  sendButton.value = 'Sending…';
  sendButton.disabled = true;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      js_onSuccess();
    } else if (request.readyState == 4) {
      js_onError(request.response);
    }
  };

  var subject = document.querySelector(
    '#' + form_id_js + " [name='subject']"
  ).value;
  var emailMessage =
    'Message:' +
    document.querySelector('#' + form_id_js + " [name='contact-message']")
      .value;
  var name =
    'Name:' +
    document.querySelector('#' + form_id_js + " [name='contact-name']").value;
  var contactNo =
    'Contact No:' +
    document.querySelector('#' + form_id_js + " [name='contact-phone']").value;
  var contactEmail =
    'Contact Email:' +
    document.querySelector('#' + form_id_js + " [name='contact-email']").value;

  var message = `
  ${name}
  ${contactNo}
  ${contactEmail}
  ${emailMessage}
  `;
  data_js['subject'] = subject;
  data_js['text'] = message;
  var params = toParams(data_js);

  request.open('POST', 'https://postmail.invotes.com/send', true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  request.send(params);

  return false;
}

sendButton.onclick = js_send;

function toParams(data_js) {
  var form_data = [];
  for (var key in data_js) {
    form_data.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(data_js[key])
    );
  }

  return form_data.join('&');
}

var js_form = document.getElementById(form_id_js);
js_form.addEventListener('submit', function (e) {
  e.preventDefault();
});
