require "application_system_test_case"

class ArtsTest < ApplicationSystemTestCase
  setup do
    @art = arts(:one)
  end

  test "visiting the index" do
    visit arts_url
    assert_selector "h1", text: "Arts"
  end

  test "should create art" do
    visit arts_url
    click_on "New art"

    fill_in "Name", with: @art.name
    click_on "Create Art"

    assert_text "Art was successfully created"
    click_on "Back"
  end

  test "should update Art" do
    visit art_url(@art)
    click_on "Edit this art", match: :first

    fill_in "Name", with: @art.name
    click_on "Update Art"

    assert_text "Art was successfully updated"
    click_on "Back"
  end

  test "should destroy Art" do
    visit art_url(@art)
    click_on "Destroy this art", match: :first

    assert_text "Art was successfully destroyed"
  end
end
