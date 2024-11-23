"use client";
import * as React from "react";
import { Button, Stack, Box } from "@mui/material";
import { useState } from "react";

const getContrastingTextColor = (backgroundColor) => {
  const hex = backgroundColor.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "black" : "white";
};

export default function Home() {
  const [bgColor, setBgColor] = useState("white");

  const [textColor, setTextColor] = useState("black"); 

  const [promptButtonBgColor, setPromptButtonBgColor] = useState("#007bff");

  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [generatedRelationship, setGeneratedRelationship] = useState("");

  useEffect(() => {
    document.title = "Flag Spectrum"; // Set tab title here
  }, []);
  
  const fetchRandomLine = async (filePath) => {
    try {
      const response = await fetch(filePath);
      const text = await response.text();
      const lines = text.split("\n").filter((line) => line.trim() !== "");
      const randomLine = lines[Math.floor(Math.random() * lines.length)]; 
      return randomLine;
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
      return "Error loading content.";
    }
  };

  const handleGeneratePrompt = async () => {
    const relationship = await fetchRandomLine("/relationship.txt");
    const prompt = await fetchRandomLine("/prompts.txt");
    setGeneratedRelationship(relationship);
    setGeneratedPrompt(prompt);
  };

  const handleColorChange = (newBgColor) => {
    setBgColor(newBgColor); 
    setTextColor(getContrastingTextColor(newBgColor)); 
    setPromptButtonBgColor(newBgColor); 
  };

  return (
    <div
      style={{
        padding: "0",
        backgroundColor: bgColor, 
        color: textColor, 
        height: "100vh",
        width: "100vw",
      }}
    >
      <Stack
        spacing={1}
        direction="column"
        sx={{
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "green",
            width: 50,
            height: 50,
            minWidth: 50,
            "&:hover": {
              backgroundColor: "darkgreen",
            },
          }}
          onClick={() => handleColorChange("green")} 
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "red",
            width: 50,
            height: 50,
            minWidth: 50,
            "&:hover": {
              backgroundColor: "darkred",
            },
          }}
          onClick={() => handleColorChange("red")} 
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#e4d5b7",
            width: 50,
            height: 50,
            minWidth: 50,
            "&:hover": {
              backgroundColor: "#d3c4a6",
            },
          }}
          onClick={() => handleColorChange("#e4d5b7")}
        />
      </Stack>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh", 
          width: "100vw", 
        }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: promptButtonBgColor,
            color:
              getContrastingTextColor(promptButtonBgColor), 
            "&:hover": {
              opacity: "0.9", 
            },
          }}
          onClick={handleGeneratePrompt}
        >
          Generate Prompt
        </Button>

        <Box sx={{ marginTop: 4, textAlign: "center" }}>

          <h1>{generatedRelationship}</h1>

          <h3>{generatedPrompt}</h3>
        </Box>
      </Box>
    </div>
  );
}
