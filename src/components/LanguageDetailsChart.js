import React, {Component} from 'react';
import {RadialBarChart, RadialBar, Legend} from 'recharts';
class LanguageDetailsChart extends Component {

  render(){
    // const data = [
    //   {name: '18-24', uv: 31.47, pv: 2400, fill: '#8884d8'},
    //   {name: '25-29', uv: 26.69, pv: 4567, fill: '#83a6ed'},
    //   {name: '30-34', uv: 15.69, pv: 1398, fill: '#8dd1e1'},
    //   {name: '35-39', uv: 8.22, pv: 9800, fill: '#82ca9d'},
    //   {name: '40-49', uv: 8.63, pv: 3908, fill: '#a4de6c'},
    //   {name: '50+', uv: 2.63, pv: 4800, fill: '#d0ed57'},
    //   {name: 'unknow', uv: 6.67, pv: 4800, fill: '#ffc658'}
    // ];
    let fill = ['#8884d8','#83a6ed','#8dd1e1','#82ca9d','#a4de6c','#d0ed57','#ffc658'];
    let keys = Object.keys(this.props.repositoryLanguages);
    let data = [];
    for(let i=0;i<keys.length;i++){
      let  tempObj = {};
      tempObj['name'] = keys[i];
      tempObj['uv'] = this.props.repositoryLanguages[keys[i]];
      tempObj['fill'] = fill[Math.floor(Math.random()*fill.length)];
      data.unshift(tempObj);
    }


    const style = {
      top: 0,
      left: 350,
      lineHeight: '24px'
    };

    return (
      <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={30} data={data}>
        <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise={true} dataKey='uv'/>
        <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' wrapperStyle={style}/>
      </RadialBarChart>
    );
  }

}

export default LanguageDetailsChart;