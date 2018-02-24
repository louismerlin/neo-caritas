const hex2a = (hexx) => {
    var hex = hexx.toString();
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      route: 0,
      block: '...'
    }
    this.syncBlockchain = this.syncBlockchain.bind(this)
    this.goToLanding = this.goToLanding.bind(this)
    this.goToDeploy = this.goToDeploy.bind(this)
    this.goToDonate= this.goToDonate.bind(this)
  }

  goToLanding() {
    this.setState({route: 0})
  }
  goToDeploy() {
    this.setState({route: 1})
  }
  goToDonate() {
    this.setState({route: 2})
  }

  componentDidMount() {
    this.syncBlockchain()
    window.setInterval(this.syncBlockchain, 0.2*1000)
  }

  syncBlockchain() {
    var request = new XMLHttpRequest();
    request.open('POST', 'http://130.82.239.151:30336', true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const res = JSON.parse(request.responseText)
        this.setState({block: res.result})
      } else {
        console.log("Server error : " + request.responseText)
      }
    }
    request.onerror = () => {
      console.log("Connction Error !")
    }
    request.send(JSON.stringify({"jsonrpc": "2.0","method": "getblockcount","params": [],"id": 1}));
  }

  render() {
    var body

    if (this.state.route == 0) {
      body = <Landing key={1} deploy={this.goToDeploy} donate={this.goToDonate} />
    }
    if (this.state.route == 1) {
      body = <Deploy key={1} />
    }
    if (this.state.route == 2) {
      body = <Donate key={1} />
    }

    return (
      [<Navbar key={0} landing={this.goToLanding} block={this.state.block} />, body]
    )
  }
}
