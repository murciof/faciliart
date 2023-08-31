require "test_helper"

class ItemSizesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @item_size = item_sizes(:one)
  end

  test "should get index" do
    get item_sizes_url
    assert_response :success
  end

  test "should get new" do
    get new_item_size_url
    assert_response :success
  end

  test "should create item_size" do
    assert_difference("ItemSize.count") do
      post item_sizes_url, params: { item_size: { item_id: @item_size.item_id, price: @item_size.price, size: @item_size.size } }
    end

    assert_redirected_to item_size_url(ItemSize.last)
  end

  test "should show item_size" do
    get item_size_url(@item_size)
    assert_response :success
  end

  test "should get edit" do
    get edit_item_size_url(@item_size)
    assert_response :success
  end

  test "should update item_size" do
    patch item_size_url(@item_size), params: { item_size: { item_id: @item_size.item_id, price: @item_size.price, size: @item_size.size } }
    assert_redirected_to item_size_url(@item_size)
  end

  test "should destroy item_size" do
    assert_difference("ItemSize.count", -1) do
      delete item_size_url(@item_size)
    end

    assert_redirected_to item_sizes_url
  end
end
