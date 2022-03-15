import img1 from './images/img1.jpg';
import img2 from './images/img2.jpg';
import kenny from './images/kenny.png';
import spiderman from './images/spiderman.png';
import butthole from './images/Butthole.jpg';
import joey from './images/joey.webp';
import obelix from './images/obelix.jpg';
import chad from './images/chad.webp';
import {Link} from 'react-router-dom';

function Home({handleClick}){
    return(
        <div className='Menu'>
          <div className='selectMap'>
            <div className='map'>
              <div className='mapName'> Cyberpunk City </div>
              <div className='maps'>
                <Link to='/map1'onClick={(e)=> handleClick(e)}>
                    <img className='smallMap' src={img1} value="1" alt="map1" ></img>
                </Link>
                <div className='characters'>
                  <h3>Characters to find:</h3>
                  <div className='character'>
                    <img className='charPic' src={kenny} alt="character"></img>
                    <div className='name'>Kenny</div>
                  </div>
                  <div className='character'>
                    <img className='charPic' src={spiderman} alt="character"></img>
                    <div className='name'>Spider-Man</div>
                  </div>
                  <div className='character'>
                    <img className='charPic' src={butthole} alt="character"></img>
                    <div className='name'>Mr. Poopy Butthole</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='map'>
              <div className='mapName'> Robot City </div>
              <div className='maps'>
                <Link to='/map2'onClick={(e)=> handleClick(e)}>
                    <img className='smallMap' src={img2} alt="map2" value="2" ></img>
                </Link>
                <div className='characters'>
                  <h3>Characters to find:</h3>
                    <div className='character'>
                    <img className='charPic' src={joey} alt="character"></img>
                  <div className='name'>Joey Mousepad</div>
                  </div>
                  <div className='character'>
                    <img className='charPic' src={obelix}  alt="character"></img>
                    <div className='name'>Obelix</div>
                  </div>
                  <div className='character'>
                    <img className='charPic' src={chad} alt="character"></img>
                    <div className='name'>Squidward Gigachad</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Home;