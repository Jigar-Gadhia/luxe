import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/products/ProductCard";

export default function Products() {
  const { data: products = [], isLoading } = useProducts(24);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">All Products</h1>
          <p className="text-muted-foreground mt-2">Explore our complete collection.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">
        {isLoading && products.length === 0 ? (
          Array(8).fill(0).map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <Skeleton className="aspect-square rounded-2xl w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ))
        ) : (
          products.map((product: any, index: number) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))
        )}
      </div>

      {!isLoading && products.length === 0 && (
        <div className="py-20 text-center">
          <h3 className="text-lg font-medium">No products available</h3>
          <p className="text-muted-foreground mt-2">Please check back later.</p>
        </div>
      )}
    </div>
  );
}
