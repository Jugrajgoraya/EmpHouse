class CreateEmployees < ActiveRecord::Migration[7.0]
  def change
    create_table :employees do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password_digest
      t.boolean :is_supervisor, default: :false
      t.boolean :mhe_license
      t.integer :avg_rating, default: 1
      t.string :status, default: "signed_out"
      t.datetime :sign_in_at
      t.datetime :sign_out_at
    end
  end
end
