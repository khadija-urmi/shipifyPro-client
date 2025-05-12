// import React from 'react';
import LineChart from '../../../components/Dashboard/Adminmenus/LineChart';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Statistics = () => {
  const bookingDate = []
  const newDate = []
  const intDate = []
  const axiosPublic = useAxiosPublic()
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/parcel`)
      // console.log(res.data)
      return res.data
    }
  })


  for (let i = 0; i < parcels.length; i++) {
    bookingDate.push(parcels[i]?.bookingDate)
    // newDate.push( )   
    const num = parcels[i]?.bookingDate
    // console.log(num) 
    const d = new Date(num).getTime()
    newDate.push(d)
    // const date =  parseInt(bookingDate)
    // const date = parseInt(bookingDate)
    const date = format(new Date(num || 0), 'dd-MM-yyyy')
    intDate.push(date)
    // console.log(d)  

  }
  // const
  console.log(intDate)
  console.log(bookingDate)
  // bar chart
  const [state, setState] = useState({

    series: [{
      //   data: bookingDate
      data: intDate
      // data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: 'end',
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: intDate,
        // categories: format(new Date(bookingDate)),
        // categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
        //   'United States', 'China', 'Germany'
        // ],
      }
    },


  });

  // line chart


  return (
    <div className='w-11/12 mx-auto'>
      <h1>statistics</h1>
      <div className="">
        {/* apex chart */}
        <div id="chart">
          <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
        </div>
        <div id="html-dist"></div>

        {/* line chart */}
        <LineChart bookingDate={intDate} parcels={parcels}></LineChart>

      </div>
    </div>
  );
};

export default Statistics;