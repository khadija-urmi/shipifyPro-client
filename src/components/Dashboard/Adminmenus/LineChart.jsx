import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = ({ parcels}) => {
  const total = []
  const newDate = []
  const intDate=[]
    // const date =  parseInt(bookingDate)
     for (let i = 0; i < parcels.length; i++) {
            total.push(parcels[i]?.totalPrice)       
            // newDate.push( )   
            const num = parcels[i]?.bookingDate
            const d = new Date(num).getTime() 
            newDate.push(d)
            // const date =  parseInt(bookingDate)
            // const date = parseInt(bookingDate)
            const date = format(new Date(num||0),'dd-MM-yyyy')
            intDate.push(date)
            // console.log(d)  
            
        }
console.log(intDate)
console.log(total)
    const [state, setState] = useState({
          
        series: [{
          name: 'Sales',
          data: total
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
          },
          forecastDataPoints: {
            count: 7
          },
          stroke: {
            width: 5,
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001','4/11/2001' ,'5/11/2001' ,'6/11/2001'],
            tickAmount: 10,
            labels: {
              formatter: function(value, timestamp, opts) {
                return opts.dateFormatter(new Date(timestamp), 'dd MMM')
              }
            }
          },
          title: {
            text: 'Forecast',
            align: 'left',
            style: {
              fontSize: "16px",
              color: '#666'
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              gradientToColors: [ '#FDD835'],
              shadeIntensity: 1,
              type: 'horizontal',
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100, 100, 100]
            },
          }
        },
      
      
    });

    return (
        <div>
            {/* <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
              </div>
            <div id="html-dist"></div> */}
             <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
              </div>
            <div id="html-dist"></div>
          </div>
    );
};

export default LineChart;