//const res = JSON.parse(request.responseText)
//const hex = res.result.stack[0].value
//this.setState({block: parseInt(hex, 16)})
//request.send(JSON.stringify({"jsonrpc": "2.0","method": "invoke","params": ["0xd01b5d83dcecd6c6f19ac9c11c0a47588fe5abd7", []],"id": 1}));

class Donate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "Goodwill Children's Homes",
      url: "http://www.goodwillhomes.org.uk/",
      logo: "http://www.goodwillhomes.org.uk/images/goodwill.png",
      description: `Goodwill Children's Homes (UK) funds 3 children’s homes, a primary school and a Tribal Outreach programme (TORP) in Tamil Nadu, south India to give destitute children an opportunity for a brighter future.
Goodwill Children's Homes is a registered UK charity that works with our partner Society registered in South India as 'Goodwill Children's Homes Charitable Society'. We provide a loving home and a meaningful education to many destitute children. Most Goodwill children come from the tribal communities living in the mountain ranges of the Palani Hills. We look after children who have either been orphaned or come from families that are simply too poor to provide essential shelter, food and education. Goodwill is able to provide them with the life-chances that their families cannot.`,
      address: 'ANU44juAN2GkmRTEWTu25Jx5umxEhnctB4',
      hold: 1000000
    }
    this.computeDailyGas = this.computeDailyGas.bind(this)
    this.computeDailyUSD = this.computeDailyUSD.bind(this)
  }

  qr() {
    return "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + this.state.address
  }

  computeDailyGas() {
    return Math.floor((this.props.balance * 0.00026937)*100)/100
  }
  computeDailyUSD() {
    return Math.floor((this.props.balance * 0.00026937 * 36.91)*100)/100
  }

  render() {
    const overflow = {
      overflow: 'auto'
    }
    return (
      <section className="section">
        <div className="container">
          <div className="card">
            <div className="card-image">
            <figure className="image">
              <a href={this.state.url}>
                <img src={this.state.logo} alt={this.state.name} />
              </a>
            </figure>
            </div>
            <div className="card-content content">
              <h1>{this.state.name}</h1>
              <p><b><a href={this.state.url}>{this.state.name}</a></b> is collecting funds in NEO to gather a steady income of GAS over a period of <b>{this.state.hold}</b> blocks before the contract releases the funds.</p>
              <h2>About Us</h2>
              <p>{this.state.description}</p>
              <h2>Giving</h2>
              <article className="message is-success">
                <div className="message-header" style={overflow}>
                  {this.state.address}
                </div>
                <div className="message-body">
                  <figure>
                    <img src={this.qr()}/>
                  </figure>
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
