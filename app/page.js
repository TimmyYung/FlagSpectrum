"use client";
import * as React from "react";
import { Button, Stack, Box } from "@mui/material";
import { useState } from "react";

// Helper function to calculate contrast (returns 'black' or 'white')
const getContrastingTextColor = (backgroundColor) => {
  // Remove the '#' if it exists
  const hex = backgroundColor.replace("#", "");

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for light backgrounds and white for dark backgrounds
  return luminance > 0.5 ? "black" : "white";
};

export default function Home() {
  // State to manage the background color of the website
  const [bgColor, setBgColor] = useState("white"); // Default background color

  // State to manage the text color
  const [textColor, setTextColor] = useState("black"); // Default text color

  // State to manage the Generate Prompt button's background color
  const [promptButtonBgColor, setPromptButtonBgColor] = useState("#007bff"); // Default Generate Prompt button background color

  // State to store the generated prompt and relationship
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [generatedRelationship, setGeneratedRelationship] = useState("");

  // Function to fetch a random line from a text file
  const fetchRandomLine = async (filePath) => {
    try {
      const response = await fetch(filePath);
      const text = await response.text();
      const lines = text.split("\n").filter((line) => line.trim() !== ""); // Split into lines and remove empty lines
      const randomLine = lines[Math.floor(Math.random() * lines.length)]; // Pick a random line
      return randomLine;
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
      return "Error loading content.";
    }
  };

  // Function to handle Generate Prompt button click
  const handleGeneratePrompt = async () => {
    const relationship = await fetchRandomLine("/relationship.txt");
    const prompt = await fetchRandomLine("/prompts.txt");
    setGeneratedRelationship(relationship);
    setGeneratedPrompt(prompt);
  };

  // Function to handle background and text color changes
  const handleColorChange = (newBgColor) => {
    setBgColor(newBgColor); // Update website background color
    setTextColor(getContrastingTextColor(newBgColor)); // Update website text color based on contrast
    setPromptButtonBgColor(newBgColor); // Update Generate Prompt button background color
  };

  return (
    <div
      style={{
        padding: "0",
        backgroundColor: bgColor, // Dynamically set the website's background color
        color: textColor, // Dynamically set the website's text color
        height: "100vh",
        width: "100vw",
      }}
    >
      {/* Fixed Button Container in Top-Left */}
      <Stack
        spacing={1}
        direction="column"
        sx={{
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 1000, // Ensure buttons are above other content
        }}
      >
        {/* Green Button */}
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
          onClick={() => handleColorChange("green")} // Change colors dynamically when clicked
        />

        {/* Red Button */}
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
          onClick={() => handleColorChange("red")} // Change colors dynamically when clicked
        />

        {/* Beige Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#e4d5b7", // Beige color
            width: 50,
            height: 50,
            minWidth: 50,
            "&:hover": {
              backgroundColor: "#d3c4a6", // Slightly darker beige on hover
            },
          }}
          onClick={() => handleColorChange("#e4d5b7")} // Change colors dynamically when clicked
        />
      </Stack>

      {/* Centered "Generate Prompt" Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column", // Stack elements vertically in the center
          height: "100vh", // Full viewport height for vertical centering
          width: "100vw", // Full viewport width for horizontal centering
        }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: promptButtonBgColor, // Dynamically set Generate Prompt button's background color
            color:
              getContrastingTextColor(promptButtonBgColor), // Dynamically calculate text contrast for Generate Prompt button
            "&:hover": {
              opacity: "0.9", // Slight hover effect for better interactivity
            },
          }}
          onClick={handleGeneratePrompt} // Generate prompt when clicked
        >
          Generate Prompt
        </Button>

        {/* Display Generated Relationship and Prompt */}
        <Box sx={{ marginTop: 4, textAlign: "center" }}>
          {/* <h2>Relationship:</h2> */}
          <h1>{generatedRelationship}</h1>
          {/* <h2>Prompt:</h2> */}
          <h3>{generatedPrompt}</h3>
        </Box>
      </Box>
    </div>
  );
}
