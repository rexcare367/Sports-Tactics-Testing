import React, { useState, useCallback, useRef, useEffect } from "react";
import SoccerField from "./SoccerField";
import PlayerToken from "./PlayerToken";
import { PlayerData, generatePlayers, getFormationList } from "./formations";
import {
  RotateCcw,
  Users,
  ChevronDown,
  Maximize2,
  Minimize2,
  Info,
  Move,
  MousePointer,
} from "lucide-react";

const FIELD_W = 750;
const FIELD_H = 1200;
const PADDING = 40;

const TacticsBoard: React.FC = () => {
  const [formationA, setFormationA] = useState("4-4-2");
  const [formationB, setFormationB] = useState("4-4-2");
  const [players, setPlayers] = useState<PlayerData[]>(() =>
    generatePlayers("4-4-2", "4-4-2"),
  );
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDropdownA, setShowDropdownA] = useState(false);
  const [showDropdownB, setShowDropdownB] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const formations = getFormationList();

  // Convert screen coordinates to SVG coordinates
  const screenToSVG = useCallback(
    (clientX: number, clientY: number): { x: number; y: number } => {
      if (!svgRef.current) return { x: 0, y: 0 };
      const svg = svgRef.current;
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return { x: 0, y: 0 };
      const svgPt = pt.matrixTransform(ctm.inverse());
      return { x: svgPt.x - PADDING, y: svgPt.y - PADDING };
    },
    [],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, playerId: string) => {
      e.preventDefault();
      e.stopPropagation();

      const player = players.find((p) => p.id === playerId);
      if (!player) return;

      const svgCoords = screenToSVG(e.clientX, e.clientY);
      dragOffset.current = {
        x: svgCoords.x - player.x,
        y: svgCoords.y - player.y,
      };

      setDraggingId(playerId);
      setSelectedPlayer(playerId);

      if (svgRef.current) {
        svgRef.current.setPointerCapture(e.pointerId);
      }
    },
    [players, screenToSVG],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingId) return;
      e.preventDefault();

      const svgCoords = screenToSVG(e.clientX, e.clientY);
      const newX = Math.max(
        0,
        Math.min(FIELD_W, svgCoords.x - dragOffset.current.x),
      );
      const newY = Math.max(
        0,
        Math.min(FIELD_H, svgCoords.y - dragOffset.current.y),
      );

      setPlayers((prev) =>
        prev.map((p) => (p.id === draggingId ? { ...p, x: newX, y: newY } : p)),
      );
    },
    [draggingId, screenToSVG],
  );

  const handlePointerUp = useCallback(() => {
    setDraggingId(null);
  }, []);

  const handleFieldClick = useCallback(() => {
    if (!draggingId) {
      setSelectedPlayer(null);
    }
  }, [draggingId]);

  const handlePlayerClick = useCallback((playerId: string) => {
    setSelectedPlayer((prev) => (prev === playerId ? null : playerId));
  }, []);

  const handleFormationChange = useCallback(
    (team: "A" | "B", formation: string) => {
      if (team === "A") {
        setFormationA(formation);
        setPlayers(generatePlayers(formation, formationB));
      } else {
        setFormationB(formation);
        setPlayers(generatePlayers(formationA, formation));
      }
      setShowDropdownA(false);
      setShowDropdownB(false);
      setSelectedPlayer(null);
    },
    [formationA, formationB],
  );

  const handleReset = useCallback(() => {
    setPlayers(generatePlayers(formationA, formationB));
    setSelectedPlayer(null);
  }, [formationA, formationB]);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDropdownA(false);
      setShowDropdownB(false);
    };
    if (showDropdownA || showDropdownB) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showDropdownA, showDropdownB]);

  const selectedPlayerData = players.find((p) => p.id === selectedPlayer);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col lg:flex-row gap-6 max-w-6xl w-full ${
        isFullscreen ? "bg-gray-950 p-4 h-screen" : ""
      }`}
    >
      {/* Field Container */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full relative" style={{ maxWidth: "600px" }}>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${FIELD_W + PADDING * 2} ${FIELD_H + PADDING * 2}`}
            className="w-full h-auto rounded-xl select-none"
            style={{
              touchAction: "none",
              background: "linear-gradient(135deg, #1a472a 0%, #0f2b1a 100%)",
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onClick={handleFieldClick}
          >
            <g transform={`translate(${PADDING}, ${PADDING})`}>
              <SoccerField />
              {[...players]
                .sort((a, b) => {
                  if (a.id === draggingId) return 1;
                  if (b.id === draggingId) return -1;
                  return 0;
                })
                .map((player) => (
                  <PlayerToken
                    key={player.id}
                    player={player}
                    isDragging={draggingId === player.id}
                    isSelected={selectedPlayer === player.id}
                    onPointerDown={handlePointerDown}
                    onClick={handlePlayerClick}
                  />
                ))}
            </g>
          </svg>
        </div>
      </div>

      {/* Sidebar Controls */}
      <div className="lg:w-80 w-full flex-shrink-0 space-y-4">
        {/* Header Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Move className="w-5 h-5 text-emerald-500" />
              Tactics Board
            </h2>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Drag players to reposition them on the field
          </p>
        </div>

        {/* Team A Formation */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-4 rounded-full bg-red-500 shadow-sm" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Team A - Formation
            </h3>
          </div>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdownA(!showDropdownA);
                setShowDropdownB(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-red-300 dark:hover:border-red-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-red-500" />
                {formations.find((f) => f.name === formationA)?.label ||
                  formationA}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showDropdownA ? "rotate-180" : ""
                }`}
              />
            </button>
            {showDropdownA && (
              <div className="absolute z-50 top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden">
                {formations.map((f) => (
                  <button
                    key={f.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFormationChange("A", f.name);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ${
                      formationA === f.name
                        ? "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-semibold"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Team B Formation */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-4 rounded-full bg-blue-500 shadow-sm" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Team B - Formation
            </h3>
          </div>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdownB(!showDropdownB);
                setShowDropdownA(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                {formations.find((f) => f.name === formationB)?.label ||
                  formationB}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showDropdownB ? "rotate-180" : ""
                }`}
              />
            </button>
            {showDropdownB && (
              <div className="absolute z-50 top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden">
                {formations.map((f) => (
                  <button
                    key={f.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFormationChange("B", f.name);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${
                      formationB === f.name
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm font-medium shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Positions
        </button>

        {/* Selected Player Info */}
        {selectedPlayerData && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-5 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md ${
                  selectedPlayerData.team === "A" ? "bg-red-500" : "bg-blue-500"
                }`}
              >
                {selectedPlayerData.number}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {selectedPlayerData.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Team {selectedPlayerData.team} — #{selectedPlayerData.number}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                <span className="text-gray-500 dark:text-gray-400">
                  Position
                </span>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {selectedPlayerData.position}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                <span className="text-gray-500 dark:text-gray-400">
                  Coordinates
                </span>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {Math.round(selectedPlayerData.x / 10)},{" "}
                  {Math.round(selectedPlayerData.y / 10)} yd
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TacticsBoard;
