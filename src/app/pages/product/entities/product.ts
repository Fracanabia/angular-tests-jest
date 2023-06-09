interface ProductProps {
  id: string;
  name: string;
  price: number;
}
export class Product {
  private props: ProductProps;

  constructor(props: ProductProps) {
    const { price } = props;
    if (price < 0) {
      throw new Error('Invalid price!');
    }
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get price() {
    return this.props.price;
  }
}
