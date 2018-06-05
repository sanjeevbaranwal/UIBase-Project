let popupNotification = function(props, done) {
  let popupOverlay = document.createElement('div');
  popupOverlay.className = 'popupOverlay';
  popupOverlay.id = 'popupOverlay';
  let flexContainer = '<div class="display-flex full-height"><div class="popup-box margin-auto">'
                      +  '<img class="popup-icon"></img>'
                      +  '<p class="popup-primary-text no-select">Alert primary text</p>'
                      +  '<p class="popup-secondary-text no-select" style="margin-bottom:0;">Alert secondary text</p>'
                      +  '</div></div></div>';
  popupOverlay.innerHTML = flexContainer;
  popupOverlay.tabIndex = 1;
  if (props.time) {
    setTimeout(function () {
      if (typeof done === 'function')
        done(true);
      clearNotification(popupOverlay);
    }, props.time);
  }

  document.body.appendChild( popupOverlay );
  if (props.popupIcon) {
    popupOverlay.querySelector('.popup-icon').src = props.popupIcon;
  } else {
    popupOverlay.querySelector('.popup-icon').style.display = 'none';
  }
  popupOverlay.querySelector('.popup-primary-text').textContent = props.primaryText || 'Notification';
  popupOverlay.querySelector('.popup-secondary-text').textContent = props.secondaryText || '';
  popupOverlay.style.display = 'block';
  setTimeout(function () {
    popupOverlay.style.opacity = '1';
    popupOverlay.querySelector('.popup-box').style.transform = 'scale(1)';
  }, 10);
  return popupOverlay;
}

let clearNotification = function (popupOverlay) {
  if (popupOverlay) {
    popupOverlay.querySelector('.popup-box').style.transform = 'scale(0)';
    popupOverlay.style.opacity = '0';
    setTimeout(function () {
      if (document.getElementById('popupOverlay'))
        document.body.removeChild(popupOverlay);
    }, 500);//more than transform-scale time
  }
}

let popupAlert = function(primaryText, secondaryText, popupIcon, done) {
  let popupOverlay = document.createElement('div');
  popupOverlay.className = 'popupOverlay';
  popupOverlay.id = 'popupOverlay';
  let flexContainer = '<div class="display-flex full-height"><div class="popup-box margin-auto">'
                      +  '<img class="popup-icon"></img>'
                      +  '<p class="popup-primary-text">Alert primary text</p>'
                      +  '<p class="popup-secondary-text">Alert secondary text</p>'
                      +  '<div class="popup-footer">'
                      +  '</div></div></div>';
  popupOverlay.innerHTML = flexContainer;
  popupOverlay.tabIndex = 1;
  popupOverlay.addEventListener('keydown', function(evt) {
    if (evt.which === 13) {
      if (typeof done === 'function')
        done(true);
      donePopup();
    } else if (evt.which === 27) {
      if (typeof done === 'function')
        done(false);
      donePopup();
    }
  });

  let btnOk = document.createElement('button');
  btnOk.className = 'btn btn-success btnOk full-width';
  btnOk.innerText = 'Ok';
  btnOk.addEventListener('click', function(evt) {
    if (typeof done === 'function')
      done(true);
    donePopup();
  });
  popupOverlay.querySelector('.popup-footer').appendChild(btnOk);
  document.body.appendChild( popupOverlay );
  if (!primaryText)
    primaryText = 'Click Ok to dismiss the alert.';
  if (popupIcon) {
    popupOverlay.querySelector('.popup-icon').src = popupIcon;
  } else {
    popupOverlay.querySelector('.popup-icon').style.display = 'none';
  }
  popupOverlay.querySelector('.popup-primary-text').textContent = primaryText;
  popupOverlay.querySelector('.popup-secondary-text').textContent = secondaryText;
  popupOverlay.style.display = 'block';
  setTimeout(function () {
    popupOverlay.style.opacity = '1';
    popupOverlay.querySelector('.popup-box').style.transform = 'scale(1)';
    btnOk.focus();
  }, 10);

  let donePopup = function() {
    popupOverlay.querySelector('.popup-box').style.transform = 'scale(0)';
    popupOverlay.style.opacity = '0';
    setTimeout(function () {
      if (document.getElementById('popupOverlay'))
        document.body.removeChild(popupOverlay);
    }, 500);//more than transform-scale time
  }
}

