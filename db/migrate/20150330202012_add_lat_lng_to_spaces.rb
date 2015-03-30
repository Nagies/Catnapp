class AddLatLngToSpaces < ActiveRecord::Migration
  def change
    add_column :spaces, :lat, :integer
    add_column :spaces, :lng, :integer
  end
end
