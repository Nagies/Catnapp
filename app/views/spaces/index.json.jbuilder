json.array!(@spaces) do |space|
  json.extract! space, :id, :address, :rate, :description, :user_id
  json.url space_url(space, format: :json)
end
