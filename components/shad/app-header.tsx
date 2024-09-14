import { LogOut, Notebook, User } from "lucide-react-native";
import { BASE_API_URL } from "../../source/api";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { signOut, useAuth } from "../../source/store/auth.store";
import { router } from "expo-router";

export default function AppHeader() {
    const user = useAuth.use.user();
    return   <div className="flex justify-between pb-4">
    <p>{user?.organisation?.panelName}</p>
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <Avatar className=" border-2 border-primary w-8 h-8">
          <AvatarImage
            src={`${BASE_API_URL}/static/${user?.organisation?.logo}`}
          />
          <AvatarFallback className="text-xs">
            {user?.organisation?.name.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Notebook className="mr-2 h-4 w-4" />
          <span>Feedback</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
}