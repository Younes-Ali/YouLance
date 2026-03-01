export default function PageWrapper({ children }) {
  return (
    <div style={{ background: "radial-gradient(ellipse at 10% 10%, #0d0d2b 0%, #050510 50%, #000 100%)", fontFamily: "'Syne', sans-serif", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap'); *{box-sizing:border-box;} html{scroll-behavior:smooth;}`}</style>
      {children}
    </div>
  );
}