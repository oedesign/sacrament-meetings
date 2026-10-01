export default function Header() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Sacrament Meeting Planner
          </h1>
          <p className="text-sm text-gray-600">
            Itamaga Ward
          </p>
        </div>

        <p className="text-sm text-gray-600">
          {currentDate}
        </p>
      </div>
    </header>
  );
}