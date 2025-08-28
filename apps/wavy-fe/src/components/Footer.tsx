import { MessageCircle } from "lucide-react";
import { ModeToggle } from "./modeToogle";

function Footer() {
    return (
        <div>
         <footer className="px-8 md:px-16 lg:px-24 py-12 bg-secondary-background border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-main" />
            <span className="text-xl font-bold">Wavy Chat</span>
          </div>
          
          <div className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Wavy Chat. All rights reserved. Made with ❤️ by Abeer.
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Toggle theme:</span>
            <ModeToggle />
          </div>
        </div>
      </footer>
      </div>
    );
}

export default Footer;