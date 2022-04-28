class CreateShiftContainers < ActiveRecord::Migration[7.0]
  def change
    create_table :shift_containers do |t|
      t.references :shift, foreign_key: :true
      t.references :container, foreign_key: :true
      t.timestamps
    end
  end
end
