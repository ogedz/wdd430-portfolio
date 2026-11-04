import NavLinks from './NavLinks';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div id="header-title" className="text-2xl font-bold text-center mb-2">
        Monday Ogedengbe
      </div>
      <div className="flex justify-center">
        <NavLinks />
      </div>
    </header>
  );
}