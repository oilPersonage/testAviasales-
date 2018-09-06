import React, {Component} from 'react';
import {Provider} from 'react-redux';

import store from '../store/store';

import DataTicket from '../data/default.json'

// Views
import FilterPanel from './FilterPanel/FilterPanel'
import TicketList from './TicketList/TicketList'

// Small Components


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItems: [],
      tickets: [],
      filterTicket: [],
      opacity: 0,
      activeCurrentcy: 'RUB',
      transition: 'all .3s ease-in'
    }
  }

  changeActiveItems = ({name, action}) => {

    if (name === "Все") {
      const activeItems = this.state.filters.slice(0);
      this.setState({activeItems})
      this.changeFilters(name)
      return
    }

    if (action) {
      this.setState({activeItems: [name]}, () => this.changeFilters(name))
      return;
    }

    const activeItems = this.state.activeItems
    const valid = activeItems.some(item => item === name)
    activeItems.map((el, index) => el === 'Все' && activeItems.splice(index, 1))

    if (!valid) {
      activeItems.push(name)
    } else {
      activeItems.splice(activeItems.indexOf(name), 1)
    }

    this.setState({activeItems})
    this.changeFilters(name)
  }

  componentDidMount() {
    const getData = new Promise(resolve => {
      setTimeout(() => {
        resolve(DataTicket)
      }, 1000);
    })

    getData.then(res => {
      const obj = {}
      Object.keys(res.tickets).map(item => {
        let str = res.tickets[item].stops;
        obj[str] = true
      })
      const filters = Object.keys(obj)

      filters.unshift("Все")

      this.setState({
        tickets: res.tickets,
        filterTicket: res.tickets,
        filters,
        opacity: 0})
      setTimeout(()=> this.setState({opacity: 1}), 10)
    })
  }

  filterTickets = (item) => {
    const activeItems = this.state.activeItems
    for (let i = 0; i < activeItems.length; i++) {
     if (+activeItems[i] === item.stops) return true
    }
  }

  changeCurrency = (e) => {this.setState({activeCurrentcy: e.target.dataset.name})}

  changeFilters = (name) => {
    const {activeItems, tickets} = this.state
    let filterTicket;
    filterTicket = tickets.filter(this.filterTickets)
    if (name === 'Все' || activeItems.length === 0) filterTicket = tickets
    this.setState({filterTicket})
  }

  render() {
    const {filters, filterTicket, tickets, activeCurrentcy, activeItems} = this.state

    const style = {
      opacity: this.state.opacity,
      transition: this.state.transition
    }

    return (
        <Provider store={store}>
          <div className="flex container" style={style}>
            {tickets.length > 0 &&
              <FilterPanel
                  activeCurrentcy={activeCurrentcy}
                  changeCurrency={this.changeCurrency}
                  filters={filters}
                  activeItems={activeItems}
                  changeActiveItems={this.changeActiveItems}
                  changeFilters={this.changeFilters}/>
            }
            <div className="pseudoCont">
              {filterTicket.length > 0 ?
                <TicketList tickets={filterTicket} activeCurrentcy={activeCurrentcy}/>
                  : "Билетов нет"
              }
            </div>
          </div>
        </Provider>
    );
  }
}

export default App;
