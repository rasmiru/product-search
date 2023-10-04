import './index.css';
import ProductList from '../ProductList'
import { products } from '../../data/products';
import { Component } from 'react'

class App extends Component {
  render() {
    return (
      <div className='centered-div'>
        <h1 className='title'>Product List</h1>
        <ProductList products={products} />
      </div>);
  }
}

export default App;
