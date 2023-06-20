import { useNavigate } from 'react-router-dom';
import { splashImages1 } from './images';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/session';
import './Splash.css';
import { useEffect, useRef } from 'react';

const SplashPage = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(getCurrentUser);
  const col1 = useRef();
  const col2 = useRef();
  const col3 = useRef();
  const col4 = useRef();
  const col5 = useRef();
  const col6 = useRef();
  const col7 = useRef();

  useEffect(() => {
    if (currentUser) navigate("/home");
  }, [navigate, currentUser]);

  useEffect(() => {
    const addDrip = () => setTimeout(() => {
      col1?.current?.classList.add('drip-col');
      col2?.current?.classList.add('drip-col');
      col3?.current?.classList.add('drip-col');
      col4?.current?.classList.add('drip-col');
      col5?.current?.classList.add('drip-col');
      col6?.current?.classList.add('drip-col');
      col7?.current?.classList.add('drip-col');
    }, 0);
    
    const removeDrip = () => setTimeout(() => {
      col1?.current?.classList.remove('drip-col');
      col2?.current?.classList.remove('drip-col');
      col3?.current?.classList.remove('drip-col');
      col4?.current?.classList.remove('drip-col');
      col5?.current?.classList.remove('drip-col');
      col6?.current?.classList.remove('drip-col');
      col7?.current?.classList.remove('drip-col');
    }, 5000);

    const addOpaque = () => setTimeout(() => {
      col1?.current?.classList.add('opaque-drip');
      col2?.current?.classList.add('opaque-drip');
      col3?.current?.classList.add('opaque-drip');
      col4?.current?.classList.add('opaque-drip');
      col5?.current?.classList.add('opaque-drip');
      col6?.current?.classList.add('opaque-drip');
      col7?.current?.classList.add('opaque-drip');
    }, 5000);

    const removeOpaque = () => setTimeout(() => {
      col1?.current?.classList.remove('opaque-drip');
      col2?.current?.classList.remove('opaque-drip');
      col3?.current?.classList.remove('opaque-drip');
      col4?.current?.classList.remove('opaque-drip');
      col5?.current?.classList.remove('opaque-drip');
      col6?.current?.classList.remove('opaque-drip');
      col7?.current?.classList.remove('opaque-drip');
    }, 10000);

    addDrip();
    removeDrip();
    addOpaque();
    removeOpaque();

    return () => {
      clearTimeout(addDrip);
      clearTimeout(removeDrip);
      clearTimeout(addOpaque);
      clearTimeout(removeOpaque);
    }
  }, [])

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
        <div className='splash-grid-col col-1' ref={col1}>
          {splashImages1.slice(0, 3).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-2' ref={col2}>
          {splashImages1.slice(3, 6).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-3' ref={col3}>
          {splashImages1.slice(6, 9).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-4' ref={col4}>
          {splashImages1.slice(8, 11).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-5' ref={col5}>
          {splashImages1.slice(12, 15).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-6' ref={col6}>
          {splashImages1.slice(16, 20).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-7' ref={col7}>
          {splashImages1.slice(20, 23).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
      </div>

    </div>
  );
};

export default SplashPage;