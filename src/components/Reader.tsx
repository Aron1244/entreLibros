import React, { useState, useRef, useEffect } from "react";
import { ReactReader, ReactReaderStyle } from "react-reader";

type ITheme = "light" | "dark";

function updateTheme(rendition: any, theme: ITheme) {
  const themes = rendition.themes;
  switch (theme) {
    case "dark": {
      themes.override("color", "#fff");
      themes.override("background", "#000");
      break;
    }
    case "light": {
      themes.override("color", "#000");
      themes.override("background", "#fff");
      break;
    }
  }
}

const lightReaderTheme = {
  ...ReactReaderStyle,
  readerArea: {
    ...ReactReaderStyle.readerArea,
    backgroundColor: "var(--color-secondary-light)",
    transition: undefined,
  },
  arrow: {
    ...ReactReaderStyle.arrow,
    color: "var(--color-primary-dark)",
  },
  arrowHover: {
    ...ReactReaderStyle.arrowHover,
    color: "var(--color-primary)",
  },
  titleArea: {
    ...ReactReaderStyle.titleArea,
    color: "var(--color-primary-dark)",
  },
  tocArea: {
    ...ReactReaderStyle.tocArea,
    background: "var(--color-secondary-light)",
  },
  tocButtonExpanded: {
    ...ReactReaderStyle.tocButtonExpanded,
    background: "var(--color-primary-light)",
  },
  tocButtonBar: {
    ...ReactReaderStyle.tocButtonBar,
    background: "var(--color-secondary-light)",
  },
  tocButton: {
    ...ReactReaderStyle.tocButton,
    color: "var(--color-primary-dark)",
  },
};

const darkReaderTheme = {
  ...ReactReaderStyle,
  arrow: {
    ...ReactReaderStyle.arrow,
    color: "var(--color-primary-light)",
  },
  arrowHover: {
    ...ReactReaderStyle.arrowHover,
    color: "var(--color-secondary-light)",
  },
  readerArea: {
    ...ReactReaderStyle.readerArea,
    backgroundColor: "var(--color-primary-dark)",
    transition: undefined,
  },
  titleArea: {
    ...ReactReaderStyle.titleArea,
    color: "var(--color-primary-light)",
  },
  tocArea: {
    ...ReactReaderStyle.tocArea,
    background: "var(--color-accent-dark)",
  },
  tocButtonExpanded: {
    ...ReactReaderStyle.tocButtonExpanded,
    background: "var(--color-primary)",
  },
  tocButtonBar: {
    ...ReactReaderStyle.tocButtonBar,
    background: "var(--color-primary-dark)",
  },
  tocButton: {
    ...ReactReaderStyle.tocButton,
    color: "var(--color-primary-light)",
  },
};

export const App = () => {
  const [location, setLocation] = useState<string | number>(0);
  const [theme, setTheme] = useState<ITheme>("dark");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const rendition = useRef<any>(undefined);

  useEffect(() => {
    if (rendition.current) {
      updateTheme(rendition.current, theme);
    }
  }, [theme]);

  return (
    <div className="pt-20 bg-primary-dark">
      <div className="flex gap-4 mb-4 justify-center relative">
        <button
          className="px-4 py-2 rounded bg-primary text-primary-light hover:bg-primary-dark hover:text-primary-light focus:outline-none border border-primary-dark"
          onClick={() => setDropdownOpen((open) => !open)}
        >
          Tema
          <svg
            className="inline ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {dropdownOpen && (
          <div className="absolute z-10 mt-12 w-40 bg-secondary-light rounded shadow-lg border border-primary-dark">
            <button
              onClick={() => {
                setTheme("light");
                setDropdownOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 bg-secondary-light text-primary-dark hover:bg-primary-light hover:text-primary-dark rounded-t ${
                theme === "light" ? "font-bold underline" : ""
              }`}
            >
              Tema Claro
            </button>
            <button
              onClick={() => {
                setTheme("dark");
                setDropdownOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 bg-primary-dark text-primary-light hover:bg-primary hover:text-primary-light rounded-b ${
                theme === "dark" ? "font-bold underline" : ""
              }`}
            >
              Tema Oscuro
            </button>
          </div>
        )}
      </div>
      <div className="w-full h-screen">
        <ReactReader
          url="/books/heroe.epub"
          location={location}
          locationChanged={(epubcfi: string) => setLocation(epubcfi)}
          readerStyles={theme === "dark" ? darkReaderTheme : lightReaderTheme}
          getRendition={(_rendition) => {
            updateTheme(_rendition, theme);
            rendition.current = _rendition;
          }}
        />
      </div>
    </div>
  );
};
