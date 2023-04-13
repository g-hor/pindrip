require 'open-uri'

ApplicationRecord.transaction do 

  PRONOUNS = ['ey/em', 'he/him', 'ne/nem', 'she/her', 'they/them', 've/ver', 'xe/xem', 'xie,xem', 'ze/zir']

  puts "Destroying tables..."
  User.destroy_all

  puts "Resetting primary keys..."
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Creating demo user:
  User.create!(
    username: 'demo', 
    email: 'demo@pin.drip', 
    password: 'pindrip',
    first_name: 'drippy',
    last_name: 'bara',
    about: 'i was here on pindrip first! long live the demo user :)',
    pronouns: 'they/them',
    website: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
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

  puts "Destroying pins..."
  Pin.destroy_all

  puts "Resetting primary keys..."
  ApplicationRecord.connection.reset_pk_sequence!('pins')

  puts "Creating pins..."
  10.times do
    Pin.create!({
      title: Faker::JapaneseMedia::StudioGhibli.quote,
      description: Faker::Hipster.paragraph,
      website: Faker::Internet.url,
      alt_text: Faker::Hipster.sentence,
      user_id: 1
    })
  end

  18.times do 
    Pin.create!({
      title: Faker::JapaneseMedia::StudioGhibli.quote,
      description: Faker::Hipster.paragraph,
      website: Faker::Internet.url,
      alt_text: Faker::Hipster.sentence,
      user_id: rand(2..16)
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

Pin.first(28).each_with_index do |pin, index|
  pin.photo.attach(
    io: URI.open("https://pindrip-seeds.s3.amazonaws.com/pins/#{index + 1}.jpeg"),
    filename: "pins/#{index + 1}.jpeg"
  )
end

puts "Done!"