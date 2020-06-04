import React from 'react';
import { Component } from 'react';
import './Sale.css';
import {Link} from 'react-router-dom';
import {setSale} from '../../actions/actionCreater';
import {connect} from 'react-redux';

class Sale extends Component{
    state = {
        saleNew: ''
    }

    setNewSale = () =>{
        const {img, name, info, id, setSale} = this.props;
        setSale(id,img,name,info);
    }
    render(){
        const {img, date, name, info, id} = this.props;
        return(
            <div className="sales_full">
                <div className="container_sales">
                    <div className="wrapper_sales">
                        <div className="sales_photo">
                            <img src={img} alt="no-sale-pic" className="img_sale"/>
                        </div>
                        <div className="sales_info">
                            <p className="date_sale">{date}</p>
                            <p className="name_sale">{name}</p>
                            <p className="info_sale">{info}</p>
                            <Link to={"/sales"+ id}>
                                <button onClick={this.setNewSale} className="button_sales_details">Детальніше</button>
                            </Link>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default connect(state =>({
    sale: state.sale
}),{setSale})(Sale)