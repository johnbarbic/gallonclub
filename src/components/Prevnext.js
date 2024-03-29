import React from 'react'
import { Link } from 'gatsby'
import { navigate } from 'gatsby'
import { FaArrowRight } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa'

class PrevNext extends React.Component {
  componentDidMount = () => {
    document.addEventListener('keydown', this.handleShortcuts)
  }
  handleShortcuts = e => {
    const { previous, next } = this.props.pageContext
    if (e.keyCode === 37) {
      //left
      //alert('left')
      navigate(previous.fields.slug)
    }
    if (e.keyCode === 39)
      //right
      navigate(next.fields.slug)
    //alert('right')
  }

  render() {
    const { previous, next } = this.props.pageContext
    //console.log(this.props)
    return (
      <div style={{ paddingTop: '25px' }}>
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {previous && (
            <li>
              <Link
                to={previous.fields.slug}
                rel="prev"
                title="Previous Entry"
                style={{ fontSize: '1.2em', textDecoration: 'none' }}
                className="link"
              >
                <FaArrowLeft style={{ paddingTop: '4px' }} /> Previous
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link
                to={next.fields.slug}
                rel="next"
                title="Next Entry"
                style={{ fontSize: '1.2em', textDecoration: 'none' }}
                className="link"
              >
                Next <FaArrowRight style={{ paddingTop: '4px' }} />
              </Link>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default PrevNext
