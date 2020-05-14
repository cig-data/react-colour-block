import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './selfSelect.less'
export default class SelfSelect extends Component {
    constructor(props) {
        super(props);
        this.state ={
            isOpen:false,
            option:[]
        };
        Object.assign(this.state,{option:this.props.options})
    }
    static displayName = 'SelfSelect';

    static propTypes = {
        /**
         * 当前选择的值
         */
        value: PropTypes.object,
        /**
         * 下拉数据
         */
        options: PropTypes.array,
        /**
         * change事件
         */
        onchange: PropTypes.func,
    };

    static defaultProps = {
        value: {},
        options: [],
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            option:nextProps.options === undefined?[]:nextProps.options
        })
    }

    renderOptionChildren = () => {
        if(this.props.options.length === 0) return <div> </div>;
        const { option } = this.state;
        if(option.length === 0 && this.props.options.length>0){
            this.setState({
                option:this.props.options
            })
        }
        return <ul className={'colourSelectOption'}>
            {option.map((obj,index)=>{
                return <li className={'colourSelectLi'} onMouseDown={this.handleChange.bind(this,obj)} key={index}>{obj.label}</li>
            })}
        </ul>;
    };

    handleChange(e){
        this.setState({
            isOpen:false
        });
        if(this.props.onchange !== undefined) this.props.onchange(e)
    }
    handleOpen(e){
        e.stopPropagation();
        this.setState({
            isOpen:!this.state.isOpen
        });
        this.refs.fakeInput.focus();
    }
    handleClose(){
        if(this.state.isOpen){
            this.setState({
                isOpen:false
            })
        }
    }
    render() {
        const { value,disabled } = this.props;
        const { isOpen, option } = this.state;
        return (
            <div className={`colourSelectContainer ${disabled?'pointerNone':''}`}>
                <div className={'colourSelectValueContainer'} onClick={this.handleOpen.bind(this)}>
                    <div className={'colourSelectValueContent'}>
                        <span className={'colourSelectValue'} style={{paddingRight:option.length ? '10px' : 0}} title={value.label}>{value.label}</span>
                        {option.length ? <div className={'downIcon'}></div> :null}
                    </div>
                </div>
                <input style={{width:'1px',height:'1px',border:'none',backgroundColor:'transparent',color:'transparent',outline:'none'}} type="text" ref={"fakeInput"} onBlur={this.handleClose.bind(this)}/>
                {isOpen?this.renderOptionChildren():null}
            </div>
        );
    }
}
