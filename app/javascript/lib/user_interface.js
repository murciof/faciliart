export function switch_category_visibility(prefix, category) {
  let categories_elements = document.querySelectorAll("[id^=" + prefix + "-]")
  for (let i = 0; i < categories_elements.length; i++) {
    if (
      categories_elements[i].classList.contains("hidden") &&
      categories_elements[i].id === prefix + "-" + category
    ) {
      categories_elements[i].classList.replace("hidden", "flex")
    } else if (
      categories_elements[i].classList.contains("flex") &&
      categories_elements[i].id !== prefix + "-" + category
    ) {
      categories_elements[i].classList.replace("flex", "hidden")
    }
  }
}
