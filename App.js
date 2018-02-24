const hex2a = (hexx) => {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 'loading...'
    }
  }

  componentDidMount() {
    var request = new XMLHttpRequest();
    request.open('POST', 'http://130.82.239.151:30336', true);
    request.setRequestHeader("Content-type", "application/json");

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        const res = JSON.parse(request.responseText)
        const hex = res.result.stack[0].value
        this.setState({value: parseInt(hex, 16)})
      } else {
        // We reached our target server, but it returned an error

      }
    };

    request.onerror = () => {
      // There was a connection error of some sort
    };

    request.send(JSON.stringify({"jsonrpc": "2.0","method": "invoke","params": ["0xd01b5d83dcecd6c6f19ac9c11c0a47588fe5abd7", []],"id": 1}));

  }

  render() {
    return <h1>{this.state.value}</h1>;
  }
}
