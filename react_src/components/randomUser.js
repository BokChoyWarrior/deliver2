const RandomUser = (props) => {
  const [liked, setLiked] = React.useState(false)
  const [user, setUser] = React.useState(
    {
      name: { first: '', last: '', title: '' },
      email: '',
      picture: ''
    })

  async function handleClick () {
    setLiked(!liked)
    fetch('https://www.randomuser.me/api')
      .then(res => res.json())
      .then((data) => {
        setUser(data.results[0])
      })
      .catch(console.log)
  }
  // Comment
  // only run after mounting
  React.useEffect(() => {
    handleClick()
  }, [])

  // only run after unmounting
  React.useEffect(() => {
    return () => {
      console.log('Bye!')
    }
  }, [])

  return (
      <div>
        <button onClick={handleClick}>
          {'Get Data'}
        </button>
        <br></br>
        <img src={user.picture.large} alt="{user.name.first} {user.name.last}"></img>
        <h1>{user.name.title} {user.name.first} {user.name.last}</h1>
        <h3>Email: {user.email}</h3>

      </div>
  )
}
ReactDOM.render(<RandomUser />, document.querySelector('#random-user'))
