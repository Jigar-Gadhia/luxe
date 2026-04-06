import { Skeleton } from "@/components/ui/skeleton";

export const HomeSkeleton = () => (
  <div className="flex flex-col gap-24 py-12 animate-in fade-in duration-500">
    {/* Hero Section Skeleton */}
    <section className="flex flex-col items-center justify-center min-h-[60vh] gap-8 mt-8">
      <div className="text-center space-y-6 w-full max-w-2xl">
        <Skeleton className="h-8 w-40 rounded-full mx-auto" />
        <div className="space-y-3">
          <Skeleton className="h-16 w-3/4 mx-auto rounded-2xl" />
          <Skeleton className="h-16 w-1/2 mx-auto rounded-2xl" />
        </div>
        <Skeleton className="h-6 w-full mx-auto rounded-xl" />
        <div className="flex gap-4 justify-center pt-4">
          <Skeleton className="h-12 w-32 rounded-full" />
          <Skeleton className="h-12 w-32 rounded-full" />
        </div>
      </div>
    </section>

    {/* Featured Products Skeleton */}
    <section className="space-y-8">
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64 rounded-xl" />
          <Skeleton className="h-4 w-48 rounded-lg" />
        </div>
        <Skeleton className="h-4 w-24 rounded-lg hidden sm:block" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="flex flex-col gap-4">
            <Skeleton className="aspect-square rounded-[1.2rem] sm:rounded-[2rem] w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export const ProductsSkeleton = () => (
  <div className="space-y-8 animate-in fade-in duration-500 py-8">
    <div className="space-y-2">
      <Skeleton className="h-10 w-64 rounded-xl" />
      <Skeleton className="h-4 w-96 rounded-lg" />
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">
      {Array(8).fill(0).map((_, i) => (
        <div key={i} className="flex flex-col gap-4">
          <Skeleton className="aspect-square rounded-[1.2rem] sm:rounded-[2.5rem] w-full" />
          <div className="space-y-2 p-1.5 sm:p-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="py-8 animate-in fade-in duration-500">
    <Skeleton className="h-4 w-32 rounded-lg mb-8" />
    
    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
      <Skeleton className="aspect-square rounded-[3rem] w-full" />
      
      <div className="flex flex-col gap-8 pt-12">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <Skeleton className="h-14 w-full rounded-2xl" />
          <Skeleton className="h-10 w-1/4 rounded-xl" />
        </div>
        
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        <div className="space-y-6 pt-8 border-t">
          <Skeleton className="h-14 w-full rounded-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const CategoriesSkeleton = () => (
  <div className="max-w-7xl mx-auto py-8 animate-in fade-in duration-500">
    <Skeleton className="h-10 w-64 rounded-xl mb-8" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className="aspect-[4/3] rounded-2xl bg-zinc-100 animate-pulse border border-border/50" />
      ))}
    </div>
  </div>
);
