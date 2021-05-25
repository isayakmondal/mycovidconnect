import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class SearchRoute extends Component {

	constructor(props) {
		super(props);
		this.state = {
			lat: 0,
			lng: 0,
			redirect: false,
		};
	}

    getLocation = () => {
		if (window.navigator && window.navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					let lat = position.coords.latitude;
					let lng = position.coords.longitude;
					this.setState({
						lat: lat,
						lng: lng,
						redirect: true,
					});
				},
				(error) => {
					alert('Error dectecting your location');
				},
				{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
			);
		} else {
			alert('Please allow Geo Location permissions to access this facility');
		}
	};

    render(){
        const { redirect, lat, lng } = this.state;
		if (redirect) {
			return <Redirect to={`/search/${lat}/${lng}`} />;
		}
        return (
            <div className="d-block" onClick={this.getLocation}>
						{this.props.children}
						</div>
        )
    }
}

export default SearchRoute;