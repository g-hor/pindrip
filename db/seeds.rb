require 'open-uri'


PRONOUNS = ['ey/em', 'he/him', 'ne/nem', 'she/her', 'they/them', 've/ver', 'xe/xem', 'xie,xem', 'ze/zir']

puts "Destroying tables..."
User.destroy_all
Pin.destroy_all
Board.destroy_all
BoardPin.destroy_all
Follow.destroy_all

puts "Resetting primary keys..."
ApplicationRecord.connection.reset_pk_sequence!('users')
ApplicationRecord.connection.reset_pk_sequence!('pins')
ApplicationRecord.connection.reset_pk_sequence!('boards')
ApplicationRecord.connection.reset_pk_sequence!('board_pins')
ApplicationRecord.connection.reset_pk_sequence!('follows')

puts "Creating users..."
# Creating demo user
User.create!(
  username: 'demo', 
  email: 'demo@pin.drip', 
  password: 'pindrip',
  first_name: 'demo',
  last_name: 'user',
  about: 'welcome! check out my demo drip :)',
  pronouns: 'they/them',
  website: 'github.com/g-hor/pindrip',
  gender: 'capybara',
  country: 'Antarctica'
)

# Creating users with more information
15.times do
  User.create!({
    username: Faker::Emotion.unique.noun,
    email: Faker::Internet.unique.safe_email,
    password: 'pindrip',
    first_name: Faker::Emotion.adjective,
    last_name: Faker::JapaneseMedia::Naruto.character,
    about: "Believe it! I am from #{Faker::JapaneseMedia::Naruto.village}, and my goal is to someday slay as much as #{Faker::JapaneseMedia::Naruto.demon}",
    pronouns: PRONOUNS[rand(9)],
    website: Faker::Internet.domain_name,
    gender: 'capybara'
  })
end

# Creating users with minimal information
10.times do
  User.create!({
    email: Faker::Internet.unique.safe_email,
    password: 'pindrip'
  })
end

puts "Creating follows..."
# making the demo user very very popular
15.times do |i|
  Follow.create!({ follower_id: i + 2, following_id: 1 })
end

# making sure other seeded users also feel included
50.times do
  follower = rand(1..16)
  following = rand(1..16)

  while follower == following || Follow.exists?(follower_id: follower, following_id: following)
    follower = rand(1..16)
    following = rand(1..16)
  end

  Follow.create!({ follower_id: follower, following_id: following })
end

puts "Creating pins..."
# creating pins for the demo user
10.times do
  Pin.create!({
    title: Faker::Quote.famous_last_words,
    description: Faker::Hipster.paragraph,
    website: Faker::Internet.url,
    alt_text: Faker::Hipster.sentence,
    user_id: 1
  })
end

# creating pins for other seeded users
24.times do 
  Pin.create!({
    title: Faker::Quote.famous_last_words,
    description: Faker::Hipster.paragraph,
    website: Faker::Internet.url,
    alt_text: Faker::Hipster.sentence,
    user_id: rand(2..16)
  })
end

# creating boards for the demo user 
puts "Creating boards..."
5.times do
  Board.create!({
    name: Faker::Emotion.unique.adjective,
    description: Faker::JapaneseMedia::StudioGhibli.character,
    user_id: 1
  })
end

# creating boards for other seeded users
20.times do
  Board.create!({
    name: Faker::Emotion.unique.adjective,
    description: Faker::JapaneseMedia::StudioGhibli.character,
    user_id: rand(2..16)
  })
end

puts "Seeding boards with saved pins..."
# randomly assigning pins to be saved to various boards
100.times do
  BoardPin.create!({
    board_id: rand(1..28),
    pin_id: rand(1..24)
  })
end

puts "Seeding image files..."
# giving seeded users icons
User.first(16).each_with_index do |user, index|
  user.avatar.attach(
    io: URI.open("https://pindrip-seeds.s3.amazonaws.com/icons/#{index}.jpeg"),
    filename: "icons/#{index}.jpeg"
  )
end

# attaching photos to pins
Pin.first(34).each_with_index do |pin, index|
  pin.photo.attach(
    io: URI.open("https://pindrip-seeds.s3.amazonaws.com/pins/lowqual/#{index + 1}.jpeg"),
    filename: "pins/lowqual/#{index + 1}.jpeg"
  )
end

puts "Done!"