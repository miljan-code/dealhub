import { Product } from '@/components/product';

const IndexPage = () => {
  return (
    <section className="flex flex-col space-y-3">
      <Product />
      <Product />
      <Product />
      <Product />
    </section>
  );
};

export default IndexPage;
