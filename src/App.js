const CONTRACT_ADDRESS = "AMijAsUe25iiU3e1UcpqEBB3awknaXBP4R"
const NGO_CONTRACT = "0xa89788d15f35efc7a15765113c2776ac5e6e3841"
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
      unclaimed: 0,
      gas: 0
    }
    this.syncBlockchain = this.syncBlockchain.bind(this)
    this.syncContracts = this.syncContracts.bind(this)
    this.goToLanding = this.goToLanding.bind(this)
    this.goToDeploy = this.goToDeploy.bind(this)
    this.goToDonate = this.goToDonate.bind(this)
    this.getContractData = this.getContractData.bind(this)
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
    this.getContractData()
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

  getContractData() {
    this.createRequest(this.ip(30336), 'POST', res => {
      const byteCode = res.result.stack[0].value
      const string = hex2a(byteCode)
      const object = JSON.parse(string)
      this.setState({ngo: object})
    }, {"jsonrpc": "2.0", "method": "invoke", "params":
          [`${NGO_CONTRACT}`, [{"type": "Array", "value": [{"type": "String",
                                              "value": "info"}]}]], "id": 1})
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
      this.ip(4000) + '/api/main_net/v1/get_balance/' + CONTRACT_ADDRESS,
      'GET',
      res => {
        var gas, neo
        if (res.balance[0].asset == "GAS") {
          gas = res.balance[0].amount
          neo = res.balance[1].amount
        } else {
          gas = res.balance[1].amount
          neo = res.balance[0].amount
        }
        this.setState({balance: neo || 0, gas: gas})
    }, {})

    this.createRequest(
      this.ip(4000) + '/api/main_net/v1/get_unclaimed/' + CONTRACT_ADDRESS,
      'GET',
      res => {
        this.setState({unclaimed: res.unclaimed || 0})
    }, {})

  }

  render() {
    var body

    if (this.state.route == 0) {
      body = <Landing key={1} deploy={this.goToDeploy} donate={this.goToDonate} />
    }
    if (this.state.route == 1) {
      body = <Deploy key={1} unclaimed={this.state.unclaimed} gas={this.state.gas} />
    }
    if (this.state.route == 2) {
      body = <Donate key={1} ngo={this.state.ngo} balance={this.state.balance} />
    }

    return (
      [<Navbar key={0} landing={this.goToLanding} block={this.state.block} />, body]
    )
  }
}
