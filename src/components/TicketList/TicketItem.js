import React, {Component} from 'react'
import moment from 'moment'
import PropTypes from 'prop-types';
moment.lang('ru')

export default class TicketItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {ticket, activeCurrentcy} = this.props
    let price = activeCurrentcy === "RUB"
      ? ticket.price
      : activeCurrentcy === "USD"
         ? (ticket.price * 0.015).toFixed(2)
         : (ticket.price * 0.013).toFixed(2)

    return (
      <div className="ticketItemCont">
        <div className="ticketItemPrice">
          <div className="ticketItemPriceImg"></div>
          <div className="ticketItemPriceButton">Купить<br/> за {price} {activeCurrentcy}</div>
        </div>
        <div className="ticketItemInfo">
          <div className="ticketItemInfoTime">
            <div className="arrivalTime">{ticket.departure_time}</div>
            <div className="lineAirbuss">
              {ticket.stops > 0
                  ? `${ticket.stops} пересадк${ticket.stops > 1 ? "и" : 'а'}`
                  : ""}
              </div>
            <div className="arrivalTime">{ticket.arrival_time}</div>
          </div>
          <div className="ticketItemInfoExtra">
            <div>
              <div className="ticketItemInfoExtraText">{ticket.origin}, {ticket.origin_name}</div>
              <div>{moment(ticket.arrival_date).format('D MMM YYYY, ddd')}</div>
            </div>
            <div>
              <div className="ticketItemInfoExtraText">{ticket.destination_name}, {ticket.destination}</div>
              <div className="departureBlock">{moment(ticket.departure_date).format('D MMM YYYY, ddd')}</div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

TicketItem.propTypes = {
  activeCurrentcy: PropTypes.string,
  ticket: PropTypes.object,
};
