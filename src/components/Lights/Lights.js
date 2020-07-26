import React, {  useState, useEffect } from 'react';
import Lifx from '../../api/lifx'


const api = process.env.REACT_APP_LIFX_API;

const Lights = () => {

  const [lights, setLights] = useState({light: []})
  const [settings, setSettings] = useState({brightness: {}, colour: {}})

  useEffect(() => {
    setLight();
  },[])


  const setLight = async () => {
    let res = await Lifx.getLights(api);
    let lightData = await res.json();
    for (let i = 0; i < lightData.length; i++) {
      setLights({light: [lightData[i]]})
    }
  }

  // Asynchronous function
  const toggleLight = async (light) => {
    let res = await Lifx.toggleLights(api,light);
  }

  const setToggleLight = async () => {
    lights.light.map((light) => toggleLight(light.id))
  }





  const getSettings = () => {
    if(settings.brightness || settings.colour) {
      lights.light.map((light) => {
        setLightState(light);
      })
    }
  }


  const setLightState = async (params) => {
    let userSettings = lightSettings(lights.light);
    console.log(userSettings)
    try {
      let res = await Lifx.setLightStates(api, userSettings);
    } catch(e) {

    }

  }


  const lightSettings = (lights) => {
    if(lights.length) {
      let brightness = settings.brightness;
      let colour = settings.colour;
      console.log(colour + ' ' + brightness);
      if(brightness < 0 || brightness > 1 || brightness === null || brightness === undefined || colour === null || colour === undefined) {
        brightness = 0;
        colour = 'red';
      }
      let states = lights.map((light) => {
        return {
          selector: light.id,
          brightness: Number(brightness),
          color: colour
        }
      })
      return {
        states,
        "defaults": {
          "duration": 5.0
        }
      }
    }
  }


  // Need to reduce these state changers into a single function if possible.
  // Need to determine what object is being modified.
  const getBrightnessState = (e) => {
    let value = e.target.value;
    setSettings((prevValue) => ({...prevValue, brightness: value}))
  }

  const getColourState = (e) => {
    let value = e.target.value;
    setSettings((prevValue) => ({...prevValue, colour: value}))
  }



  return (
    <section className="lights">
    {lights.light.map((light,index) => (
      <p key={index}>{light.id}</p>
    ))}
    {/* <button onClick={setLight}>Get Lights</button> */}
    <button onClick={setToggleLight}>Toggle Lights</button>
    <label>Brightness</label>
    <input type="text" onChange={(e) => getBrightnessState(e)}/>
    <label>Colour</label>
    <input type="text" onChange={(e) => getColourState(e)}/>
      <button onClick={getSettings}>Change settings</button>
    </section>
   );
}

export default Lights;