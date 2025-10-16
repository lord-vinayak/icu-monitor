import { Bell, Settings, UserCircle } from "lucide-react";

interface HeaderProps {
  alarmCount: number;
}

const Header = ({ alarmCount }: HeaderProps) => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-lg">
            <div className="text-primary text-2xl font-bold">+</div>
          </div>
          <h1 className="text-xl font-bold tracking-wide">ICU COMMAND CENTER</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            {alarmCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            )}
          </button>
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <UserCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
