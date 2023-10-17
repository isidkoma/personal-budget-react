import React, { useEffect, useRef } from 'react';
import { axiosGet } from './../AxiosService';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';


function Homepage() {
 
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
      const fetchData = async () => {
            try {
              const response = await axiosGet('/budget');

              if (response && response.data && response.data.myBudget) {
                  const myBudgetData = response.data.myBudget;

                  const labels = myBudgetData.map((item) => item.title);
                  const data = myBudgetData.map((item) => item.budget);

                  if (chartInstanceRef.current) {
                      chartInstanceRef.current.destroy();
                  }

                  const chartContext = chartRef.current.getContext('2d');
                  const newChartInstance = new Chart(chartContext, {
                      type: 'pie',
                      data: {
                          labels: labels,
                          datasets: [
                              {
                                  data: data,
                                  backgroundColor: [
                                    "#5a82ff",
                                    "#ff66b2",
                                    "#a1ff33",
                                    "#ff8c33",
                                    "#d477ff",
                                    "#ff33c9",
                                    "#ffd433",
                                    "#9FE2BF"
                                    
                                    
                                    
                                    
                                  ],
                              },
                          ],
                      },
                  });

                  chartInstanceRef.current = newChartInstance;

                  drawD3DonutChart(myBudgetData);

              }
          } catch (error) {
              console.error('Fetching data error', error);
          }
      };

      fetchData();
  }, []);

  return (
    <section className="container center">
      <article className="page-area">
        
      <div className="text-box">
      <h1>Stay on track</h1>
            <p>
                Do you know where you are spending your money? If you really stop to track it down,
                you would get surprised! Proper budget management depends on real data... and this
                app will help you with that!
            </p>
        </div>
        <div className="text-box">
      <h1>Alerts</h1>
      <p>
        What if your clothing budget ended? You will get an alert. The goal
        is to never go over the budget.
      </p>
    </div>

    <div className="text-box">
      <h1>Results</h1>
      <p>
        People who stick to a financial plan, budgeting every expense, get
        out of debt faster! Also, they to live happier lives... since they
        expend without guilt or fear... because they know it is all good and
        accounted for.
      </p>
    </div>

    <div className="text-box">
      <h1>Free</h1>
      <p>
        This app is free!!! And you are the only one holding your data!
      </p>
    </div>
    <div className="text-box">
    <h1>Stay on tracksss</h1>
            <p>
                Do you know where you are spending your money? If you really stop to track it down,
                you would get surprised! Proper budget management depends on real data... and this
                app will help you with that!
            </p>
        </div>
        <div className="text-box">
      <h1>Alertssss</h1>
      <p>
        What if your clothing budget ended? You will get an alert. The goal
        is to never go over the budget.
      </p>
    </div>

        <h1><u>Pie Chart</u></h1>
        <canvas id="myChart" ref={chartRef}></canvas>
    
        <h1><u>Donut Chart</u></h1>
        <div id="donutChartContainer"></div>
  
      </article>
    </section>
  );
}
function drawD3DonutChart(data) {
  const width = 500;
  const height = 500;
  const radius = Math.min(width, height) / 3;

  const existingChart = d3.select('#donutChartContainer svg');
  if (!existingChart.empty()) {
    return;
  }

  const svg = d3.select('#donutChartContainer')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

  const color = d3.scaleOrdinal()
    .domain(data.map((d) => d.title))
    .range(["#5a82ff", "#ff66b2", "#a1ff33", "#ff8c33", "#33ffb2", "#b233ff", "#ffd433", "#9FE2BF"]);

  const pie = d3.pie()
    .value((d) => d.budget);

  const arc = d3.arc()
    .outerRadius(radius - 20)
    .innerRadius(radius-100);

  const arcs = svg.selectAll('.arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc');

  arcs.append('path')
    .attr('d', arc)
    .attr('fill', (d) => color(d.data.title));

  arcs.append('line')
    .attr('x1', (d) => arc.centroid(d)[0])
    .attr('y1', (d) => arc.centroid(d)[1])
    .attr('x2', (d) => {
      const pos = arc.centroid(d);
      const midAngle = Math.atan2(pos[1], pos[0]);
      return Math.cos(midAngle) * (radius + 10);
    })
    .attr('y2', (d) => {
      const pos = arc.centroid(d);
      const midAngle = Math.atan2(pos[1], pos[0]);
      return Math.sin(midAngle) * (radius + 10);
    })
    .attr('stroke', 'blue');

  arcs.append('text')
    .attr('transform', (d) => {
      const pos = arc.centroid(d);
      const midAngle = Math.atan2(pos[1], pos[0]);
      return `translate(${Math.cos(midAngle) * (radius + 20)},${Math.sin(midAngle) * (radius + 20)})`;
    })
    .attr('dy', '0.8em')
    .style('text-anchor', (d) => {
      const pos = arc.centroid(d);
      return Math.cos(Math.atan2(pos[1], pos[0])) > 0 ? 'start' : 'end';
    })
    .text((d) => `${d.data.title} (${d.data.budget})`);

  arcs.selectAll('path')
    .attr('class', 'donut-slice');
}




export default Homepage;