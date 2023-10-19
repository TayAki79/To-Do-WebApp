'use strict';

// JavaScript-Code, um die Bildschirmorientierung zu sperren
window.addEventListener("orientationchange", function() {
  var orientation = window.orientation;

  // Nur im Querformat (Landscape) zulassen
  if (orientation !== 90 && orientation !== -90) {
    // Bildschirmorientierung sperren
    screen.lockOrientationUniversal = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;
    if (screen.lockOrientationUniversal) {
      screen.lockOrientationUniversal("landscape");
    }
  }
});
