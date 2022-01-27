import React from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


function RangeSlider({size,setSize}) {
    function sliderchange(value)
    {
          setSize(value);
    }
  return (
    <div className="qr-slider">
       <Slider min={36} max={125}  handleStyle={{
          borderColor: '#04009a',
          backgroundColor:"#022161",
        }}
        trackStyle={{
          borderColor: '#04009a',
          backgroundColor:"#023b5a",
        
        }}
        marks={{65:'3x3',36:'2x2',96:'4x4',125:'5x5'
        }}
        value={size}
        onChange={sliderchange}
        />
    </div>

  );
}

export default RangeSlider;