import Link from "next/link";
export default function HomePage() {
  return (
   
    <div className="min-h-screen bg-[#bae6fd] flex flex-col items-center justify-center ">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold">Welcome to Transcendance </h1>
        <p className="text-lg my-4 font-sans">Explore The available Games</p>
        <Link href="/game">
          <button className="bg-blue-700 text-white px-6 py-3 rounded-full font-semibold"> Play Games</button>
          </Link>
      </header>
    </div>
  );
}
