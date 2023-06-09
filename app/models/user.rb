# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  first_name      :string           not null
#  last_name       :string
#  about           :text
#  pronouns        :string
#  website         :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  gender          :string
#  country         :string
#
class User < ApplicationRecord
  has_secure_password
  before_validation :ensure_session_token, :provide_defaults

  # CREDIT FOR REGEX GOES TO installero ("https://stackoverflow.com/users/435682/installero")
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  VALID_USERNAME = /\A[a-zA-Z0-9]{3,}$\z/
  PRONOUNS = ['ey/em', 'he/him', 'ne/nem', 'she/her', 'they/them', 've/ver', 'xe/xem', 'xie,xem', 'ze/zir', '']
  
  validates :username,
    uniqueness: true,
    length: { in: 3..30 },
    format: { with: VALID_USERNAME, message: " should only contain letters and numbers" },
    allow_nil: true
  validates :email,
    uniqueness: true,
    length: { in: 10..100 },
    format: { with: VALID_EMAIL_REGEX }
  validates :session_token, presence: true, uniqueness: true
  validates :password, 
    length: { in: 6..50 }, 
    allow_nil: true
  validates_inclusion_of :pronouns, :in => PRONOUNS, allow_nil: true

  # all users have a default board called "All Pins" in which every saved pin lives
  after_save :ensure_default_board 


  has_one_attached :avatar
  has_many :pins,
    dependent: :destroy
  has_many :boards,
    dependent: :destroy
  has_many :saved_pins,
    through: :boards,
    source: :pins
  has_many :follows,
    primary_key: :id,
    foreign_key: :following_id,
    class_name: "Follow",
    dependent: :destroy
  has_many :followings,
    primary_key: :id,
    foreign_key: :follower_id,
    class_name: "Follow",
    dependent: :destroy


  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)

    if user
      return user if user.authenticate(password)
    else
      return nil
    end
  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    return self.session_token
  end

  private

  # handle generating and assigning session tokens to users
  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
  
  def generate_unique_session_token
    token = SecureRandom.base64
    while User.exists?(session_token: token)
      token = SecureRandom.base64
    end
    return token
  end
  
  # users are not asked to provide a username or first name upon signing up
  # these methods ensure that users have both a username and first name. The username is used for routing/identifying purposes.
  def parse_email
    punctuation = ['.', '-', '_']
    first_part = self.email.split("@")[0]
    letters = first_part.split('')
    parsed_letters = letters.select {|char| !punctuation.include?(char) }
    username = parsed_letters.join('')
    username.length < 3 ? nil : username
  end

  def generate_unique_username
    parsed_email = self.parse_email
    while User.exists?(username: parsed_email)
      parsed_email += rand(999).to_s
    end
    parsed_email
  end
  
  def provide_defaults
    self.username ||= self.generate_unique_username
    self.first_name ||= self.parse_email
  end
  
  def ensure_default_board
    unless Board.exists?(name: "All Pins", user_id: self.id)
      Board.create!(name: "All Pins", user_id: self.id)
    end
  end
end
