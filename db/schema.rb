# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_09_19_162532) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "arts", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "data"
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_arts_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.text "content"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "art_id", null: false
    t.index ["art_id"], name: "index_comments_on_art_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "item_sizes", force: :cascade do |t|
    t.bigint "item_id", null: false
    t.string "size"
    t.decimal "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_item_sizes_on_item_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "art_id", null: false
    t.bigint "user_id", null: false
    t.bigint "item_id", null: false
    t.bigint "item_size_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "artist_rate"
    t.index ["art_id"], name: "index_orders_on_art_id"
    t.index ["item_id"], name: "index_orders_on_item_id"
    t.index ["item_size_id"], name: "index_orders_on_item_size_id"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "settings", force: :cascade do |t|
    t.decimal "artist_rate", default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.boolean "is_admin", default: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "arts", "users"
  add_foreign_key "comments", "arts"
  add_foreign_key "comments", "users"
  add_foreign_key "item_sizes", "items"
  add_foreign_key "orders", "arts"
  add_foreign_key "orders", "item_sizes"
  add_foreign_key "orders", "items"
  add_foreign_key "orders", "users"
end
