"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={clsx("app-card", className)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-3">
      <h2 className="text-sm font-semibold text-[var(--text-primary)]">
        {title}
      </h2>
      {action}
    </div>
  );
}
