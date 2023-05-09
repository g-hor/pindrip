require 'open-uri'

ApplicationRecord.transaction do 

  PRONOUNS = ['ey/em', 'he/him', 'ne/nem', 'she/her', 'they/them', 've/ver', 'xe/xem', 'xie,xem', 'ze/zir']

  puts "Destroying tables..."
  User.destroy_all
  Pin.destroy_all
  Board.destroy_all
  BoardPin.destroy_all

  puts "Resetting primary keys..."
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('pins')
  ApplicationRecord.connection.reset_pk_sequence!('boards')
  ApplicationRecord.connection.reset_pk_sequence!('board_pins')

  puts "Creating users..."
  # Creating demo user:
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

  # Creating users with more information:
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

  puts "Resetting primary keys..."
  ApplicationRecord.connection.reset_pk_sequence!('pins')

  puts "Creating pins..."
  10.times do
    Pin.create!({
      title: Faker::Quote.famous_last_words,
      description: Faker::Hipster.paragraph,
      website: Faker::Internet.url,
      alt_text: Faker::Hipster.sentence,
      user_id: 1
    })
  end

  24.times do 
    Pin.create!({
      title: Faker::Quote.famous_last_words,
      description: Faker::Hipster.paragraph,
      website: Faker::Internet.url,
      alt_text: Faker::Hipster.sentence,
      user_id: rand(2..16)
    })
  end

  puts "Creating boards..."
  8.times do
    Board.create!({
      name: Faker::Emotion.unique.adjective,
      description: Faker::JapaneseMedia::StudioGhibli.character,
      user_id: 1
    })
  end

  20.times do
    Board.create!({
      name: Faker::Emotion.unique.adjective,
      description: Faker::JapaneseMedia::StudioGhibli.character,
      user_id: rand(2..16)
    })
  end

  puts "Seeding boards with saved pins..."
  100.times do
    BoardPin.create!({
      board_id: rand(1..28),
      pin_id: rand(1..24)
    })
  end

end

puts "Seeding image files..."

User.first(16).each_with_index do |user, index|
  user.avatar.attach(
    io: URI.open("https://pindrip-seeds.s3.amazonaws.com/icons/#{index}.jpeg"),
    filename: "icons/#{index}.jpeg"
  )
end

Pin.first(34).each_with_index do |pin, index|
  pin.photo.attach(
    io: URI.open("https://pindrip-seeds.s3.amazonaws.com/pins/lowqual/#{index + 1}.jpeg"),
    filename: "pins/lowqual/#{index + 1}.jpeg"
  )
end

puts "Done!"