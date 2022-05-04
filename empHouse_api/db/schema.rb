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

ActiveRecord::Schema[7.0].define(version: 2022_04_28_024512) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "container_assignments", force: :cascade do |t|
    t.bigint "employee_id"
    t.bigint "container_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["container_id"], name: "index_container_assignments_on_container_id"
    t.index ["employee_id"], name: "index_container_assignments_on_employee_id"
  end

  create_table "containers", force: :cascade do |t|
    t.integer "number"
    t.string "customer"
    t.integer "size"
    t.integer "weight"
    t.integer "boxes"
    t.date "due_date"
    t.string "status", default: "due"
    t.datetime "started_at"
    t.datetime "end_at"
  end

  create_table "employees", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.boolean "is_supervisor", default: false
    t.boolean "mhe_license"
    t.integer "avg_rating", default: 1
    t.string "status", default: "signed_out"
    t.datetime "sign_in_at"
    t.datetime "sign_out_at"
  end

  create_table "shift_assignments", force: :cascade do |t|
    t.bigint "employee_id"
    t.bigint "shift_id"
    t.integer "rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_shift_assignments_on_employee_id"
    t.index ["shift_id"], name: "index_shift_assignments_on_shift_id"
  end

  create_table "shift_containers", force: :cascade do |t|
    t.bigint "shift_id"
    t.bigint "container_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["container_id"], name: "index_shift_containers_on_container_id"
    t.index ["shift_id"], name: "index_shift_containers_on_shift_id"
  end

  create_table "shifts", force: :cascade do |t|
    t.date "date"
    t.string "sub_time"
    t.string "supervisor"
    t.string "location"
    t.string "status", default: "created"
    t.text "comments"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "container_assignments", "containers"
  add_foreign_key "container_assignments", "employees"
  add_foreign_key "shift_assignments", "employees"
  add_foreign_key "shift_assignments", "shifts"
  add_foreign_key "shift_containers", "containers"
  add_foreign_key "shift_containers", "shifts"
end
