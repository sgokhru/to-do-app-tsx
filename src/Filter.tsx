import React from 'react';

interface FilterProps {
    filter: string,
    handleFilter: (filterValue: string) => void
  }
  interface FilterState {
    filter: string
  }
class Filter extends React.Component <FilterProps, FilterState> {
    constructor(props: FilterProps) {
        super(props);
        this.state = {
          filter: props.filter
        };
      }
      handleChange = (e: any) => {
        e.preventDefault();
        const filterValue = e.target.value;
        this.setState({
          filter: filterValue
        });
        this.props.handleFilter(filterValue);
      }
      render() {
        return (
          <form>
            <label><b>Filter: </b>
              <select value={this.state.filter} onChange={this.handleChange}>
                <option value='all'>All</option>
                <option value='ui'>UI</option>
                <option value='backend'>Backend</option>
                <option value='embedded'>Embedded</option>
                <option value='qa'>QA</option>
              </select>
            </label>
          </form>
        )
    }
}
export default Filter;