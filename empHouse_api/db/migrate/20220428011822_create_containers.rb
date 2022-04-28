class CreateContainers < ActiveRecord::Migration[7.0]
  def change
    create_table :containers do |t|
      t.integer :number
      t.string :customer
      t.integer :size
      t.integer :weight
      t.integer :boxes
      t.date :due_date
      t.string :status, default: "due"
      t.datetime :started_at
      t.datetime :end_at
    end
  end
end
