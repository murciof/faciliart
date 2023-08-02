export function switch_element_with_prefix_visibility(prefix, category) {
  let elements = document.querySelectorAll('[id^=' + prefix + '-]')
  for (let i = 0; i < elements.length; i++) {
    if (
      elements[i].classList.contains('hidden') &&
      elements[i].id === prefix + '-' + category
    ) {
      elements[i].classList.replace('hidden', 'flex')
    } else if (
      elements[i].classList.contains('flex') &&
      elements[i].id !== prefix + '-' + category
    ) {
      elements[i].classList.replace('flex', 'hidden')
    }
  }
}

export function switch_element_visibility(to_hidden, to_show) {
  let element_to_hidden = document.getElementById(to_hidden)
  let element_to_show = document.getElementById(to_show)

  element_to_hidden.classList.replace('flex', 'hidden')
  element_to_show.classList.replace('hidden', 'flex')
}

export function render_action_buttons(operation) {
  let art_editor_create_layer_element = document.getElementById(
    'art_editor_create_layer'
  )
  let art_editor_update_layer_element = document.getElementById(
    'art_editor_update_layer'
  )
  let art_editor_back_to_main_element = document.getElementById(
    'art_editor_back_to_main'
  )
  let art_editor_back_to_generators_element = document.getElementById(
    'art_editor_back_to_generators'
  )
  if (operation == 'create') {
    art_editor_create_layer_element.classList.replace('hidden', 'btn')
    art_editor_back_to_generators_element.classList.replace('hidden', 'btn')

    art_editor_update_layer_element.classList.replace('btn', 'hidden')
    art_editor_back_to_main_element.classList.replace('btn', 'hidden')
  } else if (operation == 'edit') {
    art_editor_create_layer_element.classList.replace('btn', 'hidden')
    art_editor_back_to_generators_element.classList.replace('btn', 'hidden')

    art_editor_update_layer_element.classList.replace('hidden', 'btn')
    art_editor_back_to_main_element.classList.replace('hidden', 'btn')
  }
}

export function render_layer_creator(generator) {
  switch_element_visibility('art_editor_generators', 'art_editor_parameters')
  switch_element_with_prefix_visibility('parameters', generator)
  let points_element = document.getElementById(
    'parameter-' + generator + '-points'
  )
  points_element.disabled = false

  render_action_buttons('create')
}

export function render_layer_editor(layers, index) {
  let layer = layers[index]
  switch_element_visibility('art_editor_main', 'art_editor_parameters')
  switch_element_with_prefix_visibility('parameters', layer.generator)

  for (let i = 0; i < Object.keys(layer.parameters).length; i++) {
    let element = document.querySelectorAll(
      'input[id^=parameter-' +
        layer.generator +
        '-' +
        Object.keys(layer.parameters)[i] +
        ']'
    )
    element.value = layer.parameters[Object.keys(layer.parameters)[i]]
    let points_element = document.getElementById(
      'parameter-' + layer.generator + '-points'
    )
    points_element.disabled = true
  }
  render_action_buttons('edit')
}
