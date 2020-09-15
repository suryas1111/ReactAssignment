import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getData} from '../store/action';
import Search from '../component/Search';
import FilterByDate from '../component/FilterByDate';
import CampaignTable from '../component/CampaignTable';
import moment from 'moment';
import './Main.css';

class Main extends Component {
    state={
        sDate:"",
        edate:"",
        value:"",
        searchData:[],
        filterData:[]
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
        this.setState({searchData,filterData:[]});
    }

    setEDate=(event)=>{   
        console.log(moment(event.target.value).format('MM/DD/YYYY'))     
        let date=moment(event.target.value).format('MM/DD/YYYY');
        this.setState({edate:date});
    }

    setSDate=(event)=>{
        console.log(moment(event.target.value).format('MM/DD/YYYY'));
        let date=moment(event.target.value).format('MM/DD/YYYY');
        this.setState({sdate:date});
    }

    filterByDate=()=>{
        let sdate = document.getElementById('sdate');
        let edate = document.getElementById('edate');
        //erase the input value
        sdate.value = '';
        edate.value = '';
        //prevent error on older browsers (aka IE8)
        if (sdate.type === 'date') {
            sdate.type = 'text';
            sdate.type = 'date';
        }
        if (edate.type === 'date') {
            edate.type = 'text';
            edate.type = 'date';
        }
        let dataToFilter=this.state.searchData.length>0?this.state.searchData:this.setData();
        let filterData=dataToFilter.filter(ele=>{
            return ele.startDate>this.state.sdate && this.state.edate>ele.endDate;
        });

        console.log(filterData);
        this.setState({filterData});
    }

    renderList=()=>{
        let displayData=this.state.filterData.length>0?this.state.filterData:this.state.searchData.length>0?this.state.searchData:this.setData();
        return <CampaignTable displayData={displayData} /> ;        
    }

    render() {
            return (
            <div>
                <div className="filter">
                <FilterByDate setSDate={this.setSDate} setEDate={this.setEDate} sDate={this.state.sDate} onSubmit={this.filterByDate}/>
                <Search value={this.state.value} onChange={this.search}/>
                </div>
                <table className="table">
                    <thead>
                    <tr className="headerRow">
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
                </table>
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