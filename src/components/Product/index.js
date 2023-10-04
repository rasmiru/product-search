import './index.css'
import { Component } from 'react'
class Product extends Component {

    render() {
        const { name, category, description, price } = this.props.product
        return (
            <div className="product">
                <h2 className="product-name">{name}</h2>
                <h3 className="product-category">Category: {category}</h3>
                <p className="product-description">{description}</p>
                <p className="product-price">Price: ${price}</p>
            </div>
        )
    }

}

export default Product
