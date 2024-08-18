import { useQuery } from '@tanstack/react-query';
import { getProductsFn } from '../api/products';
import ProductCard from '../components/MenuView/ProductCard';

export const MenuView = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProductsFn,
  });

  if (isLoading) {
    return <p className='mt-3 text-center'>Cargando productos...</p>;
  }

  if (isError) {
    return (
      <div className='alert alert-danger'>
        Ocurrió un error leyendo los productos
      </div>
    );
  }

  if (products && products.data.length === 0) {
    return (
      <div className='alert alert-danger'>
        No se encontraron productos para mostrar
      </div>
    );
  }

  const comidas = products.data.filter(product => product.category === 'comidas');
  const bebidas = products.data.filter(product => product.category === 'bebidas');

  return (
    <div className='container mt-3'>
      <section className='row'>
        <h2 className='mb-4'>Comidas</h2>
        {comidas.length > 0 ? (
          comidas.map((product) => (
            <article className='col-12 col-md-4 col-lg-3' key={product.id}>
              <ProductCard product={product} />
            </article>
          ))
        ) : (
          <p>No se encontraron productos de la categoría "Comidas".</p>
        )}
      </section>

      <section className='row mt-5'>
        <h2 className='mb-4'>Bebidas</h2>
        {bebidas.length > 0 ? (
          bebidas.map((product) => (
            <article className='col-12 col-md-4 col-lg-3' key={product.id}>
              <ProductCard product={product} />
            </article>
          ))
        ) : (
          <p>No se encontraron productos de la categoría "Bebidas".</p>
        )}
      </section>
    </div>
  );
};

export default MenuView;
