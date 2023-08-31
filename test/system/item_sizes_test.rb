require "application_system_test_case"

class ItemSizesTest < ApplicationSystemTestCase
  setup do
    @item_size = item_sizes(:one)
  end

  test "visiting the index" do
    visit item_sizes_url
    assert_selector "h1", text: "Item sizes"
  end

  test "should create item size" do
    visit item_sizes_url
    click_on "New item size"

    fill_in "Item", with: @item_size.item_id
    fill_in "Price", with: @item_size.price
    fill_in "Size", with: @item_size.size
    click_on "Create Item size"

    assert_text "Item size was successfully created"
    click_on "Back"
  end

  test "should update Item size" do
    visit item_size_url(@item_size)
    click_on "Edit this item size", match: :first

    fill_in "Item", with: @item_size.item_id
    fill_in "Price", with: @item_size.price
    fill_in "Size", with: @item_size.size
    click_on "Update Item size"

    assert_text "Item size was successfully updated"
    click_on "Back"
  end

  test "should destroy Item size" do
    visit item_size_url(@item_size)
    click_on "Destroy this item size", match: :first

    assert_text "Item size was successfully destroyed"
  end
end
