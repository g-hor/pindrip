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
    password: 'pindrip',
    first_name: 'drip master',
    last_name: '5000',
    about: 'im all about the drip xddd',
    pronouns: 'he/him',
    website: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley'
  )

  # Creating users with minimum information
  5.times do 
    User.create!({
      email: Faker::Internet.unique.email,
      password: 'pindrip'
    }) 
  end

  # Creating users with complete information
  10.times do
    User.create!({
      email: Faker::Internet.unique.safe_email,
      password: 'pindrip',
      first_name: Faker::Emotion.adjective,
      last_name: Faker::JapaneseMedia::Naruto.character,
      about: "Believe it! I am from #{Faker::JapaneseMedia::Naruto.village}, and my goal is to someday slay as much as #{Faker::JapaneseMedia::Naruto.demon}",
      pronouns: PRONOUNS[rand(9)],
      website: Faker::Internet.domain_name
    })
  end

  puts "Done!"
end