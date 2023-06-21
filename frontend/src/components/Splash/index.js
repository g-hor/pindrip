import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { splashImages1, splashImages2, splashImages3 } from './images';
import { getCurrentUser } from '../../store/session';
import './Splash.css';

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
  const col8 = useRef();
  const col9 = useRef();
  const col10 = useRef();
  const col11 = useRef();
  const col12 = useRef();
  const col13 = useRef();
  const col14 = useRef();
  const col15 = useRef();
  const col16 = useRef();
  const col17 = useRef();
  const col18 = useRef();
  const col19 = useRef();
  const col20 = useRef();
  const col21 = useRef();


  useEffect(() => {
    if (currentUser) navigate("/home");
  }, [navigate, currentUser]);

  useEffect(() => {
    const addDrip = (delay, ...columns) => setTimeout(() => {
      columns?.forEach(column => column?.current?.classList.add('drip-col'))
    }, delay);

    const addOpaque = (delay, ...columns) => setTimeout(() => {
      columns?.forEach(column => column?.current?.classList.add('opaque-drip'))
    }, delay);

    const removeOpaque = (delay, ...columns) => setTimeout(() => {
      columns?.forEach(column => column?.current?.classList.remove('opaque-drip'))
    }, delay);

    addDrip(0, col1, col2, col3, col4, col5, col6, col7);
    addOpaque(5225, col1, col2, col3, col4, col5, col6, col7);
    removeOpaque(6000, col8, col9, col10, col11, col12, col13, col14);
    addOpaque(10500, col8, col9, col10, col11, col12, col13, col14);
    removeOpaque(11225, col15, col16, col17, col18, col19, col20, col21);
    addOpaque(16500, col15, col16, col17, col18, col19, col20, col21);

    const cycleLoop = () => setInterval(() => {

      removeOpaque(775, col1, col2, col3, col4, col5, col6, col7);
      addOpaque(5225, col1, col2, col3, col4, col5, col6, col7);

      removeOpaque(6000, col8, col9, col10, col11, col12, col13, col14);
      addOpaque(10500, col8, col9, col10, col11, col12, col13, col14);

      removeOpaque(11225, col15, col16, col17, col18, col19, col20, col21);
      addOpaque(16500, col15, col16, col17, col18, col19, col20, col21);

    }, 16500)

    cycleLoop();

    return () => {
      clearInterval(cycleLoop);
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

      {/* FIRST SET OF SPLASH IMGS */}
      <div id="splash-grid-container">
        <div className='splash-grid-col col-1' ref={col1}>
          {splashImages1.slice(0, 4).map((img, i) => 
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


      {/* SECOND SET OF SPLASH IMAGES */}
      <div id="splash-grid-container">
        <div className='splash-grid-col col-1 drip-col opaque-drip' ref={col8}>
          {splashImages2.slice(0, 4).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-2 drip-col opaque-drip' ref={col9}>
          {splashImages2.slice(3, 6).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-3 drip-col opaque-drip' ref={col10}>
          {splashImages2.slice(6, 9).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-4 drip-col opaque-drip' ref={col11}>
          {splashImages2.slice(9, 12).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-5 drip-col opaque-drip' ref={col12}>
          {splashImages2.slice(12, 15).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-6 drip-col opaque-drip' ref={col13}>
          {splashImages2.slice(15, 18).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-7 drip-col opaque-drip' ref={col14}>
          {splashImages2.slice(17, 21).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
      </div>

      {/* THIRD SET OF SPLASH IMAGES */}
      <div id="splash-grid-container">
        <div className='splash-grid-col col-1 drip-col opaque-drip' ref={col15}>
          {splashImages3.slice(0, 4).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-2 drip-col opaque-drip' ref={col16}>
          {splashImages3.slice(3, 6).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-3 drip-col opaque-drip' ref={col17}>
          {splashImages3.slice(6, 9).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-4 drip-col opaque-drip' ref={col18}>
          {splashImages3.slice(9, 12).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-5 drip-col opaque-drip' ref={col19}>
          {splashImages3.slice(12, 15).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-6 drip-col opaque-drip' ref={col20}>
          {splashImages3.slice(15, 18).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
        <div className='splash-grid-col col-7 drip-col opaque-drip' ref={col21}>
          {splashImages3.slice(17, 21).map((img, i) => 
            <img src={img} alt="" key={i} />
            )}
        </div>
      </div>
    </div>
  );
};

export default SplashPage;