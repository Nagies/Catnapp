json.array!(@spaces) do |space|
  json.extract! space, :id, :address, :rate, :lat, :lng, :description, :user_id, :email, :image
  json.url space_url(space, format: :json)
end
