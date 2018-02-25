//const res = JSON.parse(request.responseText)
//const hex = res.result.stack[0].value
//this.setState({block: parseInt(hex, 16)})
//request.send(JSON.stringify({"jsonrpc": "2.0","method": "invoke","params": ["0xd01b5d83dcecd6c6f19ac9c11c0a47588fe5abd7", []],"id": 1}));

class Donate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.computeDailyGas = this.computeDailyGas.bind(this)
    this.computeDailyUSD = this.computeDailyUSD.bind(this)
  }

  computeDailyGas() {
    return Math.floor((this.props.balance * 0.00026937)*100)/100
  }
  computeDailyUSD() {
    return Math.floor((this.props.balance * 0.00026937 * 36.91)*100)/100
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="card">
            <div className="card-image">
            <figure className="image">
              <a href={this.props.ngo.url}>
                <img src={this.props.ngo.logo} alt={this.props.ngo.name} />
              </a>
            </figure>
            </div>
            <div className="card-content content">
              <h1>{this.props.ngo.name}</h1>
              <p><b><a href={this.props.ngo.url}>{this.props.ngo.name}</a></b> is collecting funds in NEO to gather a steady income of GAS over a period of <b>{this.state.hold}</b> blocks before the contract releases the funds.</p>
              <h2>About Us</h2>
              <p>{this.props.ngo.description}</p>
              <h2>Giving</h2>
              <article className="message is-success">
                <div className="message-header overflow">
                  testinvoke {NGO_CONTRACT} ["hodl"] --attach-neo=AMOUNT
                </div>
              </article>
              <h5>Already {this.props.balance} NEO given, which gives {this.computeDailyGas()} GAS ({this.computeDailyUSD()} USD) daily to the organization.</h5>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
