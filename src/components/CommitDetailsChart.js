import React , {Component} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class CommitDetailsChart extends Component{

  render(){
    const data= [];
    let keys = Object.keys(this.props.commitDetails);
    for(let i=0;i<keys.length;i++){

      let  tempObj = {};
      tempObj['name'] = keys[i];
      tempObj['Commits'] = this.props.commitDetails[keys[i]];
      // console.log('kasjdhfkjlasdhfkjasdhfksdf', tempObj);
      data.unshift(tempObj);
    }

    return(
      <div id="commit-chart">
      <BarChart width={400} height={200} data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Legend />
        <Bar dataKey="Commits" fill="#82ca9d" />
      </BarChart>
      </div>
    );
  }
}

export default CommitDetailsChart;