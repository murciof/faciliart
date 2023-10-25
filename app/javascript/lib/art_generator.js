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
    'input[id*=' + generator + ']'
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

export function generate_coordinates(parameters, generator, width, height) {
  let coordinates = new Array()
  for (let i = 0; i < parameters.points; i++) {
    if (generator === 'staticcircles') {
      coordinates.push({
        x: Math.floor(
          Math.random() *
            (width -
              +parameters.diameter / 2 -
              (0 + +parameters.diameter / 2)) +
            (0 + +parameters.diameter / 2)
        ),
        y: Math.floor(
          Math.random() *
            (height -
              +parameters.diameter / 2 -
              (0 + +parameters.diameter / 2)) +
            (0 + +parameters.diameter / 2)
        ),
      })
    } else if (generator === 'staticsquares') {
      coordinates.push({
        x: Math.floor(
          Math.random() *
            (width - +parameters.size / 2 - (0 + +parameters.size / 2)) +
            (0 + +parameters.size / 2)
        ),
        y: Math.floor(
          Math.random() *
            (height - +parameters.size / 2 - (0 + +parameters.size / 2)) +
            (0 + +parameters.size / 2)
        ),
      })
    } else if (
      generator.startsWith('animated') ||
      generator.startsWith('dynamic')
    ) {
      coordinates.push({
        x: Math.floor(
          Math.random() *
            (width - +parameters.limit / 2 - (0 + +parameters.limit / 2)) +
            (0 + +parameters.limit / 2)
        ),
        y: Math.floor(
          Math.random() *
            (height - +parameters.limit / 2 - (0 + +parameters.limit / 2)) +
            (0 + +parameters.limit / 2)
        ),
      })
    } else if (generator === 'staticrectangles') {
      coordinates.push({
        x: Math.floor(
          Math.random() *
            (width - +parameters.width / 2 - (0 + +parameters.width / 2)) +
            (0 + +parameters.width / 2)
        ),
        y: Math.floor(
          Math.random() *
            (height - +parameters.height / 2 - (0 + +parameters.height / 2)) +
            (0 + +parameters.height / 2)
        ),
      })
    } else {
      coordinates.push({
        x: Math.floor(Math.random() * (width - 0) + 0),
        y: Math.floor(Math.random() * (height - 0) + 0),
      })
    }
  }
  return coordinates
}

export function generate_dimensions(parameters, generator) {
  let dimensions
  if (generator.startsWith('dynamic')) {
    dimensions = new Array()
    for (let i = 0; i < parameters.points; i++) {
      dimensions.push({
        x: Math.floor(Math.random() * (parameters.limit - 1) + 1),
        y: Math.floor(Math.random() * (parameters.limit - 1) + 1),
      })
    }
  }
  return dimensions
}

export function scan_unfinished_layer_index(data) {
  let index
  for (let i = 0; i < data['layers'].length; i++) {
    if (data['layers'][i].finished == false) {
      index = i
      break
    }
  }
  return index
}

export function update_general_properties(data) {
  let data_element = document.getElementById('data')
  let width = document.getElementById('parameter-width').value
  let height = document.getElementById('parameter-height').value
  let bg = document.getElementById('parameter-bg').value

  data['general'] = { width: width, height: height, bg: bg }

  data_element.innerHTML = JSON.stringify(data)
}

export function create_layer(data, finished) {
  let generator = get_checked_generator()
  let parameters = get_parameters(generator)
  if (typeof generator !== 'undefined') {
    if (finished) {
      if (typeof scan_unfinished_layer_index(data) === 'undefined') {
        data['layers'].push({
          generator: generator,
          coordinates: generate_coordinates(
            parameters,
            generator,
            data.general.width ? data.general.width : 400,
            data.general.height ? data.general.height : 400
          ),
          parameters: parameters,
          dimensions: generate_dimensions(parameters, generator),
          finished: finished,
        })
      } else {
        data['layers'][scan_unfinished_layer_index(data)].parameters =
          parameters
        data['layers'][scan_unfinished_layer_index(data)].finished = true
      }
    } else {
      if (typeof scan_unfinished_layer_index(data) === 'undefined') {
        data['layers'].push({
          generator: generator,
          coordinates: generate_coordinates(
            parameters,
            generator,
            data.general.width ? data.general.width : 400,
            data.general.height ? data.general.height : 400
          ),
          parameters: parameters,
          dimensions: generate_dimensions(parameters, generator),
          finished: finished,
        })
      } else {
        data['layers'][scan_unfinished_layer_index(data)].parameters =
          parameters
        data['layers'][scan_unfinished_layer_index(data)].dimensions =
          generate_dimensions(parameters, generator)
        data['layers'][scan_unfinished_layer_index(data)].coordinates =
          generate_coordinates(
            parameters,
            generator,
            data.general.width ? data.general.width : 400,
            data.general.height ? data.general.height : 400
          )
      }
    }

    update_data_field(data)
    render_layer_buttons(data)
  }
}

