class SoduxChild {
  constructor(url, listener = () => {}, options = {}) {
    this.connection = new WebSocket(url);
    this.connectionState = "Disconnected";
    this.listeners = [listener];
    this.debug = options.debug;
    this.connection.onopen = () => {
      this.connectionState = "Connected";
    };
    this.connection.onerror = () => {
      this.connectionState = "Disconnected";
    };
    this.connection.onmessage = (e) => {
      let hiveMind = JSON.parse(e.data);
      if (this.debug) console.log("[SODUX] Mothership says ", hiveMind);
      this.state = hiveMind;
      this.listeners.forEach((aListener) => {
        if (typeof aListener === "function") {
          aListener(hiveMind);
        }
      });
    };
  }
  getState() {
    return this.state;
  }
  dispatch(action) {
    if (this.debug) console.log("[SODUX] Dispatching ", action);
    this.connection.send(JSON.stringify(action));
  }
  listen(listener) {
    this.listeners.push(listener);
  }
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = SoduxChild;
}
