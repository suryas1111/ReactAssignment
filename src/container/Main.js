import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getData} from '../store/action';
import Search from '../component/Search';
import FilterByDate from '../component/FilterByDate';
import moment from 'moment';
import './Main.css';

class Main extends Component {

    state={
        sDate:"",
        edate:"",
        value:"",
        searchData:[]
    }

    componentDidMount () {
        this.props.getData();        
    } 

    setData=()=>{
        let campaignData=[]
        if(this.props.data.length>0){
            campaignData=this.props.campaingn.map(ele => {
                let user=this.props.data.find(element => element.id===ele.userId).name;
                if(user){                
                    return {...ele,username:user}
                }else{
                    return {...ele,username:"Unknown User"}
                }
            });
        }        
        return campaignData;
    }

    search=(event)=>{
        let searchData=this.setData().filter(ele=>ele.username.toLowerCase().includes(event.target.value.toLowerCase()));
        this.setState({searchData});
    }

    setEDate=(event)=>{        
        let date=moment(event.target.value).format('DD MM YYYY');
        this.setState({edate:date});
    }

    setSDate=(event)=>{
        let date=moment(event.target.value).format('DD MM YYYY');
        this.setState({sdate:date});
    }

    filterByDate=()=>{
        let filterData=this.setData().filter(ele=>{
            return ele.startDate>this.state.sdate && this.state.edate<ele.endDate;
        });

        console.log(filterData);
    }

    renderList=()=>{
        let displayData=this.state.searchData.length>0?this.state.searchData:this.setData();

        return displayData.map(ele=>{
            let budget=Math.ceil(ele.Budget/1000);
            return(
                <tr key={ele.userId}>
                    <td>
                        {"Campaign "+ele.id}
                    </td>
                    <td>
                        {ele.username}
                    </td>
                    <td>
                        {ele.startDate}
                    </td>
                    <td>
                        {ele.endDate}
                    </td>
                    <td>
                    <label className="container">Active
                        <span className="checkmark" style={{backgroundColor:"green"}}></span>
                    </label>
                    </td>
                    <td>
                        {budget+"K USD"}
                    </td>
                </tr>
            );
        })
    }

    render() {
            return (
            <div>
                <div className="filter">
                <FilterByDate setSDate={this.setSDate} setEDate={this.setEDate} onSubmit={this.filterByDate}/>
                <Search value={this.state.value} onChange={this.search}/>
                </div>
                {<table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>User Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Active</th>
                        <th>Budget</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderList()}
                    </tbody>                   
                </table>}
            </div>
            );
        }
    }

const mapStateToProps = state => {
  return { 
      data: state.dataReducer.datalist, 
      campaingn:state.dataReducer.campaignList
    };
};

const mapDispatchToProps = dispatch => {
    return {
      getData: () => dispatch(getData()),
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Main);