export function update_layer(data, index) {
  /*
  for (
    let i = 0;
    i < Object.keys(data['layers'][index].parameters).length;
    i++
  ) {
    let element = document.getElementById(
      'parameter-' +
        data['layers'][index].generator +
        '-' +
        Object.keys(data['layers'][index].parameters)[i]
    )
    if (element.type == 'checkbox') {
      data['layers'][index].parameters[
        Object.keys(data['layers'][index].parameters)[i]
      ] = element.checked
    } else {
      data['layers'][index].parameters[
        Object.keys(data['layers'][index].parameters)[i]
      ] = element.value
    }
  }
  */

  let color_element = document.getElementById(
    'parameter-' + data['layers'][index].generator + '-color'
  )
  let fill_element = document.getElementById(
    'parameter-' + data['layers'][index].generator + '-fill'
  )
  let stroke_element = document.getElementById(
    'parameter-' + data['layers'][index].generator + '-stroke'
  )

  data['layers'][index].parameters.color = color_element.value
  data['layers'][index].parameters.fill = fill_element.checked
  data['layers'][index].parameters.stroke = stroke_element.value

  update_data_field(data)
}

function update_data_field(data) {
  let data_element = document.getElementById('data')
  data_element.innerHTML = JSON.stringify(data)
}

export function delete_layer(data, index) {
  if (typeof index !== 'undefined') {
    let data_element = document.getElementById('data')
    data['layers'].splice(index, 1)
    data_element.innerHTML = JSON.stringify(data)
    render_layer_buttons(data)
  }
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
      case 'staticcircles':
        draw_static_circles(
          data['layers'][i].coordinates,
          data['layers'][i].parameters.diameter,
          p5
        )
        break
      case 'dynamiccircles':
        draw_dynamic_circles(
          data['layers'][i].coordinates,
          data['layers'][i].dimensions,
          p5
        )
        break
      case 'animatedcircles':
        draw_animated_circles(
          data['layers'][i].coordinates,
          data['layers'][i].parameters.limit,
          p5
        )
        break
      case 'staticsquares':
        draw_static_squares(
          data['layers'][i].coordinates,
          data['layers'][i].parameters.size,
          p5
        )
        break
      case 'dynamicsquares':
        draw_dynamic_squares(
          data['layers'][i].coordinates,
          data['layers'][i].dimensions,
          p5
        )
        break
      case 'animatedsquares':
        draw_animated_squares(
          data['layers'][i].coordinates,
          data['layers'][i].parameters.limit,
          p5
        )
        break
      case 'staticrectangles':
        draw_static_rectangles(
          data['layers'][i].coordinates,
          data['layers'][i].parameters.width,
          data['layers'][i].parameters.height,
          p5
        )
        break
      case 'dynamicrectangles':
        draw_dynamic_circles(
          data['layers'][i].coordinates,
          data['layers'][i].dimensions,
          p5
        )
        break
      case 'animatedrectangles':
        draw_animated_rectangles(
          data['layers'][i].coordinates,
          data['layers'][i].parameters.limit,
          p5
        )
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
      ' class="flex flex-col"><hr class="border-t border-neutral mb-2 w-full"/><div class="flex flex-row justify-between"><div>' +
      data['layers'][i].generator +
      '</div><div class="flex flex-row gap-2"><a class="flex" href="javascript:void(0)" onClick="UserInterface.render_layer_editor(art_editor_data, ' +
      i +
      ');art_editor_layer_index = ' +
      i +
      '"><i class="ph ph-pencil-line text-2xl"></i></a><a class="flex" href="javascript:void(0)" onClick="ArtGenerator.delete_layer(art_editor_data, ' +
      i +
      ')"><i class="ph ph-trash text-2xl"></i></a></div></div></div>'
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

export function draw_static_circles(coordinates, diameter, p5) {
  for (let i = 0; i < coordinates.length; i++) {
    p5.circle(coordinates[i].x, coordinates[i].y, diameter)
  }
}

export function draw_dynamic_circles(coordinates, dimensions, p5) {
  for (let i = 0; i < coordinates.length; i++) {
    p5.circle(coordinates[i].x, coordinates[i].y, dimensions[i].x)
  }
}

export function draw_animated_circles(coordinates, limit, p5) {
  for (let i = 0; i < coordinates.length; i++) {
    p5.circle(
      coordinates[i].x,
      coordinates[i].y,
      Math.floor(Math.random() * (limit - 1) + 1)
    )
  }
}

export function draw_static_squares(coordinates, size, p5) {
  for (let i = 0; i < coordinates.length; i++) {
    p5.square(coordinates[i].x, coordinates[i].y, size)
  }
}

export function draw_dynamic_squares(coordinates, dimensions, p5) {
  for (let i = 0; i < coordinates.length; i++) {
    p5.square(coordinates[i].x, coordinates[i].y, dimensions[i].x)
  }
}

export function draw_animated_squares(coordinates, limit, p5) {
  for (let i = 0; i < coordinates.length; i++) {
    p5.square(
      coordinates[i].x,
      coordinates[i].y,
      Math.floor(Math.random() * (limit - 1) + 1)
    )
  }
}

export function draw_static_rectangles(coordinates, width, height, p5) {
  for (let i = 0; i < coordinates.length; i++) {
    p5.rect(coordinates[i].x, coordinates[i].y, width, height)
  }
}

export function draw_dynamic_rectangles(coordinates, dimensions, p5) {
  for (let i = 0; i < coordinates.length; i++) {
    p5.rect(
      coordinates[i].x,
      coordinates[i].y,
      dimensions[i].x,
      dimensions[i].y
    )
  }
}

export function draw_animated_rectangles(coordinates, limit, p5) {
  for (let i = 0; i < coordinates.length; i++) {
    p5.rect(
      coordinates[i].x,
      coordinates[i].y,
      Math.floor(Math.random() * (limit - 1) + 1),
      Math.floor(Math.random() * (limit - 1) + 1)
    )
  }
}
