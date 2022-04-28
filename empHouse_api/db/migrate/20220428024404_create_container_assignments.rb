class CreateContainerAssignments < ActiveRecord::Migration[7.0]
  def change
    create_table :container_assignments do |t|
      t.references :employee, foreign_key: :true
      t.references :container, foreign_key: :true
      t.timestamps
    end
  end
end
