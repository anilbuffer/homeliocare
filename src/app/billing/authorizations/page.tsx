"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { AuthorizationWorkspace } from "@/components/billing/AuthorizationWorkspace";

export default function AuthorizationsPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full h-[calc(100vh-8rem)]"
    >
      <AuthorizationWorkspace />
    </motion.div>
  );
}
