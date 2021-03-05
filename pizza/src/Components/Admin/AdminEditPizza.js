import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";
import Input from "../UI/Input";
import Button from "../UI/Button";

export default class AdminEditPizza extends Component {
    state = {
        pizzas: [],
        isReady: false,
        isEdit: false,
        editingPizza: false,
        size1: 0,
        size2: 0,
        size3: 0,
        price1: 0,
        price2: 0,
        price3: 0,
        file: '',
        imagePreviewUrl: '',
        name: "",
        components: "",
    }

    componentDidMount() {
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        axios.get("http://localhost:3000/pizzas")
            .then((elem) => {
                const res = elem.data;
                console.log(res);
                this.setState({
                    pizzas: res,
                    isReady: true,
                })
            })
            .catch(this.onError)
    }

    getSizeAndPrice = async (item) => {
        await this.setState({isEdit: true, editingPizza: item})

        const {editingPizza} = this.state;
        if (editingPizza) {
            const {sizeAndPrice} = editingPizza;
            this.setState({
                size1: sizeAndPrice[0].size,
                size2: sizeAndPrice[1].size,
                size3: sizeAndPrice[2].size,
                price1: sizeAndPrice[0].price,
                price2: sizeAndPrice[1].price,
                price3: sizeAndPrice[2].price,
                name: editingPizza.name,
                components: editingPizza.components,
            });
        }
    }

    _handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    _handleSubmit(e) {
        e.preventDefault();
    }

    editPizza = async () => {
         const {editingPizza, name, components, size1,size2,size3,price1,price2,price3, imagePreviewUrl} = this.state;
         let editedPizza = {
            name,
             components,
             img: imagePreviewUrl ? imagePreviewUrl : editingPizza.img,
             id: editingPizza.id,
             sizeAndPrice: [
                 {
                     "size": +size1,
                     "price": +price1
                 },
                 {
                     "size": +size2,
                     "price": +price2
                 },
                 {
                     "size": +size3,
                     "price": +price3
                 }
             ]
         }
         await axios.put(`http://localhost:3000/pizzas/${editingPizza.id}`, JSON.parse(JSON.stringify(editedPizza))).then(res => {
             console.log(res);
         })
        window.location.href = window.location.origin;
    }


    render() {
        const {pizzas, isReady, isEdit, editingPizza, size1, size2, size3, price1, price2, price3, imagePreviewUrl, name, components} = this.state;

        return (
            <div className="pizza-edit">
                {
                    isReady && !isEdit ? (
                        <div className="edit-pizza-wrapper">
                            {pizzas.map(item => {
                                return (
                                    <div onClick={() => this.getSizeAndPrice(item)} key={item.id}
                                         className="edit-pizza">
                                        <img src={item.img} alt=""/>
                                        <p>{item.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    ) : isEdit && editingPizza && (
                        <div className="current-edit">

                            <div className="image-edit-pizza-wrapper">
                                <img className="pizza-edit-img"
                                     src={imagePreviewUrl ? imagePreviewUrl : editingPizza.img} alt="pizza"/>
                                <div className="circle-edit">
                                    <svg height="492pt" viewBox="0 0 492.49284 492" width="492pt"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="m304.140625 82.472656-270.976563 270.996094c-1.363281 1.367188-2.347656 3.09375-2.816406 4.949219l-30.035156 120.554687c-.898438 3.628906.167969 7.488282 2.816406 10.136719 2.003906 2.003906 4.734375 3.113281 7.527344 3.113281.855469 0 1.730469-.105468 2.582031-.320312l120.554688-30.039063c1.878906-.46875 3.585937-1.449219 4.949219-2.8125l271-270.976562zm0 0"/>
                                        <path
                                            d="m476.875 45.523438-30.164062-30.164063c-20.160157-20.160156-55.296876-20.140625-75.433594 0l-36.949219 36.949219 105.597656 105.597656 36.949219-36.949219c10.070312-10.066406 15.617188-23.464843 15.617188-37.714843s-5.546876-27.648438-15.617188-37.71875zm0 0"/>
                                    </svg>
                                </div>
                                <form onSubmit={this._handleSubmit}>
                                    <input type="file" onChange={this._handleImageChange}/>
                                </form>
                            </div>
                            <label className="label-edit-admin" htmlFor="edit-pizza-name">Назва пiци</label>
                            <Input type="text" id="edit-pizza-name" value={name} onChange={(e)=>this.setState({name: e.target.value})}/>
                            <p className="label-edit-admin">Компоненти пiци</p>
                            <textarea className="textarea-components" onChange={(e)=>this.setState({components: e.target.value})} value={components} name="" id=""
                                      cols="30" rows="10">

                            </textarea>
                            <p className="label-edit-admin">Введiть новий розмiр та цiну для маленької піци</p>
                            <div className="input-group">
                                <Input onChange={(e) => this.setState({size1: e.target.value})} type="number"
                                       value={size1} min={0}/>
                                <Input onChange={(e) => this.setState({price1: e.target.value})} type="number"
                                       value={price1} min={0}/>
                            </div>
                            <p className="label-edit-admin">Введiть новий розмiр та цiну для середньої піци</p>

                            <div className="input-group">

                                <Input onChange={(e) => this.setState({size2: e.target.value})} type="number"
                                       value={size2} min={0}/>
                                <Input onChange={(e) => this.setState({price2: e.target.value})} type="number"
                                       value={price2} min={0}/>
                            </div>
                            <p className="label-edit-admin">Введiть новий розмiр та цiну для великої піци</p>

                            <div className="input-group">

                                <Input onChange={(e) => this.setState({size3: e.target.value})} type="number"
                                       value={size3} min={0}/>
                                <Input onChange={(e) => this.setState({price3: e.target.value})} type="number"
                                       value={price3} min={0}/>
                            </div>
                            <div className="button-group">
                                <Button content={"Пiдтвердити"} onClick={() => this.editPizza()}
                                        className="btn-form-admin"/>
                                <Button content={"Вiдмiнити"} onClick={() => this.setState({isEdit: false})}
                                        className="btn-form-admin"/>
                            </div>

                        </div>
                    )
                }
            </div>
        );
    }
}