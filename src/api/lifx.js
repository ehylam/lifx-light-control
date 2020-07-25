export default new class Lifx {
  getLights = async key => {
    let res = await fetch("https://api.lifx.com/v1/lights/all", {
      headers: {
        Authorization: `Bearer ${key}`
      }
    });
    return res;
  }

  toggleLights = async (key, id) => {
    try {
      let res = await fetch(`https://api.lifx.com/v1/lights/${id}/toggle`, {
        headers: {
          Authorization: `Bearer ${key}`
        },
        method: "POST"
      })
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  setLightStates = async (key, params) => {
    if(!params || params !== undefined) {
      console.log(JSON.stringify(params));
      try {
        let res = await fetch(`https://api.lifx.com/v1/lights/states`, {
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify(params)
        })

        return res;
      } catch (e) {
        console.log(e);
      }
    }
  }
}();