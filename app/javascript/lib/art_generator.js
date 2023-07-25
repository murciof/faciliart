export function get_checked_generator() {
  var generators_element = document.getElementsByName("art[generator_type]")
  for (let i = 0; i < generators_element.length; i++) {
    if (generators_element[i].checked) {
      var generator = generators_element[i].value
      break
    }
  }
  return generator
}

export function generate_coordinates() {
  var coordinates = new Array()
  for (let i = 0; i < 100; i++) {
    coordinates.push({
      x: Math.floor(Math.random() * (400 - 0) + 0),
      y: Math.floor(Math.random() * (400 - 0) + 0),
    })
  }
  return coordinates
}

export function create_layer(layers) {
  var generator = get_checked_generator()
  var data_element = document.getElementById("data")
  if (typeof generator !== "undefined") {
    layers.push({ generator: generator, coordinates: generate_coordinates() })
    data_element.innerHTML = JSON.stringify(layers)
    render_layer_buttons(layers)
    render_layers(layers)
  }
}

export function delete_layer(layers, index) {
  layers.splice(index, 1)
  render_layer_buttons(layers)
  render_layers(layers)
}

export function render_layers(layers) {
  clear()
  background(255)
  for (let i = 0; i < layers.length; i++) {
    switch (layers[i].generator) {
      case "Line":
        draw_lines(layers[i].coordinates)
      case "Curve":
      //
      case "Polygon":
      //
    }
  }
}

export function render_layer_buttons(layers) {
  var layers_element = document.getElementById("layers")
  layers_element.innerHTML = ""
  for (let i = 0; i < layers.length; i++) {
    layers_element.innerHTML +=
      '<a href="javascript:void(0)" onClick="ArtGenerator.delete_layer(layers, ' +
      i +
      ')" class="btn btn-outline w-full" id=layer-' +
      i +
      ">" +
      layers[i].generator +
      "</a>"
  }
}

export function draw_lines(coordinates) {
  for (let i = 0; i < coordinates.length - 1; i++) {
    line(
      coordinates[i].x,
      coordinates[i].y,
      coordinates[i + 1].x,
      coordinates[i + 1].y
    )
  }
}

export function draw_curves(coordinates) {
  //
}

export function draw_polygon(coordinates) {
  //
}
