class CreateShifts < ActiveRecord::Migration[7.0]
  def change
    create_table :shifts do |t|
      t.date :date
      t.string :sub_time
      t.string :supervisor
      t.string :location
      t.string :status, default: "created"
      t.text :comments
      t.timestamps
    end
  end
end
