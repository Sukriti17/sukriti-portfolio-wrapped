/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
         blob1: {
  "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
  "50%": { transform: "translate(60px, 40px) scale(1.08)" },
},
blob2: {
  "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
  "50%": { transform: "translate(-70px, 30px) scale(1.06)" },
},
blob3: {
  "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
  "50%": { transform: "translate(50px, -50px) scale(1.1)" },
},
blob4: {
  "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
  "50%": { transform: "translate(-45px, -35px) scale(1.05)" },
},
pastel: {
  "0%": { backgroundPosition: "0% 50%" },
  "50%": { backgroundPosition: "100% 50%" },
  "100%": { backgroundPosition: "0% 50%" },
},


      },
      animation: {
  gradient: "gradientShift 12s ease infinite",
  pastel: "pastel 14s ease-in-out infinite",
  blob1: "blob1 16s ease-in-out infinite",
  blob2: "blob2 18s ease-in-out infinite",
  blob3: "blob3 20s ease-in-out infinite",
  blob4: "blob4 22s ease-in-out infinite",
},

      boxShadow: {
        soft: "0 20px 60px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};
