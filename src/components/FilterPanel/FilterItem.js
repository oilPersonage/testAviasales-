import React, {Component} from 'react'
import PropTypes from 'prop-types';

export default class FilterItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: document.body.clientWidth > 800 ? false : true
    }
  }

  onClick = (e) => this.props.changeActive({name: e.target.dataset.name, action: e.target.dataset.action})
  mouseEnter = () => {this.setState({hover: true});}
  mouseLeave = () => { this.setState({hover: false});}

  render() {
    const width = document.body.clientWidth
    console.log(width)
    const {item} = this.props
    return (
        <div className="filterCountBodyItem" onMouseEnter={()=> width > 800 && this.mouseEnter()} data-name={item} onClick={this.onClick} onMouseLeave={()=> width > 825 && this.mouseLeave()}>
          <div className={`filterCountBodyItemCheck ${this.props.activeItems.some(el => el === item) && 'active'}`} data-name={item} />
          <div className="filterCountBodyItemText" data-name={item}>
            {+item === 0
                ? "Без пересадок"
                : +item === 1
                    ? "1 пересадка"
                    : +item === 2
                        ? "2 пересадки"
                        : +item === 3
                        ? "3 пересадки"
                            : item
            }
            {this.state.hover && item !== "Все" ?
              <div className="extraText" data-name={item} data-action="true">Только</div>
                : null
            }
          </div>

        </div>
    )
  }
}
FilterItem.propTypes = {
  item: PropTypes.string,
  changeActive: PropTypes.func
};
