export function refresh_slider_value(value, id) {
  let slider_value = document.getElementById(id + '-value')
  slider_value.innerHTML = value
}
