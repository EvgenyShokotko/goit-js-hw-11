export function onSliderMake() {
  const lightbox = new SimpleLightbox('.gallery a', {
    close: true,
    showCounter: true,
    preloading: true,
    enableKeyboard: true,
    docClose: true,
    disableScroll: true,
  });
  lightbox.refresh();
}
