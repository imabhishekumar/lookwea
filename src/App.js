import { useEffect, useState } from 'react'
// import sunset from './assets/sunset.jpg'
import clear2 from './assets/clear2.jpg'
import clouds from './assets/clouds2.jpg'
import rain from './assets/rain.jpg'
import snow from './assets/snow3.jpg'
import clear from './assets/clear3.jpg'
import storm from './assets/storm.jpg'
import wind from './assets/wind.jpg'
import sunny from './assets/sunny2.jpg'
import mist from './assets/mist3.jpg'
import haze from './assets/haze.jpg'
import thunder from './assets/thunderstorm2.jpg'

import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({});
  const [location, setLocation] = useState('Delhi');
  const [iconUrl, setIconUrl] = useState('');
 
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=a6b7567e1165186be79ded4e6896c1f4`;
  
  function firstLoad(){
    axios.get(url).then((response) =>{
      setData(response.data)
      setBackimage(response.data) 
      console.log(response.data)
    })
    setLocation('')
  }

  useEffect (()=>{
    firstLoad();
  },[])


  const searchLocation = (event) =>{
    if(event.key === 'Enter'){
      axios.get(url).then((response) =>{
        setData(response.data)
        setBackimage(response.data) 
        console.log(response.data)
      })
      setLocation('')
    }
  }
  

  useEffect(() =>{
  });

  function setBackimage(data){
    console.log(data)
    if(data.weather[0].main === 'Haze'){
      setImage(haze);
    }else if(data.weather[0].main === 'Clouds'){
      setImage(clouds);
    } else if(data.weather[0].main === 'Rain'){
      setImage(rain);
    }else if(data.weather[0].main === 'Snow'){
      setImage(snow);
    }else if(data.weather[0].main === 'Clear'){
      setImage(clear);
    }else if(data.weather[0].main === 'Thunderstorm'){
      setImage(thunder);
    }else if(data.weather[0].main === 'Mist'){
      setImage(mist);
    }else if(data.weather[0].main === 'Sunny'){
      setImage(sunny);
    }else if(data.weather[0].main === 'Storm'){
      setImage(storm);
    }else if(data.weather[0].main === 'Wind'){
      setImage(wind);
    }else{
      setImage(clear2);
    }

    setIconUrl("http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
  }


  return (
    <div className="app" style={{background: `url(${image}) no-repeat center center/cover`}}>
      <div className="search">
        <input 
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter Location'
          type="text"/>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p className='state'>{data.name}</p>{data.sys ? <p className='country'>{data.sys.country}</p> : null}
            <div id="icon">
              <img id="wicon" src={iconUrl}/>
            </div>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humadity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
