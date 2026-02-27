import React from 'react'

const About = () => {
  return (
            <div className="min-h-screen px-6 py-16 bg-black text-slate-200">

      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-sm text-slate-400">// ABOUT_US.CPP</p>

        <h1 className="text-5xl font-bold mt-4">
          We Turn <span className="gradient-text">Coders</span> Into Problem Solvers
        </h1>

        <p className="mt-6 text-slate-400 max-w-2xl mx-auto">
          DSA Hustler is a community-first platform built for engineers who refuse to be average.
          We grind algorithms so interviews feel like warm-ups.
        </p>
      </div>

      {/* Mission Card */}
      <div className="bg-[#0f172a] rounded-2xl p-10 max-w-4xl mx-auto shadow-lg">

        <p className="text-sm text-slate-400 mb-3">{"> cat mission.txt"}</p>

        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>

        <p className="text-slate-400 leading-relaxed">
          We exist to democratize algorithmic thinking. Whether you’re prepping for FAANG
          interviews, competitive programming contests, or just want to write better code —
          DSA Hustler gives you the roadmap, the problems, and the community to get there.
          No shortcuts. No fluff. Just pure problem-solving hustle.
        </p>
      </div>

 <div className="text-white py-20 px-6">

      {/* Heading */}
      <h2 className="text-4xl font-bold text-center mb-16">
        What We <span className="text-blue-400">Stand For</span>
      </h2>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

        {/* Card 1 */}
        <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-8 hover:border-blue-400 transition duration-300">
          {/* <Target className="text-green-400 mb-4" size={40} /> */}
          <h3 className="text-2xl font-semibold mb-4">
            Consistency {" > "} Talent
          </h3>
          <p className="text-gray-400 leading-relaxed">
            We believe daily practice beats raw talent. Show up, solve problems,
            and watch your skills compound.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-8 hover:border-blue-400 transition duration-300">
          {/* <Zap className="text-green-400 mb-4" size={40} /> */}
          <h3 className="text-2xl font-semibold mb-4">
            Learn by Doing
          </h3>
          <p className="text-gray-400 leading-relaxed">
            No endless theory. Dive into problems, break them down,
            and build pattern recognition through repetition.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-8 hover:border-blue-400 transition duration-300">
          {/* <Code className="text-green-400 mb-4" size={40} /> */}
          <h3 className="text-2xl font-semibold mb-4">
            Think Like a Machine
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Master the art of reducing problems to algorithms.
            Every real-world challenge has a structured solution.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-8 hover:border-blue-400 transition duration-300">
          {/* <Users className="text-green-400 mb-4" size={40} /> */}
          <h3 className="text-2xl font-semibold mb-4">
            Community Driven
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Surround yourself with people who push you to grow.
            Discuss approaches, review code, and level up together.
          </p>
        </div>

      </div>
    </div>
      

    </div>
  )
}

export default About