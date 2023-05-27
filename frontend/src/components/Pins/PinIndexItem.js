import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getInitial } from "../../store/user";
import { savePin, removeBoardPin } from "../../store/boardPin";
import Avatar from "../Profile/Avatar";


const PinIndexItem = ({ pin }) => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const showUser = useSelector(state => state?.users[pin?.creator]);
  const avatar = showUser?.avatar;
  const pins = useSelector(state => state?.pins);
  const boards = useSelector(state => 
    Object.values(state?.boards)
      .slice(0, 1)
      .concat(
        Object.values(state?.boards)
          .slice(1)
          .reverse()
      )
    );
  const [selectedBoard, setSelectedBoard] = useState(boards[0]?.name || 'All Pins');
  const boardId = boards?.filter(board => board?.name === selectedBoard)[0]?.id;
  let boardIndex = boards.indexOf(boards?.filter(board => board?.name === selectedBoard)[0]);

  const [displayMenu, setDisplayMenu] = useState(false);
  const [showBoards, setShowBoards] = useState(false);
  const [showSaveBtn, setShowSaveBtn] = useState(Array(boards?.length).fill(false));
  const [clickedSave, setClickedSave] = useState(Array(boards?.length).fill(false));
  const [opacity, setOpacity] = useState({opacity: 0});
  const boardMenu = useRef();
  const pinImg = useRef();
  let initial;


  const abbreviateBoard = (boardName, length) => {
    if (boardName.length > length) {
      return boardName.slice(0, length) + '...';
    } else {
      return boardName;
    }
  };

  const hideBoards = (e) => {
    if (e.target === boardMenu?.current) return;
    setShowBoards(false); 
  };

  const clickBoard = (board) => {
    setShowSaveBtn(Array(boards?.length).fill(false));
    setSelectedBoard(board.name);
    setShowBoards(false);
  };


  const submitSave = async (boardId, pinId, boardIdx) => {
    if (!clickedSave[boardIdx]) {
      setClickedSave(prev => {
        const next = [ ...prev ];
        next[boardIdx] = true;
        return next;
      });
      await dispatch(savePin({ boardId, pinId }));
    } else {
      const res = await dispatch(removeBoardPin({ boardId, pinId }));
      if (res?.ok) {
        setClickedSave(prev => {
          const next = [ ...prev ];
          next[boardIdx] = false;
          return next;
        });
      }
    }
  };


  useEffect(() => {
    if (!showBoards) return;

    document.addEventListener('click', hideBoards)

    return () => (document.removeEventListener('click', hideBoards))
  })


  if (showUser) {
    initial = getInitial(showUser)
  };

  return (
    <>
      <div 
        className="pin-img-overlay-container"
        onMouseEnter={() => {setOpacity({opacity: 0.4}); setDisplayMenu(true)}}
        onMouseLeave={() => {setOpacity({opacity: 0}); setDisplayMenu(false)}}
        >
        <img 
          src={pin?.photo} 
          alt={pin?.altText} 
          className="pin-index-img"
          ref={pinImg}
          />
        <div 
          className="pin-overlay"
          style={opacity}
          >
        </div>
        {displayMenu && (
          <div className="pin-item-top-bar">
            <div id="show-pin-board-dropdown-btn" onClick={() => setShowBoards(true)}>
              <i className="fa-solid fa-chevron-down dropbtn board-drop" />
              <div id="board-first-option">
                {abbreviateBoard(selectedBoard, 9)}
              </div>

              {showBoards && (
                <div id="board-options-menu" ref={boardMenu}>
                  <div id="board-options">All boards</div>
                  {boards?.map((board, i) => (
                    <div 
                      className="board-dropdown-option" 
                      key={i}
                      onClick={() => clickBoard(board)}
                      onMouseEnter={() => setShowSaveBtn(prev => {
                        const next = [ ...prev ];
                        next[i] = true;
                        return next;
                      })}
                      onMouseLeave={() => setShowSaveBtn(prev => {
                        const next = [ ...prev ];
                        next[i] = false;
                        return next;
                      })}
                      >
                      <div className="board-dropdown-thumbnail-holder">
                        {pins[board.savedPins[0]]?.photo && (
                          <img className="board-dropdown-thumbnail" src={pins[board.savedPins[0]]?.photo} alt="" />
                          )}
                      </div>
                      <div className="board-dropdown-info">
                        <div className="board-dropdown-name-holder">
                          <div>
                          {abbreviateBoard(board.name, 15)}
                          </div>
                          {board.savedPins.includes(parseInt(pin?.id)) && 
                            <div>Saved here already</div>
                            }
                        </div>
                        {showSaveBtn[i] && (
                          <div 
                            id="show-pin-save-btn"
                            className={clickedSave ? "saved" : " "}
                            onClick={() => submitSave(board?.id, pin?.id, i)}
                            >
                            {clickedSave[i] ? "Saved" : "Save"}
                          </div>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div 
              id="show-pin-save-btn"
              className={clickedSave[boardIndex] ? "saved" : " "}
              onClick={() => submitSave(boardId, pin?.id, boardIndex)}
              >
              {clickedSave[boardIndex] ? "Saved" : "Save"}
            </div>
          </div>
        )}
      </div>
      <Link 
        to={`/pins/${pin?.id}`}
        >
        {!username && (
          <div className="home-pin-title">
            {pin?.title}
          </div>
        )}
      </Link>

      {!username && (
        <div className="home-pins-info">
          <Link
            to={`/${pin?.creator}`}
            >
              {avatar ? (
                <Avatar avatar={avatar} />
              ) : (
                <div id="pin-show-creator-initial">{initial}</div>
              )}
              <span>
                {pin?.creator}
              </span>
          </Link>
        </div>
      )}
    </>
  )
};

export default PinIndexItem;