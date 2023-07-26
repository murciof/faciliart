export function get_checked_generator() {
  let generators_element = document.getElementsByName("art[generator_type]")
  for (let i = 0; i < generators_element.length; i++) {
    if (generators_element[i].checked) {
      var generator = generators_element[i].value
      break
    }
  }
  return generator
}

export function get_parameters(generator) {
  const regex = RegExp("\\b(\\w+)$")
  let parameters_elements = document.querySelectorAll(
    "input[id^=parameter-" + generator + "]"
  )
  let parameters_names = []
  for (let i = 0; i < parameters_elements.length; i++) {
    parameters_names.push(regex.exec(parameters_elements[i].id)[0])
  }
  let parameters = []
  for (let i = 0; i < parameters_names.length; i++) {
    parameters[parameters_names[i]] = parameters_elements[i].value
  }
  return Object.assign({}, parameters)
}

export function generate_coordinates(points) {
  let coordinates = new Array()
  for (let i = 0; i < points; i++) {
    coordinates.push({
      x: Math.floor(Math.random() * (400 - 0) + 0),
      y: Math.floor(Math.random() * (400 - 0) + 0),
    })
  }
  return coordinates
}

export function create_layer(layers) {
  let generator = get_checked_generator()
  let parameters = get_parameters(generator)
  let data_element = document.getElementById("data")
  if (typeof generator !== "undefined") {
    layers.push({
      generator: generator,
      coordinates: generate_coordinates(parameters.points),
      parameters: parameters,
    })
    data_element.innerHTML = JSON.stringify(layers)
    render_layer_buttons(layers)
    render_layers(layers)
  }
}

export function delete_layer(layers, index) {
  let data_element = document.getElementById("data")
  layers.splice(index, 1)
  data_element.innerHTML = JSON.stringify(layers)
  render_layer_buttons(layers)
  render_layers(layers)
}

export function render_layers(layers) {
  clear()
  background(255)
  for (let i = 0; i < layers.length; i++) {
    switch (layers[i].generator) {
      case "line":
        draw_lines(layers[i].coordinates)
      case "curve":
      /* TODO - Fix Bug
      draw_curves(layers[i].coordinates)
      */
      case "polygon":
      //
    }
  }
}

export function render_layer_buttons(layers) {
  let layers_element = document.getElementById("layers")
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
  for (let i = 0; i < coordinates.length - 3; i++) {
    curve(
      coordinates[i].x,
      coordinates[i].y,
      coordinates[i + 1].x,
      coordinates[i + 1].y,
      coordinates[i + 2].x,
      coordinates[i + 2].y,
      coordinates[i + 3].x,
      coordinates[i + 3].y
    )
  }
}

export function draw_polygon(coordinates) {
  //
}
