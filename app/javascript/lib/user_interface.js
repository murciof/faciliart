export function switch_element_with_prefix_visibility(prefix, category) {
  // TODO: change dash to underscore
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

export function switch_button_fill(to_fill) {
  let elements_to_outline = document.querySelectorAll('[id$=_btn]')
  let element_to_fill = document.getElementById(to_fill)

  for (let i = 0; i < elements_to_outline.length; i++) {
    elements_to_outline[i].classList.add('btn-outline')
  }
  element_to_fill.classList.remove('btn-outline')
}

export function switch_section_visibility(to_show) {
  let elements_to_hide = document.querySelectorAll('[id$=_sec]')
  let element_to_show = document.getElementById(to_show)

  for (let i = 0; i < elements_to_hide.length; i++) {
    elements_to_hide[i].classList.replace('flex', 'hidden')
  }

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
    art_editor_update_layer_element.classList.replace('btn', 'hidden')

    art_editor_back_to_generators_element.classList.add(
      'btn',
      'btn-primary',
      'btn-outline'
    )
    art_editor_back_to_generators_element.classList.remove('hidden')
    art_editor_back_to_main_element.classList.add('hidden')
    art_editor_back_to_main_element.classList.remove(
      'btn',
      'btn-primary',
      'btn-outline'
    )
  } else if (operation == 'edit') {
    art_editor_create_layer_element.classList.replace('btn', 'hidden')
    art_editor_update_layer_element.classList.replace('hidden', 'btn')

    art_editor_back_to_generators_element.classList.add('hidden')
    art_editor_back_to_generators_element.classList.remove(
      'btn',
      'btn-primary',
      'btn-outline'
    )

    art_editor_back_to_main_element.classList.add(
      'btn',
      'btn-primary',
      'btn-outline'
    )
    art_editor_back_to_main_element.classList.remove('hidden')
  }
}

export function render_layer_creator(generator) {
  switch_element_visibility('art_editor_generators', 'art_editor_parameters')
  switch_element_visibility(
    'art_editor_parameters_' + generator + '_edit',
    'art_editor_parameters_' + generator + '_create'
  )
  switch_element_with_prefix_visibility('parameters', generator)
  let points_element = document.getElementById(
    'parameter-' + generator + '-points'
  )
  let points_element_value = document.getElementById(
    'parameter-' + generator + '-points-value'
  )
  points_element.disabled = false
  points_element.classList.remove('opacity-25')
  points_element_value.classList.remove('opacity-75')

  render_action_buttons('create')
}

export function render_layer_editor(data, index) {
  let layer = data['layers'][index]
  switch_element_visibility('art_editor_main', 'art_editor_parameters')
  switch_element_visibility(
    'art_editor_parameters_' + layer.generator + '_create',
    'art_editor_parameters_' + layer.generator + '_edit'
  )
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
    let points_element_value = document.getElementById(
      'parameter-' + layer.generator + '-points-value'
    )
    points_element.disabled = true
    points_element.classList.add('opacity-25')
    points_element_value.classList.add('opacity-75')
  }
  render_action_buttons('edit')
}

export function update_editor_fields(data) {
  let width_element = document.getElementById('parameter-width')
  let height_element = document.getElementById('parameter-height')
  let bg_element = document.getElementById('parameter-bg')

  width_element.value = data.general.width
  height_element.value = data.general.height
  bg_element.value = data.general.bg
}

export function update_order_price(price) {
  document.getElementById('price').innerHTML = price
}

export function uncheck_radio_with_prefix(prefix) {
  let radio_buttons = document.querySelectorAll('[id^=' + prefix + '_]')
  for (let i = 0; i < radio_buttons.length; i++) {
    radio_buttons[i].checked = false
  }
}
