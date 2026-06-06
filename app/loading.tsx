export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-50 flex bg-bg-primary px-4 pt-28">
      <div className="flex flex-col gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent-primary/30 border-t-accent-primary" />
        <span className="text-sm text-text-muted">Loading...</span>
      </div>
    </div>
  );
}
