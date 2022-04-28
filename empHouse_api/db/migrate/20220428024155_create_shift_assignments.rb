class CreateShiftAssignments < ActiveRecord::Migration[7.0]
  def change
    create_table :shift_assignments do |t|
      t.references :employee, foreign_key: :true
      t.references :shift, foreign_key: :true
      t.integer :rating
      t.timestamps
    end
  end
end
