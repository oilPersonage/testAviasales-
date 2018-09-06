import React, {Component} from 'react'
import TicketItem from './TicketItem'
import PropTypes from 'prop-types';

export default class TicketList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {tickets, activeCurrentcy} = this.props
    return (
      <div className="TicketListCont">
        {tickets.map((ticket, index) => (
            <TicketItem ticket={ticket} key={index} activeCurrentcy={activeCurrentcy}/>
        ))}
      </div>
    )
  }
}

TicketList.propTypes = {
  activeCurrentcy: PropTypes.string,
  tickets: PropTypes.array,
};
