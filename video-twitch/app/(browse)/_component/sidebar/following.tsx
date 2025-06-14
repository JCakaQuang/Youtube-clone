"use client";

import { useSidebar } from "@/store/use-sidebar";
import { follows, users } from "@/src/db/schema";
import { UserItem, UserItemSkeleton } from "./user-item";

interface FollowingProps {
  data: {
    followId: string;
    followingUser: {
      id: string;
      username: string;
      imageUrl: string;
      stream?: { isLive: boolean } | null;
    };
  }[];
}

export const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar((state) => state);

  if (!data.length) {
    return null;
  }

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((follow) => (
          <UserItem
            key={follow.followingUser.id}
            username={follow.followingUser.username}
            imageUrl={follow.followingUser.imageUrl}
            isLive={follow.followingUser.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};


export const FollowingSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};