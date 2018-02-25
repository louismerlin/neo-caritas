const NGO_ADDRESS = "ANU44juAN2GkmRTEWTu25Jx5umxEhnctB4"
const MY_IP = "130.82.239.151"

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
      block: '...',
      balance: 0,
      unclaimed: 0
    }
    this.syncBlockchain = this.syncBlockchain.bind(this)
    this.syncContracts = this.syncContracts.bind(this)
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
    window.setInterval(this.syncBlockchain, 1*1000)
  }

  ip(port) {
    return 'http://' + MY_IP + ':' + port
  }

  createRequest(url, type, onLoad, data) {
    const request = new XMLHttpRequest()
    request.open(type, url, true)
    request.setRequestHeader("Content-type", "application/json")
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const res = JSON.parse(request.responseText)
        onLoad(res)
      } else {
        console.log("Server error : " + request.responseText)
      }
    }
    request.onerror = () => {
      console.log("Connction Error !")
    }
    request.send(JSON.stringify(data))
  }

  syncBlockchain() {
    this.createRequest(this.ip(30336), 'POST', res => {
      this.setState((prevState, props) => {
        if (prevState.block != res.result) {
          this.syncContracts()
          return {block: res.result}
        }
      })
    }, {"jsonrpc": "2.0","method": "getblockcount","params": [],"id": 1})
  }

  syncContracts() {
    this.createRequest(
      this.ip(4000) + '/api/main_net/v1/get_balance/' + NGO_ADDRESS,
      'GET',
      res => {
        this.setState({balance: res.balance[0].amount || 0})
    }, {})
  }

  render() {
    var body

    if (this.state.route == 0) {
      body = <Landing key={1} deploy={this.goToDeploy} donate={this.goToDonate} />
    }
    if (this.state.route == 1) {
      body = <Deploy key={1} unclaimed={this.state.unclaimed} />
    }
    if (this.state.route == 2) {
      body = <Donate key={1} balance={this.state.balance} />
    }

    return (
      [<Navbar key={0} landing={this.goToLanding} block={this.state.block} />, body]
    )
  }
}
