import { useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Home, Compass, User, Sparkles } from 'lucide-react';

type TabId = 'today' | 'explore' | 'tools' | 'profile';

function tabFromPathname(pathname: string): TabId {
  if (pathname.includes('/app/explore')) return 'explore';
  if (pathname.includes('/app/herramientas')) return 'tools';
  if (pathname.includes('/app/yo')) return 'profile';
  return 'today';
}

const TAB_TO_PATH: Record<TabId, string> = {
  today: '/app',
  tools: '/app/herramientas',
  explore: '/app/explore',
  profile: '/app/yo',
};

export default function MainApp() {
  const location = useLocation();
  const navigate = useNavigate();
  const mainScrollRef = useRef<HTMLElement | null>(null);

  const currentScreen = tabFromPathname(location.pathname);

  useEffect(() => {
    mainScrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  const goTo = (tab: TabId) => {
    navigate(TAB_TO_PATH[tab]);
  };

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-transparent">
      <main
        ref={mainScrollRef}
        className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden"
      >
        <div className="min-h-full">
          <Outlet />
        </div>
      </main>

      <nav
        className="flex shrink-0 items-center justify-around gap-1 border-t border-primary/15 bg-card/85 px-2 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] backdrop-blur-xl shadow-[0_-12px_40px_-16px_rgba(45,106,79,0.18)] sm:px-3"
        aria-label="Navegación principal"
      >
        <button
          type="button"
          onClick={() => goTo('today')}
          className={`flex w-[5.2rem] flex-col items-center gap-1 rounded-2xl px-1 py-2 transition-all duration-200 sm:w-[5.8rem] sm:px-3 ${
            currentScreen === 'today'
              ? 'text-primary bg-primary/12 ring-2 ring-primary/25 shadow-md shadow-primary/10 scale-[1.03]'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/60 active:scale-95'
          }`}
        >
          <Home className="size-5 shrink-0" strokeWidth={2.5} />
          <span className="text-center text-[9px] font-bold uppercase leading-tight tracking-tight sm:text-[10px] sm:tracking-wide">
            HOY
          </span>
        </button>

        <button
          type="button"
          onClick={() => goTo('tools')}
          className={`flex w-[5.2rem] flex-col items-center gap-1 rounded-2xl px-0.5 py-2 transition-all duration-200 sm:w-[5.8rem] sm:px-2 ${
            currentScreen === 'tools'
              ? 'text-primary bg-primary/12 ring-2 ring-primary/25 shadow-md shadow-primary/10 scale-[1.03]'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/60 active:scale-95'
          }`}
        >
          <Sparkles className="size-5 shrink-0" strokeWidth={2.5} />
          <span className="max-w-full text-center text-[9px] font-bold uppercase leading-tight tracking-tight [overflow-wrap:anywhere] sm:text-[10px] sm:tracking-wide">
            HERRAMIENTAS
          </span>
        </button>

        <button
          type="button"
          onClick={() => goTo('explore')}
          className={`flex w-[5.2rem] flex-col items-center gap-1 rounded-2xl px-1 py-2 transition-all duration-200 sm:w-[5.8rem] sm:px-3 ${
            currentScreen === 'explore'
              ? 'text-primary bg-primary/12 ring-2 ring-primary/25 shadow-md shadow-primary/10 scale-[1.03]'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/60 active:scale-95'
          }`}
        >
          <Compass className="size-5 shrink-0" strokeWidth={2.5} />
          <span className="text-center text-[9px] font-bold uppercase leading-tight tracking-tight sm:text-[10px] sm:tracking-wide">
            EXPLORAR
          </span>
        </button>

        <button
          type="button"
          onClick={() => goTo('profile')}
          className={`flex w-[5.2rem] flex-col items-center gap-1 rounded-2xl px-1 py-2 transition-all duration-200 sm:w-[5.8rem] sm:px-3 ${
            currentScreen === 'profile'
              ? 'text-primary bg-primary/12 ring-2 ring-primary/25 shadow-md shadow-primary/10 scale-[1.03]'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/60 active:scale-95'
          }`}
        >
          <User className="size-5 shrink-0" strokeWidth={2.5} />
          <span className="text-center text-[9px] font-bold uppercase leading-tight tracking-tight sm:text-[10px] sm:tracking-wide">
            YO
          </span>
        </button>
      </nav>
    </div>
  );
}
