const Landing = props => (
  <section className="hero is-large">
    <div className="hero-body">
      <div className="container has-text-centered">

        <h1 className="title is-1">Neo Caritas</h1>
        <h3 className="subtitle is-3 has-text-success">Give, reliably</h3>

        <div className="columns is-centered">

          <div className="column is-narrow">
            <a className="button is-large is-outlined" onClick={props.deploy}>I am an NGO</a>
          </div>

          <div className="column is-narrow">
            <a className="button is-large is-outlined" onClick={props.donate}>I wish to give</a>
          </div>

        </div>
      </div>
    </div>
  </section>
)
