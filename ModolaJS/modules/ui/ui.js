Modola.ui = {};

Modola.defineGlobal("setAlignment", (obj, align) => {
  if (!align) return;

  obj.style.position = "absolute";

  requestAnimationFrame(() => {
    const rect = obj.getBoundingClientRect();
    const width = rect.width + "px";
    const height = rect.height + "px";

    if (align === "center") {
      obj.style.left = `calc(50% - ${width} / 2)`;
      obj.style.top = `calc(50% - ${height} / 2)`;
    } else if (align === "leftCenter") {
      obj.style.left = `0%`;
      obj.style.top = `calc(50% - ${height} / 2)`;
    } else if (align === "rightCenter") {
      obj.style.right = `0%`;
      obj.style.top = `calc(50% - ${height} / 2)`;
    } else if (align === "rightTop") {
      obj.style.right = `0%`;
      obj.style.top = `0%`;
    } else if (align === "leftTop") {
      obj.style.left = `0%`;
      obj.style.top = `0%`;
    } else if (align === "leftBottom") {
      obj.style.left = `0%`;
      obj.style.bottom = `0%`;
    } else if (align === "rightBottom") {
      obj.style.right = `0%`;
      obj.style.bottom = `0%`;
    }
  }
  );
});

Modola.defineGlobal("setSize", (obj, size) => {
  if (!size) return;

  requestAnimationFrame(() => {
    obj.style.width = `${size.width}px`;
    obj.style.height = `${size.height}px`;
  });
});

Modola.defineGlobal("setMinSize", (obj, size) => {
  if (!size) return;

  requestAnimationFrame(() => {
    obj.style.minWidth = `${size.width}px`;
    obj.style.minHeight = `${size.height}px`;
  });
});

Modola.defineGlobal("setMaxSize", (obj, size) => {
  if (!size) return;

  requestAnimationFrame(() => {
    obj.style.maxWidth = `${size.width}px`;
    obj.style.maxHeight = `${size.height}px`;
  });
});

Modola.defineGlobal("setPosition", (obj, position) => {
  if (!position) return;

  requestAnimationFrame(() => {
    obj.style.left = `calc(${obj.style.left} + ${position.x}px)`;
    obj.style.top = `calc(${obj.style.top} + ${position.y}px)`;
  });
});

Modola.defineGlobal("setShadow", (obj, shadow) => {
  if (!shadow) return;

  requestAnimationFrame(() => {
    obj.style.boxShadow = `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.color}`;
  });
});

Modola.defineGlobal("setDraggable", (obj, isDraggable) => {
  if (!isDraggable) return;

  let isDragging = false;
  let startX, startY, initialX, initialY, startZIndex;

  obj.style.position = "absolute";

  obj.addEventListener("mousedown", (e) => {
    isDragging = true;

    document.body.style.userSelect = "none";

    startX = e.clientX;
    startY = e.clientY;
    initialX = obj.offsetLeft;
    initialY = obj.offsetTop;
    startZIndex = obj.style.zIndex;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    const newLeft = initialX + dx;
    const newTop = initialY + dy;

    const maxLeft = document.body.clientWidth;
    if (newLeft >= maxLeft) {
      newLeft = 0;
      obj.style.width = '100%';
    }

    obj.style.left = newLeft + "px";
    obj.style.top = newTop + "px";

    obj.style.zIndex = 20;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;

    obj.style.zIndex = startZIndex;
    document.body.style.userSelect = "";
  });
});