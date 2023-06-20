import { useNavigate } from 'react-router-dom';
import { splashImages1, splashImages2 } from './images';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/session';
import './Splash.css';
import { useEffect, useRef, useState } from 'react';

const SplashPage = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(getCurrentUser);
  const [cycle, setCycle] = useState(1);
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


  useEffect(() => {
    if (currentUser) navigate("/home");
  }, [navigate, currentUser]);

  useEffect(() => {
    const addDrip = (delay, ...columns) => setTimeout(() => {
      columns?.forEach(column => column?.current?.classList.add('drip-col'))
    }, delay);
    
    const removeDrip = (delay, ...columns) => setTimeout(() => {
      columns?.forEach(column => column?.current?.classList.remove('drip-col'))
    }, delay);

    const addOpaque = (delay, ...columns) => setTimeout(() => {
      columns?.forEach(column => column?.current?.classList.add('opaque-drip'))
    }, delay);

    const removeOpaque = (delay, ...columns) => setTimeout(() => {
      columns?.forEach(column => column?.current?.classList.remove('opaque-drip'))
    }, delay);

    addDrip(0, col1, col2, col3, col4, col5, col6, col7);
    // removeDrip(5000, col1, col2, col3, col4, col5, col6, col7);
    addOpaque(5000, col1, col2, col3, col4, col5, col6, col7);
    // removeOpaque(10000, col1, col2, col3, col4, col5, col6, col7);

    setTimeout(() => {
      removeOpaque(750, col8, col9, col10, col11, col12, col13, col14);
    }, 5000)

    setTimeout(() => {
      addOpaque(0, col8, col9, col10, col11, col12, col13, col14);
      removeOpaque(750, col1, col2, col3, col4, col5, col6, col7);
    }, 10000)

    // setTimeout(() => {
    //   col1?.current?.classList.add('fade-out')
    // }, 5000)

    // const firstCycle = () => {
    //   addDrip(0, col1, col2, col3, col4, col5, col6, col7);
    //   removeOpaque(1000, col1, col2, col3, col4, col5, col6, col7);
    //   removeDrip(5000, col1, col2, col3, col4, col5, col6, col7);
    //   addOpaque(5000, col1, col2, col3, col4, col5, col6, col7);
    //   removeOpaque(10000, col1, col2, col3, col4, col5, col6, col7);
    // };
    
    // const secondCycle = () => {
    //   addDrip(0, col8, col9, col10, col11, col12, col13, col14);
    //   removeOpaque(1000, col8, col9, col10, col11, col12, col13, col14);
    //   removeDrip(5000, col8, col9, col10, col11, col12, col13, col14);
    //   addOpaque(5000, col8, col9, col10, col11, col12, col13, col14);
    //   removeOpaque(10000, col8, col9, col10, col11, col12, col13, col14);
    // }

    // const cycleLoop = () => setInterval(() => {
    //   setTimeout(() => {
    //     setCycle(1);
    //     firstCycle();
    //   }, 6500)
    //   setTimeout(() => {
    //     setCycle(2);
    //     secondCycle();
    //   }, 0)
    // }, 6500);

    // cycleLoop();

    // return () => {
    //   clearInterval(cycleLoop);
    // }
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
      {/* {(cycle === 1) && ( */}
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
      {/* )} */}


      {/* SECOND SET OF SPLASH IMAGES */}
      {/* {(cycle === 2) && ( */}
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
      {/* )} */}
    </div>
  );
};

export default SplashPage;