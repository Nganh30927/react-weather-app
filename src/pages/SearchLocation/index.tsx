import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './SearchLocation.module.css';
import { weatherConfig } from '../../data/weatherConfig';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { WiCloud, WiThermometer, WiHumidity } from 'react-icons/wi';

interface SearchLocationProps {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    humidity: number;
    cloud: number;
  };
}

const SearchLocation = () => {
  const [data, setData] = useState<SearchLocationProps | null>(null);
  const [location, setLocation] = useState('');

  const url = `https://api.weatherapi.com/v1/current.json?key=${weatherConfig.apiKey}&q=${location}&aqi=no`;

  const searchLocation = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      try {
        const response = await axios.get(url);
        const responseData = response.data;
        setData(responseData);

        // Lấy tọa độ và lưu vào LocalStorage
        const { lat, lon } = responseData.location;
        localStorage.setItem('location', JSON.stringify({ lat, lon }));
      } catch (error) {
        console.log(error);
      }
      setLocation('');
    }
  };

  const fetchWeatherData = async () => {
    const storedLocation = localStorage.getItem('location');
    if (storedLocation) {
      const { lat, lon } = JSON.parse(storedLocation);
      const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherConfig.apiKey}&q=${lat},${lon}&aqi=no`;
      try {
        const response = await axios.get(weatherUrl);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);


  return (
    <>
    
        <section className={styles.search_wrapper}>
        <div className={styles.search_app}>
          <div className={styles.search_input}>
              
              <label htmlFor="default-search" className="mb-2 text-sm font-normal text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input value={location} onChange={(event) => setLocation(event.target.value)} onKeyPress={searchLocation} type="text" className="block w-full p-1.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Location..." required/>
              </div>
          
          </div>
          {
            data === null ?  (
             <div className='text-center mt-14 text-2xl text-white font-extrabold'>No content.............</div>
            ):(
              <div className={styles.content}>
              <div className={styles.card_item}>
                          <div className={styles.card_flxleft}>
                              <h2 className='flex font-semibold text-2xl'>
                                  <span className='my-1 me-1'>
                                      <FaMapMarkerAlt />
                                  </span>
                                  {data?.location.name}
                              </h2>
                              <div className='my-1'>
                                <p>{data?.location.country}</p>
                              </div>
                              <div className={styles.title}>
  
                                  <p className='flex items-center'><span><WiThermometer/></span> {data?.current.temp_c.toFixed()} °</p>
                                  <p className='flex items-center'><span><WiCloud/></span> {data?.current.cloud}%</p>
                                  <p className='flex items-center'><span><WiHumidity/></span> {data?.current.humidity}%</p>
                              </div>
                          </div>
                          <div className={styles.card_flxright}>
                            <div className={styles.thumb}>
                            <img src={data?.current.condition.icon} alt="" />
                            </div>
  
                            <p className={styles.desc_icon}>{data?.current.condition.text}</p>
                          </div>
                      </div>
              </div>
            )
          }
        </div>

    </section>
     
    </>
  )
}

export default SearchLocation