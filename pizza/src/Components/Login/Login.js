import React, { Component } from 'react';
import './login.css';
import googleImg from './google.png';
import Axios from 'axios';
import {connect} from 'react-redux';
import {setUser} from '../../actions/actionCreater';
import Input from "../Input/Input";
import Validation from "../Validation/Validation";

class Login extends Component{
      state={
        newUser: [],
        errorSignUp: false,
        errorSignIp: false,
        validation: {
            type: "info",
            message: ""
        },
        valueLogin: '',
        valuePassword: '',
        name: '',
        formControls: {
            username: {
                value: "",
                type: "text",
                placeholder: "Логін"
            },
            password: {
                value: "",
                placeholder: "Пароль",
                type: "password"
            },
        }
      }

      onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };
        control.value = event.target.value;
        formControls[controlName] = control;
        this.setState({
            formControls,
        });
    }

    renderInputs = () => Object.keys(this.state.formControls).map((controlName, index) => {
        const control = this.state.formControls[controlName];
        return <Input
            key={controlName + index}
            type={control.type}
            value={control.value}
            placeholder={control.placeholder}
            className="edit"
            onChange={(event) => this.onChangeHandler(event, controlName)}
        />;
    })

    componentDidMount(){
        Axios.get("http://localhost:3000/users").then((res)=>{
            console.log(res.data);
        })
        this.handleChange = this.handleChange.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        window.gapi.load('auth2', function() {
            window.gapi.auth2.init({
                client_id: '333888186173-hhin7u0g15hank78hq9vgaf32akvhcc8.apps.googleusercontent.com'
            })
            .then(()=>console.log("OK"), ()=>console.log("ERROR"))
          });
    }

    handleChange(event) {
        this.setState({valueLogin: event.target.valueLogin});
        console.log(this.state.valueLogin);
      }

      handleChangePass(event) {
        this.setState({valuePassword: event.target.valuePassword});
        console.log(this.state.valuePassword);
      }



    signIn = () =>{
        const _authOk = googleUser => {
           this.setState({
               name: googleUser.getBasicProfile().getName(),
           })
           const {setUser} = this.props;
           const {name} = this.state;
           setUser(name);
           localStorage.setItem("username", name)
        }
        const _authErr = ()  => console.log('auth ERROR');

        const  GoogleAuth = window.gapi.auth2.getAuthInstance()
        GoogleAuth.signIn(
            {
                scope: 'profile email'
            }
        )
        .then(_authOk,_authErr)
    }

    LogIn = async () => {
        this.setState({errorSignIp: false})
        const {formControls} = this.state;
        await Axios.get("http://localhost:3000/users").then((response)=>{
            this.setState({
                newUser: response.data
            })
        })
        const {newUser} = this.state;
         newUser.forEach(item =>{
            const {username, password} = item;
            console.table(username, formControls.username.value, " + ",password, formControls.password.value)
            if((username === formControls.username.value)&&(password === formControls.password.value)){
                this.setState({
                    errorSignIp: true,
                })
            }
            // else((username === formControls.username.value)&&(password === formControls.password.value))
            // else{
            //     this.setState({errorSignIp: false})
            // }
            })
            console.log(this.state.errorSignIp);
            if(this.state.errorSignIp){
                const {setUser} = this.props;
                    setUser(formControls.username.value);
                    localStorage.setItem("username", formControls.username.value);
                    this.setState({
                        validation: {
                            type: "success",
                            message: "Ви успішно авторизувалися"
                        }
                    })
                        this.props.history.push('/profile'+formControls.username.value);
                    
                  
            }
            else {
                this.setState({
                    validation: {
                        type: "error",
                        message: "Такого користувача не існує. Перевірте правильність даних"
                    }
                })
            }
    }

    signUp = async () => {
        this.setState({errorSignUp: false})
        const {formControls} = this.state;
        const user = {
            username: formControls.username.value,
            password: formControls.password.value,
            isLiked: [],
            bonuses: 0
        }
        console.table(formControls.username.value, formControls.password.value);
        await Axios.get("http://localhost:3000/users").then((response)=>{
            this.setState({
                newUser: response.data
            })
        })
        const {newUser} = this.state;
        newUser.forEach(item =>{
            const {username} = item;
            console.table(username == formControls.username.value);
            if(username == formControls.username.value){
                this.setState({
                    errorSignUp: true,
                    validation: {
                        type: "error",
                        message: "Користувач с таким логіном вже існує"
                    }  
                })
            }
            if(formControls.password.value < 5){
                this.setState({
                    errorSignUp: true,
                    validation: {
                        type: "warning",
                        message: "Пароль має складатися з більше ніж 5 символів"
                    } 
                })
            }
            if((formControls.password.value === "")||(formControls.username.value === "")){
                this.setState({
                    errorSignUp: true,
                    validation: {
                        type: "warning",
                        message: "Введіть будь-ласка свої дані"
                    } 
                })
            }
            // else if(username !== formControls.username.value)
            // else{
            //     this.setState({errorSignUp: false})
            // }
            
        })
        console.log(this.state.errorSignUp);
            if(!this.state.errorSignUp){
                Axios.post("http://localhost:3000/users", JSON.parse(JSON.stringify(user))).then((res)=>{
                    const {setUser} = this.props;
                    setUser(user.username);
                    localStorage.setItem("username", user.username);
                    localStorage.setItem("id", user._id);
                    this.setState({
                        validation: {
                            type: "success",
                            message: "Ви успішно зареєструвалися"
                        }
                    })
                    this.props.history.push('/');
                });
            }
            else(console.log("ERROORORORORORO"));
    }

    // setNewUser = () =>{
        
    //     const {name} = this.state;
    //     alert(name);
        
        
    // }

    render(){
        const {validation} = this.state;
        return(
            <div className="login">
                <div className="container">
                    <div className="login__wrapper">
                        <p className="enter__login">Увійти</p>
                        {this.renderInputs()}
                        {/* <input type="text" value={this.state.valueLogin} onChange={this.handleChange} placeholder="Логін" className="login__input"/>
                        <input type="password" value={this.state.valuePassword} onChange={this.handleChangePass} placeholder="Пароль" className="login__input"/> */}
                        <p className="forgot__password">Забули пароль?</p>
                        <div className="button__logIn" onClick={this.LogIn}>Увійти</div>
                        <div className="button__logIn" onClick={this.signUp}>Реєстрація</div>
                        <p className="social__enter">Увійти через соц. мережу</p>
                        <div className="google__sign__in" onClick={this.signIn}>
                            <img src={googleImg} alt="no-google"/>
                        </div>
                    </div>
                    {validation.message !== "" && <Validation  type={validation.type} message={validation.message} />}
                </div>
            </div>
        )
    }
}
export default connect(state =>({
    user: state.user
}),{setUser})(Login);