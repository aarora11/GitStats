import React, {Component} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell} from 'recharts';

class UserDetailsChart extends Component {

  render(){


    const data= [];
    let keys = Object.keys(this.props.userDetails);
    for(let i=0;i<keys.length;i++){
      let  tempObj = {};
      tempObj['name'] = keys[i];
      tempObj['value'] = this.props.userDetails[keys[i]];
      data.unshift(tempObj);
    }

    // console.log(data2);

    const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
    // const data = [
    //   {name: 'Page A',female: 4000},
    //   {name: 'Page B', female: 1398},
    //   {name: 'Page C', female: 9800},
    //   {name: 'Page D', female: 3908},
    //   {name: 'Page E', female: 4800},
    //   {name: 'Page F', female: 3800},
    //   {name: 'Page G', female: 4300},
    // ];

    const getPath = (x, y, width, height) => {
      return `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;
    };
    const TriangleBar = (props) => {
      const { fill, x, y, width, height } = props;

      return <path d={getPath(x, y, width, height)} stroke="none" fill={fill}/>;
    };


    // TriangleBar.propTypes = {
    //   fill: PropTypes.string,
    //   x: PropTypes.number,
    //   y: PropTypes.number,
    //   width: PropTypes.number,
    //   height: PropTypes.number,
    // };
    return (
      <div id="user-chart">
      <BarChart width={600} height={400} data={data}
                margin={{top: 20, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Bar dataKey="value" fill="#8884d8" shape={<TriangleBar/>} label={{ position: 'top' }}>
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]}/>
            ))
          }
        </Bar>
      </BarChart>
      </div>
    );
  }

}

export default UserDetailsChart;