
import styles from './ForecastDay.module.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { weatherConfig } from '../../data/weatherConfig'
import {WiUmbrella} from 'react-icons/wi'
import moment from 'moment'

interface ForecastDayProps{
  forecast: {
   forecastday:{
    date: string;
    date_epoch: number;
    day:{
      maxtemp_c: number;
      avgtemp_c: number;
      daily_chance_of_rain: number;
      condition:{
        text: string;
        icon: string;
        code: number;
      }
    }
     
   }[];

  }
}
const formatDayOfWeek = (date: string) => {
  return moment(date).format('dddd');
};

const ForecastDay = () => {
  const {data, isLoading, isError, error} = useQuery<ForecastDayProps | null, Error>({
    queryKey: ['forecastDayData',],
    queryFn: async () => {
      const {data} = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${weatherConfig.apiKey}&q=London&days=7&aqi=yes&alerts=yes`);
      console.log('data:',data)
      return data;
    }
  })

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
          <section className={styles.main_forecast}>
            <h2 className='text-xl font-semibold uppercase  p-3'>5 day forecast</h2>

            <div className={styles.list_days}>
              <ul>
               {
                data.forecast.forecastday.map((item, idx)  =>(
                  <li key={idx}>
                  <div className={styles.days}>
                      {formatDayOfWeek(item.date)}
                  </div>
                  <div className={styles.param_weath}>
                    <img style={{width: 30, height: 30}} src={item.day.condition.icon} alt="" />
                    <span className='flex gap-1'><span className=' text-lg'><WiUmbrella/></span><p>{item.day.daily_chance_of_rain}%</p></span>
                  </div>
                  <div className={styles.temp_avg}>
                        <p>{item.day.maxtemp_c.toFixed()}°C</p> / 
                        <span><p>{item.day.avgtemp_c.toFixed()}°C</p></span>
                  </div>
                </li>
                ))
               }
              </ul>
            </div>
          </section>
        )
      }
    </>
  )
}

export default ForecastDay;


