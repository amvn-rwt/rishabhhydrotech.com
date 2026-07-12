export function CatalogueSkeleton() {
  return (
    <div className="flex min-h-full flex-col bg-brand-muted" aria-busy="true">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-4 h-4 w-48 animate-pulse bg-border" />
          <div className="h-9 w-72 max-w-full animate-pulse bg-border" />
          <div className="mt-3 h-5 w-full max-w-xl animate-pulse bg-border" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <div className="hidden w-64 shrink-0 border border-border bg-white lg:block">
            <div className="border-b border-border px-4 py-3">
              <div className="h-5 w-20 animate-pulse bg-border" />
            </div>
            <div className="space-y-4 p-4">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 w-24 animate-pulse bg-border" />
                  <div className="h-4 w-full animate-pulse bg-border" />
                  <div className="h-4 w-[83%] animate-pulse bg-border" />
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="border border-border bg-white p-4"
                >
                  <div className="aspect-[4/3] w-full animate-pulse bg-border" />
                  <div className="mt-4 h-5 w-3/4 animate-pulse bg-border" />
                  <div className="mt-2 h-4 w-1/2 animate-pulse bg-border" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <span className="sr-only">Loading catalogue results</span>
    </div>
  );
}
