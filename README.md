# [Pindrip](https://pindrip.onrender.com/)

Click [here](https://pindrip.onrender.com/) to check out the live site!

### Introduction

Pindrip is a clone of Pinterest, a platform on which users share images, videos, and inspirational ideas. The main theme of Pindrip is fashion and outfit ideas. A user can create Pins (media posts) and save other users' Pins to their own Boards (collection of Pins). This project aims to capture Pinterest's aesthetic and intuitive user interface to provide a simple browsing experience and visually pleasing organizational structure to the user.

* Languages: Javascript, Ruby, HTML, and CSS
* Frontend: React-Redux
* Database: PostgreSQL
* Hosting: Render
* Asset Storage: AWS Simple Cloud Storage (S3)

![gif of the splash page](app/assets/images/splash_page.gif)

# Minimum Viable Product (Features List)

## Profiles

A Pindrip user is only required to provide an email and password to create an account. This information is used to generate default minimum information to display on their profile:

```
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
```

Pindrip users can view and edit their public profile information (e.g. avatar), personal information, and account information: 

```
<div 
  id="change-avatar-btn" 
  onClick={() => setShowUpload(true)}
  >
  Change
</div>

{showUpload && (
  <Modal onClose={() => setShowUpload(false)}>
    <div id="upload-avatar-container">
      <div className="edit-form-header-container">
        <h1 className="edit-form-title">
          Change your picture
        </h1>
      </div>

      <div 
        id="upload-img-btn"
        onClick={() => imgBtn.current.click()}
        >
        Choose photo
      </div>

      <input
        ref={imgBtn}
        type="file"
        onChange={handlePhoto}
        style={{display: 'none'}}
        />
    </div>
  </Modal>
)}
```

## Pins

Upon signing up and/or logging in, users are shown an index of all pins from other users:

```
<>
  <div id="pins-index-page">
    <div id="pins-index-container">
      {pins.map((pin, i) => 
        <div className="pin-index-item" key={i}>
          <PinIndexItem pin={pin} />
        </div> 
        )}
    </div>

  </div>
  <div id="pins-index-bar" />
</>
```

Users can also create, edit, and delete their own Pins:

```
{showEdit && (
  <Modal 
    onClose={() => setShowEdit(false)} 
    customClass="edit-pin"
    >
    <EditPinForm 
      pin={pin} 
      onClose={() => setShowEdit(false)}
      />
  </Modal>
)}
```

## Boards

Pindrip users can create Boards to organize their Pins:

```
<div id="boards-container">
  {canEdit && (
    <div id="plus-sign-holder" onClick={() => setShowDrop(true)} >
      <i className="fa-solid fa-plus" />
    </div> 
    )}
  {showDrop && (
    <div id="profile-create-dropdown" ref={dropdown} >
      <div id="create-text">
        Create
      </div>
      <div 
        className="create-option" 
        id="create-pin-btn"
        onClick={() => navigate('/pin-builder')}
        >
        Pin
      </div>
      <div 
        className="create-option" 
        id="create-board-btn"
        onClick={() => setShowModal(true)}
        >
        Board
      </div>
    </div>
    )}
  {boards.map((board, i) => (
    <BoardIndexItem board={board} showUser={showUser} key={i} />
  ))}
</div>
```

