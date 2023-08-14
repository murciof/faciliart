export function get_checked_generator() {
  let generators_element = document.getElementsByName('art[generator_type]')
  for (let i = 0; i < generators_element.length; i++) {
    if (generators_element[i].checked) {
      var generator = generators_element[i].value
      break
    }
  }
  return generator
}

export function get_parameters(generator) {
  const regex = RegExp('\\b(\\w+)$')
  let parameters_elements = document.querySelectorAll(
    'input[id^=parameter-' + generator + ']'
  )
  let parameters_names = []
  for (let i = 0; i < parameters_elements.length; i++) {
    parameters_names.push(regex.exec(parameters_elements[i].id)[0])
  }
  let parameters = []
  for (let i = 0; i < parameters_names.length; i++) {
    if (parameters_elements[i].type == 'checkbox') {
      parameters[parameters_names[i]] = parameters_elements[i].checked
    } else {
      parameters[parameters_names[i]] = parameters_elements[i].value
    }
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

export function update_general_properties(data) {
  let data_element = document.getElementById('data')
  let width = document.getElementById('parameter-width').value
  let height = document.getElementById('parameter-height').value
  let bg = document.getElementById('parameter-bg').value

  data['general'] = { width: width, height: height, bg: bg }

  data_element.innerHTML = JSON.stringify(data)
}

export function create_layer(data) {
  let generator = get_checked_generator()
  let parameters = get_parameters(generator)
  let data_element = document.getElementById('data')
  if (typeof generator !== 'undefined') {
    data['layers'].push({
      generator: generator,
      coordinates: generate_coordinates(parameters.points),
      parameters: parameters,
    })
    data_element.innerHTML = JSON.stringify(data)
    render_layer_buttons(data)
  }
}

export function delete_layer(data, index) {
  let data_element = document.getElementById('data')
  data['layers'].splice(index, 1)
  data_element.innerHTML = JSON.stringify(data)
  render_layer_buttons(data)
}

export function render_layers(data, bg, p5) {
  p5.clear()
  if (bg) {
    p5.background(bg)
  } else {
    p5.background(255)
  }
  for (let i = 0; i < data['layers'].length; i++) {
    let color = ''
    if (data['layers'][i].parameters.color != '') {
      color = data['layers'][i].parameters.color
    } else {
      color = '#000000'
    }
    p5.beginShape()

    if (data['layers'][i].parameters.fill) {
      p5.fill(color)
    } else {
      p5.noFill()
    }

    p5.stroke(color)
    p5.strokeWeight(data['layers'][i].parameters.stroke)
    switch (data['layers'][i].generator) {
      case 'line':
        draw_lines(data['layers'][i].coordinates, p5)
        break
      case 'curve':
        draw_curves(data['layers'][i].coordinates, p5)
        break
      case 'polygon':
        draw_polygon(data['layers'][i].coordinates, p5)
        break
    }
    p5.endShape()
  }
}

export function render_layer_buttons(data) {
  let layers_element = document.getElementById('layers')
  layers_element.innerHTML = ''
  for (let i = 0; i < data['layers'].length; i++) {
    layers_element.innerHTML +=
      '<div id=layer-' +
      i +
      ' class="flex flex-col"><hr class="border-t border-black/20 mb-2 w-full"/><div class="flex flex-row justify-between"><div>' +
      data['layers'][i].generator +
      '</div><div class="flex flex-row gap-2"><a href="javascript:void(0)" onClick="UserInterface.render_layer_editor(art_editor_data, ' +
      i +
      ')">Edit</a><a href="javascript:void(0)" onClick="ArtGenerator.delete_layer(art_editor_data, ' +
      i +
      ')">Del</a></div></div></div>'
  }
}

export function draw_lines(coordinates, p5) {
  for (let i = 0; i < coordinates.length; i++) {
    p5.vertex(coordinates[i].x, coordinates[i].y)
  }
}

export function draw_curves(coordinates, p5) {
  for (let i = 0; i < coordinates.length; i++) {
    p5.curveVertex(coordinates[i].x, coordinates[i].y)
  }
}

export function draw_polygon(coordinates, p5) {
  p5.vertex(coordinates[0].x, coordinates[0].y)
  for (let i = 0; i < coordinates.length; i++) {
    p5.vertex(coordinates[i].x, coordinates[i].y)
  }
  p5.vertex(coordinates[0].x, coordinates[0].y)
}
