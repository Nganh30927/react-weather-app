
import styles from './WeatherApp.module.css'
// import { weatherConfig } from '../../data/weatherConfig'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { WiHumidity, WiStrongWind, WiThermometer, WiCloud, WiUmbrella, WiRaindrop  } from 'react-icons/wi';
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { weatherConfig } from '../../data/weatherConfig'
import moment from 'moment';


interface WeatherAppProps {
  location: {
    name: string;
    localtime: string;
    localtime_epoch: number;

  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
    gust_kph: number;
    cloud: number;
  };
  forecast: {
    forecastday: Forecastday[];

  };
}


interface Forecastday {
  date: string;
  hour: Hours[];
  day:{
    daily_chance_of_rain: number;
    totalprecip_mm: number;
  }
}
interface Hours {
  time_epoch: number;
  time: string;
  temp_c: number;
  condition: {
    icon: string;
    code: number;
    text: string;
  };
}


const WeatherApp = () => {
  const { data, isLoading, isError, error } = useQuery<
    WeatherAppProps | null, Error>({
      queryKey: ['weatherData',],
      queryFn: async () => {
        const { data } = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${weatherConfig.apiKey}&q=london&days=1&aqi=yes&alerts=yes`);
        return data;
      }
    })
  console.log(data)
  const formatDateTime = (time_epoch: number) => {
    const targetDate = moment.unix(time_epoch);
    return targetDate.format('hh:mm A');
  };
  return (
    <>
      {isError && <p>Error: {error.message}</p>}
      {isLoading && (
        <div className={styles.loading}>
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
          </div>
        </div>
      )}
      {
        data && (
          <>
            <section className={styles.main_weather}>
              <h2 className='text-3xl font-semibold mb-2'>{data?.location.name}</h2>
              <div className={styles.weather_param}>
                <p className='text-6xl font-semibold my-2'>{data?.current.temp_c.toFixed()}°</p>
                <span className='flex items-center justify-center gap-2 my-3'><img style={{ width: 33, height: 33 }} src={data?.current.condition.icon} alt="weather icon" /> <p className='text-base font-semibold ms-1 mt-1'>{data?.current.condition.text}</p></span>
              </div>
              <div className={styles.child_param}>
                <ul>
                  <li>
                    <span><WiThermometer/></span> <p>{data?.current.feelslike_c.toFixed()}°</p>
                  </li>
                  <li><span><WiStrongWind/></span> <p>{data?.current.wind_kph}km/h</p></li>
                  <li><span><WiHumidity/></span> <p>{data?.current.humidity}%</p></li>
                </ul>
                <ul>
                  <li>
                    <span><WiUmbrella/></span> <p>{data?.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
                  </li>
                  <li><span><WiCloud/></span> <p>{data?.current.cloud}%</p></li>
                  <li><span><WiRaindrop/></span> <p>{data?.forecast.forecastday[0].day.totalprecip_mm.toFixed()}mm</p></li>
                </ul>
              </div>
            </section>
            <section className={styles.horly_weather}>
              <h4 className='font-semibold uppercase mb-3'>Hourly forecast</h4>
              <Swiper
                slidesPerView={3}
                centeredSlides={false}
                spaceBetween={10}
                grabCursor={false}
                pagination={false}
                modules={[Pagination]}
                className="mySwiper"
              >
               <div className={styles.swiper_item}>
                  {data?.forecast.forecastday[0].hour.map((hour, index) => {
                    // Kiểm tra điều kiện time_epoch bằng last_updated_epoch
                    if (hour.time_epoch >= data.current.last_updated_epoch) {
                      return (
                        <SwiperSlide key={index} className={styles.slider_item}>
                          <div className={styles.forcast_item}>
                            <div className={styles.head_item}>
                              <p className='text-white'>{formatDateTime(hour.time_epoch)}</p>
                            </div>
                            <div className={styles.thumb_weath}>
                              <img src={hour.condition.icon} alt={hour.condition.text} />
                            </div>
                            <div className={styles.btm_temp}>
                              <p className='font-bold text-white'>{hour.temp_c.toFixed()}°C</p>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    }
                    return null; // Không trả về giá trị nếu không thỏa điều kiện
                  })}
                </div>
              </Swiper>
            </section>
          </>
        )

      }
    </>
  )
}

export default WeatherApp