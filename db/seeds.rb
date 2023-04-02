# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 

  PRONOUNS = ['ey/em', 'he/him', 'ne/nem', 'she/her', 'they/them', 've/ver', 'xe/xem', 'xie,xem', 'ze/zir']

  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'demo', 
    email: 'demo@pin.drip', 
    password: 'pindrip'
  )

  # Creating users with minimum information
  5.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'pindrip'
    }) 
  end

  # Creating users with more information (no website info)
  10.times do
    User.create!({
      username: Faker::Creature::Cat.unique.name,
      email: Faker::Internet.unique.safe_email,
      password: 'pindrip',
      first_name: Faker::Music::Hiphop.artist,
      last_name: Faker::JapaneseMedia::Naruto.demon,
      about: Faker::Quotes::Shakespeare.hamlet_quote,
      pronouns: PRONOUNS[rand(9)],
      website: Faker::Internet.domain_name
    })
  end

  puts "Done!"
end