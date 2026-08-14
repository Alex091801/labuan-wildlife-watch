import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Building2,
  Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import apmLogo from "@/assets/apm-logo.png";
import apmLoginArt from "@/assets/apm-login-art.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log Masuk Operasi | Portal Operasi APM Labuan" },
      {
        name: "description",
        content:
          "Portal Rasmi Angkatan Pertahanan Awam Malaysia (PKOD W.P. Labuan) - Sistem Pemantauan Risiko & Pengurusan Operasi.",
      },
    ],
  }),
  component: LoginPage,
});

export function LoginPage() {
  const navigate = useNavigate();
  const [officerId, setOfficerId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officerId.trim()) {
      toast.error("Sila masukkan ID Anggota atau Emel Rasmi anda.");
      return;
    }
    if (!password) {
      toast.error("Sila masukkan Kata Laluan.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Log masuk berjaya! Selamat bertugas.", {
        description: `Anggota: ${officerId.toUpperCase()} (PKOD W.P. Labuan)`,
      });
      navigate({ to: "/" });
    }, 900);
  };

  const handleAutofillDemo = () => {
    setOfficerId("APM-LB-9402");
    setPassword("OperasiLabuan2026!");
    toast.info("Kredensial pegawai demo telah diisi.", {
      description: "Tekan 'LOG MASUK OPERASI' untuk terus ke dashboard.",
    });
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`Menghubungkan ke ${provider}...`, {
      description: "Pengesahan gerbang identiti tunggal (SSO) Kerajaan Malaysia.",
    });
    setTimeout(() => {
      toast.success(`Akaun ${provider} disahkan!`, {
        description: "Selamat datang ke Portal Operasi APM Labuan.",
      });
      navigate({ to: "/" });
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-[#004242] overflow-hidden">
      
      {/* Background Teal Atmosphere & Subtle Line-Art Pattern */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Deep Teal Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#003838] via-[#004a4a] to-[#012929]" />
        
        {/* Subtle Geometric Line-Art Grid / Topographic Rings */}
        <svg
          className="absolute inset-0 h-full w-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="linePattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="white"
                strokeWidth="1.2"
                strokeDasharray="4,4"
              />
              <circle cx="30" cy="30" r="12" fill="none" stroke="white" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#linePattern)" />
        </svg>

        {/* Ambient Warm Orange & Navy Glows */}
        <div className="absolute -top-32 -left-32 h-[450px] w-[450px] rounded-full bg-[#EA580C]/20 blur-[130px]" />
        <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-[#0F172A]/70 blur-[150px]" />
      </div>

      {/* Main Split-Screen Container Card */}
      <div className="relative z-10 w-full max-w-5xl lg:max-w-6xl rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl bg-white dark:bg-slate-900 border border-teal-900/40 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[660px]">

        {/* ========================================================================= */}
        {/* LEFT SIDE: Visual Art (Illustrative Scene & Organic Wave Transition) */}
        {/* ========================================================================= */}
        <div className="relative lg:col-span-6 bg-[#0F172A] overflow-hidden min-h-[340px] sm:min-h-[420px] lg:min-h-full flex flex-col justify-end">
          {/* Main Vector Artwork */}
          <img
            src={apmLoginArt}
            alt="APM Operation Illustration"
            className="absolute inset-0 h-full w-full object-cover object-center scale-[1.02] select-none pointer-events-none"
          />

          {/* Atmospheric Dusk Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-transparent to-black/20 pointer-events-none" />

          {/* Organic Wave Edge Separator (Visible on Desktop) */}
          <div className="hidden lg:block absolute top-0 bottom-0 -right-[2px] w-14 z-20 pointer-events-none overflow-hidden">
            <svg
              className="h-full w-full text-white dark:text-slate-900"
              viewBox="0 0 100 1000"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <path d="M 0,0 C 80,200 10,400 85,600 C 10,800 90,950 100,1000 L 100,0 Z" />
            </svg>
          </div>

          {/* Organic Wave Edge Separator (Visible on Mobile / Tablet Bottom) */}
          <div className="lg:hidden absolute bottom-0 left-0 right-0 h-12 z-20 pointer-events-none overflow-hidden">
            <svg
              className="h-full w-full text-white dark:text-slate-900"
              viewBox="0 0 1000 100"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <path d="M 0,100 C 300,10 700,90 1000,0 L 1000,100 Z" />
            </svg>
          </div>

          {/* Floating Operational Art Badges */}
          <div className="relative z-20 p-6 sm:p-8 text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-[#0F172A]/85 px-3 py-1 text-xs font-bold text-orange-400 backdrop-blur-md shadow-lg">
              <span className="h-2 w-2 rounded-full bg-[#EA580C] animate-pulse" />
              PKOD WILAYAH PERSEKUTUAN LABUAN
            </div>
            <p className="mt-2 text-sm text-slate-200/90 font-medium drop-shadow-md">
              Kesiapsiagaan 24 Jam • Kawalan & Menangani Risiko Hidupan Liar
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT SIDE: Form Area */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 sm:p-10 lg:p-12 flex flex-col justify-between relative z-20">
          <div>
            {/* Top Header: Emblem + Portal Title + Subtitle */}
            <div className="flex items-center gap-3.5 pb-2">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-orange-500/10 p-1.5 ring-1 ring-orange-500/30">
                <img
                  src={apmLogo}
                  alt="APM Emblem"
                  className="h-full w-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-black tracking-tight text-[#0F172A] dark:text-white">
                  Portal Operasi APM Labuan
                </h1>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Pusat Kawalan Operasi Daerah (PKOD) W.P. Labuan
                </p>
              </div>
            </div>

            {/* Form Title */}
            <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-5">
              <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white tracking-wide">
                LOG MASUK OPERASI
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Sila masukkan kredensial rasmi anda untuk memulakan tugas.
              </p>
            </div>

            {/* Main Login Form */}
            <form onSubmit={handleLogin} className="mt-5 space-y-4">
              
              {/* Field 1: ID Anggota / Emel Rasmi */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="officerId"
                  className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-slate-200"
                >
                  Log masuk, ID Anggota, atau Emel Rasmi <span className="text-[#EA580C]">*</span>
                </Label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <User className="h-4 w-4 text-slate-500" />
                  </div>
                  <Input
                    id="officerId"
                    type="text"
                    value={officerId}
                    onChange={(e) => setOfficerId(e.target.value)}
                    placeholder="Contoh: APM-LB-9402 atau emel@apm.gov.my"
                    className="h-11 rounded-2xl border-slate-300 pl-10 pr-3 text-sm transition-all focus-visible:border-[#EA580C] focus-visible:ring-[#EA580C]/25 dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>
              </div>

              {/* Field 2: Kata Laluan */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-slate-200"
                  >
                    Kata Laluan <span className="text-[#EA580C]">*</span>
                  </Label>
                  <button
                    type="button"
                    onClick={() => setForgotOpen(true)}
                    className="text-xs font-semibold text-[#EA580C] hover:underline transition-colors"
                  >
                    Lupa kata laluan?
                  </button>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Lock className="h-4 w-4 text-slate-500" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="h-11 rounded-2xl border-slate-300 pl-10 pr-10 text-sm transition-all focus-visible:border-[#EA580C] focus-visible:ring-[#EA580C]/25 dark:border-slate-700 dark:bg-slate-950"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    aria-label={showPassword ? "Sembunyi kata laluan" : "Papar kata laluan"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Demo Fill */}
              <div className="flex items-center justify-between pt-0.5">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                    className="data-[state=checked]:bg-[#0F172A] data-[state=checked]:border-[#0F172A]"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="cursor-pointer text-xs font-medium text-slate-600 dark:text-slate-400"
                  >
                    Ingat peranti bertugas ini
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleAutofillDemo}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-[#EA580C] transition-colors"
                >
                  <Sparkles className="h-3 w-3 text-[#EA580C]" />
                  Akaun Demo
                </button>
              </div>

              {/* Primary Action Button: Navy with Orange text */}
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full rounded-2xl bg-[#0F172A] hover:bg-[#1E293B] active:bg-[#020617] text-[#EA580C] text-sm font-extrabold tracking-wider uppercase shadow-xl transition-all active:scale-[0.99] disabled:opacity-75"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#EA580C] border-t-transparent" />
                    <span>Mengesahkan Identiti...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>LOG MASUK OPERASI</span>
                    <ArrowRight className="h-4 w-4 text-[#EA580C]" />
                  </div>
                )}
              </Button>
            </form>

            {/* Divider: "or log in with" */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
                <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 font-medium">
                  atau log masuk dengan
                </span>
              </div>
            </div>

            {/* Social / SSO Login Boxes */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin("MyGovUC 2.0 (SSO)")}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 p-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all hover:bg-slate-100 hover:border-slate-300 dark:hover:bg-slate-800"
              >
                <Building2 className="h-4 w-4 text-[#EA580C]" />
                <span>MyGovUC 2.0</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin("Google Workspace APM")}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 p-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all hover:bg-slate-100 hover:border-slate-300 dark:hover:bg-slate-800"
              >
                <Globe2 className="h-4 w-4 text-[#0F172A] dark:text-sky-400" />
                <span>Google APM</span>
              </button>
            </div>
          </div>

          {/* Official Disclaimer & Motto Footer */}
          <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-3.5">
            <p className="text-center text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
              Portal Rasmi Angkatan Pertahanan Awam Malaysia. Akses terhad kepada kakitangan APM sahaja.{" "}
              <span className="block mt-0.5 font-bold text-[#0F172A] dark:text-orange-400">
                Sentiasa Bersedia • Pantas • Berintegriti.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Lupa Kata Laluan Dialog */}
      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#0F172A] dark:text-white">
              <HelpCircle className="h-5 w-5 text-[#EA580C]" />
              Bantuan Tetapan Semula Kata Laluan
            </DialogTitle>
            <DialogDescription className="pt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Bagi tujuan keselamatan operasi APM, penetapan semula kata laluan portal operasi perlu
              disahkan oleh Pegawai Bertugas Pusat Kawalan Operasi Daerah (PKOD).
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 rounded-xl bg-slate-50 p-4 text-xs dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 dark:border-slate-800">
              <span className="font-medium text-slate-600 dark:text-slate-400">Kaunter PKOD Labuan:</span>
              <span className="font-bold text-slate-900 dark:text-white">087-414 999 / 087-422 999</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 dark:border-slate-800">
              <span className="font-medium text-slate-600 dark:text-slate-400">Talian Kecemasan:</span>
              <span className="font-bold text-[#EA580C]">999 (MERS 999)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-600 dark:text-slate-400">Emel Pentadbir IT:</span>
              <span className="font-bold text-slate-900 dark:text-white">pkod.labuan@apm.gov.my</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setForgotOpen(false)}
              className="text-xs"
            >
              Tutup
            </Button>
            <Button
              onClick={() => {
                setForgotOpen(false);
                handleAutofillDemo();
              }}
              className="bg-[#0F172A] text-[#EA580C] text-xs font-bold hover:bg-[#1E293B]"
            >
              Guna Akaun Demo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
