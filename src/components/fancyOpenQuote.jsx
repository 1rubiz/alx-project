export default function FancyOpenQuote() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="50"
      height="50"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      className="svg-animate"
    >
      <path
        d="M30,20 Q50,0 70,20 Q50,40 30,20"
        className="stroke-current text-blue-500"
      />
      <path
        d="M30,40 Q50,60 70,40 Q50,20 30,40"
        className="stroke-current text-blue-500"
      />
    </svg>
  );
}
