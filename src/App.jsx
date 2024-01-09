import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Component } from "react";
import AddressInfo from "./Components/AdsressInfo/AddressInfo";
import "./App.scss";

// https://geo.ipify.org/api/v2/country?apiKey=at_BP8UwvwUKPQ7Mne9IucZug2YbnBhN&ipAddress=8.8.8.8

class App extends Component {
  state = {
    address: null,
    input: "",
    empty: true,
    loading: false,
    notFound: false,
    emptyValue: "",
  };

  getAddress = async () => {
    const { input } = this.state;
    this.setState({ loading: true, empty: false });
    let res = null;
    const trimInp = input.trim();
    const urldomain = `https://geo.ipify.org/api/v2/country?apiKey=at_BP8UwvwUKPQ7Mne9IucZug2YbnBhN&domain=${trimInp}`;
    const urlIpAddress = `https://geo.ipify.org/api/v2/country?apiKey=at_BP8UwvwUKPQ7Mne9IucZug2YbnBhN&ipAddress=${trimInp}`;
    if (trimInp === "") {
      this.setState({ emptyValue: "Whoops, can't be empty" });
      this.setState({ loading: false, empty: true });
    } else if (this.isValidIpAddress(trimInp)) {
      const response = await fetch(urlIpAddress);
      res = await response.json();
      this.setState({ loading: false });
      this.setState({ address: res });
      this.setState({ emptyValue: "" });
    } else if (this.isValidDomain(trimInp)) {
      const response = await fetch(urldomain);
      res = await response.json();
      this.setState({ loading: false });
      this.setState({ address: res });
      this.setState({ emptyValue: "" });
    } else {
      this.setState({ address: null });
      this.setState({ emptyValue: "" });
    }
    this.setState({ loading: false });

    this.setState({ input: "" });
  };

  isValidIpAddress = (input) => {
    const parts = input.split(".");
    if (parts.length !== 4) {
      return false;
    }
    return parts.every(
      (part) => parseInt(part, 10) >= 0 && parseInt(part, 10) <= 250
    );
  };

  isValidDomain = (input) => {
    return input.includes(".");
  };

  render() {
    const { address, empty, loading, notFound, input, emptyValue } = this.state;
   
    return (
      <>
        <div className="wrapper">
          <div className="promo">
            <h2>Ip address tracker</h2>
            <label>
              <div className="search">
                <input
                  type="text"
                  placeholder="Search for any IP address or domain"
                  autoComplete="off"
                  id="ip-address"
                  value={input}
                  className="ip-address"
                  onChange={(e) => {
                    this.setState({ input: e.target.value });
                  }}
                />

                <button className="btn" onClick={this.getAddress}>
                  {">"}
                </button>
              </div>
            </label>
            <span className="error">{emptyValue}</span>
          </div>

          <AddressInfo
            address={address}
            empty={empty}
            loading={loading}
            notFound={notFound}
          />

          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
            style={{
              height: "100%",
              width: "100vw",
              position: "absolute",
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </>
    );
  }
}

export default App;
