import React, {  useState, useEffect } from 'react';
import Lifx from '../../api/lifx'


const api = process.env.REACT_APP_LIFX_API;

const Lights = () => {

  const [lights, setLights] = useState({light: []})
  const [settings, setSettings] = useState({setting: {}})

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
      let brightness = settings.setting;
      if(brightness < 0 || brightness > 1) {
        brightness = 0
      }
      let states = lights.map((light) => {
        console.log(light);

        return {
          selector: light.id,
          brightness: Number(brightness)
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

  const getSettings = () => {
    if(settings.setting) {
      console.log(settings.setting);
      lights.light.map((light) => {
        setLightState(light);
      })
    }
  }



  return (
    <section className="lights">
    {lights.light.map((light,index) => (
      <p key={index}>{light.id}</p>
    ))}
    {/* <button onClick={setLight}>Get Lights</button> */}
    <button onClick={setToggleLight}>Toggle Lights</button>
    <input type="text" onChange={e => setSettings({setting: e.target.value})}/>
      <button onClick={getSettings}>Change settings</button>
    </section>
   );
}

export default Lights;