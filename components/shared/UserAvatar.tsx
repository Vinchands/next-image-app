import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import SignoutButton from '@/components/shared/SignoutButton'
import { getInitials } from '@/lib/utils'
import { SafeUser } from '@/lib/definitions'
import icon from '@/public/user.png'

export default function UserAvatar({ user }: { user:  SafeUser }) {return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user.photoUrl || icon.src} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <p className="font-bold">{user.name}</p>
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/profile/${user.username}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" asChild>
            <SignoutButton>Sign out</SignoutButton>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
