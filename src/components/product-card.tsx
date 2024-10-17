import { ProductBestSeller } from './product-best-seller';
import { ProductEstimatedArrival } from './product-estimated-arrival';
import { ProductLowStockWarning } from './product-low-stock-warning';
import { ProductPrice } from './product-price';
import { ProductRating } from './product-rating';
import { ProductUsedPrice } from './product-used-price';
import { dinero, type DineroSnapshot } from 'dinero.js';
import type {Product} from "../types/product";

export const ProductCard = ({ product }: { product: Product }) => {
  const price = dinero(product.price as DineroSnapshot<number>);

  return (
    <div className="group block">
      <div className="space-y-2">
        <div className="relative aspect-square">
          {product.isBestSeller ? (
            <div className="absolute left-2 top-2 z-10 flex">
              <ProductBestSeller />
            </div>
          ) : null}
          <img
            src={`/${product.image}`}
            sizes="(min-width: 1184px) 200px, (min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
            className="rounded-xl grayscale group-hover:opacity-80"
            alt={product.name}
          />
        </div>

        <div className="truncate text-sm font-medium text-white group-hover:text-vercel-cyan">
          {product.name}
        </div>

        {product.rating ? <ProductRating rating={product.rating} /> : null}

        <ProductPrice price={price} discount={product.discount} />

        {product.usedPrice ? (
          <ProductUsedPrice usedPrice={product.usedPrice} />
        ) : null}

        <ProductEstimatedArrival leadTime={product.leadTime} />

        {product.stock <= 1 ? (
          <ProductLowStockWarning stock={product.stock} />
        ) : null}
      </div>
    </div>
  );
};
