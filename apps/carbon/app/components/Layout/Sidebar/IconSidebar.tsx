import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  VStack,
} from "@carbon/react";
import { Link, useMatches } from "@remix-run/react";
import { BsFillHexagonFill } from "react-icons/bs";
import { z } from "zod";
import { useSidebar } from "./useSidebar";

export const ModuleHandle = z.object({
  module: z.string(),
});

const IconSidebar = () => {
  const links = useSidebar();
  const matchedModules = useMatches().reduce((acc, match) => {
    if (match.handle) {
      const result = ModuleHandle.safeParse(match.handle);
      if (result.success) {
        acc.add(result.data.module);
      }
    }

    return acc;
  }, new Set<string>());

  return (
    <div className="h-full border-r border-border bg-background z-10">
      <div>
        <TooltipProvider>
          <VStack spacing={0} className="self-start sticky">
            <Button
              isIcon
              asChild
              variant="ghost"
              size="lg"
              className="rounded-none"
            >
              <Link to="/">
                <BsFillHexagonFill />
              </Link>
            </Button>
            {links.map((link) => {
              const module = link.to.split("/")[2]; // link.to is "/x/parts" -- this returns "parts"

              const isActive = matchedModules.has(module);
              return (
                <Tooltip key={link.to}>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      isIcon
                      aria-label={link.name}
                      variant={isActive ? "primary" : "ghost"}
                      size="lg"
                      className="rounded-none"
                    >
                      <Link to={link.to} prefetch="intent">
                        <link.icon />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{link.name}</TooltipContent>
                </Tooltip>
              );
            })}
          </VStack>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default IconSidebar;
