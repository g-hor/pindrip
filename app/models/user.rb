# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string
#  password_digest :string           not null
#  session_token   :string           not null
#  first_name      :string
#  last_name       :string
#  about           :text
#  pronouns        :string
#  website         :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  PRONOUNS = ['ey/em', 'he/him', 'ne/nem', 'she/her', 'they/them', 've/ver', 'xe/xem', 'xie,xem', 'ze/zir']

  validates :username,
    uniqueness: { message: "That username is already taken." },
    length: { in: 3..30, message: "That username is too long! Try for under 30 characters." },
    format: { without: URI::MailTo::EMAIL_REGEXP, message: "A username must contain only numbers and letters." }
  validates :email,
    uniqueness: { message: "Deja vu! That email's taken."},
    length: { in: 8..255, message: "Hmm... That doesn't look like an email address." },
    format: { with: URI::MailTo::EMAIL_REGEXP, message: "Hmm... That doesn't look like an email address." }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255, message: "Your password is too short! You need 6+ characters." }, allow_nil: true
  validates :pronouns, inlusion: { in: PRONOUNS }

  before_validation :ensure_session_token


  def self.find_by_email(email, password)
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

end
