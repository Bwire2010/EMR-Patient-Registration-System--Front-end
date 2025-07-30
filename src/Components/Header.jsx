
export default function Header() {
  return (
    <nav className="bg-blue-400 text-white p-8">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Medipro</h1>
        <div className="space-x-4">
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('access_token');
            window.location.href = '/login';
          }}
          className="ml-4 bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}