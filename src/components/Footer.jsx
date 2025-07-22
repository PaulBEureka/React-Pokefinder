const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-4 mt-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">PokéFinder</h3>
          <p className="text-gray-300 text-sm">
            Your simple Pokémon reference tool
          </p>
        </div>

        <div className="border-t border-gray-700 pt-4 text-xs text-gray-400 space-y-2">
          <p>
            <strong>Disclaimer:</strong> PokéFinder is an unofficial fan-made
            project and is not affiliated with, endorsed by, or connected to
            Nintendo, Game Freak, Creatures Inc., or The Pokémon Company.
          </p>
          <p>
            All Pokémon names, and related content are trademarks and copyrights
            of their respective owners.
          </p>
          <p>
            This project is created for educational and entertainment purposes
            only.
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} PokéFinder - Created with ❤️ by a
            Pokémon fan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
