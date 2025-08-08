const MODOLA_STD_WIDGET = "modola-std-widget";

Modola.ui.createWidget = (_1, _2, config = {}) => {
  const widget = document.createElement("div");
  //widget.textContent = text;

  if (config.emitEvent) {
    Modola.events.emit(config.emitEvent);
  }

  widget.classList.add(MODOLA_STD_WIDGET);

  if (config.class) {
    const classes = config.class.split(" ");
    widget.classList.add(...classes);
  }

  if (config.id) widget.id = config.id;

  const container = config.appendTo ? document.querySelector(config.appendTo)
    : document.body;
  container.appendChild(widget);
  if (config.style && typeof config.style === "object") {
    for (const [prop, value] of Object.entries(config.style)) {
      widget.style[prop] = value;
    }
  }

  Modola.global.setSize(widget, config.size);
  Modola.global.setMinSize(widget, config.minSize);
  Modola.global.setMaxSize(widget, config.maxSize);
  Modola.global.setAlignment(widget, config.align);
  Modola.global.setPosition(widget, config.position);
  Modola.global.setShadow(widget, config.shadow);
  Modola.global.setDraggable(widget, config.draggable);

  return {
    type: "UI",
    innerType: "UI::Widget",
    value: widget
  };
};