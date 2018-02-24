// KyhkD5DnJugKzDW3KUJogidyzpof3yQNN64mj4q1QkRtoSR7aSrq
class Deploy extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "Goodwill Children's Homes",
      url: "http://www.goodwillhomes.org.uk/",
      logo: "http://www.goodwillhomes.org.uk/images/goodwill.png",
      description: `Goodwill Children's Homes (UK) funds 3 children’s homes, a primary school and a Tribal Outreach programme (TORP) in Tamil Nadu, south India to give destitute children an opportunity for a brighter future.
Goodwill Children's Homes is a registered UK charity that works with our partner Society registered in South India as 'Goodwill Children's Homes Charitable Society'. We provide a loving home and a meaningful education to many destitute children. Most Goodwill children come from the tribal communities living in the mountain ranges of the Palani Hills. We look after children who have either been orphaned or come from families that are simply too poor to provide essential shelter, food and education. Goodwill is able to provide them with the life-chances that their families cannot.`,
      hold: 1000000
    }

    this.handleLogoChange = this.handleLogoChange.bind(this)
  }

  handleLogoChange(event) {
    this.setState({logo: event.target.value});
  }

  render () {
    return (
      <div className="container">
        <div className="field">
          <label className="label">Organization Name</label>
          <div className="control">
            <input className="input" type="text" value={this.state.name}/>
          </div>
        </div>

        <div className="field">
          <label className="label">Website URL</label>
          <div className="control">
            <input className="input" type="text" value={this.state.url}/>
          </div>
        </div>

        <div className="field">
          <label className="label">Organization Logo</label>
          <div className="control">
            <input className="input" type="text"
            onChange={this.handleLogoChange} value={this.state.logo} />
          </div>
          <figure className="image box">
            <img src={this.state.logo} />
          </figure>
        </div>

        <div className="field">
          <label className="label">NGO Description</label>
          <div className="control">
            <textarea className="textarea" placeholder="Textarea"
                      value={this.state.description}>
            </textarea>
          </div>
        </div>

        <div className="field">
          <label className="label">NEO Holding Time (Blocks)</label>
          <div className="control">
            <input className="input" type="number" value={this.state.hold}/>
          </div>
        </div>

        <div className="message">
          <div className="message-body">
            import contract /path/to/avm 10 05 True False
          </div>
        </div>
      </div>
    )
  }
}
