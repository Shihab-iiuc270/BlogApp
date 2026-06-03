"use client";

import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useEffect, useState } from "react";

const ThemeProvider = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme) {
      document.documentElement.dataset.theme = theme;
      document.body.dataset.theme = theme;
    }
  }, [theme]);

  return <div className={theme ?? "light"}>{children}</div>;
};

export default ThemeProvider;