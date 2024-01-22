//Modules

//Components
import Hero from "@views/Hero.jsx";

//Declares App for rendering
function App() {
  return (
    <>
      <main className="bg-gray-900  bg-900 min-h-screen">
        <article className="max-w-6xl mx-auto p-8 sm:p-16">
          <Hero />
        </article>
      </main>
    </>
  );
}

export default App;
