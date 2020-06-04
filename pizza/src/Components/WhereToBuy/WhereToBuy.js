import React, {Component} from 'react';
import "./style.css";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Dialog from "../Dialog/Dialog";
export default class WhereToBuy extends Component{
    render(){
        return(
            <div>
                <div className="container__whereToBuy">
                    <div className="where__to_buy">
                        <div className="where__block">
                            <div className="image__where"><img src="https://www.5.ua/media/pictures/original/102526.png" alt=""/></div>
                            {/* <p className="title__where">Київ</p> */}
                            <Dialog classname={"title__where"} name="Київ" location="1. вул.Січових Стрільців, 77" location2="2. вул. Олеся Гончара, 62" location3= "3. вул.Басейна, 17" location4= "4. вул.Гусовського, 11/11" />
                            <p className="subtitle__where"></p>
                        </div>
                        <div className="where__block">
                            <div className="image__where"><img src="https://etnoxata.com.ua/image/catalog/stat3/06_2016/22_06_16/z/00.jpg" alt=""/></div>
                            {/* <p className="title__where">Запоріжжя</p> */}
                            <Dialog classname={"title__where"} name="Запоріжжя" location="1. вул. Нагнибіди, 27" location2="2. вул. Водограйна, 5" />

                            <p className="subtitle__where"></p>
                        </div>
                    </div>

                    <div className="features__block">
                        <div className="row__features__block">
                            <div className="col1__features">
                                <p className="text__features">Минимальная сумма</p>
                                <p className="subtext__features">заказ на доставку</p>
                            </div>

                            <div className="col2__features ">
                                <div className="icon__features"><ShoppingCartIcon /></div>
                                <div className="num__features">145</div>
                                <div className="subnum__features">гривен</div>
                            </div>
                        </div>
                        <div className="row__features__block ">
                            <div className="col1__features">
                                <p className="text__features">Время доставки</p>
                                <p className="subtext__features">с 10:00 до 23:59</p>
                            </div>

                            <div className="col2__features media__features">
                                <div className="icon__features blue__icon"><AccessTimeIcon /></div>
                                <div className="num__features blue__features">30</div>
                                <div className="subnum__features blue__features">минут</div>
                            </div>
                        </div>
                        <div className="row__features__block">
                            <div className="col1__features ">
                                <p className="text__features">Время доставки</p>
                                <p className="subtext__features">с 00:00 до 09:59</p>
                            </div>

                            <div className="col2__features media__features">
                                <div className="icon__features blue__icon"><AccessTimeIcon /></div>
                                <div className="num__features blue__features">60</div>
                                <div className="subnum__features blue__features">минут</div>
                            </div>
                        </div>
                    </div>

                    <div className="details-row__payments">
                        <div className="row__payments--title">
                            Варианты оплаты
                        </div>
                        <div className="row__payments--block">
                            <p className="subtitle__payments">Наличными</p>
                            <p className="texttitle__payments">Самый простой и привычный способ - наличными курьеру. Если Вам потребуется сдача, скажите об этом оператору при оформлении заказа. Чаевые курьеру приветствуются, но остаются исключительно на Ваше усмотрение. При получении заказа проверьте его комплектность, оплатите его в соответствии с чеком, и, убедившись, что все в порядке, отпускайте курьера.</p>
                        </div>
                        <div className="row__payments--block">
                            <p className="subtitle__payments">Карточкой</p>
                            <p className="texttitle__payments">Вы можете оплатить свой заказ кредитной картой. Оплата осуществляется через платежную систему банка Райффайзен Банк Аваль. Комиссия за использование не взымается.</p>
                        </div>
                        <div className="row__payments--block">
                            <p className="subtitle__payments">LiqPay</p>
                            <p className="texttitle__payments">Вы можете оплатить заказ через сервис LiqPay</p>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}