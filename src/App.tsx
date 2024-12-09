

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();




import './App.css'

import DefaultLayoutApp from './components/WeatherAppLayout/DefaultLayout';
import WeatherApp from './pages/WeatherApp';
import ForecastDay from './pages/ForecastDay';
import SearchLocation from './pages/SearchLocation';



function App() {


  return (
  
    <QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<DefaultLayoutApp />}>
							<Route index element={<WeatherApp />} />
							<Route path="forecastday" element={<ForecastDay />} />
							<Route path="search" element={<SearchLocation />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
    
  )
}

export default App

  // <QueryClientProvider client={queryClient}>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path='/' element={<DefaultLayout />}>
    //         <Route index element={<Home />} />
    //         <Route path='category' element={<Category />} />
    //         <Route path='product' element={<Product />} />
    //         <Route path='product/:id' element={<ProductDetails />} />
    //         {/* nested layout */}
    //         <Route path='customers' element={<Customers/>}>
    //           <Route path='profile' element={<CustomerProfile/>}/>
    //           <Route path='orders' element={<CustomerOrders/>}/>
    //         </Route>
    //         <Route path='login' element={<Login />} />

    //         {/* Nếu không tồn tại thì mặc định chuyển sang route dưới */}
    //         <Route path='*' element={<NoPage />} />
    //         {/* ***************************************************** */}
    //       </Route>
    //     </Routes>
    //   </BrowserRouter>
    // </QueryClientProvider >

{/* <QueryClientProvider client={queryClient}>
 <Weather/>
</QueryClientProvider> */}
  