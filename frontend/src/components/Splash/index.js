
import { splashImages } from './images';
import './Splash.css';

const SplashPage = () => {

  return (
    <div id="splash-bg-container">
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
          {splashImages.slice(0, 3).map(img => 
            <img src={img} alt=""></img>
            )}
        </div>
        <div className='splash-grid-col col-2'>
          {splashImages.slice(3, 6).map(img => 
            <img src={img} alt=""></img>
            )}
        </div>
        <div className='splash-grid-col col-3'>
          {splashImages.slice(6, 8).map(img => 
            <img src={img} alt=""></img>
            )}
        </div>
        <div className='splash-grid-col col-4'>
          {splashImages.slice(8, 10).map(img => 
            <img src={img} alt=""></img>
            )}
        </div>
        <div className='splash-grid-col col-5'>
          {splashImages.slice(10, 13).map(img => 
            <img src={img} alt=""></img>
            )}
        </div>
        <div className='splash-grid-col col-6'>
          {splashImages.slice(12, 15).map(img => 
            <img src={img} alt=""></img>
            )}
        </div>
        <div className='splash-grid-col col-7'>
          {splashImages.slice(15, 18).map(img => 
            <img src={img} alt=""></img>
            )}
        </div>
      </div>

    </div>
  );
};

export default SplashPage;