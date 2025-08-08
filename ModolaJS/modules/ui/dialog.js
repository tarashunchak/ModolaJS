Modola.ui.createDialog = (_1, _2, config) => {
  const widget = Modola.ui.createWidget(_1, _2, config);
  const cancelBtn = Modola.ui.createButton("Cancel", _1, { id: `${config.text}:Cancel`, text: 'Cancel', onClick: config.onDeny });
  const OKBtn = Modola.ui.createButton("OK", _1, { id: `${config.text}:OK`, text: `OK`, onClick: config.onApply });

  widget.value.appendChild(cancelBtn.value);
  widget.value.appendChild(OKBtn.value);

  cancelBtn.value.style.width = '100px';
  OKBtn.value.style.width = '100px';
  return widget;
};