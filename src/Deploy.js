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

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleLogoChange = this.handleLogoChange.bind(this)
    this.handleUrlChange = this.handleUrlChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleHoldChange = this.handleHoldChange.bind(this)
  }

  handleNameChange(event) {
    this.setState({name: event.target.value})
  }
  handleLogoChange(event) {
    this.setState({logo: event.target.value})
  }
  handleUrlChange(event) {
    this.setState({url: event.target.value})
  }
  handleDescriptionChange(event) {
    this.setState({description: event.target.value})
  }
  handleHoldChange(event) {
    this.setState({hold: event.target.value})
  }

  render () {
    console.log(this.props.unclaimed)
    return (
      <section className="section">
        <div className="container">
          <div className="field">
            <label className="label">Organization Name</label>
            <div className="control">
              <input className="input" type="text"
                     onChange={this.handleNameChange} value={this.state.name}/>
            </div>
          </div>

          <div className="field">
            <label className="label">Website URL</label>
            <div className="control">
              <input className="input" type="text"
                     onChange={this.handleUrlChange} value={this.state.url}/>
            </div>
          </div>

          <div className="field">
            <label className="label">Organization Logo</label>
            <div className="control">
              <input className="input" type="text"
                     onChange={this.handleLogoChange}
                     defaultValue={this.state.logo} />
            </div>
            <figure className="image box">
              <img src={this.state.logo} />
            </figure>
          </div>

          <div className="field">
            <label className="label">NGO Description</label>
            <div className="control">
              <textarea className="textarea" placeholder="Textarea"
                        onChange={this.handleDescriptionChange}
                        value={this.state.description}>
              </textarea>
            </div>
          </div>

          <div className="field">
            <label className="label">NEO Holding Time (Blocks)</label>
            <div className="control">
              <input className="input" type="number"
                     onChange={this.handleHoldChange} value={this.state.hold}/>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" disabled>Deploy</button>
            </div>
          </div>

          <br/>

          <div className="box">
            <h5 className="title is-5">
              You have {this.props.unclaimed} unclaimed GAS
            </h5>
            <article className="message is-success">
              <div className="message-body">
                claim prompt message
              </div>
            </article>
          </div>

        </div>
      </section>
    )
  }
}
