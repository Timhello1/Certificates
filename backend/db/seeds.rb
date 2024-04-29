# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.find_or_create_by(email: 'test@test.pl') do |u|
  u.password = 'test123'
end

Certificate.create(name: 'Certificate 1', description: 'Description 1', user: user)
Certificate.create(name: 'Certificate 2', description: 'Description 2', user: user)