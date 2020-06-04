import React from 'react';
import { Component } from 'react';
import {connect} from 'react-redux';
import {setSale} from '../../actions/actionCreater';

class SingleSale extends Component{
    render(){
        const {img, sale_name, sale_text} = this.props.sale;
        return(
            <div className="sales_full">
                <div className="container_sales">
                    <div className="wrapper_sales">
                        <div className="sales_photo">
                            <img src={img} alt="no-sale-pic" className="img_sale"/>
                        </div>
                        <div className="sales_info">
                            {/* <p className="date_sale">{date}</p> */}
                            <p className="name_sale">{sale_name}</p>
                            <p className="info_sale">{sale_text}</p>
                                {/* <button className="button_sales_details">Детальніше</button> */}
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default connect(state =>({
    sale: state.sale
}), {setSale})(SingleSale)