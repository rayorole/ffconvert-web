"use client";

import React from "react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { getTeams } from "@/app/dash/actions";
import { SelectTeam } from "@/database/schema";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import { useTeam } from "@/context/team-context";
import { UsersIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function TeamSwitch({
  isCollapsed = false,
}: {
  isCollapsed: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [teamsLoading, setTeamsLoading] = useState(true);
  const [teams, setTeams] = useState<SelectTeam[]>([]);
  const { currentTeamID, updateTeamID, getTeamID } = useTeam();

  useEffect(() => {
    async function fetchTeams() {
      const teams = await getTeams();
      setTeams(teams!);
      setTeamsLoading(false);
    }

    fetchTeams();
  }, []);
  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      onValueChange={(val) => {
        const currentValue = val as string;
        updateTeamID(currentValue);
        setOpen(false);
      }}
    >
      <SelectTrigger
        className={cn("w-full justify-between", isCollapsed ? "hidden" : "")}
      >
        {teamsLoading ? (
          <div className="flex items-center space-x-2">
            <Spinner size="small" />
            {isCollapsed ? null : <span>Loading teams...</span>}
          </div>
        ) : currentTeamID ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              {teams.find((team) => team.id === currentTeamID)!.image_url! ? (
                <Image
                  src={
                    teams.find((team) => team.id === currentTeamID)!.image_url!
                  }
                  className="w-6 h-6 rounded-full"
                  alt={teams.find((team) => team.id === currentTeamID)!.name}
                  width={24}
                  height={24}
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-muted/40 flex items-center justify-center">
                  <UsersIcon className="h-4 w-4" />
                </div>
              )}
              <span className={isCollapsed ? "hidden" : ""}>
                {teams.find((team) => team.id === currentTeamID)!.name}
              </span>
            </div>
          </div>
        ) : (
          "Select team..."
        )}
      </SelectTrigger>

      <SelectContent className="w-full p-0">
        {teams.map((team) => (
          <SelectItem
            key={team.id}
            value={team.id}
            className="flex items-center justify-between w-full space-x-2"
          >
            {team.image_url ? (
              <Image
                src={team.image_url!}
                className="w-6 h-6 rounded-full"
                alt={team.name}
                width={24}
                height={24}
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-muted/40 flex items-center justify-center">
                <UsersIcon className="h-4 w-4" />
              </div>
            )}
            <span>{team.name}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
