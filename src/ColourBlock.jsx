import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './main.less'
import SelfSelect from './SelfSelect.jsx'
export default class ColourBlock extends Component {
    constructor(props) {
        super(props);
        this.state ={
            data:[]
        };
        Object.assign(this.state,{data:this.props.data})
    }
    static displayName = 'ColourBlock';

    static propTypes = {
        /**
         * 彩色块数据
         */
        data: PropTypes.array,
        /**
         * function 展示
         */
        onShow: PropTypes.func,
        /**
         * function 选择
         */
        onChange: PropTypes.func,
        /**
         * function 鼠标移入事件
         */
        onMouseEnter: PropTypes.func,
        /**
         * function 鼠标移出事件
         */
        onMouseLeave: PropTypes.func,
    };

    static defaultProps = {
        data: []
    };

    handleClick(value,ind){
        let newData = this.props.data.map((obj,index)=>{
            if(ind === index){
                obj.disabled = obj.isShow;
                obj.isShow = !obj.isShow;
            }
            return obj;
        });
        if(this.props.onShow !== undefined) this.props.onShow(newData);
    }
    handleSelectChange(index,value){
        let newData =[...this.props.data];
        newData[index].value = value;
        if(this.props.onChange !== undefined) this.props.onChange(newData,index,value);
    }
    handleMouseEnter(ind){
        if(this.props.data[ind].isShow) return;
        if(this.props.onMouseEnter !==undefined) this.props.onMouseEnter(ind)
    }
    handleMouseLeave(ind){
        if(this.props.data[ind].isShow) return;
        if(this.props.onMouseLeave !==undefined) this.props.onMouseLeave(ind)
    }
    render() {
        // const {data} = this.state;
        const {data} = this.props;
        const childBlock = data.length>0?data.map((obj,ind)=>{
            return <li
                className={`colourBlockLi ${obj.isShow?'':'unCheckBlock'}`}
                onClick={this.handleClick.bind(this,obj,ind)} key={ind}
                onMouseEnter={this.handleMouseEnter.bind(this,ind)}
                onMouseLeave={this.handleMouseLeave.bind(this,ind)}
            >
                <SelfSelect
                    value={obj.value}
                    options={obj.options}
                    disabled={obj.disabled}
                    onchange={this.handleSelectChange.bind(this,ind)}
                />
                <div className={'colourTotal'}>{obj.total}</div>
            </li>
        }):null;
        return (
            <ul className={'colourContainer'}>
                {childBlock}
            </ul>
        );
    }
}
