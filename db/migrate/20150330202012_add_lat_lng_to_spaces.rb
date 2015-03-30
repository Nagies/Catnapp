class AddLatLngToSpaces < ActiveRecord::Migration
  def change
    add_column :spaces, :lat, :float
    add_column :spaces, :lng, :float
  end
end
