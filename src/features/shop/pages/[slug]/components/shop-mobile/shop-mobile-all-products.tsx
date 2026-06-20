import type { IProduct } from "@/types/product.interface";
import type { IApiShopProduct } from "@/features/shop/utils/shop-response.interface";
import { ProductGrid } from "@/shared/components/product/product-grid";
import { ListingFilterChips } from "@/shared/components/listing/listing-mobile-header/listing-filter-chips";

interface IProps {
  products: IApiShopProduct[];
  priceLabel: string;
  applyLabel: string;
  filterDict: {
    size: string;
    color: string;
    priceRange: string;
    priceTo: string;
    brands: string;
  };
}

function toProduct(p: IApiShopProduct): IProduct {
  return {
    id: String(p.id),
    slug: p.slug,
    title: p.title,
    subtitle: "",
    price: p.price,
    image: p.image_url,
    rating: p.rating,
    reviews: 0,
    badge: p.is_original ? "Original" : undefined,
    discountLabel:
      p.discount > 0
        ? p.discount_type === "percent"
          ? `${p.discount}%`
          : String(p.discount)
        : undefined,
    delivery: p.delivery_date_text,
  };
}

export function ShopMobileAllProducts({
  products,
  priceLabel,
  applyLabel,
  filterDict,
}: IProps) {
  const mappedProducts = products.map(toProduct);

  return (
    <div className="flex flex-col gap-3">
      <ListingFilterChips
        priceLabel={priceLabel}
        applyLabel={applyLabel}
        dict={filterDict}
      />

      <div className="px-4">
        <ProductGrid
          products={mappedProducts}
          className="grid-cols-2 gap-3"
        />
      </div>
    </div>
  );
}
