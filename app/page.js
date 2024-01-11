'use client'
import {useState}  from 'react';
export default function Home() {
  const [location,setLocation]=  useState('')
  const [weather,setWeather] = useState('')
  const getMessage = (temp)=>{
    if (temp > 25) {
      return 'It\'s 🍦 time';
    } else if (temp > 20) {
      return 'Time for 👕 and shorts';
    } else if (temp < 10) {
      return 'You\'ll need 🧣 and 🧤';
    } else {
      return 'Bring a 🧥 just in case';
    }
  }
  const getWeatherIcon = (condition) =>{
    if (condition < 300) {
      return '🌩';
    } else if (condition < 400) {
      return '🌧';
    } else if (condition < 600) {
      return '☔️';
    } else if (condition < 700) {
      return '☃️';
    } else if (condition < 800) {
      return '🌫';
    } else if (condition == 800) {
      return '☀️';
    } else if (condition <= 804) {
      return '☁️';
    } else {
      return '🤷‍';
    }
 
  }
  const getWeather = async () =>{
    const API_KEY= '8a1788df59af9347c89e061fe5c26a0c';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
    if (location){
      try {
        const res = await fetch(API_URL)
        const data = await res.json()
        if (data){
          const api_data = { 
            city:data.name,
            temp:data.main.temp,
            feels_like:data.main.feels_like,
            humidity: data.main.humidity,
            temp_max: data.main.temp_max,
            temp_min: data.main.temp_min,
            windSpeed: data.wind.speed,
            windDegree: data.wind.deg,
            icon:getWeatherIcon(data.weather[0].id),
            message: getMessage(data.main.temp)
          }
          setWeather(
            <>
            <div className='bg-white shadow-lg rounded-3xl px-4 py-8 pb-8 mb-4 opacity-80'>
              <div className='float-left text-9xl px-10'>{api_data.icon}</div>
                <div className='flex justify-center'>
                  <div className='flow-root'>
                    <div className='text-center text-gray-600 text-5xl font-semibold font-serif'>{api_data.city}</div>
                    <div className='float-left text-5xl p-2 font-semibold font-serif'>{api_data.temp}°C</div>
                  </div>
                </div>
                <div className='text-center text-3xl font-bold text-blue-600 font-serif py-5' >{api_data.message}</div>
                <div className='flex justify-between px-5'>
                  <div py-4>
                    <div className=' text-yellow-600 text-2xl  font-serif'>Humidity: {api_data.humidity} %</div>
                    <div className=' text-yellow-600 text-2xl font-serif'>Min Temp: {api_data.temp_min}°C</div>
                    <div className=' text-yellow-600 text-2xl font-serif'>Wind Speed: {api_data.windSpeed} Kmph</div>
                  </div>
                  <div>
                    <div className=' text-yellow-600 text-2xl font-serif'>Feels Like: {api_data.feels_like}°C</div>
                    <div className=' text-yellow-600 text-2xl font-serif'>Max Temp: {api_data.temp_max}°C</div>
                    <div className=' text-yellow-600 text-2xl font-serif'>Wind Degree: {api_data.windDegree}°</div>
                  </div>
                </div>
            </div>
            </>
          )
          // console.log(data);
          // console.log(data.name)
          
          // console.log(data.main.temp)
          // console.log(data.main.feels_like)
          // console.log(data.main.humidity)
          // console.log(data.main.pressure)
          // console.log(data.main.temp_max)
          // console.log(data.main.temp_min)
          
          // console.log(data.weather[0].description)
          
          // console.log(data.wind.deg)
          // console.log(data.wind.speed)
          
          // console.log(getWeatherIcon(data.weather[0].id))
          // console.log(getMessage(data.main.temp))
        }
      } catch (e) {
          console.log(e);
          setWeather(
            null
          )
      }
    }
    else{
      setWeather(
        null
      )
      // No location entered
    }
  }

  return (
    <>
      <nav className='flex items-center justify-center py-3 bg-blue-100 w-full m-0 opacity-80'>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
          </div>
          
          <input className='block bg-white-00 text-black font-serif font-bold rounded-lg opacity-50 pl-10 p-2' 
          type = "text"
          id= "location"
          value ={location}
          onChange={(e)=> setLocation(e.target.value)}
          placeholder='Location (i.e. Paris)'/>
        </div>
        <button className='bg-blue-500 hover: bg-blue-700 text-white font-bold m-2 p-2.5 px-7.5  rounded lg' id="search" onClick={getWeather}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-5.2-5.2"/>
            <circle cx="10" cy="10" r="8"/>
          </svg>
        </button>
        </nav>
        <div className='flex w-full p-20 justify-center '>
          <div className='w-full max-w-xl'>
            <div className='mb-4'>
              {weather}
            </div>
          </div>
        </div>
     
    </>
  )
}
