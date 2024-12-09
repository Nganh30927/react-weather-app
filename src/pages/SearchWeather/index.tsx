import React, { useState } from 'react';
import styles from './SearchWeather.module.css';
import { FaAngleLeft, FaRegSun, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { weatherConfig } from "../../data/weatherConfig";

interface SearchWeatherProps {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    }
}

const SearchWeather = () => {
    const [data, setData, ] = useState<SearchWeatherProps | null>(null);
    const [location, setLocation] = useState('');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherConfig.apiKey}&units=metric&lang=vi`;

    const searchLocation = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data)
            }).catch((error) => {
                console.error("There was an error fetching the data!", error);
                setData(null);
            });
            setLocation('');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.search_wrapper}>
                <div className={styles.header_item}>
                    <h2>
                        <span className='my-2 me-1'>
                            <FaAngleLeft />
                        </span>
                        Weather
                    </h2>
                    <span className='text-white rounded-full'>
                        <FaRegSun />
                    </span>
                </div>
                <div className={styles.search_input}>
                    <form>
                        <label htmlFor="default-search" className="mb-2 text-sm font-normal text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input value={location} onChange={(event) => setLocation(event.target.value)} onKeyPress={searchLocation} type="text" className="block w-full p-1.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Location..." required/>
                            {/* <button type="submit" className="text-white absolute right-0 bottom-0 top-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                        </div>
                    </form>
                </div>
                {
                    data && (
                        <div className={styles.content}>
                            <div className={styles.card_item}>
                                <div className={styles.card_left}>
                                    <h3 className='flex'>
                                        <span className='my-1 me-1'>
                                            <FaMapMarkerAlt />
                                        </span>
                                        {data.name}
                                    </h3>
                                    <div className={styles.title}>
                                        <h4>H: {data.main.humidity.toFixed()} °</h4>
                                        <span><h4>L: {data.main.feels_like.toFixed()} °</h4></span>
                                    </div>
                                </div>
                                <div className={styles.card_right}>
                                    <h3>{data.main.temp.toFixed()} °C</h3>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default SearchWeather;
