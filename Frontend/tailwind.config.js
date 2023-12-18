/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        //del más claro al más oscuro
        // Verdes
        verde1: "#ececa3",
        verde2: "#b5e550",
        verde3: "#abc32f",
        verde4: "#809c13",
        verde5: "#607c3c",
        verde6: "#94C800",
        verde7: "#08EF29",

        // Azules
        azul1: "#caf0f8",
        azul2: "#90e0ef",
        azul3: "#00b4d8",
        azul4: "#0077b6",
        azul5: "#03045e",

      }
    },
  },
  plugins: [],
}

