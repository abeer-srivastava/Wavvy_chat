import { MessageCircle } from "lucide-react";
import { ModeToggle } from "./modeToogle";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function Navbar() {
  const router=useRouter();

  return (
    <header className="flex justify-between items-center px-8 py-4 shadow-sm bg-secondary-background sticky top-0 z-50 border-b border-border">
      <div className="flex flex-row justify-center items-center">
        <MessageCircle className="text-main mr-2"></MessageCircle>
      <h1 className="text-2xl font-bold text-main">Wavy Chat</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button className="px-5 py-2 rounded-2xl bg-main text-main-foreground font-medium shadow-shadow hover:opacity-90 transition" onClick={()=>{router.replace("/signin")}}>
          Sign In
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
}

export default Navbar;
