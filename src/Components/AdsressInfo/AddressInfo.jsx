import { Component } from "react";
import Loading from "../Loading/Loading";
import NotFound from "../NotFound";
import './AddressInfo.scss'


class AddressInfo extends Component{
    render(){
        const {address,empty,loading,} = this.props
        console.log(address);
        
        if(empty){
         
            return <div className="content"></div>
        }
       
        if(address && address.code === 400){
          return  <div className="content">
            <NotFound />
          </div>
        }
        if(loading){
          return <div className="content">
          <Loading />
      </div>
         
        }
       else if(!address){
          return <div className="content">
            <h1>This webpage could't find!!</h1>
          </div>
        } else if(!loading && address){
            return(
               <div className="content">
                 <div className="info-address">
              <div className="all-style">
                <h3>Ip Address</h3>
                <p>{address && address?.ip}</p>
              </div>
              <span className='line'></span>
              <div className="all-style">
                <h3>Location</h3>
                <p>{address && address?.location?.country} {address && address.location?.region} </p>
              </div>
              <span className='line'></span>
              <div className="all-style">
                <h3>Timezone</h3>
                <p>{address && address?.location?.timezone}</p>
              </div>
              <span className='line'></span>
              <div className="all-style">
                <h3>Isp</h3>
                <p>{address && address?.isp} </p>
              </div>
              
            </div>
               </div>
            )
        }else{
            return <div className="content"></div>
        }
        
    }
}
export default AddressInfo