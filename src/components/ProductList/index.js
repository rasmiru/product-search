import React, { Component } from "react";
import Product from "../Product";
import "./index.css";

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryFilter: null,
            searchText: "",
            sort: null,
        };
    }

    // Handle category filter button clicks
    handleCategoryFilter = (category) => {
        if (category === this.state.categoryFilter) {
            // If the same category is clicked, remove the filter
            this.setState({ categoryFilter: null });
        } else {
            // Set the selected category as the filter
            this.setState({ categoryFilter: category });
        }
    };

    // Handle search input change
    handleSearchChange = (event) => {
        this.setState({ searchText: event.target.value });
    };

    // Handle sort dropdown change
    handleSortChange = (event) => {
        this.setState({ sort: event.target.value });
    };

    // Sort products based on the selected sort option
    sortProducts = (products) => {
        const { sort } = this.state;
        if (sort === "lowest") {
            return products.sort((a, b) => a.price - b.price);
        } else if (sort === "highest") {
            return products.sort((a, b) => b.price - a.price);
        } else {
            return products;
        }
    };

    render() {
        const { products } = this.props;
        const { categoryFilter, searchText } = this.state;

        // Filter products based on category and search text
        const filteredProducts = products.filter(
            (product) =>
                (categoryFilter === null || categoryFilter.includes(product.category)) &&
                (searchText === "" ||
                    product.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchText.toLowerCase()))
        );

        // Sort the filtered products
        const sortedProducts = this.sortProducts(filteredProducts);

        return (
            <div>
                <div className="buttons">
                    {/* Category filter buttons */}
                    <button
                        className={categoryFilter === 'shirts' && 'active'}
                        onClick={() => this.handleCategoryFilter('shirts')}
                    >
                        Shirts
                    </button>
                    <button
                        className={categoryFilter === 'pants and skirts' && 'active'}
                        onClick={() => this.handleCategoryFilter('pants and skirts')}
                    >
                        Pants and Skirts
                    </button>
                    <button
                        className={categoryFilter === 'jackets' && 'active'}
                        onClick={() => this.handleCategoryFilter('jackets')}
                    >
                        Jackets
                    </button>
                    <button
                        className={!categoryFilter && 'active'}
                        onClick={() => this.handleCategoryFilter(null)}
                    >
                        All Products
                    </button>
                </div>
                <div className="search-box">
                    {/* Search input */}
                    <input
                        type="text"
                        placeholder="Search products"
                        value={searchText ?? ""}
                        onChange={this.handleSearchChange}
                    />
                </div>
                <div className="sort-box">
                    {/* Sort label and dropdown */}
                    <label htmlFor="sort-select">Sort by:</label>
                    <select id="sort-select" value={this.state.sort ?? ""} onChange={this.handleSortChange}>
                        <option value="">None</option>
                        <option value="lowest">Lowest to Highest</option>
                        <option value="highest">Highest to Lowest</option>
                    </select>
                </div>
                <div className="product-list">
                    {/* Render the sorted products */}
                    {sortedProducts.map((product, index) => (
                        <Product key={index} product={product} />
                    ))}
                </div>
            </div>
        );
    }
}

export default ProductList;
