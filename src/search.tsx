import React from 'react';

interface SearchProps {
    search: string,
    handleSearch: (searchValue: string) => void
}
interface SearchState {
    search: string
}
class Search extends React.Component <SearchProps, SearchState> {
    constructor(props: SearchProps) {
        super(props);
        this.state = {
            search: props.search
        };
    }
    handleChange = (e: any) => {
        e.preventDefault();
        const searchValue = e.target.value;
        this.setState({
          search: searchValue
        });
        this.props.handleSearch(searchValue);
    }
    render() {
        return (
            <form>
                <label><b>Search by name</b>
                    <input type='text' onChange={this.handleChange} />
                </label>
            </form>
        )
    }
}
export default Search;