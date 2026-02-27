import React from "react";
import { Github, Twitter, MessageSquare, Send } from "lucide-react";

const ContactSection = () => {
  return (
    <div className="bg-black text-white min-h-screen py-20 px-6">

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

        {/* LEFT SIDE — FORM */}
        <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-8">

          <p className="text-blue-400 mb-6">{"> compose_message()"}</p>

          <div className="space-y-6">

            {/* Name */}
            <input
              type="text"
              placeholder="Your name"
              className="w-full bg-[#1e293b] p-4 rounded-lg border border-gray-700 outline-none focus:border-blue-400"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-[#1e293b] p-4 rounded-lg border border-gray-700 outline-none focus:border-blue-400"
            />

            {/* Message */}
            <textarea
              rows="5"
              placeholder="What's on your mind?"
              className="w-full bg-[#1e293b] p-4 rounded-lg border border-gray-700 outline-none focus:border-blue-400"
            />

            {/* Button */}
            <button className="w-full bg-blue-400 text-black font-semibold py-4 rounded-lg hover:bg-blue-500 transition flex items-center justify-center gap-2">
              <Send size={18} />
              send_message()
            </button>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-8">

          {/* SOCIALS CARD */}
          <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-8">

            <p className="text-blue-400 mb-6">// socials</p>

            <div className="space-y-6">

              <div className="flex items-center gap-4">
                <Github className="text-gray-400" />
                <div>
                  <p className="font-semibold">GitHub</p>
                  <p className="text-gray-400 text-sm">https://github.com/abhishek-thakur09</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Twitter className="text-gray-400" />
                <div>
                  <p className="font-semibold">Twitter</p>
                  <p className="text-gray-400 text-sm">@dsahustler</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <MessageSquare className="text-gray-400" />
                <div>
                  <p className="font-semibold">Discord</p>
                  <p className="text-gray-400 text-sm">DSA Hustler</p>
                </div>
              </div>

            </div>
          </div>

          {/* PRO TIP CARD */}
          <div className="bg-[#0f172a] border border-blue-500/40 rounded-xl p-8 shadow-[0_0_20px_rgba(34,197,94,0.3)]">

            <p className="text-blue-400 mb-3">💡 Pro tip</p>

            <p className="text-gray-400">
              Join our Discord for the fastest response time —
              usually under O(log n) minutes.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactSection;