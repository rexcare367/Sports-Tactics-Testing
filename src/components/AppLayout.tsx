import React from "react";
import TacticsBoard from "./soccer/TacticsBoard";
import { Zap } from "lucide-react";

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-500 rounded-full blur-[150px]" />
          <div className="absolute top-40 right-40 w-48 h-48 bg-red-500 rounded-full blur-[100px]" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-emerald-300 text-sm font-medium mb-6">
            <Zap className="w-3.5 h-3.5" />
            Sports Tactics Board
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Visualize Your
            <span className="block bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 bg-clip-text text-transparent">
              Game Strategy
            </span>
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Drag and drop 22 players on a precisely scaled 75×120 yard pitch.
          </p>
        </div>
      </section>

      {/* Tactics Board Section */}
      <section
        id="board"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Sports Tactics Board
          </h2>
        </div>
        <TacticsBoard />
      </section>
    </div>
  );
};

export default AppLayout;
