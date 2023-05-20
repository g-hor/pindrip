import { useNavigate } from 'react-router-dom';
import { splashImages } from './images';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/session';
import './Splash.css';
import { useEffect } from 'react';

const SplashPage = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(getCurrentUser);

  useEffect(() => {
    if (currentUser) navigate("/home");
  }, [navigate, currentUser]);

  return (
    <div id="splash-bg-container">
      <div id="splash-page-gradient" />
      <div id="splash-text-container">
        <div id="splash-top-text">
          Get your next
        </div>
        <div id="splash-bottom-text">
          drip inspiration
        </div>
      </div>

      <div id="splash-grid-container">
        <div className='splash-grid-col col-1'>
          {splashImages.slice(0, 3).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-2'>
          {splashImages.slice(3, 6).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-3'>
          {splashImages.slice(6, 9).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-4'>
          {splashImages.slice(8, 11).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-5'>
          {splashImages.slice(12, 15).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-6'>
          {splashImages.slice(16, 19).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-7'>
          {splashImages.slice(19, 22).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
      </div>

    </div>
  );
};

export default SplashPage;