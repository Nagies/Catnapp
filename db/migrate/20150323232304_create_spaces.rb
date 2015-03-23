class CreateSpaces < ActiveRecord::Migration
  def change
    create_table :spaces do |t|
      t.string :address
      t.integer :rate
      t.text :description
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
