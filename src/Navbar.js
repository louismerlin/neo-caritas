const Navbar = props => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-item">
      <a onClick={props.landing} className="title is-2">Neo Caritas</a>
    </div>
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="tags has-addons">
          <span className="tag is-large">block</span>
          <span className="tag is-large is-success">
            { props.block }
          </span>
        </div>
      </div>
    </div>
  </nav>
)
