import Link from "next/link";

export default function GameHomePage() {
  return (
    <div className="min-h-screen bg-[#0369a1] flex flex-col items-center justify-center ">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold">Pong Game</h1>
        <p className="text-lg mt-2">Challenge yourself or your friends!</p>
      </header>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        <div
          className="bg-[#bae6fd] text-gray-900
                    rounded-xl 
                    shadow-lg p-16
                    flex flex-col items-center hover:shadow-2xl transition transform hover:scale-105  bg-cover"
          style={{
            backgroundImage: "url('/two.png')",
            justifyContent: "space-between"
          }}

        >
          <h2 className="text-2xl font-semibold mb-2">Practice Offline</h2>
          <p className="text-center mb-4">
            Sharpen your skills by playing against the AI bot.
          </p>

          <Link href="/game/offline">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold" >
              Play Now
            </button>
          </Link>
        </div>
        <div
          className="bg-[#bae6fd] text-gray-900
        rounded-xl 
        shadow-lg p-16
        flex flex-col items-center hover:shadow-2xl transition transform hover:scale-105  bg-cover"
          style={{
            backgroundImage: "url('/two.png')",
            justifyContent: "space-between"
          }}
        >

          <h2 className="text-2xl font-semibold mb-2">Play with Friends</h2>
          <p className="text-center mb-4">
            Invite a friend for an exciting 1v1 match. Show off your skills!
          </p>
          <Link href="/game/online">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold">
              Start Match
            </button>
          </Link>
        </div>
        <div
          className="bg-[#bae6fd] text-gray-900
        rounded-xl 
        shadow-lg p-16
        flex flex-col items-center hover:shadow-2xl transition transform hover:scale-105  bg-cover"
          style={{
            backgroundImage: "url('/two.png')",
            justifyContent: "space-between"
          }}
        >

          <h2 className="text-2xl font-semibold mb-2">Play tournaments</h2>
          <p className="text-center mb-4">
            Play competitive matches with others
          </p>
          <Link href="/game/online">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold">
              Start Match
            </button>
          </Link>
        </div>

      </div>



    </div>
  );
}
