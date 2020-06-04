import React, {Component} from 'react';
import Axios from 'axios';

export default class Glovo extends Component{
    state = {
        glovoInfo: []
    }

    componentDidMount(){
        this.getInfo();
        // this.postOrder();
    }

    getInfo = () => {
        Axios.get("https://api.glovoapp.com/b2b/working-areas",
        {
            headers:{
                "Authorization": "Basic MTU4MDY3NjM1OTIyNjU3OmI0ZmQyODhhNDJlNDRkYWFhNDE5MGEwNTVjYmI4MzQ0",
                "Content-Type": "application/json"
            }
        }).then((element)=>{
            // console.log(element.data.workingAreas);
            this.setState({
                glovoInfo: element.data
            })
        })
    }

    postOrder = () => {
        Axios.post("https://api.glovoapp.com/b2b/orders",JSON.parse({
            "scheduleTime": null,
            "description": "A 30cm by 30cm box",
            "reference": {
                "id": "your internal reference"
            },
            "addresses": [
                {
                "type": "PICKUP",
                "lat": 0.1,
                "lon": 0.3,
                "label": "Calle la X, 29",
                "details": "2nd Floor",
                "contactPhone": "+34622334455",
                "contactPerson": "Sam Romero",
                "instructions": "Use the stairs to access this address"
                }
            ]
        }),
        {
            headers:{
                "Authorization": "Basic MTU4MDY3NjM1OTIyNjU3OmI0ZmQyODhhNDJlNDRkYWFhNDE5MGEwNTVjYmI4MzQ0",
                "Content-Type": "application/json"
            }
        }).then(alert("OK")).catch(alert("Error"))
    }

    render(){
        return(
            <div>

            </div>
        )
    }
}