import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">EMR System</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/register" className="hover:underline">Register Patient</Link>
        </div>
      </div>
    </nav>
  );
}