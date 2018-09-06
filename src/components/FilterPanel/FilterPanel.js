import React, {Component} from 'react'
import FilterItem from './FilterItem'
import PropTypes from 'prop-types';

export default class FilterPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currency: ['RUB', "USD", "EUR"],
    }
  }

  render() {
    return (
      <div className="filterCont">
        <div className="filterCurrency">
          <div className="filterTitle">Валюта</div>
          <div className="filterCurrencyBody">
            {this.state.currency.map(item => <div
                className={`filterCurrencyBodyItem ${item === this.props.activeCurrentcy && 'active'}`}
                data-name={item}
                onClick={this.props.changeCurrency}
                key={item}>
                {item}
              </div>
            )}
          </div>
        </div>
        <div className="filterCount">
          <div className="filterTitle">Количество пересадок</div>
          <div className="filterCountBody">
            {this.props.filters.map(item => <FilterItem key={item} activeItems={this.props.activeItems} changeActive={this.props.changeActiveItems} item={item}/>)}
          </div>
        </div>
      </div>
    )
  }
}

FilterPanel.propTypes = {
  activeCurrentcy: PropTypes.string,
  filters: PropTypes.array,
  activeItems: PropTypes.array,
  changeActiveItems: PropTypes.func,
  changeCurrency: PropTypes.func
};