let popupConfirm = function(primaryText, secondaryText, popupIcon, done) {
  let popupOverlay = document.createElement('div');
  popupOverlay.className = 'popupOverlay';
  popupOverlay.id = 'popupOverlay';
  let flexContainer = '<div class="display-flex full-height"><div class="popup-box margin-auto">'
                      +  '<img class="popup-icon"></img>'
                      +  '<p class="popup-primary-text">Alert primary text</p>'
                      +  '<p class="popup-secondary-text">Alert secondary text</p>'
                      +  '<div class="popup-footer">'
                      +  '</div></div></div>';
  popupOverlay.innerHTML = flexContainer;
  popupOverlay.tabIndex = 1;
  popupOverlay.addEventListener('keydown', function(evt) {
    if (evt.which === 13) {
      if (typeof done === 'function')
        done(true);
      donePopup();
    } else if (evt.which === 27) {
      if (typeof done === 'function')
        done(false);
      donePopup();
    }
  });

  let btnOk = document.createElement('button');
  btnOk.className = 'btn btn-success btnOk half-width';
  btnOk.innerText = 'Ok';
  btnOk.addEventListener('click', function() {
    if (typeof done === 'function')
      done(true);
    donePopup();
  });
  let btnCancel = document.createElement('button');
  btnCancel.className = 'btn btn-danger btnCancel half-width';
  btnCancel.innerText = 'Cancel';
  btnCancel.addEventListener('click', function() {
    if (typeof done === 'function')
      done(false);
    donePopup();
  });
  popupOverlay.querySelector('.popup-footer').appendChild(btnCancel);
  popupOverlay.querySelector('.popup-footer').appendChild(btnOk);
  document.body.appendChild( popupOverlay );
  if (!secondaryText)
    // secondaryText = 'Click Ok to dismiss the Confirm.';
  if (primaryText){
    if ( !primaryText.endsWith('?'))
      primaryText += '?';
  } else {
    primaryText = 'Confirm?';
  }
  if (!popupIcon)
    popupOverlay.querySelector('.popup-icon').style.display = 'none';
  else
    popupOverlay.querySelector('.popup-icon').src = popupIcon;
  popupOverlay.querySelector('.popup-primary-text').innerText = primaryText;
  popupOverlay.querySelector('.popup-secondary-text').innerText = secondaryText;
  popupOverlay.style.display = 'block';
  setTimeout(function () {
    popupOverlay.style.opacity = '1';
    popupOverlay.querySelector('.popup-box').style.transform = 'scale(1)';
    btnOk.focus();
  }, 10);

  let donePopup = function() {
    popupOverlay.querySelector('.popup-box').style.transform = 'scale(0)';
    popupOverlay.style.opacity = '0';
    setTimeout(function () {
      if (document.getElementById('popupOverlay'))
        document.body.removeChild(popupOverlay);
    }, 500);//more than transform-scale time
  }
}

let popupPrompt = function(msg, about, done) {
  let popupOverlay = document.createElement('div');
  popupOverlay.className = 'popupOverlay';
  popupOverlay.id = 'popupOverlay';
  let flexContainer = '<div class="display-flex full-height"><div class="popup-box margin-auto">'
                      +  '<p class="popup-icon">Alert Title</p>'
                      +  '<p class="popup-body">Alert body</p>'
                      +  '<div class="popup-footer">'
                      +  '</div></div></div>';
  popupOverlay.innerHTML = flexContainer;
  popupOverlay.tabIndex = 1;

  let txtInput = document.createElement('input');
  txtInput.className = 'form-control';

  popupOverlay.addEventListener('keydown', function(evt) {
    evt.preventDefault();
    if (evt.which === 13) {
      if (typeof done === 'function')
        done(txtInput.value);
      donePopup();
    } else if (evt.which === 27) {
      if (typeof done === 'function')
        done(false);
      donePopup();
    }
  });

  let btnOk = document.createElement('button');
  btnOk.className = 'btn btn-success btnOk';
  btnOk.innerText = 'Ok';
  btnOk.addEventListener('click', function() {
    if (typeof done === 'function')
      done(txtInput.value);
    donePopup();
  });
  popupOverlay.querySelector('.popup-footer').appendChild(btnOk);

  let btnCancel = document.createElement('button');
  btnCancel.className = 'btn btn-danger btnCancel';
  btnCancel.innerText = 'Cancel';
  btnCancel.addEventListener('click', function() {
    if (typeof done === 'function')
      done(false);
    donePopup();
  });

  popupOverlay.querySelector('.popup-footer').appendChild(btnCancel);
  document.body.appendChild( popupOverlay );
  popupOverlay.querySelector('.popup-title').innerText = 'Prompt';
  if (about)
    popupOverlay.querySelector('.popup-title').innerText = about;
  if (!msg)
    msg = 'Click Ok to dismiss the Prompt.';
  popupOverlay.querySelector('.popup-body').innerText = msg;

  popupOverlay.querySelector('.popup-body').appendChild(txtInput);
  popupOverlay.style.display = 'block';
  setTimeout(function () {
    popupOverlay.style.opacity = '1';
    popupOverlay.querySelector('.popup-box').style.transform = 'scale(1)';
    txtInput.focus();
  }, 10);

  let donePopup = function() {
    popupOverlay.querySelector('.popup-box').style.transform = 'scale(0)';
    popupOverlay.style.opacity = '0';
    setTimeout(function () {
      if (document.getElementById('popupOverlay'))
        document.body.removeChild(popupOverlay);
    }, 500);//more than transform-scale time
  }
}
