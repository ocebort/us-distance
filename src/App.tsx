import { useState, useEffect } from 'react';
import { 
  Heart, CloudSun, BatteryCharging, Send, Calendar, 
  MapPin, Clock, MessageCircle, Sparkles, Image, CheckCircle2 
} from 'lucide-react';

export default function App() {
  const [pulseActive, setPulseActive] = useState(false);
  const [promptAnswered, setPromptAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [partnerStatus] = useState("Working on thesis 📚");

  // Countdown calculations
  const reunionDate = new Date('2026-11-18T18:00:00');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = reunionDate.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerPulse = () => {
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between max-w-md mx-auto relative overflow-hidden font-sans border-x border-slate-800 shadow-2xl">
      
      {/* Background Glow Effects */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="p-5 flex items-center justify-between border-b border-slate-800/60 backdrop-blur-md bg-slate-950/80 sticky top-0 z-20">
        <div className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
          <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-rose-400 to-indigo-400 bg-clip-text text-transparent">
            UsDistance
          </span>
        </div>
        <div className="text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-slate-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          Connected
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-5 space-y-6 flex-1 overflow-y-auto">

        {/* 1. Co-Presence Side-by-Side Status */}
        <section className="grid grid-cols-2 gap-3">
          {/* Your Profile */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-rose-400">YOU</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" /> 88%
              </span>
            </div>
            <div>
              <p className="font-medium text-slate-200 flex items-center gap-1 text-sm">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Lisbon
              </p>
              <p className="text-xl font-bold tracking-tight text-white mt-0.5">10:40 AM</p>
            </div>
            <div className="pt-2 border-t border-slate-800/60 text-xs text-slate-400 flex items-center gap-1">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" /> 21°C • Sunny
            </div>
          </div>

          {/* Partner's Profile */}
          <div className="bg-slate-900/80 border border-indigo-500/30 p-4 rounded-2xl space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-bl-full pointer-events-none" />
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-indigo-400">PARTNER</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <BatteryCharging className="w-3.5 h-3.5 text-amber-400" /> 42%
              </span>
            </div>
            <div>
              <p className="font-medium text-slate-200 flex items-center gap-1 text-sm">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Paris
              </p>
              <p className="text-xl font-bold tracking-tight text-white mt-0.5">11:40 AM <span className="text-xs text-indigo-300 font-normal">(+1h)</span></p>
            </div>
            <div className="pt-2 border-t border-slate-800/60 text-xs text-slate-400 flex items-center gap-1">
              <CloudSun className="w-3.5 h-3.5 text-blue-400" /> 14°C • Rain
            </div>
          </div>
        </section>

        {/* Status Bubble */}
        <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-indigo-400" />
            <span>Partner status: <strong className="text-white">{partnerStatus}</strong></span>
          </div>
          <span className="text-[10px] text-slate-500">2m ago</span>
        </div>

        {/* 2. Closing the Gap Countdown Card */}
        <section className="bg-gradient-to-br from-rose-950/40 via-slate-900 to-indigo-950/40 border border-rose-500/20 p-5 rounded-2xl text-center space-y-3 relative">
          <div className="flex items-center justify-center gap-2 text-rose-400 text-xs font-medium uppercase tracking-wider">
            <Calendar className="w-4 h-4" /> Closing the Gap
          </div>
          
          <div className="flex justify-center gap-4 text-slate-100 my-2">
            <div className="bg-slate-900/90 border border-slate-800 px-3 py-2 rounded-xl min-w-[65px]">
              <span className="block text-2xl font-black text-rose-400">{timeLeft.days}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Days</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 px-3 py-2 rounded-xl min-w-[65px]">
              <span className="block text-2xl font-black text-slate-100">{timeLeft.hours}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Hours</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 px-3 py-2 rounded-xl min-w-[65px]">
              <span className="block text-2xl font-black text-slate-100">{timeLeft.minutes}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Mins</span>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            ✈️ Next reunion flight: <strong className="text-slate-200">LIS ➔ CDG</strong> (Nov 18)
          </p>
        </section>

        {/* 3. Send Warm Hug / Haptic Wave Button */}
        <section className="text-center">
          <button
            onClick={triggerPulse}
            className={`w-full py-4 px-6 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg ${
              pulseActive
                ? 'bg-rose-500 text-white scale-98 shadow-rose-500/50'
                : 'bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white shadow-indigo-500/20'
            }`}
          >
            <Sparkles className={`w-5 h-5 ${pulseActive ? 'animate-spin' : ''}`} />
            {pulseActive ? 'Sending Warm Pulse to Phone...' : 'Send a Warm Hug Wave'}
          </button>
        </section>

        {/* 4. Daily Double-Blind Prompt */}
        <section className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> DAILY PROMPT
            </span>
            <span className="text-slate-500 text-[11px]">Unlocks when both answer</span>
          </div>

          <p className="text-sm font-medium text-slate-200">
            "What made you smile for a brief second today?"
          </p>

          {!promptAnswered ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your response..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={() => userAnswer.trim() && setPromptAnswered(true)}
                className="bg-indigo-600 hover:bg-indigo-500 px-3 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="bg-emerald-950/30 border border-emerald-500/30 p-3 rounded-xl flex items-center justify-between text-xs text-emerald-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Answer submitted! Waiting for partner...
              </span>
            </div>
          )}
        </section>

      </main>

      {/* Bottom Navigation */}
      <nav className="p-3 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-md flex justify-around text-xs text-slate-400">
        <button className="flex flex-col items-center gap-1 text-rose-400 font-semibold">
          <Heart className="w-5 h-5 fill-rose-500/20" /> Home
        </button>
        <button className="flex flex-col items-center gap-1 hover:text-slate-200">
          <MessageCircle className="w-5 h-5" /> Chat
        </button>
        <button className="flex flex-col items-center gap-1 hover:text-slate-200">
          <Image className="w-5 h-5" /> Vault
        </button>
        <button className="flex flex-col items-center gap-1 hover:text-slate-200">
          <Clock className="w-5 h-5" /> Countdown
        </button>
      </nav>

    </div>
  );
}
